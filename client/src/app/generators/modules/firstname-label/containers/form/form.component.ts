import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirstnameLabelService } from '../../services/firstname-label.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private firstnameLabelService: FirstnameLabelService
  ) { }

  ngOnInit() {
  }

  generate(): void {
    this.firstnameLabelService.generate()
    .subscribe(() => { });
  }

}
