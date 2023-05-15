import { useEffect, useState } from "react";
import MessageFormUi from "./MessageFormUi";
import { usePostAiTextMutation } from "../../state/api";
import { CustomChatFormProps } from "./CustomChatFormProps";
import { MessageObject } from "react-chat-engine-advanced";

const Ai = ({ props, activeChat, messageHistory }: CustomChatFormProps) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [trigger] = usePostAiTextMutation();

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
      messageHistory: messageHistory,
    };

    props.onSubmit && props.onSubmit(form as unknown as MessageObject);
    trigger(form);
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

export default Ai;
