'use client';

class AdScriptLoader {
  private loaded = new Set<string>();
  private promises = new Map<string, Promise<void>>();

  public load(src: string, attrs: Record<string, string> = {}): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve();

    if (this.loaded.has(src)) {
      return Promise.resolve();
    }

    if (this.promises.has(src)) {
      return this.promises.get(src)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      // Verify if a script with the same src is already in the document to prevent duplicates
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        this.loaded.add(src);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      Object.entries(attrs).forEach(([key, val]) => {
        script.setAttribute(key, val);
      });

      script.onload = () => {
        this.loaded.add(src);
        this.promises.delete(src);
        resolve();
      };

      script.onerror = (err) => {
        this.promises.delete(src);
        reject(err);
      };

      document.head.appendChild(script);
    });

    this.promises.set(src, promise);
    return promise;
  }
}

export const adScriptLoader = new AdScriptLoader();
