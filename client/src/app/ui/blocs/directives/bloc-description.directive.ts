import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appBlocDescription]'
})
export class BlocDescriptionDirective {
  constructor(public template: TemplateRef<any>) { }
}
