import { Component, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { UploaderOptions, UploadFile, UploadOutput, UploadInput } from 'ngx-uploader';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-student-picture-picker',
  templateUrl: './student-picture-picker.component.html',
  styleUrls: ['./student-picture-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentPicturePickerComponent {

  public options: UploaderOptions;
  public files: UploadFile[];
  public uploadInput: EventEmitter<UploadInput>;
  public dragOver: boolean;

  public picture: string;

  @Input()
  set defaultUrl(url: string) {
    this.picture = '/api/' + url;
  }

  @Output() urlChanged = new EventEmitter<string>();

  constructor() {
    this.options = { concurrency: 1 };
    this.uploadInput = new EventEmitter<UploadInput>();
    this.files = [];
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      const event: UploadInput = {
        type: 'uploadAll',
        url: '/api/classes/students/picture',
        method: 'POST',
        data: {}
      };
      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {
      const response = output.file.response;
      this.picture = '/api/classes/students/picture/' + response.fileName;
      this.urlChanged.emit(output.file.response.path);
    }
  }

  delete(): void {
    this.picture = null;
  }

}
