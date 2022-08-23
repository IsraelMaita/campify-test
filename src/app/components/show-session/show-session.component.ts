import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-session',
  templateUrl: './show-session.component.html',
  styleUrls: ['./show-session.component.scss']
})
export class ShowSessionComponent {

  displayedColumns: string[] = ['index', 'name', 'startDate', 'startTime', 'endTime'];
  dataSource = [];

  constructor( public dialogRef: MatDialogRef<ShowSessionComponent>) {
    let sessions = localStorage.getItem("sessions");
    let sessionArray = [];

    if (sessions === null) {
      sessionArray = [];
    }
    else {
      sessionArray = JSON.parse(sessions);      
    }

    this.dataSource = sessionArray;
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
