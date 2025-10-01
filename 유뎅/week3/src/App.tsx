import "./App.css"
import HomePage from "./pages/HomePage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFound";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {path: "/", element: <HomePage />, errorElement: <NotFoundPage />, 
    children: [
      {path: "movies/:category", element: <MoviePage />},
      {path: "movies/detail/:movieId", element: <MovieDetailPage />}
  ]}
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;