package com.chatCure.backend.Repositories;

import com.chatCure.backend.Entities.MessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<MessageEntity,String> {

//    Optional<UserEntity> findByName(String name );

}
