import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../config.service";
import {DataFromServer} from "../data.from.server";
import {strict} from "assert";
import {$} from "protractor";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataFromServer: DataFromServer[] = [];
  enableEdit = false;
  enableDel = false;
  enableEditIndex = null;
  enableDelIndex = null;

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

  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  }
  enableDelMethod(e, i) {
    this.enableDel = true;
    this.enableDelIndex = i;
  }
    createNewPosition(input:string){
    this.configService.createData(input)
  }

  changeValue(id: number, value : string, e) {
    this.rowFromTable = new DataFromServer()
    this.rowFromTable.id=id;
    this.rowFromTable.value=value;
    this.configService.updateData(this.rowFromTable);
  }
}
