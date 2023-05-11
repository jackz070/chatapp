import React, { useState } from "react";
import MessageFormUi from "./MessageFormUi";
import { CustomChatFormProps } from "./CustomChatFormProps";

const StandardMessageForm = ({ props, activeChat }: CustomChatFormProps) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");

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
    };

    props.onSubmit && props.onSubmit(form);
    setMessage("");
    setAttachment("");
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
