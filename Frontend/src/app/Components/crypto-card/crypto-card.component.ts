import { Component,Input,EventEmitter,Output } from '@angular/core';
import { Coin } from 'src/app/Models/Crypto';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css']
})
export class CryptoCardComponent {
  @Input() coin!: Coin;
  @Output() dataEvent = new EventEmitter<Coin>();
  
  moveToCoinData(id :string)
  {
    const data= this.coin;
    this.dataEvent.emit(data);
  }
}
