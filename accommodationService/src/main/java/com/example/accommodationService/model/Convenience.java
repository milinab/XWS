package com.example.accommodationService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Convenience {
    private boolean wifi;
    private boolean kitchen;
    private boolean airConditioner;
    private boolean parking;
}
