import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Select,
  Space,
  DatePicker,
  Form,
  Input,
  Button,
  Dropdown,
  Image,
  Avatar,
  List,
  Skeleton,
  Divider,
} from "antd";
import {
  EllipsisOutlined,
  LeftOutlined,
  FileImageOutlined,
  EditOutlined,
  FolderOpenOutlined,
  DownloadOutlined,
  UserSwitchOutlined,
  FolderAddOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  StarOutlined,
  StarFilled,
} from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import imageList from "../../pages/HomePage/test.json";
import dayjs from "dayjs";
export default function ImageModal({ image, onCancel }) {
  const { TextArea } = Input;
  const [isEdit, setIsEdit] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setData([...data, ...imageList]);
    console.log(data);
    setLoading(false);
  };
  useEffect(() => {
    loadMoreData();
    setImages(imageList.map((img) => img.image_url));
  }, []);
  //dropdown
  const items = [
    {
      label: (
        <span>
          <FileImageOutlined style={{ color: "red" }} /> &nbsp; Xóa ảnh
        </span>
      ),
      key: "0",
    },
    {
      label: (
        <span>
          {" "}
          <EditOutlined style={{ color: "red" }} />
          &nbsp; Xóa mô tả
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span>
          <FolderOpenOutlined style={{ color: "red" }} /> &nbsp; Loại bỏ ảnh
          khỏi hồ sơ
        </span>
      ),
      key: "2",
    },
    {
      label: (
        <span>
          <DownloadOutlined />
          &nbsp; Tải xuống
        </span>
      ),
      key: "3",
    },
  ];
  //list

  return (
    <div className="image-model">
      <Row style={{ justifyContent: "space-between" }} gutter={16}>
        <Col span={12}>
          <Image.PreviewGroup items={images}>
            <Image
              style={{ width: "100%", height: "100%" }}
              src={image.image_url}
            />
          </Image.PreviewGroup>
        </Col>
        <Col span={12}>
          <Row>
            <Col
              span={12}
              onClick={() => {
                onCancel();
              }}
            >
              <Button type="primary" style={{ backgroundColor: "#9095A0" }}>
                <LeftOutlined /> Trở về
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: "right", cursor: "pointer" }}>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined />
                </a>
              </Dropdown>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <div>
              <Button>
                <UserSwitchOutlined /> Chỉnh sửa
              </Button>
            </div>

            <div>
              <Button>
                <FolderAddOutlined />
                Thêm vào hồ sơ
              </Button>
            </div>
          </div>
          {isEdit ? (
            <Form layout="vertical">
              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  label="Name"
                  style={{
                    display: "inline-block",
                    width: "calc(33.3% - 12px)",
                  }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Sex"
                  style={{
                    display: "inline-block",
                    width: "calc(33.3% - 12px)",
                    padding: "0 0.8rem 0 0.8rem",
                  }}
                >
                  <Select
                    options={[
                      {
                        value: "Male",
                        label: "Male",
                      },
                      {
                        value: "Female",
                        label: "Female",
                      },
                    ]}
                  ></Select>
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  style={{
                    display: "inline-block",
                    width: "calc(33.3% - 12px)",
                  }}
                >
                  <Input></Input>
                </Form.Item>
              </Form.Item>
              <Form.Item label="Address" style={{ width: "calc(95% - 12px)" }}>
                <Input></Input>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                  label="Date of birth"
                  style={{
                    display: "inline-block",
                    width: "calc(37% - 12px)",
                  }}
                >
                  <DatePicker placeholder="dd/mm/yyyy"></DatePicker>
                </Form.Item>

                <Form.Item
                  label="Height (cm)"
                  style={{
                    display: "inline-block",
                    width: "calc(33.3% - 12px)",
                    padding: "0 0.8rem 0 0.8rem",
                  }}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  label="Weight (kg)"
                  style={{ display: "inline-block", width: "calc(30% - 12px)" }}
                >
                  <Input></Input>
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="Medical records"
                style={{ display: "inline-block", width: "calc(95% - 12px)" }}
              >
                <TextArea style={{ height: "125px" }}></TextArea>
              </Form.Item>
            </Form>
          ) : (
            <div>
              <h1>{image.patient_name}</h1>
              <Row>
                <Col flex={1}>
                  <ClockCircleOutlined />
                  &nbsp;
                  {dayjs(image.created_date).format("DD/MM/YYYY, HH[h]mm[']")}
                </Col>
                <Col flex={1}>
                  <EnvironmentOutlined />
                  &nbsp;
                  {image.patient_address}
                </Col>
                <Col flex={1}>
                  <UserOutlined />
                  &nbsp;
                  {image.patient_sex} - {image.patient_age} tuổi
                </Col>
              </Row>
              <h2 style={{ marginBottom: 0 }}>Tiền sử bệnh nhân</h2>
              <p style={{ margin: 0 }}>{image.medica_history}</p>
              <h2 style={{ marginBottom: 0 }}>Ảnh X-quang của bệnh nhân</h2>
              <div
                id="scrollableDiv"
                style={{
                  height: 200,
                  overflow: "auto",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
              >
                <InfiniteScroll
                  dataLength={data.length}
                  endMessage={
                    <Divider plain>It is all, nothing more 🤐</Divider>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    header={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "bold",
                        }}
                      >
                        <span></span>
                        <span>Ngày giờ</span>
                        <span>Ghi chú</span>
                        <span>Lưu ý</span>
                      </div>
                    }
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          avatar={
                            <Avatar shape="square" src={item.image_url} />
                          }
                          description={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <span>
                                {dayjs(item.create_date).format(
                                  "HH[h]mm, DD/MM/YYYY"
                                )}
                              </span>
                              <span style={{ marginRight: "7rem" }}>
                                {item.note}
                              </span>
                            </div>
                          }
                        />
                        <div>
                          {item.mark ? (
                            <StarFilled style={{ color: "yellow" }} />
                          ) : (
                            <StarOutlined />
                          )}
                        </div>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
