package com.chatCure.backend.Controllers;

import com.chatCure.backend.Entities.MessageEntity;
import com.chatCure.backend.Repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // Get all messages
    @GetMapping
    public ResponseEntity<List<MessageEntity>> getAllMessages() {
        List<MessageEntity> messages = messageRepository.findAll();
        return ResponseEntity.ok(messages);
    }

    // Get a specific message by ID
    @GetMapping("/{id}")
    public ResponseEntity<MessageEntity> getMessageById(@PathVariable("id") String id) {
        Optional<MessageEntity> message = messageRepository.findById(id);
        return message.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Create a new message
    @PostMapping
    public ResponseEntity<MessageEntity> createMessage(@RequestBody MessageEntity message) {
        MessageEntity savedMessage = messageRepository.save(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }

    // Update an existing message
    @PutMapping("/{id}")
    public ResponseEntity<MessageEntity> updateMessage(
            @PathVariable("id") String id, @RequestBody MessageEntity message) {
        Optional<MessageEntity> existingMessage = messageRepository.findById(id);
        if (existingMessage.isPresent()) {
            MessageEntity updatedMessage = existingMessage.get();
            if(message.getQuestion()!=null) updatedMessage.setQuestion(message.getQuestion());
            if (message.getAnswer()!=null) updatedMessage.setAnswer(message.getAnswer());
            if (message.getDate()!=null) updatedMessage.setDate(message.getDate());
            if (message.getConversationId()!=null) updatedMessage.setConversationId(message.getConversationId());

            MessageEntity savedMessage = messageRepository.save(updatedMessage);
            return ResponseEntity.ok(savedMessage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a message by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessageById(@PathVariable("id") String id) {
        Optional<MessageEntity> message = messageRepository.findById(id);
        if (message.isPresent()) {
            messageRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
