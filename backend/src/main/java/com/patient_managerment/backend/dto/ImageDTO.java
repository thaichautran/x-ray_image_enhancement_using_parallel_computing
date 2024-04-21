package com.patient_managerment.backend.dto;

import java.util.Date;

public class ImageDTO {
    private String url;
    private boolean mark;


    private Date createDate;
    private Date updateDate;
    private String medicalHistory;

    private String doctorNote;

    public ImageDTO(String url, boolean mark, Date createDate, Date updateDate, String medicalHistory, String doctorNote) {
        this.url = url;
        this.mark = mark;
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
