import React, { useState, useEffect } from "react";
import ImageList from "./ImageList";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";

export default function ImageView({ imageList, getNewList }) {
  const [createdDateList, setCreatedDateList] = useState([]);
  const [today, setToday] = useState(new Date());
  const [yesterday, setYesterday] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    getCreatedDateList();
    getToday();
    getYesterday();
  }, [imageList]);

  const getToday = () => {
    setToday(dayjs(today).format("DD-MM-YYYY"));
  };

  const getYesterday = () => {
    const preDay = dayjs().subtract(1, "day").format("DD-MM-YYYY");
    setYesterday(preDay);
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD-MM-YYYY");
  };

  const getCreatedDateList = async () => {
    let dates = [];
    imageList?.forEach((image) => {
      dates.push(image.createDate);
    });
    dates.sort();
    dates = dates.map((createdDate) => {
      return formatDate(createdDate);
    });
    dates.reverse();
    setCreatedDateList([...new Set(dates)]);
  };

  const getMonth = (createdDateList) => {
    let months = [];
    createdDateList.forEach((date) => {
      months.push(dayjs(date, "DD-MM-YYYY").format("MM-YYYY"));
    });

    return [...new Set(months)];
  };

  const getYear = (createdDateList) => {
    let years = [];
    createdDateList.forEach((date) => {
      years.push(dayjs(date, "DD-MM-YYYY").format("YYYY"));
    });
    return [...new Set(years)];
  };

  const getImageListByDate = (date) => {
    return imageList?.filter((image) => {
      return formatDate(image.createDate) === date;
    });
  };

  return (
    <section id="image-view">
      {location.pathname != `/album/${imageList[0]?.phone}` ? (
        <span
          className="back"
          onClick={() => navigate(-1)}
          style={{ fontSize: "1.25rem" }}
        >
          <LeftOutlined />
          Quay lại
        </span>
      ) : null}

      {imageList?.length > 0 ? (
        <div className="image-view-gallery">
          {getYear(createdDateList).map((year) => (
            <div key={year}>
              {dayjs(today, "DD-MM-YYYY").format("YYYY") !== year ? (
                <p
                  style={{
                    marginTop: "3rem",
                    marginBottom: "2rem",
                  }}
                  className="text-title"
                >
                  {dayjs(year).locale("vi").format("[Năm] YYYY")}
                </p>
              ) : (
                <p
                  style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    textTransform: "capitalize",
                  }}
                  className="text-title"
                ></p>
              )}
              {getMonth(createdDateList).map((month) => (
                <div key={month}>
                  {month.substring(3, 7) == year && (
                    <>
                      <p
                        className="text-sub-title text-upper"
                        style={{ fontSize: "24px" }}
                      >
                        Tháng{" "}
                        {month.startsWith("0")
                          ? month.substring(1, 2)
                          : month.substring(0, 2)}
                      </p>
                      {createdDateList.map((date) => (
                        <div key={date}>
                          {dayjs(date, "DD-MM-YYYY")
                            .locale("vi")
                            .format("MM-YYYY") === month &&
                            dayjs(date, "DD-MM-YYYY")
                              .locale("vi")
                              .format("YYYY") === year &&
                            dayjs(date, "DD-MM-YYYY")
                              .locale("vi")
                              .format("DD-MM-YYYY") === today && (
                              <p
                                className="text-sub-3-title text-upper"
                                style={{ fontSize: "18px", marginTop: "2rem" }}
                              >
                                Hôm nay
                                <div style={{ marginTop: "1rem" }}>
                                  <ImageList
                                    imageList={getImageListByDate(date)}
                                    getNewList={getNewList}
                                  />
                                </div>
                              </p>
                            )}
                          {dayjs(date, "DD-MM-YYYY")
                            .locale("vi")
                            .format("MM-YYYY") === month &&
                            dayjs(date, "DD-MM-YYYY")
                              .locale("vi")
                              .format("YYYY") === year &&
                            dayjs(date, "DD-MM-YYYY")
                              .locale("vi")
                              .format("DD-MM-YYYY") === yesterday && (
                              <p
                                className="text-sub-3-title text-upper"
                                style={{ fontSize: "18px", marginTop: "2rem" }}
                              >
                                Hôm qua
                                <div style={{ marginTop: "1rem" }}>
                                  <ImageList
                                    imageList={getImageListByDate(date)}
                                    getNewList={getNewList}
                                  />
                                </div>
                              </p>
                            )}
                          {dayjs(date, "DD-MM-YYYY")
                            .locale("vi")
                            .format("MM-YYYY") === month &&
                            dayjs(date, "DD-MM-YYYY")
                              .locale("vi")
                              .format("YYYY") === year &&
                            dayjs(date, "DD-MM-YYYY")
                              .locale("vi")
                              .format("DD-MM-YYYY") !== today && (
                              <p
                                className="text-sub-3-title text-upper"
                                style={{
                                  fontSize: "18px",
                                  margin: "2rem 0 3rem 0",
                                  textTransform: "capitalize",
                                }}
                              >
                                {dayjs(date, "DD-MM-YYYY")
                                  .locale("vi")
                                  .format("dddd, [ngày] DD")}
                                <div style={{ marginTop: "1rem" }}>
                                  <ImageList
                                    imageList={getImageListByDate(date)}
                                    getNewList={getNewList}
                                  />
                                </div>
                              </p>
                            )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-title">Không có gì ở đây!</h1>
      )}
    </section>
  );
}
