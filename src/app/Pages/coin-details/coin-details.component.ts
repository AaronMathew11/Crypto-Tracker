import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coin } from 'src/app/Models/Crypto';
import { ApiCallsService } from 'src/app/Service/api-calls.service';
import Chart from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { TrackDialogComponent } from 'src/app/Components/track-dialog/track-dialog.component';


@Component({
  selector: 'app-coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.css']
})
export class CoinDetailsComponent {

  panelOpenState = false;

  coinId : string;
  coinDetails : any ={};
  public chart: any;
  prices:number[]=[];
  time:string[]=[];
  endDate!:Date;
  startDate!:Date;

  constructor(private router: ActivatedRoute, private apicall :ApiCallsService,private matDialog: MatDialog){
    this.coinId = this.router.snapshot.paramMap.get('id')||"";
  }

  ngOnInit(){

    this.apicall.GetCoinData(this.coinId).subscribe(
      result=> {
        this.coinDetails=result;
        console.log("coin details are : ",this.coinDetails);
      }
    )

    console.log(Math.floor((Date.now()- 7*24*60*60*1000)/1000));
    console.log(Math.floor((Date.now())/1000));

    this.apicall.GetPriceRange(this.coinId, Math.floor((Date.now()- 0.1*24*60*60*1000)/1000),Math.floor(Date.now()/1000)).subscribe(
      result=>{
        console.log(result.prices)
        // for(let i=0;i<10;i++)
        // {
        //   this.prices.push(result.prices[i][1]);
        //   this.time.push(new Date(result.prices[i][0]).toLocaleDateString('en-US'));
        // }
        result.prices.forEach((element:any) => {
          this.prices.push(element[1]);
          this.time.push(new Date(element[0]).toLocaleDateString('en-US'));
        });

        console.log("prices : ",this.prices);
        console.log("time : ",this.time);
        this.createChart();

      }
    )



  }
  createChart(){

    console.log("prices in chart : ",this.prices)
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.time,
	       datasets: [
          {
            label: "Price",
            data: this.prices,
            backgroundColor: 'green'
          }
          // {
          //   label: "Profit",
          //   data: ['542', '542', '536', '327', '17',
					// 				 '0.00', '538', '541'],
          //   backgroundColor: 'limegreen'
          // }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

  openTrack()
  {
    var dialogref = this.matDialog.open(TrackDialogComponent, {
      width: '750px',
      data: this.coinDetails
    })
    // dialogref.afterClosed().subscribe(
    //   (result) => {

    //   }
    // )
  }

  applyDateFilter()
  {

  }



}
