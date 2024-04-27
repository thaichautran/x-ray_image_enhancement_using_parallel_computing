package com.patient_managerment.backend.repository;

import com.patient_managerment.backend.entity.Album;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Integer> {
    Album findByName(String name);
}
