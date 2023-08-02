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
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  GoogleSigninButtonDirective,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';


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
    GoogleSigninButtonModule,
    SocialLoginModule,
    MatSlideToggleModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule, MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    AppRoutingModule,MatDialogModule,
    MatButtonModule, MatDividerModule, MatIconModule, BrowserAnimationsModule,MatExpansionModule
  ],

  providers: [ApiCallsService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '11691811536-ic9tsv3iaff2v2u68fta5cpouff22o5n.apps.googleusercontent.com'
            )
          },

        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
