import React, { useState } from "react";
import MessageFormUi from "./MessageFormUi";
import { CustomChatFormProps } from "./CustomChatFormProps";
import { MessageObject } from "react-chat-engine-advanced";

const StandardMessageForm = ({ props, activeChat, isChatFeedLoading }: CustomChatFormProps) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.target.value);


  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const att = attachment ? [{ blob: attachment, file: attachment.name }] : [];

    const form = {
      attachments: att,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
      custom_json: "",
    };

    props.onSubmit && props.onSubmit(form as unknown as MessageObject);
    setMessage("");
    setAttachment(null);
  };

  return (
    <MessageFormUi
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default StandardMessageForm;
