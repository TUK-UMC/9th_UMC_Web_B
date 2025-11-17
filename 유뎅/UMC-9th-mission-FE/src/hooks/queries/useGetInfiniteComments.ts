import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import type { ResponseCommentList } from "../../types/comment";

export default function useInfiniteComments(
  lpId: number,
  order: "asc" | "desc"
) {
  return useInfiniteQuery<ResponseCommentList>({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam }) =>
      getComments(lpId, pageParam as number | null, order),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext) return lastPage.data.nextCursor;
      return undefined;
    },
    enabled: !!lpId,
  });
}
