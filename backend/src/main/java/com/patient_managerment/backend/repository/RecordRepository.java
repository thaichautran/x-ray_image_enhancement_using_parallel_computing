package com.patient_managerment.backend.repository;

import com.patient_managerment.backend.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, Integer> {

}
