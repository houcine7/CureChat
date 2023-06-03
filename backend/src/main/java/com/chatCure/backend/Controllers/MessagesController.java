package com.chatCure.backend.Controllers;


import com.chatCure.backend.Services.HealthClassifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MessagesController {

    @Autowired
    HealthClassifier healthClassifier ;


    @GetMapping("/messages")
    public ResponseEntity<String> test() {

//        healthClassifier.initiate();

        return ResponseEntity.ok("HELLO WORLD ");

    }
}
