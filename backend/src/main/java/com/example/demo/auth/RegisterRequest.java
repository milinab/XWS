package com.example.demo.auth;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    public String firstName;
    public String lastName;
    public String email;
    private String username;
    private String password;
}
