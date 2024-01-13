// location.service.ts

import { Injectable } from '@angular/core';
import { CITIES } from '../const-data/cities';
import { PROVINCES } from '../const-data/provinces';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getCities() {
    return CITIES;
  }

  getProvinces() {
    return PROVINCES;
  }
}
