package com.chatCure.backend.Controllers;


import com.chatCure.backend.Controllers.Requests.LoginReq;
import com.chatCure.backend.Controllers.Requests.RegisterReq;
import com.chatCure.backend.Controllers.Responses.AuthenticationRes;
import com.chatCure.backend.Services.authentication.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationRes> register(@RequestBody RegisterReq registerReq) {
        try {
            AuthenticationRes res =authenticationService.register(registerReq);
            return new ResponseEntity<>(res, HttpStatus.OK) ;

        } catch (Exception e) {
            return  new ResponseEntity<AuthenticationRes>(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationRes> login(@RequestBody LoginReq loginReq) {
        try {
            AuthenticationRes res =authenticationService.login(loginReq);
            return new ResponseEntity<>(res, HttpStatus.OK) ;

        } catch (Exception e) {
            return  new ResponseEntity<AuthenticationRes>(HttpStatus.BAD_REQUEST);
        }
    }

}