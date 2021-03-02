import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../config.service";
import {DataFromServer} from "../data.from.server";
import {strict} from "assert";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataFromServer: DataFromServer[] = [];
  // enableEdit = false;
  // enableEditIndex = null;
  enableDel = false;
  enableDelIndex = null;
  id: number;
  value: string;
  inputLine: string;
  rowFromTable: DataFromServer;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
  }

  sendInputLine() {
    this.configService.getData(this.inputLine).subscribe((data: DataFromServer[]) => {
      this.dataFromServer = data;
    });
  }

  deletePosition(e, rowFromTable: DataFromServer) {
    // @ts-ignore
    this.configService.deleteData(rowFromTable).subscribe();
    this.getCurrentDataAfterActions();

  }

  getCurrentDataAfterActions() {
    this.sendInputLine();
  }

  enableDelMethod(e, i) {
    this.enableDel = true;
    this.enableDelIndex = i;
  }
    createNewPosition(input:string){
    this.configService.createData(input)
  }
}
