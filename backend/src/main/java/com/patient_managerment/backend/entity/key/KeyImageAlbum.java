package com.patient_managerment.backend.entity.key;
import jakarta.persistence.Column;

import java.io.Serializable;

public class KeyImageAlbum implements Serializable {
    @Column(name = "album_id")
    private int albumId;

    @Column(name = "record_id")
    private int recordId;

    public KeyImageAlbum() {

    }

    public KeyImageAlbum(int albumId, int recordId) {
        this.albumId = albumId;
        this.recordId = recordId;
    }

    public int getAlbumId() {
        return albumId;
    }

    public void setAlbumId(int albumId) {
        this.albumId = albumId;
    }

    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }
}
