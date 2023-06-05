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
@RequestMapping("/api/conversations")
@CrossOrigin(origins = "*")
public class ConversationController {

    @Autowired
    private ConversationRepository conversationRepository;

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

    @PostMapping("/1")
    public void test() {
        System.out.println("test succeeded");
    }

    // Update an existing conversation
    @PutMapping("/{id}")
    public ResponseEntity<ConversationEntity> updateConversation(@PathVariable("id") String id,
            @RequestBody ConversationEntity conversation) {
        ConversationEntity existingConversation = conversationRepository.findById(id).orElseThrow();

        List<MessageEntity> existingMessages = existingConversation.getMessages();
        List<MessageEntity> newMessages = conversation.getMessages();

        System.out.println("liist messages getting");
        if (newMessages != null) {
            if (existingMessages != null) {
                System.out.println("heeere 2");
                existingMessages.addAll(newMessages);
                existingConversation.setMessages(existingMessages);
            } else {
                System.out.println("heeere1 ++++ ");
                existingConversation.setMessages(newMessages);
            }
        }

        if (conversation.getName() != null)
            existingConversation.setName(conversation.getName());
        if (conversation.getUserId() != null)
            existingConversation.setUserId(conversation.getUserId());
        ConversationEntity updatedConversation = conversationRepository.save(existingConversation);
        return ResponseEntity.ok(updatedConversation);
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
