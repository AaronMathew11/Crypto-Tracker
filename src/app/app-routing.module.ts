import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './Pages/card-list/card-list.component';
import { CoinDetailsComponent } from './Pages/coin-details/coin-details.component';

const routes: Routes = [
  {
    path : '',
    component:CardListComponent,

  },
  {
    path : 'details/:id',
    component:CoinDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
