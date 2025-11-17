import { Navigate, useLocation, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {
  EllipsisVertical,
  Heart,
  MessageSquareText,
  Pencil,
  Trash2,
} from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutate/usePostLike";
import useDeleteLike from "../hooks/mutate/useDeleteLike";
import getRelativeTime from "../utils/relativeTime";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import usePostComment from "../hooks/mutate/usePostComments";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";

export const LpDetailPage = () => {
  const location = useLocation();
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data: me } = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteComments(Number(lpId), order);
  const comments = data?.pages.flatMap((page) => page.data.data) ?? [];
  const { mutate: postComment } = usePostComment();

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    postComment({
      lpId: Number(lpId),
      content: commentInput,
    });
    setCommentInput("");
  };

  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending && isError) {
    return <></>;
  }

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return (
    <div className="flex items-start justify-center mt-6 w-full min-h-screen mb-10">
      <div className="flex items-center flex-col bg-zinc-400 w-200 p-4 rounded-2xl">
        <div className="flex flex-col items-center justify-center w-150">
          <section className="flex items-center justify-between w-full m-4">
            <div className="flex items-center justify-center gap-2">
              <div className="flex bg-black rounded-full w-10 h-10"></div>
              <p className="flex font-bold">게시자</p>
            </div>
            <p className="flex">{getRelativeTime(lp?.data.updatedAt)}</p>
          </section>
          <section className="flex flex-row justify-between w-full m-4">
            <h1 className="flex font-bold text-xl">{lp?.data.title}</h1>
            <div className="flex flex-row gap-2">
              <Pencil className="flex" />
              <Trash2 className="flex" />
            </div>
          </section>
          <section className="relative flex items-center justify-center bg-zinc-400 shadow-xl/30 shadow-black w-110 h-110 overflow-hidden m-4">
            <img
              src={lp?.data.thumbnail}
              alt={lp?.data.title}
              className="w-100 aspect-square rounded-full object-cover border-2 border-gray-500 animate-spin"
              style={{
                animationDuration: "5s",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className=" w-20 h-20 rounded-full bg-white border-gray-400 border-2"></div>
            </div>
          </section>
          <p>{lp?.data.content}</p>
          <section className="flex flex-wrap gap-2 m-4 items-center">
            {lp?.data.tags && lp.data.tags.length > 0 ? (
              lp.data.tags.map((tag) => (
                <button
                  key={tag.id}
                  className="bg-gray-600 px-3 py-1 text-white rounded-2xl text-sm hover:bg-gray-500 transition"
                >
                  #{tag.name}
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm">태그 없음</p>
            )}
          </section>
          <section className="flex flex-row items-center justify-center gap-4">
            <button
              onClick={isLiked ? handleDislikeLp : handleLikeLp}
              className="flex"
            >
              <Heart
                color={isLiked ? "red" : "black"}
                fill={isLiked ? "red" : "transparent"}
              />
              <p className="flex ml-1">{lp?.data.likes.length}</p>
            </button>
            <button
              onClick={() => setIsCommentOpen((prev) => !prev)}
              className="flex"
            >
              <MessageSquareText color="oklch(37.3% 0.034 259.733)" />
            </button>
          </section>
        </div>
        <div>
          {/* 댓글 영역 */}
          {isCommentOpen && (
            <div className="flex flex-col w-180 mt-6 bg-white rounded-lg shadow-inner p-4 gap-2">
              <div className="flex flex-row justify-between">
                <h2 className="flex p-2 text-lg font-bold">댓글</h2>
                <div className="flex border-1 border-black w-fit justify-end mb-4 rounded-xl overflow-hidden ml-auto">
                  <button
                    onClick={() => setOrder(PAGINATION_ORDER.asc)}
                    className={`p-2 ${
                      order === PAGINATION_ORDER.asc
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    오래된순
                  </button>
                  <button
                    onClick={() => setOrder(PAGINATION_ORDER.desc)}
                    className={`p-2 ${
                      order === PAGINATION_ORDER.desc
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    최신순
                  </button>
                </div>
              </div>
              {/* 댓글 입력 */}
              <div className="flex items-start gap-3">
                <img
                  src={me?.data?.avatar || "/images/default-profile.png"}
                  alt="프로필"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex w-full">
                  <textarea
                    value={commentInput}
                    onChange={(e) => {
                      setCommentInput(e.target.value);
                      e.target.style.height = "auto"; // 이전 높이 초기화
                      e.target.style.height = e.target.scrollHeight + "px"; // 내용 높이에 맞게 조절
                    }}
                    placeholder="댓글을 입력하세요..."
                    className="w-140 border border-gray-300 rounded-md p-2 resize-none overflow-hidden transition-all"
                    rows={1}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!commentInput.trim()}
                    className={`h-10 px-4 py-1.5 ml-2 rounded-md transition text-white ${
                      !commentInput.trim()
                        ? "bg-gray-300 cursor-not-allowed"
                        : " bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    작성
                  </button>
                </div>
              </div>
              <hr className="my-2 border-gray-300" />
              {/* 댓글 목록 */}
              <div className="flex flex-col gap-3">
                {!comments || comments.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center">
                    아직 댓글이 없습니다.
                  </p>
                ) : (
                  comments.map((c) => (
                    <div key={c.id} className="flex justify-between gap-3 pb-2 border-b">
                      <div className="flex flex-cols gap-2">
                        <img
                        src={c.author.avatar || "/images/default-profile.png"}
                        alt="작성자 프로필"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">
                          {c.author.name}
                        </span>
                        <p className="text-gray-700 text-sm">{c.content}</p>
                        <span className="text-xs text-gray-400 mt-1">
                          {getRelativeTime(c.createdAt)}
                        </span>
                      </div>
                      </div>
                      <button className="flex justify-end">
                        <EllipsisVertical size={20} />
                      </button>
                    </div>
                  ))
                )}
                <div ref={ref} className="h-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
