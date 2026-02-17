import ChatPage from '@/features/chat';
import NotFound from '@/features/not-found/NotFound';
import Test from '@/features/test/Test';
import { createBrowserRouter } from 'react-router-dom';

/*--------------------------------------------------
| App Routes
--------------------------------------------------*/
const routes = createBrowserRouter([
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '/:username',
    element: <ChatPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
