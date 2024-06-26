import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Select,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import dayjs from "dayjs";
import { autoFill, uploadImage } from "../../apis/image";
export default function UploadModal() {
  const { TextArea } = Input;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    sex: "",
    phone: "",
    address: "",
    birthday: "",
    height: "",
    weight: "",
    medicalHistory: "",
  });

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {};
  const handleCancel = () => {
    setIsModalOpen(false);
    setFormState({
      name: "",
      sex: "",
      phone: "",
      address: "",
      birthday: "",
      height: "",
      weight: "",
      medicalHistory: "",
    });
    setFileList([]);
  };

  //Upload from device
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
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("Chỉ có thể tải lên ảnh!");
      return true;
    }
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("Ảnh phải nhỏ hơn 10MB!");
        return true;
      }
      return false;
    }
    return false;
  };

  const getToday = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };
  //autofill
  const autoFillForm = async () => {
    await autoFill(formState.phone)
      .then((res) => {
        setFormState(res.data);
        console.log(res.data);
        console.log(formState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //upload
  const onFinish = async () => {
    setLoading(true);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    formData.append("mark", false);
    formData.append("name", formState.name);
    formData.append("sex", formState.sex);
    formData.append("phone", formState.phone);
    formData.append("address", formState.address);
    formData.append("birthday", formState.birthday);
    formData.append("weight", formState.weight);
    formData.append("height", formState.height);
    formData.append("medicalHistory", formState.medicalHistory);

    await uploadImage(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
      <Button onClick={showModal} style={{ marginRight: "1rem" }}>
        <UploadOutlined />
        Tải lên
      </Button>

      <Modal
        title={<h2>Tải lên ảnh X-quang</h2>}
        open={isModalOpen}
        onCancel={handleCancel}
        width={1000}
        cancelText="Hủy"
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              type="primary"
              loading={loading}
              disabled={!formState.phone || fileList.length <= 0}
              onClick={() => {
                onFinish();
              }}
            >
              Tải lên
            </Button>
          </>
        )}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  label="Họ và tên"
                  style={{
                    display: "inline-block",
                    width: "calc(33.3% - 12px)",
                  }}
                >
                  <Input
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        name: e.target.value,
                      })
                    }
                  />
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
                    value={formState.sex}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        sex: e,
                      })
                    }
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
                  required
                  style={{
                    display: "inline-block",
                    width: "calc(33.3% - 12px)",
                  }}
                >
                  <Input
                    required
                    value={formState.phone}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        phone: e.target.value,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        autoFillForm();
                      }
                    }}
                  ></Input>
                </Form.Item>
              </Form.Item>
              <Form.Item label="Địa chỉ" style={{ width: "calc(95% - 12px)" }}>
                <Input
                  value={formState.address}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      address: e.target.value,
                    })
                  }
                ></Input>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  label="Ngày sinh"
                  style={{
                    display: "inline-block",
                    width: "calc(37% - 12px)",
                  }}
                >
                  <DatePicker
                    value={
                      formState.birthday
                        ? dayjs(formState.birthday, "DD/MM/YYYY")
                        : dayjs(getToday(), "DD/MM/YYYY")
                    }
                    format="DD/MM/YYYY"
                    onChange={(e, v) => {
                      console.log(v);
                      setFormState({
                        ...formState,
                        birthday: v,
                      });
                    }}
                    placeholder="dd/mm/yyyy"
                  ></DatePicker>
                </Form.Item>

                <Form.Item
                  label="Chiều cao (cm)"
                  style={{
                    display: "inline-block",
                    width: "calc(33.3% - 12px)",
                    padding: "0 0.8rem 0 0.8rem",
                  }}
                >
                  <Input
                    value={formState.height}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        height: e.target.value,
                      })
                    }
                  ></Input>
                </Form.Item>
                <Form.Item
                  label="Cân nặng (kg)"
                  style={{ display: "inline-block", width: "calc(30% - 12px)" }}
                >
                  <Input
                    value={formState.weight}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        weight: e.target.value,
                      })
                    }
                  ></Input>
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="Tiền sử khám bệnh"
                style={{ display: "inline-block", width: "calc(95% - 12px)" }}
              >
                <TextArea
                  value={formState.medicalHistory}
                  style={{ height: "125px" }}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      medicalHistory: e.target.value,
                    })
                  }
                ></TextArea>
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
                multiple={true}
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
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
