package com.example.accommodationService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Accommodation {
    @Generated
    @Id
    private String id;
    private String name;
    private Address address;
    private Convenience convenience;
    private List<String> photos;
    private Integer minNumberOfGuests;
    private Integer maxNumberOfGuests;
}
