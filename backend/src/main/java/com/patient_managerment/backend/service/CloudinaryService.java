package com.patient_managerment.backend.service;

import com.cloudinary.Cloudinary;
import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.entity.Album;
import com.patient_managerment.backend.entity.Doctor;
import com.patient_managerment.backend.entity.ImageAlbum;
import com.patient_managerment.backend.entity.Record;
import com.patient_managerment.backend.entity.key.KeyImageAlbum;
import com.patient_managerment.backend.imp.CloudinaryServiceImp;
import com.patient_managerment.backend.payload.request.UploadRequest;
import com.patient_managerment.backend.repository.AlbumRepository;
import com.patient_managerment.backend.repository.DoctorRepository;
import com.patient_managerment.backend.repository.ImageAlbumRepository;
import com.patient_managerment.backend.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class CloudinaryService implements CloudinaryServiceImp {
    @Autowired
    Cloudinary cloudinary;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    ImageAlbumRepository imageAlbumRepository;

    @Autowired
    AlbumRepository albumRepository;

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
        List<Record> listRecordSave = new ArrayList<>();
        List<String> urls = new ArrayList<>();
        Optional<Doctor> doctor = doctorRepository.findById(1);
        for (MultipartFile multipartFile : files) {

            Date originCreatedDate = null;

            try {
                Metadata metadata = ImageMetadataReader.readMetadata(multipartFile.getInputStream(), multipartFile.getSize());

                // Try to get Exif metadata
                ExifSubIFDDirectory exifDirectory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
                if (exifDirectory != null) {
                    Date tempDate = exifDirectory.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL);
                    int hour = tempDate.getHours();
//                System.out.println("Hour: " + hour);
                    tempDate.setHours(hour - 7);
//                System.out.println("Temp date after: " + tempDate);
                    originCreatedDate = tempDate;
//                System.out.println("Origin date: " + originCreatedDate);
                } else {
                    originCreatedDate = new Date();
                }
            } catch (Exception e) {
                System.out.println("Error to get created date");
            }

            Map data = upload(multipartFile);
            String url = (String) data.get("url");
            System.out.println("url: " + url);

            urls.add(url);

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
            record.setCreateDate(originCreatedDate);
            record.setUpdateDate(new Date());


            if (doctor.isPresent()) {
                record.setDoctor(doctor.get());
            }

            listRecordSave.add(record);
//
//            Image image1 = imageRepository.findByUrl(url);
//            int idImage = image1.getId();
//            return new ImageDTO(idImage, url, uploadRequest.getName(), uploadRequest.getLocation(),
//                    uploadRequest.getDescription(), originCreatedDate, updateDate);
        }

        recordRepository.saveAll(listRecordSave);

        Album albumExisted = albumRepository.findByName(uploadRequest.getPhone());
        if (albumExisted == null) {

            Album album = new Album();
            album.setDoctor(doctor.get());
            album.setName(uploadRequest.getPhone());
            album.setCreateDate(new Date());
            album.setUpdateDate(new Date());
            albumRepository.save(album);

            List<ImageAlbum> imageAlbumList = new ArrayList<>();
            Album albumCreated = albumRepository.findByName(uploadRequest.getPhone());

            for (String url : urls) {
                ImageAlbum imageAlbum = new ImageAlbum();
                Record recordItem = recordRepository.findByUrl(url);
                System.out.println(album.getId() + " " + recordItem.getId());
                KeyImageAlbum keyImageAlbum = new KeyImageAlbum(albumCreated.getId(), recordItem.getId());
                imageAlbum.setKeyImageAlbum(keyImageAlbum);
                imageAlbumList.add(imageAlbum);
            }
            imageAlbumRepository.saveAll(imageAlbumList);
        } else {
            List<ImageAlbum> imageAlbumList = new ArrayList<>();

            for (String url : urls) {
                ImageAlbum imageAlbum = new ImageAlbum();
                Record recordItem = recordRepository.findByUrl(url);
                KeyImageAlbum keyImageAlbum = new KeyImageAlbum(albumExisted.getId(), recordItem.getId());
                imageAlbum.setKeyImageAlbum(keyImageAlbum);
                imageAlbumList.add(imageAlbum);
            }
            imageAlbumRepository.saveAll(imageAlbumList);
        }
        return null;

    }


}


//    @Override
//    public ImagesDTO uploadImages(UploadRequest uploadRequest, List<MultipartFile> files) {
//        List<Record> listRecordSave = new ArrayList<>();
//        List<String> urls = new ArrayList<>();
//        Optional<Doctor> doctor = doctorRepository.findById(1);
//        for(MultipartFile multipartFile : files){
//
//            Date originCreatedDate = null;
//
//            try {
//                Metadata metadata = ImageMetadataReader.readMetadata(multipartFile.getInputStream(), multipartFile.getSize());
//
//                // Try to get Exif metadata
//                ExifSubIFDDirectory exifDirectory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
//                if (exifDirectory != null) {
//                    Date tempDate = exifDirectory.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL);
//                    int hour = tempDate.getHours();
////                System.out.println("Hour: " + hour);
//                    tempDate.setHours(hour - 7);
////                System.out.println("Temp date after: " + tempDate);
//                    originCreatedDate = tempDate;
////                System.out.println("Origin date: " + originCreatedDate);
//                } else {
//                    originCreatedDate = new Date();
//                }
//            } catch (Exception e) {
//                System.out.println("Error to get created date");
//            }
//
//            Map data = upload(multipartFile);
//            String url = (String) data.get("url");
//            System.out.println("url: " + url);
//
//            urls.add(url);
//
//            Record record = new Record();
//
//            record.setUrl(url);
//            record.setName(uploadRequest.getName());
//            record.setSex(uploadRequest.getSex());
//            record.setPhone(uploadRequest.getPhone());
//            record.setMark(uploadRequest.isMark());
//            record.setAddress(uploadRequest.getAddress());
//            record.setBirthday(uploadRequest.getBirthday());
//            record.setDoctorNote(uploadRequest.getDoctorNote());
//            record.setHeight(uploadRequest.getHeight());
//            record.setWeight(uploadRequest.getWeight());
//            record.setMedicalHistory(uploadRequest.getMedicalHistory());
//            record.setCreateDate(originCreatedDate);
//            record.setUpdateDate(new Date());
//
//
//
//            if (doctor.isPresent()) {
//                record.setDoctor(doctor.get());
//            }
//
//            listRecordSave.add(record);
////
////            Image image1 = imageRepository.findByUrl(url);
////            int idImage = image1.getId();
////            return new ImageDTO(idImage, url, uploadRequest.getName(), uploadRequest.getLocation(),
////                    uploadRequest.getDescription(), originCreatedDate, updateDate);
//        }
//
//        recordRepository.saveAll(listRecordSave);
//
//        Record recordPhone = recordRepository.findTopByPhone(uploadRequest.getPhone());
//        if(recordPhone != null){
////            System.out.println(recordPhone.toString());
////            System.out.println("phone" + " " + " " + recordPhone.getPhone());
////            System.out.println(recordPhone.getId());
//            List<ImageAlbum> imageAlbumValue = imageAlbumRepository.findImageAlbumsByRecordId(recordPhone.getId());
////            System.out.print(imageAlbumValue);
////            System.out.println("hello album balue");
//            if(imageAlbumValue.size() == 0){
////                System.out.println("ehllo HMD");
//                Album album = new Album();
//                album.setDoctor(doctor.get());
//                album.setName(uploadRequest.getPhone());
//                album.setCreateDate(new Date());
//                album.setUpdateDate(new Date());
//                albumRepository.save(album);
//
//                List<ImageAlbum> imageAlbumList = new ArrayList<>();
//                Album albumCreate = albumRepository.findByName(uploadRequest.getPhone());
//
//                for(String url : urls){
//                    Record record = recordRepository.findByUrl(url);
//                    ImageAlbum imageAlbum = new ImageAlbum();
//                    Record recordItem = recordRepository.findByUrl(url);
//                    KeyImageAlbum keyImageAlbum = new KeyImageAlbum(albumCreate.getId(), recordItem.getId());
//                    imageAlbum.setKeyImageAlbum(keyImageAlbum);
//                    imageAlbumList.add(imageAlbum);
//                }
//                imageAlbumRepository.saveAll(imageAlbumList);
//            } else {
//                List<ImageAlbum> imageAlbumList = new ArrayList<>();
//                Album albumCreate = albumRepository.findByName(uploadRequest.getPhone());
//
//                for(String url : urls){
//                    Record record = recordRepository.findByUrl(url);
//                    ImageAlbum imageAlbum = new ImageAlbum();
//                    Record recordItem = recordRepository.findByUrl(url);
//                    KeyImageAlbum keyImageAlbum = new KeyImageAlbum(albumCreate.getId(), recordItem.getId());
//                    imageAlbum.setKeyImageAlbum(keyImageAlbum);
//                    imageAlbumList.add(imageAlbum);
//                }
//                imageAlbumRepository.saveAll(imageAlbumList);
//            }
//        }
//
//
//        return null;
//    }



