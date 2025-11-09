import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { LpCardSkeletonList } from "../components/LpCard/LpCardSkeletonList";
import { LpCard } from "../components/LpCard/LpCard";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(50, search, order);

  // ref : 특정한 HTML 요소를 감시
  // inView: 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="mt-20">Error</div>;
  }

  return (
    <div className="container m-auto px-4 py-4">
      <div className="flex border-1 border-black w-fit justify-end mx-4 mb-4 rounded-xl overflow-hidden ml-auto">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {isPending && hasNextPage && <LpCardSkeletonList count={20} />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {!isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};
