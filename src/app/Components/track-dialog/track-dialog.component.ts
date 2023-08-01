import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCallsService } from 'src/app/Service/api-calls.service';

@Component({
  selector: 'app-track-dialog',
  templateUrl: './track-dialog.component.html',
  styleUrls: ['./track-dialog.component.css']
})
export class TrackDialogComponent {

  constructor(public dialogRef: MatDialogRef<TrackDialogComponent>, @Inject(MAT_DIALOG_DATA) public message:any, private apiCall : ApiCallsService){

  }

  ngOnInit(){
    console.log(this.message);
  }
}
