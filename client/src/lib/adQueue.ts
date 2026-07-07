/**
 * AdQueue — Priority-based ad loading scheduler.
 *
 * Priority levels:
 *   critical — Tool scan result banners: fires immediately, bypasses queue
 *   high     — First inline blog banner, homepage hero: fires immediately
 *   normal   — Sidebar/inline banners: queued, max 2 concurrent
 *   low      — Footer banners: deferred via requestIdleCallback
 *
 * Key design decisions:
 *   - critical/high run immediately in parallel (no serial blocking)
 *   - normal: up to MAX_CONCURRENT (2) tasks run simultaneously
 *   - low: deferred to idle time via requestIdleCallback
 *   - Fallback timer: 800ms (was 4000ms)
 */

export type AdPriority = 'critical' | 'high' | 'normal' | 'low';

type AdTask = () => Promise<void>;

interface QueueEntry {
  task: AdTask;
  priority: AdPriority;
}

/** Maximum number of 'normal' priority ad slots that may initialize simultaneously. */
const MAX_CONCURRENT = 2;

class AdQueue {
  private queue: QueueEntry[] = [];
  private activeCount: number = 0;
  private hydrated: boolean = false;
  private cleanupListeners: (() => void) | null = null;

  constructor() {
    if (typeof window === 'undefined') return;

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

    // Fast path — fire on first user interaction
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

    // Fallback: 800ms — critical/high don't wait (see enqueue)
    setTimeout(() => onHydrated(), 800);
  }

  public enqueue(task: AdTask, priority: AdPriority = 'normal'): void {
    if (typeof window === 'undefined') return;

    // critical and high: fire immediately, bypass queue entirely
    if (priority === 'critical' || priority === 'high') {
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

    // normal: enqueue and attempt to dispatch
    this.queue.push({ task, priority });
    if (this.hydrated) {
      this.processQueue();
    }
  }

  private flushAll(): void {
    this.processQueue();
  }

  /**
   * Dispatches up to MAX_CONCURRENT tasks simultaneously.
   * Called after each task completes to refill the active slots.
   */
  private processQueue(): void {
    if (!this.hydrated) return;

    while (this.activeCount < MAX_CONCURRENT && this.queue.length > 0) {
      const entry = this.queue.shift();
      if (!entry) break;

      this.activeCount++;

      entry.task()
        .catch(err => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[AdQueue] Normal task failed:', err);
          }
        })
        .finally(() => {
          this.activeCount--;
          // Slot freed — try to dispatch the next queued task
          this.processQueue();
        });
    }

    if (process.env.NODE_ENV === 'development' && this.queue.length > 0) {
      console.log(`[AdQueue] Queue: ${this.queue.length} waiting, ${this.activeCount}/${MAX_CONCURRENT} active`);
    }
  }
}

// Singleton — survives App Router navigations
export const adQueue = new AdQueue();
