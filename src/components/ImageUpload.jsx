import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";

const { Dragger } = Upload;

const ImageUpload = ({ setLogo }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const props = {
    accept: "image/png,image/jpeg,image/webp",
    maxCount: 1,
    multiple: false,
    showUploadList: false,

    beforeUpload: (file) => {
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
      ];

      if (!validTypes.includes(file.type)) {
        messageApi.error("Please select a PNG, JPG, or WebP image.");
        return Upload.LIST_IGNORE;
      }

      if (file.size > 2 * 1024 * 1024) {
        messageApi.error("Image must be smaller than 2 MB.");
        return Upload.LIST_IGNORE;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setLogo(reader.result);
        messageApi.success("Logo selected successfully.");
      };

      reader.onerror = () => {
        messageApi.error("Failed to read the image.");
      };

      reader.readAsDataURL(file);

      // Prevent uploading to a server.
      return false;
    },
  };

  return (
    <>
      {contextHolder}

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>

        <p className="ant-upload-text">
          Click or drag an image here
        </p>

        <p className="ant-upload-hint">
          PNG, JPG, or WebP. Maximum size: 2 MB.
        </p>
      </Dragger>
    </>
  );
};

export default ImageUpload;