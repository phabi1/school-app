import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { Subscription } from 'rxjs';
import { getCurrentClassId } from '../../store/selectors/class.selectors';

@Injectable({
  providedIn: 'root'
})
export class NavigationUpdatorService {

  private _subscriptions: Subscription[];

  constructor(
    private _store: Store<any>,
    private _navigationService: FuseNavigationService
  ) {
    this._subscriptions = [];
  }

  public register(item: string, fn: (item: any) => Subscription, navigation?: string): void {
    const i = this._navigationService.getNavigationItem(item, navigation);
    if (i) {
      const obs = fn(i);
      this._subscriptions.push(obs);
    }
  }

  public registerAll() {
    this.register('students', (item) => {
      return this._store.pipe(
        select(getCurrentClassId)
      ).subscribe((currentClassId) => {
        item.url = '/apps/classes/' + currentClassId + '/students';
      });
    });
  }
}
