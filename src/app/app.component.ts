import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ITableData } from './interfaces/table-data.interface';
import { PROVINCES } from './const-data/provinces';
import { LocationService } from './services/location.service';
import { CITIES } from './const-data/cities';
import { ICities } from './interfaces/cities.interface';
import { DataGridComponent } from './templates/data-grid/data-grid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DataGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {


  tableData: ITableData[] = PROVINCES;
  cities: ICities[] = CITIES;
  editing: any = {};
  changedRowsObj!: any;

  changedRows(changes: any) {
    this.changedRowsObj = changes;
  }

  tableColumns = [
    { prop: 'ilid', name: 'İl' },
    { prop: 'id', name: 'İlçe Kodu' },
    { prop: 'name', name: 'İlçe Adı' },
  ];

  constructor(private locationService: LocationService) { }

  async ngOnInit() {
    this.tableData = this.locationService.getProvinces();
    this.cities = this.locationService.getCities();
    await this.locationService.fetchDataAndSaveToLocalStorage();

    const storedData = localStorage.getItem('tableData');
    if (storedData) {
      this.tableData = JSON.parse(storedData);
    }

    // LocationService'den yeni veri geldiğinde güncelle
    this.locationService.tableData$.subscribe((data) => {
      this.tableData = data;
    });
  }
}
