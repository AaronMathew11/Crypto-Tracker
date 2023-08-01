import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoCardComponent } from './Components/crypto-card/crypto-card.component';
import { CardListComponent } from './Pages/card-list/card-list.component';
import { ApiCallsService } from './Service/api-calls.service';
import { CoinDetailsComponent } from './Pages/coin-details/coin-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { TrackDialogComponent } from './Components/track-dialog/track-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CryptoCardComponent,
    CardListComponent,
    CoinDetailsComponent,
    TrackDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,MatDialogModule,
    MatButtonModule, MatDividerModule, MatIconModule, BrowserAnimationsModule,MatExpansionModule
  ],
  providers: [ApiCallsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
