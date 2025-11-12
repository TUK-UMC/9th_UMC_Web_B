import axios from "axios";
import type { Comment, CreateCommentDTO } from "../types/comment";

const API_BASE = import.meta.env.VITE_SERVER_API_URL;

// 댓글 목록 조회
export const getComments = async (lpId: number): Promise<Comment[]> => {
  const { data } = await axios.get(`${API_BASE}/v1/comments?lpId=${lpId}`);

  return data.data;
};

// 댓글 작성
export const postComment = async (dto: CreateCommentDTO): Promise<Comment> => {
  const { data } = await axios.post(`${API_BASE}/v1/comments`, dto);

  return data.data;
};
