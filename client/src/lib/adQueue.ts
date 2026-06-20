type AdTask = () => Promise<void>;

class AdQueue {
  private queue: AdTask[] = [];
  private isProcessing: boolean = false;

  public enqueue(task: AdTask) {
    this.queue.push(task);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    
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
