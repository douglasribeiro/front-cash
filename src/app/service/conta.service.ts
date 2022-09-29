import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Conta } from '../model/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  conta: Conta;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${API_CONFIG.baseUrl}/conta`)
  }

  findbyId(id: any): Observable<Conta> {
    return this.http.get<Conta>(`${API_CONFIG.baseUrl}/conta/${id}`) 
  }

  create(conta: Conta): Observable<Conta> {    
    if(conta.replica)
      return this.http.post<Conta>(`${API_CONFIG.baseUrl}/conta/${conta.replica}`, conta);
    else
      return this.http.post<Conta>(`${API_CONFIG.baseUrl}/conta/`, conta);
  }

  private replicaconta(conta: Conta){
    
    for(let i = 0; i < conta.replica; i++) {
      conta.dtVenc = this.add_month(conta.dtVenc,i);
      this.http.post<Conta>(`${API_CONFIG.baseUrl}/conta/`, conta);
    }; 
  }

  add_month(d, m): any{
    var date = new Date(d);
    var month = date.getMonth();
    var n_date = new Date(date.getFullYear(), eval(m+month), date.getDate());
    return n_date;
  }

  update(conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${API_CONFIG.baseUrl}/conta/${conta.id}`, conta);
  }

  findDataVenc(data: String): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${API_CONFIG.baseUrl}/conta/lista?date=${data}`);
  }

  filtroBetween(dtIni: string, dtFim: string): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${API_CONFIG.baseUrl}/conta/between?dtIni=${dtIni}&dtFim=${dtFim}`);
  }
}