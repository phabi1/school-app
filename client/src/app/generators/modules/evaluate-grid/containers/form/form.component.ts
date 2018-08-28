import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EvaluateGridService } from '../../services/evaluate-grid.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private evaluateGridService: EvaluateGridService,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  generate(): void {
    this.evaluateGridService.generate().subscribe(() => { });
  }

}
