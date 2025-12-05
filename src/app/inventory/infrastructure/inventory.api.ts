import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { InventoryMonth } from '../domain/model/inventory-month.entity';
import { InventoryMonthResource } from './inventory.response';
import { InventoryAssembler } from './inventory.assembler';

@Injectable({
  providedIn: 'root'
})
export class InventoryApi {
  //private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/inventories';
  private apiUrl = 'http://localhost:3000/inventories';
  private http = inject(HttpClient);

  getAll(): Observable<InventoryMonth[]> {
    return this.http.get<InventoryMonthResource[]>(this.apiUrl).pipe(
      map(response => InventoryAssembler.toEntitiesFromResponse(response))
    );
  }
}
