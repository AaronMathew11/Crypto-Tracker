import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCallsService } from 'src/app/Service/api-calls.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-track-dialog',
  templateUrl: './track-dialog.component.html',
  styleUrls: ['./track-dialog.component.css']
})
export class TrackDialogComponent {

  upperLimit:string="";
  lowerLimit:string="";
  emailSubscription :boolean =false;
  user: any;


  constructor(public dialogRef: MatDialogRef<TrackDialogComponent>, @Inject(MAT_DIALOG_DATA) public message:any, private apiCall : ApiCallsService,private userService: UserService){
    this.user = this.userService.getUser();
  }

  ngOnInit(){
    console.log("this is it",this.message);
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
      updateEmail : this.emailSubscription,
      currentPrice : this.message.market_data.current_price.usd,
      email : this.user.email
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
