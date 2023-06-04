package com.chatCure.backend.Services.Users;

import com.chatCure.backend.Entities.UserEntity;
import com.chatCure.backend.Models.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse getUser(String id) ;
    UserResponse updateUser(String id, UserEntity newUserDetails) throws Exception;
    List<UserResponse> getAllUsers() ;
    UserEntity deleteUser(String id) ;
    boolean changeUserPassword(String idUser, String currentPassword ,String newPassword) ;
}
