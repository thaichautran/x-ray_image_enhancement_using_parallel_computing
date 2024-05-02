import React, { useState, useEffect } from "react";
import "../../assets/scss/pages/Home.scss";
import ImageView from "../../components/Images/ImageView";
import { useLocation } from "react-router-dom";
export default function SearchList() {
  const [imageList, setImageList] = useState([]);
  const location = useLocation();
  useEffect(() => {
    setImageList(location.state.imageList);
  }, [location.state.imageList]);

  return (
    <div>
      <ImageView imageList={imageList}></ImageView>
    </div>
  );
}
