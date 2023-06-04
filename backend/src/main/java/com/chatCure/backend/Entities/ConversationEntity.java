package com.chatCure.backend.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(value = "Conversations")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConversationEntity {
    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String userId;
    private Date startDate;
}
