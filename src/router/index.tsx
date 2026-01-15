import ChatPage from '@/features/chat';
import { createBrowserRouter } from 'react-router-dom';

/*--------------------------------------------------
| App Routes
--------------------------------------------------*/

const routes = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />,
  },
]);

export default routes;
