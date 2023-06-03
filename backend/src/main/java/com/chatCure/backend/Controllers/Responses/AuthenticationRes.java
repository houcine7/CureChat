package com.chatCure.backend.Controllers.Responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRes {
    private String jwtToken ;
    private String username ;
    private String lastName ;
    private String firstName ;
    private String avatar ;
    private String id ;
}
