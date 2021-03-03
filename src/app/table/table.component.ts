import {Component, Renderer2,OnInit} from '@angular/core';
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
  enableCreate=false;
  enableDel = false;
  enableEditIndex = null;
  enableDelIndex = null;

  value: string;
  inputLine: string;
  tempEditValue: string;
  rowFromTable: DataFromServer;
  createLineRecord: string;

  constructor(private configService: ConfigService, public renderer: Renderer2) {
  }

  ngOnInit(): void {

  }

  getDataBySearch(search:string) {
    this.configService.getData(search).subscribe((data: DataFromServer[]) => {
      data.forEach(v=>{
        if(v.value==null){
          v.value="";
        }
      })
      this.dataFromServer = data;
    });
  }

  createNewPosition(input:string){
    this.configService.createData(input).subscribe();
    this.enableCreate=false;
  }

  editValue(id: number, value : string) {
    this.rowFromTable = new DataFromServer()
    this.rowFromTable.id=id;
    this.rowFromTable.value=value;
    this.configService.updateData(this.rowFromTable).subscribe();
    this.enableEdit=false;
    if (value.includes(this.inputLine)){
      this.getDataBySearch(this.inputLine)
    } else { this.getDataBySearch(" asa#!a5qr w[p0_!")} //todo call current route again.
  }

  deletePosition(e, rowFromTable: DataFromServer) {
    // @ts-ignore
    this.configService.deleteData(rowFromTable).subscribe();
    this.getCurrentDataAfterActions();
    this.enableDel=false;

  }

  getCurrentDataAfterActions() {
    this.getDataBySearch(null);
  }
  enableCreateMethod(){
    this.enableCreate=true;
  }
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
  }
  enableDelMethod(e, i) {
    this.enableDel = true;
    this.enableDelIndex = i;
  }

  tempValueForEdit(id: number, property: string, event: any){
    this.tempEditValue=event.target.textContent;
}

}
