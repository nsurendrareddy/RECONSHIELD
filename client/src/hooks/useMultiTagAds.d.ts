export interface MultiTagAdsOptions {
  /**
   * Callback function triggered when the script loads successfully.
   */
  onLoad?: () => void;

  /**
   * Callback function triggered when the script fails to load.
   */
  onError?: (error: ErrorEvent | string) => void;
}

/**
 * Custom React hook to dynamically integrate the MultiTag ad script on specific routes
 * with deferred execution based on user engagement.
 * 
 * @param options Optional configuration callbacks for load success and error handling.
 */
export default function useMultiTagAds(options?: MultiTagAdsOptions): void;
