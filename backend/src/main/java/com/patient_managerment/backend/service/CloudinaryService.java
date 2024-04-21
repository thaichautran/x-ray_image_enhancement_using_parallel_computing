package com.patient_managerment.backend.service;

import com.cloudinary.Cloudinary;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.entity.Doctor;
import com.patient_managerment.backend.entity.Record;
import com.patient_managerment.backend.imp.CloudinaryServiceImp;
import com.patient_managerment.backend.payload.request.UploadRequest;
import com.patient_managerment.backend.repository.DoctorRepository;
import com.patient_managerment.backend.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CloudinaryService implements CloudinaryServiceImp {
    @Autowired
    Cloudinary cloudinary;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    RecordRepository recordRepository;
    @Override
    public Map upload(MultipartFile file) {
        try {
            Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
            return data;
        } catch (IOException io) {
            throw new RuntimeException("Image upload fail");
        }
    }

   

    @Override
    public ImagesDTO uploadImages(UploadRequest uploadRequest, List<MultipartFile> files) {
        System.out.println("Hello world");
//        System.out.println("file: " + uploadRequest.getFiles());
        for(MultipartFile multipartFile : files){
            System.out.println("Hello world HMD");

            Map data = upload(multipartFile);
            String url = (String) data.get("url");
            System.out.println("url: " + url);
            Record record = new Record();

            record.setUrl(url);
            record.setName(uploadRequest.getName());
            record.setSex(uploadRequest.getSex());
            record.setPhone(uploadRequest.getPhone());
            record.setMark(uploadRequest.isMark());
            record.setAddress(uploadRequest.getAddress());
            record.setBirthday(uploadRequest.getBirthday());
            record.setDoctorNote(uploadRequest.getDoctorNote());
            record.setHeight(uploadRequest.getHeight());
            record.setWeight(uploadRequest.getWeight());
            record.setMedicalHistory(uploadRequest.getMedicalHistory());
            Optional<Doctor> doctor = doctorRepository.findById(1);
            if (doctor.isPresent()) {
                record.setDoctor(doctor.get());
            }
            recordRepository.save(record);
//
//            Image image1 = imageRepository.findByUrl(url);
//            int idImage = image1.getId();
//            return new ImageDTO(idImage, url, uploadRequest.getName(), uploadRequest.getLocation(),
//                    uploadRequest.getDescription(), originCreatedDate, updateDate);
        }
        return null;
    }


}
