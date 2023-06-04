package com.chatCure.backend.Controllers;


import com.chatCure.backend.Models.UserResponse;
import com.chatCure.backend.Services.Users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {


    @Autowired
    UserService userService;

    @GetMapping("count")
    public ResponseEntity usersCount(){
        try{
            List<UserResponse> users =this.userService.getAllUsers();
            return new ResponseEntity<>(users.size(), HttpStatus.OK) ;
        }catch(Exception e){
            return  new ResponseEntity<>("No such information",HttpStatus.NO_CONTENT) ;
        }
    }
}
