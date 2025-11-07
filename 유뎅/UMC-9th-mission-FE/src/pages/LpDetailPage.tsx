import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutate/usePostLike";
import useDeleteLike from "../hooks/mutate/useDeleteLike";
import getRelativeTime from "../utils/relativeTime";

export const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

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

  if (isPending && isError) {
    return <></>;
  }
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center flex-col bg-zinc-400 w-250 h-250 p-6 rounded-2xl">
        <div className="flex flex-col items-center justify-center w-180 p-6">
          <div className="flex items-center justify-between w-full">
            <div>
              <div className="flex bg-black rounded-full w-10 h-10"></div>
              <p className="flex text-bold">게시자</p>
            </div>
            <p className="flex">{getRelativeTime(lp?.data.updatedAt)}</p>
          </div>
          <h1>{lp?.data.title}</h1>
          <div className="relative flex items-center justify-center bg-zinc-400 shadow-2xl w-130 h-130 overflow-hidden m-10">
            <img
              src={lp?.data.thumbnail}
              alt={lp?.data.title}
              className="w-110 aspect-square rounded-full object-cover border-2 border-gray-500"
              style={{
                animation: "spin 5s linear infinite",
                animationDirection: "reverse",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className=" w-20 h-20 rounded-full bg-white border-gray-400 border-2"></div>
            </div>
          </div>
          <p>{lp?.data.content}</p>
          <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <Heart
              color={isLiked ? "red" : "black"}
              fill={isLiked ? "red" : "transparent"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
