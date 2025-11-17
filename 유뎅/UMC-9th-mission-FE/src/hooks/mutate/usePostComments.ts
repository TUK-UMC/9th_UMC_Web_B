import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import type { CreateCommentDTO } from "../../types/comment";

export default function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCommentDTO) => postComment(dto),
    onSuccess: (data) => {
      // 댓글 성공 시 해당 LP의 댓글 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["comments", data.lpId] });
    },
  });
}
