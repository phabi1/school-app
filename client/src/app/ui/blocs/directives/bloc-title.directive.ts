import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appBlocTitle]'
})
export class BlocTitleDirective {

  constructor(public template: TemplateRef<any>) { }

}
