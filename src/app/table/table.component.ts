import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../config.service";
import {DataFromServer} from "../data.from.server";

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
  tempEditValue: string;
  rowFromTable: DataFromServer;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
  }

  getDataBySearch() {
    this.configService.getData(this.inputLine).subscribe((data: DataFromServer[]) => {
      this.dataFromServer = data;
    });
  }

  deletePosition(e, rowFromTable: DataFromServer) {
    // @ts-ignore
    this.configService.deleteData(rowFromTable).subscribe();
    this.getCurrentDataAfterActions();
    this.enableDel=false;

  }

  getCurrentDataAfterActions() {
    this.getDataBySearch();
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
  tempValueForEdit(id: number, property: string, event: any){
    this.tempEditValue=event.target.textContent;
}
  editValue(id: number, value : string, e:any) {
    this.rowFromTable = new DataFromServer()
    this.rowFromTable.id=id;
    this.rowFromTable.value=value;
    this.configService.updateData(this.rowFromTable).subscribe();
    this.enableEdit=false;
  }
}
