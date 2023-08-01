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


  ngOnInit(){

    this.apicall.GetCardData().subscribe(
      result=>{
        this.coinDetails=result;
        console.log(result);
        this.selectedCoin=result[0];
      }
    )


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

}
