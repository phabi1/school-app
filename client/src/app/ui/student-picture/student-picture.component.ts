import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-student-picture',
  templateUrl: './student-picture.component.html',
  styleUrls: ['./student-picture.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentPictureComponent implements OnInit, OnChanges {

  public pictureUrl: string;
  public imgStyle: any;

  @Input() url: string;

  @Input() sex: string;

  @Input() size: number;

  constructor() {
    this.size = 50;
  }

  ngOnInit() {
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
    let url = this.url;
    if (!url) {
      if (this.sex === 'FEMALE') {
        url = '/assets/images/students/placeholders/girl.png';
      } else {
        url = '/assets/images/students/placeholders/boy.png';
      }
    }
    this.pictureUrl = url;
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
