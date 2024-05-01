package com.patient_managerment.backend.controller;

import com.patient_managerment.backend.dto.AlbumDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.imp.AlbumServiceImp;
import com.patient_managerment.backend.payload.RespondData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/albums")
public class AlbumController {
    @Autowired
    AlbumServiceImp albumServiceImp;
    @GetMapping("/get_albums")
    public ResponseEntity<?> getAlbums(){
        RespondData respondData = new RespondData();
        respondData.setData(albumServiceImp.getAlbums());
        respondData.setDesc("Get list albums successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @GetMapping("/check_infor")
    public ResponseEntity<?> checkInfor(@RequestParam String phoneNumber){
        RespondData respondData = new RespondData();
        respondData.setData(albumServiceImp.checkInfor(phoneNumber));
        respondData.setDesc("Get infor successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @GetMapping("/get_mark")
    public ResponseEntity<?> getMarkRecords( @RequestParam boolean status){
        RespondData respondData = new RespondData();

        List<AlbumDTO> albumDTOList = albumServiceImp.getMarkRecord( status);
        respondData.setData(albumDTOList);
        respondData.setDesc("Update image favourite status successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

}
