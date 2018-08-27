import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<any>,
  ) {
    this.form = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      sex: ['MALE']
    });
  }

  ngOnInit() {
  }

  add() {
    const values = this.form.value;
    const student = {
      firstname: values.firstname,
      lastname: values.lastname,
    };
    // this.store.dispatch(new AddStudent());
  }

}
