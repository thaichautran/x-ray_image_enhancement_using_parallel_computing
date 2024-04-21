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
  const [defaultDate, setDefaultDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  //user info
  const [patientName, setPatientName] = useState(image.patient_name);
  const [createDate, setCreateDate] = useState(image.create_date);
  const [patientAddress, setPatientAddress] = useState(image.patient_address);
  const [patientSex, setPatientSex] = useState(image.patient_sex);
  const [patientAge, setPatientAge] = useState(image.patient_age);
  const [medicaHistory, setMedicaHistory] = useState(image.medica_history);
  const [note, setNote] = useState(image.note);
  const [mark, setMark] = useState(image.mark);
  const [imageUrl, setImageUrl] = useState(image.image_url);
  const loadMoreData = () => {
    if (loading) {
      return;
    }

    setData([...data, ...imageList]);
    console.log(data);
    setLoading(false);
  };
  const setNewImage = (image) => {
    setImageUrl(image.image_url);
    setPatientName(image.patient_name);
    setCreateDate(image.create_date);
    setPatientAge(image.patient_age);
    setPatientAddress(image.patient_address);
    setPatientSex(image.patient_sex);
    setMedicaHistory(image.medica_history);
    setNote(image.note);
    setMark(image.mark);
  };
  useEffect(() => {
    setDefaultDate(dayjs(image.create_date).format("DD/MM/YYYY"));
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
            <Image width={"100%"} src={imageUrl} />
          </Image.PreviewGroup>
          <h2>Ghi chú</h2>
          {isEdit ? (
            <TextArea style={{ width: "100%" }} defaultValue={note}></TextArea>
          ) : (
            <p>{note}</p>
          )}
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
            <div
              onClick={() => {
                setIsEdit(true);
              }}
            >
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
            <Form layout="vertical" variant="borderless">
              <Form.Item
                style={{
                  borderBottom: "1px solid #000",
                  width: "calc(94% - 12px)",
                }}
              >
                <Input defaultValue={patientName}></Input>
              </Form.Item>

              <Form.Item
                style={{
                  marginBottom: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ClockCircleOutlined />
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(30% - 12px)",

                    borderBottom: "1px solid #000",
                  }}
                >
                  <DatePicker
                    placeholder="dd/mm/yyyy"
                    defaultValue={dayjs(defaultDate, "DD/MM/YYYY")}
                    format={"DD/MM/YYYY"}
                  />
                </Form.Item>
                <EnvironmentOutlined />
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(30% - 12px)",

                    borderBottom: "1px solid #000",
                  }}
                >
                  <Input defaultValue={patientAddress}></Input>
                </Form.Item>
                <UserOutlined />
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(18% - 12px)",

                    borderBottom: "1px solid #000",
                  }}
                >
                  <Select
                    defaultValue={patientSex}
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
                <span
                  style={{
                    textAlign: "center",
                    marginLeft: "0.75rem",
                  }}
                >
                  {" "}
                  -{" "}
                </span>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "calc(10% - 12px)",
                    borderBottom: "1px solid #000",
                  }}
                >
                  <Input defaultValue={patientAge}></Input>
                </Form.Item>
                <span style={{ textAlign: "center", marginLeft: "0.75rem" }}>
                  tuổi
                </span>
              </Form.Item>
              <h2 style={{ marginBottom: 0 }}>Tiền sử bệnh nhân</h2>
              <Form.Item
                style={{ width: "calc(95% - 12px)", border: "1px solid #000" }}
              >
                <TextArea
                  style={{ height: "125px" }}
                  defaultValue={medicaHistory}
                ></TextArea>
              </Form.Item>
              <Form.Item
                style={{ width: "calc(95% - 12px)", textAlign: "right" }}
              >
                <Button
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button style={{ backgroundColor: "black", color: "white" }}>
                  Hoàn tất
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div>
              <h1>{patientName}</h1>
              <Row>
                <Col flex={1}>
                  <ClockCircleOutlined />
                  &nbsp;
                  {dayjs(createDate).format("DD/MM/YYYY, HH[h]mm[']")}
                </Col>
                <Col flex={1}>
                  <EnvironmentOutlined />
                  &nbsp;
                  {patientAddress}
                </Col>
                <Col flex={1}>
                  <UserOutlined />
                  &nbsp;
                  {patientSex} - {patientSex} tuổi
                </Col>
              </Row>
              <h2 style={{ marginBottom: 0 }}>Tiền sử bệnh nhân</h2>
              <p style={{ margin: 0 }}>{medicaHistory}</p>
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
                      <div>
                        <List.Item
                          className="list-item-hover"
                          key={item.id}
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setNewImage(item);
                          }}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar shape="square" src={item.image_url} />
                            }
                            description={
                              <div
                                className="list-item-des-hover"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <p style={{ width: "30%" }}>
                                  {dayjs(item.create_date).format(
                                    "HH[h]mm, DD/MM/YYYY"
                                  )}
                                </p>
                                <p
                                  style={{
                                    width: "55%",
                                  }}
                                >
                                  {item.note}
                                </p>
                              </div>
                            }
                          />
                          <div>
                            {mark ? (
                              <StarFilled style={{ color: "yellow" }} />
                            ) : (
                              <StarOutlined />
                            )}
                          </div>
                        </List.Item>
                      </div>
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
