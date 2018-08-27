import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirstnameLabelService } from '../../services/firstname-label.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public form: FormGroup;

  public layouts = [
    { data: 'layout1', label: '2 colonnes' },
    { data: 'layout2', label: '3 colonnes' },
  ];

  public alignments = [
    'center',
    'left',
    'right'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private firstnameLabelService: FirstnameLabelService
  ) {
    this.form = this.formBuilder.group({
      layout: ['layout1'],
      align: ['center']
    });
  }

  ngOnInit() {
  }

  generate(): void {
    const values = this.form.value;
    this.firstnameLabelService.generate({
      layout: values.layout,
      align: values.align,
    })
      .subscribe(() => { });
  }

}
