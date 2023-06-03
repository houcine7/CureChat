package com.chatCure.backend.Controllers.Requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterReq {
    private String username ;
    private String firstName;
    private String lastName;
    private String password ;
    private String avatar ;
}
