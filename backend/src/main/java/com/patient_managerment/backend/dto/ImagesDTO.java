package com.patient_managerment.backend.dto;

import java.awt.*;
import java.util.List;

public class ImagesDTO {
    private List<ImageDTO> imageDTOList;

    private String name;

    private String sex;

    private String address;

    private String birthday;

    private String phone;

    private double weight;

    private double height;

    public ImagesDTO(List<ImageDTO> imageDTOList, String name, String sex, String address, String birthday, String phone, double weight, double height) {
        this.imageDTOList = imageDTOList;
        this.name = name;
        this.sex = sex;
        this.address = address;
        this.birthday = birthday;
        this.phone = phone;
        this.weight = weight;
        this.height = height;
    }

    public List<ImageDTO> getImageDTOList() {
        return imageDTOList;
    }

    public void setImageDTOList(List<ImageDTO> imageDTOList) {
        this.imageDTOList = imageDTOList;
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
}
