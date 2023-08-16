package com.example.accommodationService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    @Generated
    @Id
    private String id;
    private String streetName;
    private String streetNumber;
    private String postalCode;
    private String city;
    private String country;
}
