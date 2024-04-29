package com.patient_managerment.backend.controller;

import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.imp.RecordServiceImp;
import com.patient_managerment.backend.payload.RespondData;
import com.patient_managerment.backend.payload.request.Base64Request;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    RecordServiceImp recordServiceImp;

    @PostMapping("/download")
    public ResponseEntity<byte[]> downloadImage(@RequestBody Base64Request base64Data) {
        try {
            String base64Image = base64Data.getBase64Data();
            byte[] imageBytes = Base64.decodeBase64(base64Image);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentDispositionFormData("attachment", "image.jpg");

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(imageBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/mark")
    public ResponseEntity<?> markTheRecord(@RequestParam int id, @RequestParam boolean status){
        RespondData respondData = new RespondData();

        ImageDTO imageDTO = recordServiceImp.markRecord(id, status);
        respondData.setData(imageDTO);
        respondData.setDesc("Update image favourite status successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }




}
