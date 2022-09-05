import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postCandidate(data: any) {
    return this.http.post<any>("http://localhost:3000/candidateList/", data);
  }
  getCandidate() {
    return this.http.get<any>("http://localhost:3000/candidateList/");
  }
  putCandidate(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/candidateList/" + id, data);
  }
  deleteCandidate(id: number) {
    return this.http.delete<any>("http://localhost:3000/candidateList/" + id);
  }
}
