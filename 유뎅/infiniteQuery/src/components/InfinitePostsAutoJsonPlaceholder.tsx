import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// 1. 데이터 인터페이스 정의
interface Post {
  id: number;
  title: string;
  body: string;
}

// 2. 한 번에 가져올 게시글 개수
const PAGE_SIZE = 10;

// 3. 데이터 가져오는 함수
async function fetchPosts({ pageParam = 1 }: { pageParam?: number }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
  );

  if (!res.ok) {
    throw new Error("네트워크 에러");
  }
  return (await res.json()) as Post[];
}

// 4. 메인 컴포넌트
export default function InfinitePostsAutoJsonPlaceholder() {
  // 5. useInfinteQuery 훅 사용
  const {
    data, // 지금까지 불러온 모든 데이터
    fetchNextPage, // 다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지
    isFetchingNextPage, // 다음 페이지 로딩 중인지
  } = useInfiniteQuery({
    // queryKey : 쿼리를 식별하는 고유 키, 배열 형태로 쓰고 값이 바뀌면 새로운 쿼리로 취급
    queryKey: ["posts", PAGE_SIZE],
    // queryFn: 실제 데이터를 가져오는 함수
    queryFn: ({ pageParam }) => fetchPosts({ pageParam }),
    // initialPageParam: 첫 페이지 번호
    initialPageParam: 1,
    // getNextPageParam: 다음 페이지 번호를 계산하는 함수
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
  });

  // 6. 센티널 요소를 참조하기 위한 ref
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 7. Intersection Observer 설정
  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const observer = new IntersectionObserver((entries) => {
      // entries[0] : 관찰 중인 요소의 상태
      const first = entries[0];
      // isIntersecting : 요소가 화면에 보이는가?
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    // 센티널 요소 관찰 시작
    observer.observe(el);
    // 컴포넌트가 언마운트되면 관찰 중지
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 8. 데이터 렌더링
  return (
    <div>
      {/* 데이터 표시 */}
      {data?.pages.map((page, idx) => (
        <ul key={idx} style={{ marginBottom: 16 }}>
          {page.map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      ))}
      {/* 9. 센티널 요소(스크린 감지용) */}
      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* 10. 상태 메시지 */}
      <div style={{ padding: 8, textAlign: "center", color: "#666" }}>
        {isFetchingNextPage
          ? "불러오는 중이에요..."
          : hasNextPage
          ? "아래로 스크롤하면 더 가져와요."
          : "더 이상 데이터가 없어요."}
      </div>
    </div>
  );
}
