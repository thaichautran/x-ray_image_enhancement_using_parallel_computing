package com.patient_managerment.backend.repository;

import com.patient_managerment.backend.entity.ImageAlbum;
import com.patient_managerment.backend.entity.key.KeyImageAlbum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageAlbumRepository extends JpaRepository<ImageAlbum, KeyImageAlbum> {
    List<ImageAlbum> findImageAlbumsByRecordId(int recordId);
    List<ImageAlbum> findByAlbumId(int albumId);
}
