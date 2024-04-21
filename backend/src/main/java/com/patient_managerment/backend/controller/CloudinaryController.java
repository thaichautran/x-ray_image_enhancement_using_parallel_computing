package com.patient_managerment.backend.controller;

import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.imp.CloudinaryServiceImp;
import com.patient_managerment.backend.payload.RespondData;
import com.patient_managerment.backend.payload.request.UploadRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/cloudinary")
public class CloudinaryController {
    @Autowired
    CloudinaryServiceImp cloudinaryServiceImp;

//    @PostMapping(value = "/upload_image", consumes = {"multipart/form-data"})
//    public ResponseEntity<?> uploadImage(@ModelAttribute UploadRequest uploadRequest){
//        RespondData respondData = new RespondData();
//
//        ImagesDTO imageDTO = cloudinaryServiceImp.uploadImage(uploadRequest);
//
//        respondData.setDesc("Upload file successfully!");
//        respondData.setData(imageDTO);
//        return new ResponseEntity<>(respondData, HttpStatus.OK);
//    }

    @PostMapping(value = "/upload_image", consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadImage(@ModelAttribute UploadRequest uploadRequest,
                                         @RequestParam("files") List<MultipartFile> files) {
        RespondData respondData = new RespondData();

        ImagesDTO imageDTO = cloudinaryServiceImp.uploadImages(uploadRequest, files);

        respondData.setDesc("Upload file successfully!");
        respondData.setData(imageDTO);
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

//    @PostMapping(value = "/upload_image", consumes = {"multipart/form-data"})
//    public ResponseEntity<?> uploadImage(@ModelAttribute UploadRequest uploadRequest) {
//        RespondData respondData = new RespondData();
//
//        ImagesDTO imageDTO = cloudinaryServiceImp.uploadImages1(uploadRequest);
//
//        respondData.setDesc("Upload file successfully!");
//        respondData.setData(imageDTO);
//        return new ResponseEntity<>(respondData, HttpStatus.OK);
//    }
}
