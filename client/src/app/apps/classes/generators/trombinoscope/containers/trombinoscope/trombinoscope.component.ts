import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Generate } from '../../actions/trombinoscope.actions';

@Component({
  selector: 'app-trombinoscope',
  templateUrl: './trombinoscope.component.html',
  styleUrls: ['./trombinoscope.component.scss']
})
export class TrombinoscopeComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  generate() {
    this.store.dispatch(new Generate());
  }

}
