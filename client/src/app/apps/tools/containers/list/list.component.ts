import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tool } from '../../models/tool.model';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public tools: Tool[];

  constructor(
    private store: Store<any>,
    private toolsService: ToolsService,
  ) {
    this.tools = [];
  }

  ngOnInit() {
    this.toolsService.getAllTools().subscribe((res) => {
      this.tools = res;
    });
  }

}
