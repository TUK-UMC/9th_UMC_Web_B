import type {
  ResponseCommentList,
  Comment,
  CreateCommentDTO,
} from "../types/comment";
import { axiosInstance } from "./axios";

// 댓글 목록 조회
export const getComments = async (
  lpId: number,
  cursor: number | null,
  order: "asc" | "desc" = "asc"
): Promise<ResponseCommentList> => {
  const { data } = await axiosInstance.get<ResponseCommentList>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor, order },
    }
  );

  return data;
};

// 댓글 작성
export const postComment = async (dto: CreateCommentDTO): Promise<Comment> => {
  const { data } = await axiosInstance.post(
    `/v1/lps/${dto.lpId}/comments`,
    dto
  );

  return data.data;
};
