import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewServiceService {
  constructor(private http: HttpClient) { }

  getCompany(url: any) {
    return this.http.get(url);
  }

  addCompany(url: any, param: any) {
    return this.http.post(url, param)
  }

  updateCompany(url: any, id: any, data: any) {
    return this.http.put(`${url}/${id}`, data)
  }
  deleteCompany(url: any, id: any) {
    return this.http.delete(`${url}/${id}`)
  }
}
