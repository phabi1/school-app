import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList,
  ViewEncapsulation,
  OnInit,
  AfterContentChecked
} from '@angular/core';
import { BlocComponent } from '../bloc/bloc.component';

@Component({
  selector: 'app-bloc-group',
  templateUrl: './bloc-group.component.html',
  styleUrls: ['./bloc-group.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BlocGroupComponent implements AfterContentInit, AfterContentChecked {

  @ContentChildren(BlocComponent) _groups: QueryList<BlocComponent>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngAfterContentChecked(): void {
    this._changeDetectorRef.markForCheck();
  }

  ngAfterContentInit(): void {
    this._changeDetectorRef.markForCheck();
  }

}
