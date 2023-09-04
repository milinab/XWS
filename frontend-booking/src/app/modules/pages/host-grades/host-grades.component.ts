import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../booking/services/token-storage.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../booking/services/auth.service";
import {HostGrade} from "../../booking/model/hostGrade";

@Component({
  selector: 'app-host-grades',
  templateUrl: './host-grades.component.html',
  styleUrls: ['./host-grades.component.css']
})
export class HostGradesComponent implements OnInit {
  hostId: string='';
  hostGrades: HostGrade[] = [];
  averageGrade: number = 0;

  constructor(private authService: AuthService, private route: ActivatedRoute, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    // Get the host ID from the route parameter
    this.route.paramMap.subscribe(params => {
      this.hostId = this.tokenStorageService.getUser().id;
      this.loadHostGrades();
    });
  }

  loadHostGrades() {
    this.authService.getHostGradesByHostId(this.hostId).subscribe(
      (grades: HostGrade[]) => {
        this.hostGrades = grades;

        // Calculate the average grade
        const totalGrades = this.hostGrades.reduce((total, grade) => total + grade.value, 0);
        this.averageGrade = this.hostGrades.length > 0 ? totalGrades / this.hostGrades.length : 0;
      },
      (error) => {
        console.error('Error loading host grades:', error);
      }
    );
  }
}
