import { Component,HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  screenWidth: number;
  coinId : string;
  coinDetails : any ={};
  public chart: any;
  prices:number[]=[];
  time:string[]=[];
  endDate!:Date;
  startDate!:Date;

  constructor(private router: ActivatedRoute, private apicall :ApiCallsService,private matDialog: MatDialog,private router2 : Router){
    this.coinId = this.router.snapshot.paramMap.get('id')||"";
    this.screenWidth = window.innerWidth;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
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
          const timeString = new Date(element[0]).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });
          this.time.push(timeString);        });

        console.log("prices : ",this.prices);
        console.log("time : ",this.time);
        this.createChart();

      }
    )



  }
  createChart(){
    if (this.chart) {
      // Destroy the existing chart instance if it exists
      this.chart.destroy();
    }

    console.log("prices in chart : ",this.prices)
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.time,
	       datasets: [
          {
            label: "Price",
            data: this.prices,
            backgroundColor: 'green',
            pointRadius: 1,
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Price',
            },
          },
        }
      }

    });
  }

  toggleToday=false;
  filterTodays(){
    this.toggleToday=!this.toggleToday;
    this.toggleMonth=false;
    this.toggleWeek=false;

    if(this.toggleToday==true)
    {
      this.prices=[];
      this.time=[];
      this.apicall.GetPriceRange(this.coinId, Math.floor((Date.now()- 0.1*24*60*60*1000)/1000),Math.floor(Date.now()/1000)).subscribe(result=>{
        result.prices.forEach((element:any) => {
          this.prices.push(element[1]);
          const timeString = new Date(element[0]).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });
          this.time.push(timeString);        });

        console.log("prices : ",this.prices);
        console.log("time : ",this.time);
        this.createChart();
      });
    }
  }

  toggleWeek=false;
    filterWeek(){
      this.toggleWeek=!this.toggleWeek;
      this.toggleMonth=false;
      this.toggleToday=false;
      if(this.toggleWeek==true)
      {
        this.prices=[];
        this.time=[];
        this.apicall.GetPriceRange(this.coinId, Math.floor((Date.now()- 7*24*60*60*1000)/1000),Math.floor(Date.now()/1000)).subscribe(result=>{
          result.prices.forEach((element:any) => {
            this.prices.push(element[1]);
            this.time.push(new Date(element[0]).toLocaleDateString('en-US'));
          });

          console.log("prices : ",this.prices);
          console.log("time : ",this.time);
          this.createChart();
        });
      }
  }


  toggleMonth=false;
    filterMonth(){
      this.toggleMonth=!this.toggleMonth;
      this.toggleToday=false;
      this.toggleWeek=false;
      if(this.toggleMonth==true)
      {
        this.prices=[];
        this.time=[];
        this.apicall.GetPriceRange(this.coinId, Math.floor((Date.now()- 30*24*60*60*1000)/1000),Math.floor(Date.now()/1000)).subscribe(result=>{
          result.prices.forEach((element:any) => {
            this.prices.push(element[1]);
            this.time.push(new Date(element[0]).toLocaleDateString('en-US'));
          });

          console.log("prices : ",this.prices);
          console.log("time : ",this.time);
          this.createChart();
        });
      }
  }

  back()
  {
    this.router2.navigate(['/']);

  }

  openTrack()
  {
    var dialogref = this.matDialog.open(TrackDialogComponent, {
      width: '750px',
      data: this.coinDetails
    })
    dialogref.afterClosed().subscribe(
      (result) => {

      }
    )
  }

  getFlexClasses() {
    if (this.screenWidth >= 1268) {
      return 'flex flex-row';
    } else {
      return 'flex flex-col';
    }
  }


}
