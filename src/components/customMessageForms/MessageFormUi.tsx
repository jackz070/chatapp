import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

interface Props {
  setAttachment: React.Dispatch<React.SetStateAction<File | null>>;
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

const MessageFormUi = ({
  setAttachment,
  message,
  handleChange,
  handleSubmit,
}: Props) => {
  const [preview, setPreview] = useState("");
  const handleSubmitWithChecks = () => {
    if (message) {
      setPreview("");
      handleSubmit();
    }
  };

  return (
    <div className="message-form-container">
      {preview ? (
        <div className="message-form-preview">
          <img
            alt="preview of image attachment"
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment(null);
            }}
          />
        </div>
      ) : null}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Send a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitWithChecks();
              }
            }}
          />
        </div>
        <div className="message-form-icons">
          <Dropzone
            accept={{ "image/png": [".png"], "image/jpeg": [".jpeg"] }}
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              handleSubmitWithChecks();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUi;
