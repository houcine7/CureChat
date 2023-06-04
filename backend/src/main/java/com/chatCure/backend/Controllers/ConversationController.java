package com.chatCure.backend.Controllers;

import com.chatCure.backend.Entities.ConversationEntity;
import com.chatCure.backend.Entities.MessageEntity;
import com.chatCure.backend.Repositories.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationRepository conversationRepository;

    @Autowired
    public ConversationController(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    // Get all conversations
    @GetMapping
    public ResponseEntity<List<ConversationEntity>> getAllConversations() {
        List<ConversationEntity> conversations = conversationRepository.findAll();
        return ResponseEntity.ok(conversations);
    }

    // Get a specific conversation by ID
    @GetMapping("/{id}")
    public ResponseEntity<ConversationEntity> getConversationById(@PathVariable("id") String id) {
        Optional<ConversationEntity> conversation = conversationRepository.findById(id);
        return conversation.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Create a new conversation
    @PostMapping
    public ResponseEntity<ConversationEntity> createConversation(@RequestBody ConversationEntity conversation) {
        ConversationEntity savedConversation = conversationRepository.save(conversation);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedConversation);
    }

    // Update an existing conversation
    @PutMapping("/{id}")
    public ResponseEntity<ConversationEntity> updateConversation(@PathVariable("id") String id, @RequestBody ConversationEntity conversation) {
        Optional<ConversationEntity> existingConversation = conversationRepository.findById(id);
        if (existingConversation.isPresent()) {
            List<MessageEntity> existingMessages = existingConversation.get().getMessages();
            if (existingMessages != null) {
                List<MessageEntity> newMessages = conversation.getMessages();
                if (newMessages != null) {
                    existingMessages.addAll(newMessages);
                }
            }
            ConversationEntity existingConversationEntity = existingConversation.get();
            if (conversation.getName()!=null) existingConversationEntity.setName(conversation.getName());
            if(conversation.getUserId()!=null) existingConversationEntity.setUserId(conversation.getUserId());
            ConversationEntity updatedConversation = conversationRepository.save(existingConversationEntity);
            return ResponseEntity.ok(updatedConversation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a conversation by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConversationById(@PathVariable("id") String id) {
        Optional<ConversationEntity> conversation = conversationRepository.findById(id);
        if (conversation.isPresent()) {
            conversationRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
