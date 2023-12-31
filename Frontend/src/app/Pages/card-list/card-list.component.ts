import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/Service/api-calls.service';
import { Coin } from 'src/app/Models/Crypto';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TrackDialogComponent } from 'src/app/Components/track-dialog/track-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/Service/user.service';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})


export class CardListComponent {
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
onResize(event: any) {
  this.screenWidth = event.target.innerWidth;
}

  user:any;
  constructor(private apicall :ApiCallsService, private router : Router,private matDialog: MatDialog, private userService: UserService)
  {
    this.screenWidth = window.innerWidth;
    this.user = this.userService.getUser();
  }

  viewTrackList:boolean=false;
  coinDetails! : Coin[] ;
  selectedCoin:any={};
  trackList:any[]=[];
  filteredCoinDetails: any[] = []; // Array to store the filtered coin details
  filter:string="";
  displayedColumns: string[] = ['Name','Price', '24H%', 'Market_Cap', 'ATH', '%ATH'];
  dataSource!: MatTableDataSource<any>;



  ngOnInit(){

    this.apicall.GetCardData().subscribe(
      result=>{
        this.coinDetails=result;
        this.filteredCoinDetails=result;
        console.log(result);
        this.selectedCoin=result[0];
      }
    )
    this.apicall.GetTaskList().subscribe(
     async result=>{
      this.trackList=[];

        console.log("tasklist is :",result.data);

        for(let i=0;i<result.data.length;i++)
        {
          console.log(result.data[i].userEmail);
          if(result.data[i].userEmail==this.user.email){
          this.apicall.GetCoinData(result.data[i].id).subscribe(
            result=>{
              this.trackList.push(result);
            }
          )
        }
        }
        this.dataSource= new MatTableDataSource<any>(this.trackList);
        console.log("my datasource : ",this.dataSource.data);

      }
    )


  }


  toggleTrackList()
  {
    this.viewTrackList=!this.viewTrackList;
  }

  handleDataFromChild(data:Coin)
  {
    this.selectedCoin=data;
    console.log(this.selectedCoin);
  }

  openAnalytics(id: string)
  {
    this.router.navigate([`/details/${id}`]);
  }

  applyFilter(e: any) {
    console.log(e.target.value);
    this.filter = (e.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredCoinDetails = this.filter
      ? this.coinDetails.filter(coin => coin.name.includes(this.filter))
      : this.coinDetails;
  }

  matchesFilter(coin: any): boolean {
    return coin.name.toLowerCase().includes(this.filter);
  }

  async openTrack(coinDetails:any)
  {
    const coin: any = await this.apicall.GetCoinData(coinDetails.id).toPromise();
    console.log("coin is: ", coin);

    var dialogref = this.matDialog.open(TrackDialogComponent, {
      width: '750px',
      data: coin
    })
    dialogref.afterClosed().subscribe(
      (result) => {
        this.apicall.GetTaskList().subscribe(
          async result=>{
            this.trackList=[];
             console.log("tasklist is :",result.data);

             for(let i=0;i<result.data.length;i++)
             {
              if(result.data[i].userEmail==this.user.email){
               this.apicall.GetCoinData(result.data[i].id).subscribe(
                 result=>{
                   this.trackList.push(result);
                 }
               )
             }}
             this.dataSource= new MatTableDataSource<any>(this.trackList);
             console.log("my datasource : ",this.dataSource.data);

           }
         )
      }
    )
  }

  Analytics(id:string)
  {
    this.router.navigate([`/details/${id}`]);

  }
  onDblClick(id:string)
  {
    this.router.navigate([`/details/${id}`]);
  }

  getDivStyle() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1268) {
      return {
        'width': '70%'
      };
    } else {
      return {
        'width': '100%'
      };
    }
  }

}
