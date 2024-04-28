import React, { useState, useEffect } from "react";

import AlbumList from "./AlbumList";

export default function AlbumView({ albumList }) {
  return (
    <section id="album-view">
      {albumList.length > 0 ? (
        <div className="album-view-gallery">
          {<AlbumList albumList={albumList} />}
        </div>
      ) : (
        <h1 className="text-title">Không có gì ở đây!</h1>
      )}
    </section>
  );
}
