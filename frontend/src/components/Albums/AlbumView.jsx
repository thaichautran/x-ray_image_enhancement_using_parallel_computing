import React, { useState, useEffect } from "react";
import AlbumList from "./AlbumList";
import { getAlbums } from "../../apis/image";
export default function AlbumView() {
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    getAlbumList();
  }, []);

  const getAlbumList = async () => {
    await getAlbums()
      .then((res) => {
        console.log(res.data);
        setAlbumList(res.data);
      })
      .catch(() => {});
  };
  const getNewList = () => {
    getAlbumList();
  };
  return (
    <section id="album-view">
      {albumList?.length > 0 ? (
        <div className="album-view-gallery">
          {<AlbumList getNewList={getNewList} albumList={albumList} />}
        </div>
      ) : (
        <h1 className="text-title">Không có gì ở đây!</h1>
      )}
    </section>
  );
}
