import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCallsService } from 'src/app/Service/api-calls.service';

@Component({
  selector: 'app-track-dialog',
  templateUrl: './track-dialog.component.html',
  styleUrls: ['./track-dialog.component.css']
})
export class TrackDialogComponent {

  upperLimit:string="";
  lowerLimit:string="";
  emailSubscription :boolean =false;

  constructor(public dialogRef: MatDialogRef<TrackDialogComponent>, @Inject(MAT_DIALOG_DATA) public message:any, private apiCall : ApiCallsService){

  }

  ngOnInit(){
    console.log(this.message);
  }

  toggleSubscription(){
    this.emailSubscription=!this.emailSubscription;
  }

  submit()
  {
    var coin={
      id: this.message.id,
      upperLimit : this.upperLimit,
      lowerLimit : this.lowerLimit,
      updateEmail : this.emailSubscription
    }
    this.apiCall.AddToTaskList(coin).subscribe(
      result=>{
        console.log(result);
        if(result.status==200)
        {
          //handle toast here
        }
      }
    )

  }


}
