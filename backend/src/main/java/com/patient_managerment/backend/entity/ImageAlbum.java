package com.patient_managerment.backend.entity;

import com.patient_managerment.backend.entity.key.KeyImageAlbum;
import jakarta.persistence.*;

@Entity
@Table(name = "image_record")
public class ImageAlbum {
    @EmbeddedId
    KeyImageAlbum keyImageAlbum;
    @ManyToOne
    @JoinColumn(name = "album_id", insertable = false, updatable = false)
    private Album album;

    @ManyToOne
    @JoinColumn(name = "record_id", insertable = false, updatable = false)
    private Record record;

    public KeyImageAlbum getKeyImageAlbum() {
        return keyImageAlbum;
    }

    public void setKeyImageAlbum(KeyImageAlbum keyImageAlbum) {
        this.keyImageAlbum = keyImageAlbum;
    }



    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public Record getRecord() {
        return record;
    }

    public void setRecord(Record record) {
        this.record = record;
    }
}
