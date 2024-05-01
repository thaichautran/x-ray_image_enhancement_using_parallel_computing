package com.patient_managerment.backend.imp;

import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.payload.request.UploadRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface CloudinaryServiceImp {
    Map upload(MultipartFile file);

    ImagesDTO uploadImages(UploadRequest uploadRequest, List<MultipartFile> files);


}
