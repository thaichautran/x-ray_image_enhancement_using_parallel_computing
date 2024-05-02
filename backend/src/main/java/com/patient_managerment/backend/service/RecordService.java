package com.patient_managerment.backend.service;

import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.entity.Album;
import com.patient_managerment.backend.entity.ImageAlbum;
import com.patient_managerment.backend.entity.Record;
import com.patient_managerment.backend.imp.RecordServiceImp;
import com.patient_managerment.backend.payload.request.UploadRequest;
import com.patient_managerment.backend.repository.AlbumRepository;
import com.patient_managerment.backend.repository.ImageAlbumRepository;
import com.patient_managerment.backend.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RecordService implements RecordServiceImp {
    @Autowired
    RecordRepository recordRepository;

    @Autowired
    AlbumRepository albumRepository;

    @Autowired
    ImageAlbumRepository imageAlbumRepository;
    @Override
    public ImageDTO markRecord(int recordId, boolean mark) {
        Optional<Record> record = recordRepository.findById(recordId);
        if (record != null) {
            Record image = record.get();
            image.setMark(mark);

            image.setUpdateDate(new Date());

            recordRepository.save(image);

            ImageDTO imageDTO = new ImageDTO();

            imageDTO.setImageId(image.getId());
            imageDTO.setUrl(image.getUrl());
            imageDTO.setMark(image.isMark());
            imageDTO.setName(image.getName());
            imageDTO.setAddress(image.getAddress());
            imageDTO.setSex(image.getSex());
            imageDTO.setBirthday(image.getBirthday());
            imageDTO.setPhone(image.getPhone());
            imageDTO.setHeight(image.getHeight());
            imageDTO.setWeight(image.getWeight());
            imageDTO.setCreateDate(image.getCreateDate());
            imageDTO.setUpdateDate(image.getUpdateDate());
            imageDTO.setMedicalHistory(image.getMedicalHistory());
            imageDTO.setDoctorNote(image.getDoctorNote());

            return imageDTO;
        }
        return null;
    }

    @Override
    public ImageDTO deleteRecord(int id) {
        Optional<Record> record = recordRepository.findById(id);
        if(record != null){
            Album album = albumRepository.findByName(record.get().getPhone());

            ImageAlbum imageAlbum = imageAlbumRepository.findByAlbumIdAndRecordId(album.getId(), record.get().getId());
            if(imageAlbum != null){
                imageAlbumRepository.delete(imageAlbum);
            }
            recordRepository.deleteById(id);

        }


        return null;
    }

    @Override
    public ImageDTO noteRecord(int id, String note) {
        Optional<Record> record = recordRepository.findById(id);
        if (record != null) {
            Record image = record.get();
            image.setDoctorNote(note);

            image.setUpdateDate(new Date());

            recordRepository.save(image);

            ImageDTO imageDTO = new ImageDTO();

            imageDTO.setImageId(image.getId());
            imageDTO.setUrl(image.getUrl());
            imageDTO.setMark(image.isMark());
            imageDTO.setName(image.getName());
            imageDTO.setAddress(image.getAddress());
            imageDTO.setSex(image.getSex());
            imageDTO.setBirthday(image.getBirthday());
            imageDTO.setPhone(image.getPhone());
            imageDTO.setHeight(image.getHeight());
            imageDTO.setWeight(image.getWeight());
            imageDTO.setCreateDate(image.getCreateDate());
            imageDTO.setUpdateDate(image.getUpdateDate());
            imageDTO.setMedicalHistory(image.getMedicalHistory());
            imageDTO.setDoctorNote(image.getDoctorNote());

            return imageDTO;
        }
        return null;
    }

    @Override
    public ImageDTO removeRecord(int id) {
        Optional<Record> record = recordRepository.findById(id);
        if (record != null) {
            Record image = record.get();
            image.setRemove(true);

            image.setUpdateDate(new Date());

            recordRepository.save(image);

            ImageDTO imageDTO = new ImageDTO();

            imageDTO.setImageId(image.getId());
            imageDTO.setUrl(image.getUrl());
            imageDTO.setMark(image.isMark());
            imageDTO.setName(image.getName());
            imageDTO.setAddress(image.getAddress());
            imageDTO.setSex(image.getSex());
            imageDTO.setBirthday(image.getBirthday());
            imageDTO.setPhone(image.getPhone());
            imageDTO.setHeight(image.getHeight());
            imageDTO.setWeight(image.getWeight());
            imageDTO.setCreateDate(image.getCreateDate());
            imageDTO.setUpdateDate(image.getUpdateDate());
            imageDTO.setMedicalHistory(image.getMedicalHistory());
            imageDTO.setDoctorNote(image.getDoctorNote());
            imageDTO.setRemove(image.isRemove());

            return imageDTO;
        }
        return null;
    }

    @Override
    public ImageDTO restoreRecord(int id) {
        Optional<Record> record = recordRepository.findById(id);
        if (record != null) {
            Record image = record.get();
            image.setRemove(false);

            image.setUpdateDate(new Date());

            recordRepository.save(image);

            ImageDTO imageDTO = new ImageDTO();

            imageDTO.setImageId(image.getId());
            imageDTO.setUrl(image.getUrl());
            imageDTO.setMark(image.isMark());
            imageDTO.setName(image.getName());
            imageDTO.setAddress(image.getAddress());
            imageDTO.setSex(image.getSex());
            imageDTO.setBirthday(image.getBirthday());
            imageDTO.setPhone(image.getPhone());
            imageDTO.setHeight(image.getHeight());
            imageDTO.setWeight(image.getWeight());
            imageDTO.setCreateDate(image.getCreateDate());
            imageDTO.setUpdateDate(image.getUpdateDate());
            imageDTO.setMedicalHistory(image.getMedicalHistory());
            imageDTO.setDoctorNote(image.getDoctorNote());
            imageDTO.setRemove(image.isRemove());

            return imageDTO;
        }
        return null;
    }




}
