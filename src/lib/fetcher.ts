export interface FetchJsonOptions {
  revalidate?: number;
  init?: RequestInit;
}

/**
 * Fetch JSON from a URL with consistent error handling and optional ISR revalidation
 */
export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {},
): Promise<T | null> {
  const { revalidate = 3600, init } = options;

  try {
    const response = await fetch(url, {
      ...init,
      next: revalidate ? { revalidate } : undefined,
    });

    if (!response.ok) {
      console.error(
        `fetchJson: ${response.status} ${response.statusText} for ${url}`,
      );
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`fetchJson: non-JSON response for ${url}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("fetchJson error:", error);
    return null;
  }
}
