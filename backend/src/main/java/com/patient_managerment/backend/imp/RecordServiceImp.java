package com.patient_managerment.backend.imp;

import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;

public interface RecordServiceImp {
    ImageDTO markRecord(int recordId, boolean mark);
}
