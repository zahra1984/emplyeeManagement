import { FreedomHappienes } from './../../dto/freedomHappienes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FreedomHappienesService {
  private apiServiceUrl = environment.apiBaseUrl;
  private fhObs: BehaviorSubject<FreedomHappienes[]> = new BehaviorSubject<
    FreedomHappienes[]
  >([]);

  getDataFreedomHappienes(): Observable<FreedomHappienes[]> {
    return this.fhObs.asObservable();
  }
  setDataFreedomHappines(newData: FreedomHappienes[]) {
    this.fhObs.next(newData);
  }
  constructor(private http: HttpClient) {}

  public addFreedomHappines(
    freedomHappienes: FreedomHappienes[]
  ): Observable<any> {
    return this.http.post<any>(
      this.apiServiceUrl + '/freedomHappienes/saveall',
      freedomHappienes
    );
  }
}
