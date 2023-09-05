import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SettingsComponent} from "../../settings/settings.component";
import {UserService} from "../../../services/user.service";
import {AvailablePeriodService} from "../../booking/services/availablePeriod.service";
import {AvailablePeriodDto} from "../../booking/model/availablePeriodDto";

@Component({
  selector: 'app-edit-period',
  templateUrl: './edit-period.component.html',
  styleUrls: ['./edit-period.component.css']
})
export class EditPeriodComponent implements OnInit {

  oldPeriod: AvailablePeriodDto = new AvailablePeriodDto();
  newPeriod: AvailablePeriodDto = new AvailablePeriodDto();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SettingsComponent>, private availablePeriodService: AvailablePeriodService) {
    this.oldPeriod = data;
    console.log(this.oldPeriod)
    this.newPeriod.id = data.id;
    this.newPeriod.accomodationId = data.accomodationId;
  }

  ngOnInit(): void {
    console.log(this.oldPeriod);
  }

  savePeriod() {
    console.log(this.newPeriod)
    this.newPeriod.id = this.data.id;
    this.newPeriod.accomodationId = this.data.accomodationId;
    this.availablePeriodService.update(this.newPeriod).subscribe({
    next: (response) => {
      // Handle the successful response here
      console.log('Request successful:', response);
      alert("Successfully changed!");
    },
    error: (error) => {
      // Handle any errors here
      console.error('Error:', error);
      alert("There was an error changing your information!");
    }
  })
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
