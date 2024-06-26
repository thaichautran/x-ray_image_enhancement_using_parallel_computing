package com.patient_managerment.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "album")
public class Album {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;



    @CreationTimestamp
    @Column(name = "create_date")
    private Date createDate;

    @CreationTimestamp
    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "cover_photo")
    private String coverPhoto;


    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @OneToMany(mappedBy = "album")
    List<ImageAlbum> imageRecordList;



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getCoverPhoto() {
        return coverPhoto;
    }

    public void setCoverPhoto(String coverPhoto) {
        this.coverPhoto = coverPhoto;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public List<ImageAlbum> getImageRecordList() {
        return imageRecordList;
    }

    public void setImageRecordList(List<ImageAlbum> imageRecordList) {
        this.imageRecordList = imageRecordList;
    }
}
