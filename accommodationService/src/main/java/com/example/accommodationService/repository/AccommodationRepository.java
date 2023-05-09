package com.example.accommodationService.repository;

import com.example.accommodationService.model.Accommodation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccommodationRepository extends MongoRepository<Accommodation, String> {
}
