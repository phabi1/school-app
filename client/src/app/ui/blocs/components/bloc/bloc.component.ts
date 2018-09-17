import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BlocDescriptionDirective } from '../../directives/bloc-description.directive';
import { BlocTitleDirective } from '../../directives/bloc-title.directive';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocComponent {

  @Input() title: string;

  @Input() description: string;

  @ContentChild(BlocTitleDirective) titleTemplate: BlocTitleDirective;
  @ContentChild(BlocDescriptionDirective) descriptionTemplate: BlocDescriptionDirective;

  @ViewChild(TemplateRef) _implicitContent: TemplateRef<any>;

  constructor() { }

}
