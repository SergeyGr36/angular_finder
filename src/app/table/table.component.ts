import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../config.service";
import {DataFromServer} from "../data.from.server";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataFromServer: DataFromServer[] = [];
  id: number;
  value: string;
  inputLine: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
  }

  sendInputLine() {
    this.configService.getData(this.inputLine).subscribe((data: DataFromServer[]) => {
      this.dataFromServer = data;
    });
  }

  private fillTableFromResult() {
    this.dataFromServer.forEach(l => {
      this.id = l.id
      this.value = l.value;
    })
  }

}
