import './App.css';
import HomePage from './components/Home.page';
import RQSuperHeroes from './components/RQSuperHeroes.page';
import SuperHeros from './components/SuperHeros.page';
import RQSuperHero from './components/RQSuperHero.page';
import ParallelQueries from './components/ParallelQueries.page';
import DynamicParallel from './components/DynamicParallel.page';
import DependQueries from './components/DependQueries.page';
import PaginatedQueries from './components/PaginatedQueries.page';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const queryClient = new QueryClient();   // 在组件外创建实例

function App() {
  // 创建一个queryclient的实例

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="rq-super-heroes" element={<RQSuperHeroes />} />
            <Route path="rq-super-heroes/:heroId" element={<RQSuperHero />} />
            <Route path="rq-parallel" element={<ParallelQueries />} />
            <Route path="rq-dynamic-parallel" element={<DynamicParallel heroIds={[1, 3]} />} />
            <Route path="rq-dependent" element={<DependQueries email='284970670@qq.com'/>} />
            <Route path="rq-paginated" element={<PaginatedQueries />} />
          </Routes>
        </>
      </Router>
      {/* initialIsOpen=false是为了不让devtools默认打开, bottom-right 是为了让图标放置在底部右侧 */}
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;
