import { createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);
export default router;
