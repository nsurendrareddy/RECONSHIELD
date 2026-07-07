/**
 * AdQueue — Priority-based ad loading scheduler.
 *
 * Priority levels:
 *   critical — Tool scan result banners: fires immediately after hydration, bypasses queue
 *   high     — First inline blog banner, homepage hero: fires immediately after hydration
 *   normal   — Sidebar banners: queued, processed sequentially
 *   low      — Footer banners: deferred via requestIdleCallback
 *
 * Key improvements over v1:
 *   - No interaction gate delay for critical/high priority ads
 *   - critical/high run in parallel (no serial blocking between them)
 *   - Fallback timer reduced from 4000ms → 800ms for normal/low
 *   - requestIdleCallback used for low-priority tasks
 */

export type AdPriority = 'critical' | 'high' | 'normal' | 'low';

type AdTask = () => Promise<void>;

interface QueueEntry {
  task: AdTask;
  priority: AdPriority;
}

class AdQueue {
  private queue: QueueEntry[] = [];
  private isProcessing: boolean = false;
  private hydrated: boolean = false;
  private cleanupListeners: (() => void) | null = null;

  constructor() {
    if (typeof window === 'undefined') return;

    // Use requestIdleCallback or setTimeout to detect hydration completion
    const onHydrated = () => {
      if (this.hydrated) return;
      this.hydrated = true;
      if (this.cleanupListeners) {
        this.cleanupListeners();
        this.cleanupListeners = null;
      }
      if (process.env.NODE_ENV === 'development') {
        console.log('[AdQueue] Hydration complete. Flushing queue.');
      }
      this.flushAll();
    };

    // Fire on first user interaction (fast path)
    const handleInteraction = () => onHydrated();
    window.addEventListener('mousemove', handleInteraction, { passive: true, once: true });
    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleInteraction, { passive: true, once: true });

    this.cleanupListeners = () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    // Reduced fallback: 800ms (was 4000ms)
    // critical/high don't wait at all — see enqueue()
    setTimeout(() => onHydrated(), 800);
  }

  public enqueue(task: AdTask, priority: AdPriority = 'normal'): void {
    if (typeof window === 'undefined') {
      // SSR: no-op
      return;
    }

    // critical and high: fire immediately without waiting for queue/interaction
    if (priority === 'critical' || priority === 'high') {
      // Run in parallel — do not wait for serial queue
      task().catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[AdQueue] ${priority} task failed:`, err);
        }
      });
      return;
    }

    // low priority: defer to idle time
    if (priority === 'low') {
      const runWhenIdle = () => {
        task().catch(err => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[AdQueue] Low-priority task failed:', err);
          }
        });
      };

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(runWhenIdle, { timeout: 3000 });
      } else {
        setTimeout(runWhenIdle, 1500);
      }
      return;
    }

    // normal: enqueue and process when hydrated
    this.queue.push({ task, priority });
    if (this.hydrated) {
      this.processQueue();
    }
  }

  private flushAll(): void {
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;
    if (!this.hydrated) return;

    this.isProcessing = true;

    const entry = this.queue.shift();
    if (entry) {
      try {
        await entry.task();
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[AdQueue] Normal task failed:', error);
        }
      }
    }

    this.isProcessing = false;
    // Process next item
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }
}

// Singleton — survives App Router navigations
export const adQueue = new AdQueue();
