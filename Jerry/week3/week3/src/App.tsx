import './App.css';
import { Link } from './router/Link';
import { Route } from './router/Route';
import { Routes } from './router/Routes';

const JerryPage = () => <h1>제리 페이지</h1>;
const ChloePage = () => <h1>클로이 페이지</h1>;
const HaneulPage = () => <h1>하늘 페이지</h1>;
const NotFoundPage = () => <h1>404</h1>;

const Header = () => {
  return (
    <nav style={{ display: 'flex', gap: '10px' }}>
      <Link to="/jerry">JERRY</Link>
      <Link to="/chloe">CHLOE</Link>
      <Link to="/haneul">HANEUL</Link>
      <Link to="/not-found">NOT FOUND</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/jerry" component={JerryPage} />
        <Route path="/chloe" component={ChloePage} />
        <Route path="/haneul" component={HaneulPage} />
        <Route path="/not-found" component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
