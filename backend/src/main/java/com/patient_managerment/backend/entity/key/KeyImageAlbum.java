package com.patient_managerment.backend.entity.key;
import jakarta.persistence.Column;

import java.io.Serializable;

public class KeyImageAlbum implements Serializable {
    @Column(name = "album_id")
    private int albumId;

    @Column(name = "record_id")
    private int imageId;

    public KeyImageAlbum() {

    }

    public KeyImageAlbum(int albumId, int imageId) {
        this.albumId = albumId;
        this.imageId = imageId;
    }

    public int getAlbumId() {
        return albumId;
    }

    public void setAlbumId(int albumId) {
        this.albumId = albumId;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
    }
}
