import React, { useState } from "react";
import { Row, Col, Select, Space, DatePicker, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
export default function UploadModal() {
  const { TextArea } = Input;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const beforeUpload = () => {
    return false;
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <div className="image-model">
      <Row gutter={16}>
        <Col span={12}>
          <Form layout="vertical">
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="Họ và tên"
                style={{
                  display: "inline-block",
                  width: "calc(33.3% - 12px)",
                }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Giới tính"
                style={{
                  display: "inline-block",
                  width: "calc(33.3% - 12px)",
                  padding: "0 0.8rem 0 0.8rem",
                }}
              >
                <Select
                  options={[
                    {
                      value: "Nam",
                      label: "Nam",
                    },
                    {
                      value: "Nữ",
                      label: "Nữ",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                style={{ display: "inline-block", width: "calc(33.3% - 12px)" }}
              >
                <Input></Input>
              </Form.Item>
            </Form.Item>
            <Form.Item label="Địa chỉ" style={{ width: "calc(95% - 12px)" }}>
              <Input></Input>
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Form.Item
                label="Ngày sinh"
                style={{
                  display: "inline-block",
                  width: "calc(37% - 12px)",
                }}
              >
                <DatePicker placeholder="dd/mm/yyyy"></DatePicker>
              </Form.Item>

              <Form.Item
                label="Chiều cao (cm)"
                style={{
                  display: "inline-block",
                  width: "calc(33.3% - 12px)",
                  padding: "0 0.8rem 0 0.8rem",
                }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item
                label="Cân nặng (kg)"
                style={{ display: "inline-block", width: "calc(30% - 12px)" }}
              >
                <Input></Input>
              </Form.Item>
            </Form.Item>
            <Form.Item
              label="Tiền sử khám bệnh"
              style={{ display: "inline-block", width: "calc(95% - 12px)" }}
            >
              <TextArea style={{ height: "125px" }}></TextArea>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <div
            style={{
              width: "100%",
              height: "100%",

              backgroundImage: `url(${require("../../assets/images/image_background.png")})`,
            }}
          >
            <Upload
              action={console.log(123)}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {fileList.length >= 9 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: "none",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
