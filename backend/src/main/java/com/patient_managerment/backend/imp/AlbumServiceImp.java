package com.patient_managerment.backend.imp;

import com.patient_managerment.backend.dto.AlbumDTO;
import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface AlbumServiceImp {
    List<AlbumDTO> getAlbums();
    ImageDTO checkInfor(String phoneNumber);

    List<AlbumDTO> getMarkRecord(boolean status);

}
