package com.chatCure.backend.Services.Users;

import com.chatCure.backend.Entities.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImp implements UserService {
    @Override
    public UserEntity getUser(String id) {
        return null;
    }

    @Override
    public UserEntity updateUser(String id, UserEntity newUserDetails) {
        return null;
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return null;
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
