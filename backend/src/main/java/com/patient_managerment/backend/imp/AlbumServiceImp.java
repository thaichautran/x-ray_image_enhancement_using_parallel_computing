package com.patient_managerment.backend.imp;

import com.patient_managerment.backend.dto.AlbumDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface AlbumServiceImp {
    List<AlbumDTO> getAlbums();
}
