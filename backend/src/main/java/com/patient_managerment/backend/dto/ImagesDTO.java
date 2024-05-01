package com.patient_managerment.backend.dto;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class ImagesDTO {
    private List<ImageDTO> imageDTOList;

    public ImagesDTO(List<ImageDTO> imageDTOList) {
        this.imageDTOList = imageDTOList;
    }

    public ImagesDTO() {
        this.imageDTOList = new ArrayList<>();
    }

    public List<ImageDTO> getImageDTOList() {
        return imageDTOList;
    }

    public void setImageDTOList(List<ImageDTO> imageDTOList) {
        this.imageDTOList = imageDTOList;
    }
}
