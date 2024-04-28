package com.patient_managerment.backend.service;

import com.patient_managerment.backend.dto.AlbumDTO;
import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.entity.Album;
import com.patient_managerment.backend.entity.ImageAlbum;
import com.patient_managerment.backend.entity.Record;
import com.patient_managerment.backend.imp.AlbumServiceImp;
import com.patient_managerment.backend.repository.AlbumRepository;
import com.patient_managerment.backend.repository.ImageAlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service

public class AlbumService implements AlbumServiceImp {
    @Autowired
    AlbumRepository albumRepository;

    @Autowired
    ImageAlbumRepository imageAlbumRepository;
    @Override
    public List<AlbumDTO> getAlbums() {
        List<AlbumDTO> albumDTOList = new ArrayList<>();
        List<Album> albumList = albumRepository.findAll();
        if(albumList.size() > 0){
            for(Album album : albumList){
                int albumId = album.getId();

                AlbumDTO albumDTO = new AlbumDTO();
                albumDTO.setName(album.getName());
                albumDTO.setCreateDate(album.getCreateDate());
                albumDTO.setUpdateDate(album.getUpdateDate());

                List<Record> recordList = new ArrayList<>();
                List<ImageAlbum> imageAlbumList = imageAlbumRepository.findByAlbumId(albumId);
                for(ImageAlbum imageAlbum : imageAlbumList){
                    recordList.add(imageAlbum.getRecord());
                }

                List<ImageDTO> imageDTOList = new ArrayList<>();
                for(Record image : recordList){
                    ImageDTO imageDTO = new ImageDTO();

                    imageDTO.setUrl(image.getUrl());
                    imageDTO.setMark(image.isMark());
                    imageDTO.setName(image.getName());
                    imageDTO.setAddress(image.getAddress());
                    imageDTO.setBirthday(image.getBirthday());
                    imageDTO.setPhone(image.getPhone());
                    imageDTO.setHeight(image.getHeight());
                    imageDTO.setWeight(image.getWeight());
                    imageDTO.setCreateDate(image.getCreateDate());
                    imageDTO.setUpdateDate(image.getUpdateDate());
                    imageDTO.setMedicalHistory(image.getMedicalHistory());
                    imageDTO.setDoctorNote(image.getDoctorNote());

                    imageDTOList.add(imageDTO);
                }

                albumDTO.setImageDTOList(imageDTOList);
                albumDTOList.add((albumDTO));

            }
        }
        return albumDTOList;
    }

    @Override
    public ImageDTO checkInfor(String phoneNumber) {
        Album album = albumRepository.findByName(phoneNumber);
        if(album != null){
            int albumId = album.getId();
            List<ImageAlbum> imageAlbumList = imageAlbumRepository.findByAlbumId(albumId);
            ImageDTO imageDTO = new ImageDTO();
            if(imageAlbumList != null && imageAlbumList.size() > 0) {
                Record existedRecord = imageAlbumList.get(0).getRecord();
                imageDTO.setMark(existedRecord.isMark());
                imageDTO.setName(existedRecord.getName());
                imageDTO.setAddress(existedRecord.getAddress());
                imageDTO.setBirthday(existedRecord.getBirthday());
                imageDTO.setPhone(existedRecord.getPhone());
                imageDTO.setHeight(existedRecord.getHeight());
                imageDTO.setWeight(existedRecord.getWeight());
                imageDTO.setCreateDate(existedRecord.getCreateDate());
                imageDTO.setUpdateDate(existedRecord.getUpdateDate());
                imageDTO.setMedicalHistory(existedRecord.getMedicalHistory());
                imageDTO.setDoctorNote(existedRecord.getDoctorNote());
            }
            return imageDTO;
        }
        return null;
    }
}
