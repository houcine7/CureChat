package com.chatCure.backend.Repositories;

import com.chatCure.backend.Entities.ConversationEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ConversationRepository extends MongoRepository<ConversationEntity,String> {

//    Optional<UserEntity> findByName(String name );

}
