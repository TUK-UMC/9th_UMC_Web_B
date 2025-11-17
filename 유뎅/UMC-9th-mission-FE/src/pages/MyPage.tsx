import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";

export const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="flex flex-row items-center justify-center gap-4 mb-4">
        <img
          src={data?.data.avatar as string}
          alt={"구글 로고"}
          className="flex w-30 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="flex border-1 border-black p-2 rounded-md font-bold">
            {data?.data.name}님의 페이지입니다.
          </h1>
          <h1 className="flex border-1 border-black p-2 rounded-md">
            자기소개
          </h1>
          <p>{data?.data.email}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-10 border-t border-gray-400">
        <div className="flex items-center justify-center">
          <button className="border-t-3 border-black px-4">
            내가 좋아요 한 LP
          </button>
          <button className="px-4">내가 작성한 LP</button>
        </div>
        <div className="flex border-1 border-black w-fit justify-end mx-4 mb-4 rounded-xl overflow-hidden ml-auto">
          <button className="p-2 bg-black text-white">오래된순</button>
          <button className="p-2">최신순</button>
        </div>
      </div>
    </div>
  );
};
