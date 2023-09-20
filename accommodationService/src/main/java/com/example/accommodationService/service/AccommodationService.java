package com.example.accommodationService.service;

import com.example.accommodationService.model.Accommodation;
import com.example.accommodationService.repository.AccommodationRepository;
import org.springframework.stereotype.Service;

@Service
public class AccommodationService {

    private AccommodationRepository accommodationRepository;

    private AccommodationService(AccommodationRepository accommodationRepository){
        this.accommodationRepository = accommodationRepository;
    }
    public Accommodation createAccommodation(Accommodation accommodation) {
        return accommodationRepository.save(accommodation);
    }
}
