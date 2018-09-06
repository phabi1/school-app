import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Tool } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private _currentClassId: string;

  public tools: Tool[];

  constructor(
    private store: Store<any>,
    private toolsService: ToolsService,
  ) {
    this.store.pipe(select(getCurrentClassId)).subscribe((currentClassId) => this._currentClassId = currentClassId);
    this.tools = [];
  }

  ngOnInit() {
    this.toolsService.getAllTools().subscribe((res) => {
      this.tools = res.map((el) => {
        const tool = { ...el };
        tool.url = tool.url.replace('{classId}', this._currentClassId);
        return tool;
      });
    });
  }

}
