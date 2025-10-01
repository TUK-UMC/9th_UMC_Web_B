import { useEffect, useState } from "react";

const App = () => {
  const [path, setPath] = useState<string>("Chloe Page"); // 현재 경로 상태

  // 브라우저 앞으로/뒤로 가기(popstate) 이벤트 처리
  useEffect(() => {
  const currentPath = window.location.pathname.slice(1) || "Chloe Page";
  setPath(currentPath);
}, []);

  // 버튼 클릭 시 실행되는 함수
  const navigate = (newPath: string) => {
    const state = { path: newPath };
    history.pushState(state, "", newPath);
    setPath(newPath);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("chloe page")}>CHLOE</button>
        <button onClick={() => navigate("jerry page")}>JERRY</button>
        <button onClick={() => navigate("joy page")}>JOY</button>
        <button onClick={() => navigate("404")}>NOT FOUND</button>
      </div>
      <h1>{path.toUpperCase()}</h1>
    </div>
  );
};

export default App;
