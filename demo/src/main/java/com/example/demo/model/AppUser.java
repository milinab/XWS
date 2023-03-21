package com.example.demo.model;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class AppUser {
    @Id
    private String id;
    //@Indexed(unique = true)
    ////spring.data.mongodb.auto-index-creation=true
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;


    public AppUser(String username, String firstName, String lastName, String email, String password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
