import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSessionComponent } from './components/add-session/add-session.component';
import { ShowSessionComponent } from './components/show-session/show-session.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'campifyTest';

  name: string | undefined;
  startDate: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;

  constructor(public dialog: MatDialog) { }

  openAddSessionDialog(): void {
    const dialogRef = this.dialog.open(AddSessionComponent, {
      width: '25rem'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  openShowSessionsDialog(): void {
    const dialogRef = this.dialog.open(ShowSessionComponent, {
      width: '50rem'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}
