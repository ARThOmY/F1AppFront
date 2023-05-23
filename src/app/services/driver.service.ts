import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private url = 'http://localhost:8080/Piloto'
  constructor(private http : HttpClient) { }

  getAll() : Observable<any>{
    return this.http.get(this.url + '/getAll')
  }

  delete(id : number) : Observable<any>{
    return this.http.post(this.url + "/" + id + "/delete", null)
  }
  add(piloto : Driver, teamId : number) : Observable<any>{
    return this.http.post(this.url + "/" + teamId + "/add",piloto)
  }
  edit(p : Driver, id : Number) : Observable<any>{
    return this.http.post(this.url + "/" + id +"/update",p)
  }
}
