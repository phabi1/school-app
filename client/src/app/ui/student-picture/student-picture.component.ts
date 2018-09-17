import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-student-picture',
  templateUrl: './student-picture.component.html',
  styleUrls: ['./student-picture.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentPictureComponent implements OnChanges {

  public pictureUrl: string;
  public imgStyle: any;

  @Input() url: string;

  @Input() size: number;

  constructor() {
    this.size = 50;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.updateImageStyle();
    }
    if (changes['url']) {
      this.updateUrl();
    }
  }

  private updateUrl(): void {
    this.pictureUrl = this.url;
  }

  private updateImageStyle(): void {
    this.imgStyle = {
      maxWidth: '100%',
      borderRadius: '50%',
      width: this.size,
      height: this.size,
    };
  }

}
