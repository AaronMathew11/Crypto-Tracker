import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/Service/api-calls.service';
import { Coin } from 'src/app/Models/Crypto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  constructor(private apicall :ApiCallsService, private router : Router)
  {

  }

  coinDetails! : Coin[] ;
  selectedCoin!:Coin;
  filteredCoinDetails: any[] = []; // Array to store the filtered coin details
  filter:string="";



  ngOnInit(){

    this.apicall.GetCardData().subscribe(
      result=>{
        this.coinDetails=result;
        this.filteredCoinDetails=result;
        console.log(result);
        this.selectedCoin=result[0];
      }
    )


  }

  applyDateFilter(){

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

}
