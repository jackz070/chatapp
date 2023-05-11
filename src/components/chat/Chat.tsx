import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
  ChatHeaderProps,
} from "react-chat-engine-advanced";
import Header from "../customHeader/Header";
import StandardMessageForm from "../customMessageForms/StandardMessageForm";
import Ai from "../customMessageForms/Ai";
import AiCode from "../customMessageForms/AiCode";

interface ChatProps {
  user: string;
  secret: string;
}

const Chat = ({ user, secret }: ChatProps) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiCode_")) {
            return <AiCode props={props} activeChat={chatProps.chat} />;
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
