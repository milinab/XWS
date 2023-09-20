import { Component, OnInit } from '@angular/core';
import {HostGrade} from "../../booking/model/hostGrade";
import {AuthService} from "../../booking/services/auth.service";
import {TokenStorageService} from "../../booking/services/token-storage.service";
import {AccommodationService} from "../../booking/services/accommodation.service";
import {AccomodationGrade} from "../../booking/model/accomodationGrade.model";

@Component({
  selector: 'app-guest-grades-accomodation',
  templateUrl: './guest-grades-accomodation.component.html',
  styleUrls: ['./guest-grades-accomodation.component.css']
})
export class GuestGradesAccomodationComponent implements OnInit {
  guestId: string = '';
  guestGrades: AccomodationGrade[] = [];
  selectedGrade: AccomodationGrade | null = null;

  constructor(private accomodationService: AccommodationService, private tokenStorageService: TokenStorageService) {
    this.guestId = tokenStorageService.getUser().id;
  }

  ngOnInit(): void {
    this.loadGuestGrades();
  }

  loadGuestGrades() {
    this.accomodationService.getGradesByGuestId(this.guestId).subscribe(
      (grades: AccomodationGrade[]) => {
        this.guestGrades = grades;
      },
      (error) => {
        console.error('Error loading host grades:', error);
      }
    );
  }
  editGrade(grade: AccomodationGrade) {
    // Set the selectedGrade to the grade you want to edit
    this.selectedGrade = grade;
  }

  updateGrade(grade: AccomodationGrade) {
    if (grade) {
      this.accomodationService.updateAccomodationGrade(grade.id, grade).subscribe(
        () => {
          console.log('Grade updated successfully.');
          this.selectedGrade = null; // Clear the selectedGrade
        },
        (error) => {
          console.error('Error updating grade:', error);
        }
      );
    }
  }

  deleteGrade(id: string) {
    if (id) {
      this.accomodationService.deleteHostGrade(id).subscribe(
        () => {
          console.log('Grade deleted successfully.');
          this.loadGuestGrades(); // Reload the list after deletion
        },
        (error) => {
          console.error('Error deleting grade:', error);
        }
      );
    }
  }
}
