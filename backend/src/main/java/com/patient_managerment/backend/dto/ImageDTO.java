package com.patient_managerment.backend.dto;

import java.util.Date;

public class ImageDTO {
    private String url;
    private boolean mark;
    private String name;

    private String sex;

    private String address;

    private String birthday;

    private String phone;

    private double weight;

    private double height;


    private Date createDate;
    private Date updateDate;
    private String medicalHistory;

    private String doctorNote;

    public ImageDTO(String url, boolean mark, String name, String sex, String address, String birthday, String phone, double weight, double height, Date createDate, Date updateDate, String medicalHistory, String doctorNote) {
        this.url = url;
        this.mark = mark;
        this.name = name;
        this.sex = sex;
        this.address = address;
        this.birthday = birthday;
        this.phone = phone;
        this.weight = weight;
        this.height = height;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.medicalHistory = medicalHistory;
        this.doctorNote = doctorNote;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isMark() {
        return mark;
    }

    public void setMark(boolean mark) {
        this.mark = mark;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
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

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getDoctorNote() {
        return doctorNote;
    }

    public void setDoctorNote(String doctorNote) {
        this.doctorNote = doctorNote;
    }
}
