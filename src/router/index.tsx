<<<<<<< HEAD
import ChatPage from '@/features/chat';
import { createBrowserRouter } from 'react-router-dom';
=======
import { createBrowserRouter } from "react-router-dom";
import ChatPage from "@/features/chat";
import ChatTest from "@/pages/ChatTest";
>>>>>>> dev_razib

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
