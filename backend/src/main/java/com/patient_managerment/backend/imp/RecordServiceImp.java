package com.patient_managerment.backend.imp;

import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.payload.request.UploadRequest;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.awt.*;

public interface RecordServiceImp {
    ImageDTO markRecord(int recordId, boolean mark);
    ImageDTO deleteRecord(int id);
    ImageDTO noteRecord(int id, String note);
    ImageDTO removeRecord(int id);
    ImageDTO restoreRecord(int id);









}
