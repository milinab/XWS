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

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {
    this.guestId = tokenStorageService.getUser().id;
  }

  ngOnInit(): void {
    this.loadHostGrades();

  }


  loadHostGrades() {
    this.authService.getGradesByGuestId(this.guestId).subscribe(
      (grades: HostGrade[]) => {
        this.guestGrades = grades;
      },
      (error) => {
        console.error('Error loading host grades:', error);
      }
    );
  }

}
