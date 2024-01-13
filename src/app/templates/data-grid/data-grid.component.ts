import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ColumnMode } from '../../enums/column-mode.enum';
import { NgIf } from '@angular/common';
import { CITIES } from '../../const-data/cities';
import { ICities } from '../../interfaces/cities.interface';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [NgIf, FormsModule, NgxDatatableModule],
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

  editing: any = {};
  ColumnMode = ColumnMode;

  constructor() {
    console.log(this.columns);
  }

  updateValue(event: KeyboardEvent | any, rowIndex: any, col: any) {
    console.log('inline editing rowIndex', rowIndex);
    if (event.key == '4') {
      this.editing[rowIndex] = false;
      this.rows[rowIndex][col] = event.target.value || '';
      this.rows = [...this.rows];
      console.log('UPDATED!', this.rows[rowIndex][col]);
    }
  }

  onEdit(row: any) {
    console.log('Edit clicked for row:', row);
    this.editing[row.$$index] = true;
  }

  onSave(row: any) {
    console.log('Save clicked for row:', row);
    delete this.editing[row.$$index];
  }
}
