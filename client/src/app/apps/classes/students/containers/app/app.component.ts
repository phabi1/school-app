import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, first } from 'rxjs/operators';
import { DeselectAllStudents, SelectAllStudents, SetSearchText, ConfirmDeleteStudents } from '../../actions/student.actions';
import { Student } from '../../models/student.model';
import { getSearchText, getSelectedStudents, getStudentResults } from '../../selectors/student.selectors';
import { Go } from '../../../../../store/actions/router.actions';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';

@Component({
  selector: 'app-classes-students-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  public searchInput: FormControl;
  public searchText$: Observable<string>;

  public students$: Observable<Student[]>;
  public students: Student[];

  public selectedStudent$: Observable<Student[]>;
  public selectedStudents: Student[];
  public hasSelectedStudents: boolean;

  public isIndeterminate: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _store: Store<any>,
    private _fuseSidebarService: FuseSidebarService
  ) {

    this._unsubscribeAll = new Subject();

    this.students$ = this._store.pipe(select(getStudentResults));
    this.selectedStudent$ = this._store.pipe(select(getSelectedStudents));
    this.searchText$ = this._store.pipe(select(getSearchText));

    this.searchInput = new FormControl();
  }

  ngOnInit(): void {

    this.students$
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((students) => this.students = students);

    this.selectedStudent$
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((selectedStudents) => {
        this.selectedStudents = selectedStudents;
        this.hasSelectedStudents = selectedStudents.length > 0;
        this.isIndeterminate = this.students.length !== selectedStudents.length && selectedStudents.length > 0;
        this._changeDetectorRef.markForCheck();
      });

    this.searchText$.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe((searchText) => this.searchInput.setValue(searchText));

    this.searchInput.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this._store.dispatch(new SetSearchText({ text: searchText }));
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.unsubscribe();
  }

  toggleSelectAll(event): void {
    event.preventDefault();
    if (this.selectedStudents.length && this.selectedStudents.length > 0) {
      this.deselectAllStudents();
    } else {
      this.selectAllStudents();
    }
  }

  selectAllStudents(): void {
    this._store.dispatch(new SelectAllStudents());
  }

  deselectAllStudents(): void {
    this._store.dispatch(new DeselectAllStudents());
  }

  toggleSidebar(key: string): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  deleteSelectedStudents() {
    this._store.dispatch(new ConfirmDeleteStudents({ students: this.selectedStudents }));
  }
  printSelectedStudents() {
    this._store.pipe(
      select(getCurrentClassId),
      first(),
    ).subscribe((currentClassId) => {
      this._store.dispatch(new Go({
        path: ['/apps/classes/' + currentClassId + '/generators/firstname-label'],
        queryParams: { s: this.selectedStudents.map(s => s.id).join(',') }
      }));
    });
  }

}
