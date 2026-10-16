import { useState } from "react";
import { Button, Upload, message } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const MAX_SIZE = 2 * 1024 * 1024;

const VALID_TYPES = ["image/png", "image/jpeg", "image/webp"];

const ImageUpload = ({ logo, setLogo }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleUpload = (file) => {
    if (!VALID_TYPES.includes(file.type)) {
      messageApi.error("Please select PNG, JPG, or WebP.");
      return Upload.LIST_IGNORE;
    }

    if (file.size > MAX_SIZE) {
      messageApi.error("Image must be smaller than 2 MB.");
      return Upload.LIST_IGNORE;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogo(reader.result);
        messageApi.success("Logo uploaded.");
      }

      setLoading(false);
    };

    reader.onerror = () => {
      messageApi.error("Failed to read the image.");
      setLoading(false);
    };

    reader.readAsDataURL(file);

    // Keep the image local; don't upload it to a server.
    return false;
  };

  return (
    <>
      {contextHolder}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">
            Logo
          </span>

          <span className="text-xs text-gray-400">
            Optional
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Compact logo preview */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            {logo ? (
              <img
                src={logo}
                alt="Logo preview"
                className="h-full w-full object-contain p-1"
              />
            ) : (
              <PictureOutlined className="text-lg text-gray-400" />
            )}
          </div>

          {/* Upload / Replace button */}
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-gray-700">
                {logo ? "Logo selected" : "Add your logo"}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG, WebP · Max 2 MB
              </p>
            </div>

            <Upload
              accept="image/png,image/jpeg,image/webp"
              maxCount={1}
              multiple={false}
              showUploadList={false}
              beforeUpload={handleUpload}
            >
              <Button
                size="small"
                icon={<UploadOutlined />}
                loading={loading}
              >
                {logo ? "Replace" : "Upload"}
              </Button>
            </Upload>

            {logo && (
              <Button
                size="small"
                type="text"
                danger
                icon={<DeleteOutlined />}
                aria-label="Remove logo"
                title="Remove logo"
                onClick={() => setLogo(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;