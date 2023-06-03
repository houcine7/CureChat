package com.chatCure.backend.Services.authentication;

import com.chatCure.backend.Controllers.Requests.LoginReq;
import com.chatCure.backend.Controllers.Requests.RegisterReq;
import com.chatCure.backend.Controllers.Responses.AuthenticationRes;
import com.chatCure.backend.Entities.UserEntity;
import com.chatCure.backend.Models.Role;
import com.chatCure.backend.Models.UserDetailsImp;
import com.chatCure.backend.Repositories.UserRepository;
import com.chatCure.backend.Services.JWTsvc.JwtServiceI;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthenticationServiceImp  implements AuthenticationService{


    @Autowired
    UserRepository userRepository ;
    @Autowired
    PasswordEncoder passwordEncoder ;
    @Autowired
    JwtServiceI jwtService ;
    @Autowired
    AuthenticationManager authenticationManger ;


    @Override
    public AuthenticationRes login(LoginReq req) {
        System.out.println("this is login function");

        var user =userRepository.findByUsername(req.getUsername()).orElseThrow(()->  new UsernameNotFoundException("No such username ")) ;

        //verify if the credentials are valid
        try{
            authenticationManger.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            req.getUsername(),
                            req.getPassword()
                    )
            ).isAuthenticated();

        }catch(Exception e){
            System.out.println(e.getMessage());
        }

        System.out.println("login method: " +authenticationManger.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername() ,
                        req.getPassword()
                )
        ).isAuthenticated());

        //console output

        // get user by username
        //generate token
        // user details object
        UserDetailsImp userDetailsImp =new UserDetailsImp() ;
        BeanUtils.copyProperties(user,userDetailsImp);
        //token
        var token =jwtService.generateToken(userDetailsImp) ;
        //
        return AuthenticationRes.builder()
                .jwtToken(token)
                .username(userDetailsImp.getUsername())
                .firstName(userDetailsImp.getFirstName())
                .lastName(userDetailsImp.getLastName())
                .avatar(userDetailsImp.getAvatar())
                .id(userDetailsImp.getId())
                .build() ;
    }

    @Override
    public AuthenticationRes register(RegisterReq req) {

        // build userDetails object
        var user= UserDetailsImp.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .avatar(req.getAvatar())
                .role(Role.USER)
                .build() ;

        // save the new user to db
        UserEntity userEntity =new UserEntity() ;
        BeanUtils.copyProperties(user,userEntity);
        UserEntity userSaved =userRepository.save(userEntity) ;
        //generate jwt token

        UserDetailsImp userRegistered=new UserDetailsImp() ;
        BeanUtils.copyProperties(userSaved,userRegistered);

        String token =jwtService.generateToken(userRegistered) ;

        return AuthenticationRes.builder()
                .jwtToken(token)
                .lastName(userSaved.getLastName())
                .firstName(userSaved.getFirstName())
                .username(userSaved.getUsername())
                .id(userSaved.getId())
                .avatar(userSaved.getAvatar())
                .build() ;
    }
}
