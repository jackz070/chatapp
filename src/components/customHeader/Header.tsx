import React from "react";
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { ChatHeaderProps } from "react-chat-engine-advanced";

const Header = ({ chat }: { chat: ChatHeaderProps }) => {
  console.log("🚀 ~ file: index.tsx:6 ~ Header ~ chat:", chat);
  return (
    <div className="chat-header">
      <div className="flexbetween">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{chat.title}</h3>
      </div>
      <div className="flexbetween">
        <PhoneIcon className="icon-phone" />
        {/* Hackish temporary solution for default value that displays in an ugly way*/}
        {chat.description !== "⬅️ ⬅️ ⬅️" ? (
          <p className="header-text">{chat.description}</p>
        ) : (
          <p className="header-text">No chat selected</p>
        )}
      </div>
    </div>
  );
};

export default Header;
