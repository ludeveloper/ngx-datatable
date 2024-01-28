
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ColumnMode } from '../../enums/column-mode.enum';
import { NgIf } from '@angular/common';
import { ICities } from '../../interfaces/cities.interface';
import { LocationService } from '../../services/location.service';
import { ITableData } from '../../interfaces/table-data.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [
    NgIf,
    NgxDatatableModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.css',
})
export class DataGridComponent {
  @Input()
  rows!: any[];

  @Input()
  columns!: any[];

  @Input()
  cities!: ICities[];

  @Output() changedRowsEmitter = new EventEmitter<any[]>();

  editing: any = {};
  changedRows: any[] = [];


  ColumnMode = ColumnMode;

  constructor(private locationService: LocationService) {
  }

  updateStorageUpdatedRows(updatedData: ITableData[]) {
    localStorage.setItem('updatedRows', JSON.stringify(updatedData));

  }
  updateStorageTableData(updatedData: ITableData[]) {
    localStorage.setItem('tableData', JSON.stringify(updatedData));
    this.locationService.tableDataSubject.next(updatedData);
  }
  onChangeRow(event: any) {
    console.log(event)
  }

  onChange(event: any, rowIndex: any, col: string | object) {

    if (event.key == 'Enter') {
      this.editing[rowIndex] = false;
    } else if (event.type == 'click') {
      this.editing[rowIndex] = false
    }

    this.updateCell(event, rowIndex, col)
  }

  updateCell(event: any, rowIndex: any, value: string | object) {
    let col;
    if (typeof (value) == 'string') {
      col = value;
      this.rows[rowIndex][col] = event.target?.value || event.value || event || '';
    } else {
      this.rows[rowIndex] = value
    }

    this.rows = [...this.rows];
    const index: number = this.changedRows?.findIndex((row: any) => row.index === rowIndex)
    // eğer ilgili satırda ilk defa değişiklik yapıldıysa if, else

    if (index < 0) {
      this.changedRows.push({
        index: rowIndex,
        ...this.rows[rowIndex]
      })
      this.changedRowsEmitter.emit(this.changedRows);
    } else {
      col ?
        this.changedRows[index][col] = this.rows[rowIndex][col] :
        this.changedRows[index] = {
          index: rowIndex,
          ...this.rows[rowIndex]
        }
      this.changedRowsEmitter.emit(this.changedRows);
    }

    this.updateStorageUpdatedRows(this.changedRows)

    this.updateStorageTableData(this.rows)
  }

}
