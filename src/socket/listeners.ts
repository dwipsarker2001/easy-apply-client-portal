
import { addMessage } from "@/state";
import { socket } from "./socket";
import { Dispatch } from "redux";

export const registerChatListeners = (dispatch: Dispatch) => {
  socket.on("receive_message", (msg) => {
    dispatch(addMessage(msg));
  });
};
