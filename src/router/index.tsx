import ChatPage from '@/features/chat';
import NotFound from '@/features/not-found/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import ChatPage from '@/features/chat';

/*--------------------------------------------------
| App Routes
--------------------------------------------------*/

const routes = createBrowserRouter([
  {
    path: '/',
    element: <NotFound />,
  },
  {
    path: '/:username/:id',
    element: <ChatPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
