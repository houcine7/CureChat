package com.chatCure.backend.Services.Users;

import com.chatCure.backend.Entities.UserEntity;

import java.util.List;

public interface UserService {

    UserEntity getUser(String id) ;
    UserEntity updateUser(String id, UserEntity newUserDetails) ;
    List<UserEntity> getAllUsers() ;
    UserEntity deleteUser(String id) ;
    boolean changeUserPassword(String idUser, String currentPassword ,String newPassword) ;
}
