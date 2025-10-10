import { useEffect, useState } from 'react';
import axios from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseCustomFetchOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  dependencies?: any[];
}

/**
 * Custom Hook for fetching data from API
 * @param url - API endpoint URL
 * @param options - Axios request options and custom dependencies
 * @returns Object containing data, loading state, and error state
 */
export const useCustomFetch = <T>(
  url: string | null,
  options?: UseCustomFetchOptions
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // URL이 없으면 요청하지 않음
    if (!url) {
      setState({
        data: null,
        loading: false,
        error: 'URL이 제공되지 않았습니다.',
      });
      return;
    }

    // AbortController로 cleanup 처리
    const abortController = new AbortController();

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await axios.get<T>(url, {
          ...options,
          signal: abortController.signal,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            ...options?.headers,
          },
        });

        if (!abortController.signal.aborted) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
        }
      } catch (error: any) {
        if (!abortController.signal.aborted) {
          console.error('API 호출 중 에러 발생:', error);
          setState({
            data: null,
            loading: false,
            error:
              error.response?.data?.status_message ||
              '데이터를 불러오는 데 실패했습니다.',
          });
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [url, ...(options?.dependencies || [])]);

  return state;
};
