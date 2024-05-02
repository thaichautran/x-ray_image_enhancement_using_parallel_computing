package com.patient_managerment.backend.controller;

import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.imp.RecordServiceImp;
import com.patient_managerment.backend.payload.RespondData;
import com.patient_managerment.backend.payload.request.Base64Request;
import com.patient_managerment.backend.payload.request.UploadRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.xml.bind.DatatypeConverter;
import org.apache.commons.codec.binary.Base64;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    RecordServiceImp recordServiceImp;

//    @PostMapping("/download")
//    public ResponseEntity<byte[]> downloadImage(@RequestBody Base64Request base64Data) {
//        try {
//            String base64Image = base64Data.getBase64Data();
//            byte[] imageBytes = Base64.decodeBase64(base64Image);
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.IMAGE_JPEG);
//            headers.setContentDispositionFormData("attachment", "image.jpg");
//
//            return ResponseEntity.ok()
//                    .headers(headers)
//                    .body(imageBytes);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PutMapping("/mark")
    public ResponseEntity<?> markTheRecord(@RequestParam int id, @RequestParam boolean status){
        RespondData respondData = new RespondData();

        ImageDTO imageDTO = recordServiceImp.markRecord(id, status);
        respondData.setData(imageDTO);
        respondData.setDesc("Update image mark successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @PutMapping("/note")
    public ResponseEntity<?> noteTheRecord(@RequestParam int id, @RequestParam String note){
        RespondData respondData = new RespondData();

        ImageDTO imageDTO = recordServiceImp.noteRecord(id, note);
        respondData.setData(imageDTO);
        respondData.setDesc("Update image note successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @PutMapping("/remove")
    public ResponseEntity<?> removeTheRecord(@RequestParam int id){
        RespondData respondData = new RespondData();

        ImageDTO imageDTO = recordServiceImp.removeRecord(id);
        respondData.setData(imageDTO);
        respondData.setDesc("Remove image  successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @PutMapping("/restore")
    public ResponseEntity<?> restoreTheRecord(@RequestParam int id){
        RespondData respondData = new RespondData();

        ImageDTO imageDTO = recordServiceImp.restoreRecord(id);
        respondData.setData(imageDTO);
        respondData.setDesc("Restore image successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteRecord(@RequestParam int id){
        RespondData respondData = new RespondData();

        ImageDTO imageDTO = recordServiceImp.deleteRecord(id);
        respondData.setData(imageDTO);
        respondData.setDesc("Delete image permanantly !");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }





//    @PostMapping("/download")
//    public ResponseEntity<ByteArrayResource> downloadImage(@RequestBody Base64Request base64Data) {
//        try {
//            String base64Image = base64Data.getBase64Data();
//            byte[] imageBytes = Base64.decodeBase64(base64Image);
//
//            ByteArrayResource resource = new ByteArrayResource(imageBytes);
//
//            return ResponseEntity.ok()
//                    .contentType(MediaType.IMAGE_JPEG)
//                    .contentLength(imageBytes.length)
//                    .body(resource);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }


    @PostMapping("/download")
    public ResponseEntity<ByteArrayResource> downloadImage(@RequestBody Base64Request base64Data) {
        try {
            String base64Image = processBase64(base64Data.getBase64Data());
            byte[] imageBytes = Base64.decodeBase64(base64Image);

            String contentType = determineContentType(imageBytes);

            ByteArrayResource resource = new ByteArrayResource(imageBytes);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .contentLength(imageBytes.length)
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private String determineContentType(byte[] imageData) {
        if (startsWith(imageData, new byte[]{(byte) 0xFF, (byte) 0xD8})) {
            return MediaType.IMAGE_JPEG_VALUE;
        } else if (startsWith(imageData, new byte[]{(byte) 0x89, (byte) 0x50, (byte) 0x4E, (byte) 0x47})) {
            return MediaType.IMAGE_PNG_VALUE;
        } else {
            return MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }
    }

    private boolean startsWith(byte[] array, byte[] prefix) {
        if (array.length < prefix.length) {
            return false;
        }
        for (int i = 0; i < prefix.length; i++) {
            if (array[i] != prefix[i]) {
                return false;
            }
        }
        return true;
    }
    public String processBase64(String base64String) {
        // Kiểm tra xem chuỗi base64 có bắt đầu với "data:image/jpeg;base64," hoặc "data:image/png;base64," hay không
        if (base64String.startsWith("data:image/jpeg;base64,")) {
            // Nếu bắt đầu với JPEG, cắt bỏ phần tiền tố của JPEG
            return base64String.substring("data:image/jpeg;base64,".length());
        } else if (base64String.startsWith("data:image/png;base64,")) {
            // Nếu bắt đầu với PNG, cắt bỏ phần tiền tố của PNG
            return base64String.substring("data:image/png;base64,".length());
        } else {
            // Nếu không khớp với cả hai loại, trả về chuỗi ban đầu
            return base64String;
        }
    }
}



