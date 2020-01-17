import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrderComponent } from './order.component';
import { Injectable } from '@angular/core';

@Injectable()
export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
  canDeactivate(orderComaponent: OrderComponent,
                activatedRoute: ActivatedRouteSnapshot,
                routerState: RouterStateSnapshot): boolean  {

      if (!orderComaponent.isOrderCompleted()) {
        return window.confirm('Deseja desistir da compra?')
      } else {
        return true;
      }
  }




}
