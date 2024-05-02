package com.patient_managerment.backend.controller;

import com.patient_managerment.backend.dto.AlbumDTO;
import com.patient_managerment.backend.dto.ImageDTO;
import com.patient_managerment.backend.dto.ImagesDTO;
import com.patient_managerment.backend.imp.AlbumServiceImp;
import com.patient_managerment.backend.payload.RespondData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/search")
    public ResponseEntity<?> searchInforPhoneAddress(@RequestParam String phoneAddress){
        RespondData respondData = new RespondData();
        respondData.setData(albumServiceImp.searchInforPhoneAddress(phoneAddress));
        respondData.setDesc("Get infor successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @GetMapping("/get_mark")
    public ResponseEntity<?> getMarkRecords( @RequestParam boolean status){
        RespondData respondData = new RespondData();

        List<AlbumDTO> albumDTOList = albumServiceImp.getMarkRecord( status);
        respondData.setData(albumDTOList);
        respondData.setDesc("Get marked images successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @GetMapping("/get_trash")
    public ResponseEntity<?> getTrashRecords(){
        RespondData respondData = new RespondData();

        List<AlbumDTO> albumDTOList = albumServiceImp.getTrashRecords();
        respondData.setData(albumDTOList);
        respondData.setDesc("Get trash successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

    @DeleteMapping("/delete_trash")
    public ResponseEntity<?> deleteTrash(){
        RespondData respondData = new RespondData();

        List<AlbumDTO> albumDTOList = albumServiceImp.deleteTrash();
        respondData.setData(albumDTOList);
        respondData.setDesc("Delete trash successfully!");
        return new ResponseEntity<>(respondData, HttpStatus.OK);
    }

}
