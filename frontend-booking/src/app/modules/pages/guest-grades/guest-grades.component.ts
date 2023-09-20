import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../booking/services/token-storage.service";
import {HostGrade} from "../../booking/model/hostGrade";
import {AuthService} from "../../booking/services/auth.service";

@Component({
  selector: 'app-guest-grades',
  templateUrl: './guest-grades.component.html',
  styleUrls: ['./guest-grades.component.css']
})
export class GuestGradesComponent implements OnInit {
  guestId: string = '';
  guestGrades: HostGrade[] = [];
  selectedGrade: HostGrade | null = null;


  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {
    this.guestId = tokenStorageService.getUser().id;
  }

  ngOnInit(): void {
    this.loadGuestGrades();

  }


  loadGuestGrades() {
    this.authService.getGradesByGuestId(this.guestId).subscribe(
      (grades: HostGrade[]) => {
        this.guestGrades = grades;
      },
      (error) => {
        console.error('Error loading host grades:', error);
      }
    );
  }

  editGrade(grade: HostGrade) {
    // Set the selectedGrade to the grade you want to edit
    this.selectedGrade = grade;
  }

  updateGrade(grade: HostGrade) {
    if (grade) {
      this.authService.updateHostGrade(grade.id, grade).subscribe(
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
      this.authService.deleteHostGrade(id).subscribe(
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
