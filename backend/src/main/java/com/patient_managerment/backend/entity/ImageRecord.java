package com.patient_managerment.backend.entity;

import com.patient_managerment.backend.entity.key.KeyImageRecord;
import jakarta.persistence.*;

@Entity
@Table(name = "image_record")
public class ImageRecord {
    @EmbeddedId
    KeyImageRecord keyImageRecord;
    @ManyToOne
    @JoinColumn(name = "album_id", insertable = false, updatable = false)
    private Album album;

    @ManyToOne
    @JoinColumn(name = "record_id", insertable = false, updatable = false)
    private Record record;

    public KeyImageRecord getKeyImageRecord() {
        return keyImageRecord;
    }

    public void setKeyImageRecord(KeyImageRecord keyImageRecord) {
        this.keyImageRecord = keyImageRecord;
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
