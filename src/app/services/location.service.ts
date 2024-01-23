import { Injectable } from '@angular/core';
import { CITIES } from '../const-data/cities';
import { PROVINCES } from '../const-data/provinces';
import { BehaviorSubject } from 'rxjs';
import { ITableData } from '../interfaces/table-data.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  tableDataSubject = new BehaviorSubject<ITableData[]>([]);
  tableData$ = this.tableDataSubject.asObservable();


  getCities() {
    return CITIES;
  }

  getProvinces() {
    return PROVINCES;
  }

  async fetchDataAndSaveToLocalStorage(): Promise<void> {

    const fetchedData = this.getProvinces();

    localStorage.setItem('tableData', JSON.stringify(fetchedData));

    this.tableDataSubject.next(fetchedData);
  }

}
