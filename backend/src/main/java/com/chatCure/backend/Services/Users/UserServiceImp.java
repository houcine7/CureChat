package com.chatCure.backend.Services.Users;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.chatCure.backend.Entities.UserEntity;
import com.chatCure.backend.Models.UserResponse;
import com.chatCure.backend.Repositories.UserRepository;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.data.mongodb.core.query.Query;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public UserResponse getUser(String id) {

        UserEntity user=userRepository.findById(id).orElseThrow(()-> new UsernameNotFoundException("No such user with this Id ")) ;
        var userResp =UserResponse.builder()
                .avatar(user.getAvatar())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .build();

        return userResp;

    }

    @Override
    public UserResponse updateUser(String id, UserEntity newUserDetails) throws Exception {

        try {

            UpdateResult updatedUser  ;
            // get user from db
            UserEntity userDb = userRepository.findById(id).get();
            Query query = new Query(Criteria.where("id").is(id));
            Update update = new Update();

            System.out.println("......." + update);
            Optional.ofNullable(newUserDetails.getFirstName())
                    .ifPresent(e -> update.set("firstName", newUserDetails.getFirstName()));
            Optional.ofNullable(newUserDetails.getLastName())
                    .ifPresent(e -> update.set("lastName", newUserDetails.getLastName()));
            Optional.ofNullable(newUserDetails.getUsername())
                    .ifPresent(e -> update.set("username", newUserDetails.getUsername()));
            Optional.ofNullable(newUserDetails.getAvatar())
                    .ifPresent(e -> update.set("avatar", newUserDetails.getAvatar()));


            System.out.println(update);
            if (!update.toString().equals("{}")) {
                updatedUser = mongoTemplate.updateFirst(query, update, UserEntity.class);
                // return updated user
                // create response object and set properties
                UserResponse userUpdated = new UserResponse();
                BeanUtils.copyProperties(userRepository.findById(id).get(), userUpdated);
                //
                return userUpdated;
            } else {
                throw new Exception("update body is not correct !!");
            }

        }catch (Exception e){
            throw  new Exception("Error occured while updating user details");
        }

        }

    @Override
    public List<UserResponse> getAllUsers() {

        try{
            List<UserEntity> users =userRepository.findAll();
            if(users.size()!=0){
                List<UserResponse> usersResp = users.stream().map(user -> {
                    UserResponse res =new UserResponse() ;
                    BeanUtils.copyProperties(user,res);
                    return res ;
                }).toList();

                return usersResp ;
            }else {
                throw new Exception("No elements in user db") ;
            }
        }catch(Exception e){
            e.getStackTrace();
            return null;
        }


    }

    @Override
    public UserEntity deleteUser(String id) {
        return null;
    }

    @Override
    public boolean changeUserPassword(String idUser, String currentPassword, String newPassword) {
        return false;
    }
}
