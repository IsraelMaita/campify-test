import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent {

  //nameFormControl = new FormControl('', [Validators.required]);
  formGroup = new FormGroup ({
    nameFormControl: new FormControl('', [Validators.required]),
    startDateFormControl: new FormControl(new Date()),
    startTimeFormControl: new FormControl('', [Validators.required]),
    endTimeFormControl: new FormControl('', [Validators.required])
  });

  constructor( public dialogRef: MatDialogRef<AddSessionComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onSaveData(): void {

    let sessions = localStorage.getItem("sessions");
    let sessionArray = [];

    if (sessions === null) {
      sessionArray = [];
    }
    else {
      sessionArray = JSON.parse(sessions);
    }

    sessionArray.push({
      "index": sessionArray.length,
      "name": this.formGroup.get('nameFormControl')?.value !,
      "startDate": this.formGroup.get('startDateFormControl')?.value !,
      "startTime": this.formGroup.get('startTimeFormControl')?.value !,
      "endTime": this.formGroup.get('endTimeFormControl')?.value !,
    });

    localStorage.setItem("sessions", JSON.stringify(sessionArray));
    
  }

  verifyTime() : void {
    let a: string = this.formGroup.get('startTimeFormControl')?.value !;
    let b: string = this.formGroup.get('endTimeFormControl')?.value !;
    let timeVerification = this.timeVerifier(a,b);

    if (timeVerification === null) {
      this.formGroup.controls.startDateFormControl.updateValueAndValidity();
      this.formGroup.controls.endTimeFormControl.updateValueAndValidity();
    }
    else if (timeVerification['sameTime']) {
      this.formGroup.controls.startTimeFormControl.setErrors({'sameTime': true});
      this.formGroup.controls.endTimeFormControl.setErrors({'sameTime': true});
    }
    else if (timeVerification['timeExceed']) {
      this.formGroup.controls.startTimeFormControl.setErrors({'timeExceed': true});
      this.formGroup.controls.endTimeFormControl.setErrors({'timeExceed': true});
    }
  }

  timeVerifier(a: string, b: string) : any {

    // Verify that start time and end time are not empty
    if (a === '' || b === '') {
      return null;
    }
    
    // Verify that start time and end time are not the same
    if (a === b) {
      return { 'sameTime': true }
    }
  
    let aHour = Date.UTC(0,0,0,parseInt(a.split(":")[0],10),parseInt(a.split(":")[1],10));
    let bHour = Date.UTC(0,0,0,parseInt(b.split(":")[0],10),parseInt(b.split(":")[1],10));
  
    // Verify that end time exceed start time
    if (aHour > bHour) {
      return { 'timeExceed' : true }
    }
    return null;
    
  }

}