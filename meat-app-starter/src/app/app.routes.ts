import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { LoggedInGuard } from './security/loggedin.guard';

export const ROUTES: Routes = [       // rotas mais genéricas deverão ficar mais em baixo
  {path: '', component: HomeComponent},
  {path: 'login/:to', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'restaurants/:id', component: RestaurantDetailComponent,
    children: [
      {path :  '', redirectTo: 'menu', pathMatch: 'full'},  // senão informar nada depois de restaurants/:id
      {path :  'menu', component: MenuComponent},
      {path :  'reviews', component: ReviewsComponent}
    ]},
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'order', loadChildren : './order/order.module#OrderModule',  //carregamento lazy
    canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
  {path: 'about', loadChildren: './about/about.module#AboutModule'},  //carregamento lazy
  {path: 'order-summary', component: OrderSummaryComponent},
  {path: '**', component: NotFoundComponent}
];
