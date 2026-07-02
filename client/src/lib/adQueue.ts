type AdTask = () => Promise<void>;

class AdQueue {
  private queue: AdTask[] = [];
  private isProcessing: boolean = false;
  private interactionOccurred: boolean = false;
  private cleanupListeners: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const handleInteraction = () => {
        if (this.interactionOccurred) return;
        this.interactionOccurred = true;
        
        if (this.cleanupListeners) {
          this.cleanupListeners();
        }
        
        console.log('[AdQueue] User interaction detected. Flushing ad queue.');
        this.processQueue();
      };

      const cleanup = () => {
        window.removeEventListener('mousemove', handleInteraction);
        window.removeEventListener('scroll', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
        window.removeEventListener('keydown', handleInteraction);
      };

      this.cleanupListeners = cleanup;

      window.addEventListener('mousemove', handleInteraction, { passive: true });
      window.addEventListener('scroll', handleInteraction, { passive: true });
      window.addEventListener('touchstart', handleInteraction, { passive: true });
      window.addEventListener('keydown', handleInteraction, { passive: true });

      // Fallback timeout of 4 seconds to ensure ads still load on idle if no interaction occurs
      setTimeout(() => {
        handleInteraction();
      }, 4000);
    }
  }

  public enqueue(task: AdTask) {
    this.queue.push(task);
    
    // If interaction already occurred or running SSR, process immediately
    if (this.interactionOccurred || typeof window === 'undefined') {
      this.processQueue();
    }
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    if (!this.interactionOccurred && typeof window !== 'undefined') return;
    
    this.isProcessing = true;
    const task = this.queue.shift();
    
    if (task) {
      try {
        await task();
      } catch (error) {
        console.error('[Adsterra Queue] Task failed:', error);
      }
    }
    
    this.isProcessing = false;
    this.processQueue();
  }
}

// Export a singleton instance
export const adQueue = new AdQueue();
