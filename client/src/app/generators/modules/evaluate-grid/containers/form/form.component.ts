import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EvaluateGridService } from '../../services/evaluate-grid.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;

  public layoutOptions$: Observable<any[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private evaluateGridService: EvaluateGridService,
    private store: Store<any>
  ) {
    this.form = this._formBuilder.group({
      layout: ['layout1', Validators.required],
    });
  }

  ngOnInit() {
    this.layoutOptions$ = this.evaluateGridService.getLayoutOptions();
  }

  generate(): void {
    const values = this.form.value;
    const options = {
      layout: values.layout,
    };
    this.evaluateGridService.generate(options).subscribe(() => { });
  }

}
