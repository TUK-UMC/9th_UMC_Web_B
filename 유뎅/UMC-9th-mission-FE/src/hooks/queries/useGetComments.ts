import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import type { Comment } from "../../types/comment";

export default function useGetComments(lpId: number) {
  return useQuery<Comment[]>({
    queryKey: ["comments", lpId],
    queryFn: () => getComments(lpId),
    enabled: !!lpId,
  });
}
