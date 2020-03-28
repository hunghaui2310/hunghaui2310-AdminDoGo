import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public downloadExcel(json: any[], excelFileName: string): void {
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('workSheet: ', workSheet);
    const workBook: XLSX.WorkBook = { Sheets: { ['data']: workSheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    this.saveFileExcel(excelBuffer, excelFileName);
  }

  saveFileExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime());
  }
}
