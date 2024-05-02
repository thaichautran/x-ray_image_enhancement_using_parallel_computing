import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageView from "../Images/ImageView";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
export default function ImageByAlbum() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageList = location.state.imageList;

  const getNewList = () => {};
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    console.log(birthDate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <section id="album-view">
      <span
        className="back"
        onClick={() => navigate(-1)}
        style={{ fontSize: "1.25rem" }}
      >
        <LeftOutlined />
        Quay lại
      </span>
      <div
        className="album-view-top"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <div className="album-view-top-left" style={{ width: "50%" }}>
          <h1 className="text-title">BN - {imageList[0]?.name}</h1>
          <Row>
            {" "}
            <span>
              <ClockCircleOutlined></ClockCircleOutlined>&nbsp;
              {dayjs(imageList[0]?.createDate).format("DD/MM/YYYY")} -{" "}
              {dayjs(imageList[imageList?.length - 1]?.createDate).format(
                "DD/MM/YYYY"
              )}
            </span>
          </Row>
          <Row style={{ margin: "1rem 0 1rem 0" }}>
            <Col span={12}>
              <EnvironmentOutlined></EnvironmentOutlined>&nbsp;
              <span>{imageList[0]?.address}</span>
            </Col>
            <Col span={12}>
              <PhoneOutlined></PhoneOutlined>&nbsp;
              <span>{imageList[0]?.phone}</span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <UserOutlined></UserOutlined>&nbsp;
              <span>
                {imageList[0]?.sex} - {calculateAge(imageList[0]?.birthday)}{" "}
                tuổi
              </span>
            </Col>
            <Col span={12}>
              <MedicineBoxOutlined></MedicineBoxOutlined>&nbsp;
              <span>
                {imageList[0]?.height} cm - {imageList[0]?.weight} kg
              </span>
            </Col>
          </Row>
          <span></span>
        </div>
        <div className="album-view-top-right" style={{ width: "50%" }}>
          <h2>Tiền sử bệnh nhân</h2>
          <p>{imageList[10]?.medicalHistory}</p>
        </div>
      </div>
      {<ImageView imageList={imageList} getNewList={getNewList}></ImageView>}
    </section>
  );
}
