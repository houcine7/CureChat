package com.chatCure.backend.Repositories;

import com.chatCure.backend.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity,String> {

    Optional<UserEntity> findByUsername(String username );

}
