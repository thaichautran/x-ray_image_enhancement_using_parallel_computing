package com.patient_managerment.backend.service;

import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.entity.Record;
import com.patient_managerment.backend.imp.RecordServiceImp;
import com.patient_managerment.backend.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class RecordService implements RecordServiceImp {
    @Autowired
    RecordRepository recordRepository;
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


}
