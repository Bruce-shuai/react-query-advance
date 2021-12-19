import './App.css';
import HomePage from './components/Home.page';
import RQSuperHeros from './components/RQSuperHeros.page';
import SuperHeros from './components/SuperHeros.page';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <>
        <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="super-heroes" element={<SuperHeros />} />
          <Route path="rq-super-heroes" element={<RQSuperHeros />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
