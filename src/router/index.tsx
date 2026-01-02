import { createBrowserRouter } from "react-router-dom";
import ChatPage from "@/features/chat";

/*--------------------------------------------------
| App Routes
--------------------------------------------------*/
const routes = createBrowserRouter([
  {
    path: "/",
    element: <ChatPage />,
  },
]);

export default routes;
