package com.chatCure.backend.Entities;


import com.chatCure.backend.Models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "Users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

    @Id
    private String id;
    @Indexed(unique = true)
    private String username;

    private String firstName;
    private String lastName;
    private String avatar ;

    private Role role;
    private String password;


}
