import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FirstnameLabelService } from '../../services/firstname-label.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;

  public levelOptions$: Observable<{ data: string, label: string }[]>;

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
    private firstnameLabelService: FirstnameLabelService,
  ) {
    this.form = this.formBuilder.group({
      levels: this.formBuilder.array([]),
      layout: ['layout1'],
      align: ['center']
    });
  }

  ngOnInit() {
    this.levelOptions$ = this.firstnameLabelService.getLevels().pipe(
      map((levels) => levels.map((level) => ({ data: level.id, label: level.name }))),
      tap((options) => {
        const checkboxes = options.map(() => this.formBuilder.control(false));
        const control = this.formBuilder.array(checkboxes);
        this.form.setControl('levels', control);
      })
    );
  }

  generate(): void {
    const values = this.form.value;

    const options: any = {
      layout: values.layout,
      align: values.align,
    };

    options.levels = [];

    this.firstnameLabelService.generate({
      students: ['1', '2', '11', '20'],
      layout: values.layout,
      align: values.align,
    })
      .subscribe(() => { });
  }

}
