import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "../customHeader/Header";
import StandardMessageForm from "../customMessageForms/StandardMessageForm";
import Ai from "../customMessageForms/Ai";
import { useEffect } from "react";

interface ChatProps {
  user: string;
  secret: string;
}

export interface MessageHistoryMessage {
  role: "user" | "system" | "assistant";
  content: string | null;
}

const Chat = ({ user, secret }: ChatProps) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  const messageHistory: MessageHistoryMessage[] = [];

  useEffect(() => {
    if (chatProps && chatProps.chat?.title.startsWith("AiChat_")) {
      chatProps?.messages?.forEach((message) => {
        const formattedMessage: MessageHistoryMessage = {
          role: message.sender_username.includes("AI_bot")
            ? "assistant"
            : "user",
          content: message.text,
        };
        messageHistory.unshift(formattedMessage);
      });
    }
  }, [chatProps]);

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return (
              <Ai
                props={props}
                activeChat={chatProps.chat}
                messageHistory={messageHistory}
              />
            );
          }
          if (chatProps.chat) {
            return (
              <StandardMessageForm props={props} activeChat={chatProps.chat} />
            );
          }
          return <></>;
        }}
      />
    </div>
  );
};

export default Chat;
