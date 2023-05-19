import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import { MessageHistoryMessage } from "../chat/Chat";

export interface CustomChatFormProps {
  props: MessageFormProps;
  activeChat: ChatObject;
}

export interface CustomChatFormPropsWithMessageHistory
  extends CustomChatFormProps {
  messageHistory: MessageHistoryMessage[];
}
