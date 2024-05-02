import React, { useState, useEffect } from "react";
import "../../assets/scss/pages/Home.scss";
import ImageView from "../../components/Images/ImageView";
import { getMarkImages } from "../../apis/image";
export default function Careful() {
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    handleGetMarkImages();
  }, []);
  const handleGetMarkImages = async () => {
    await getMarkImages()
      .then((res) => {
        let newList = [];
        res.data.forEach((album) => {
          album?.imageDTOList?.forEach((image) => {
            newList.push(image);
          });
        });
        setImageList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getNewList = () => {
    handleGetMarkImages();
  };
  return (
    <div>
      <ImageView imageList={imageList} getNewList={getNewList}></ImageView>
    </div>
  );
}
