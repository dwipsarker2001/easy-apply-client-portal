import { createBrowserRouter } from 'react-router-dom';
import ChatPage from '@/features/chat';

/*--------------------------------------------------
| App Routes
--------------------------------------------------*/

const routes = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />,
    // element:<ChatTest />
  },
]);

export default routes;
