import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../../models/pagamento';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {
  private apiUrl = `${environment.apiUrl}/pagamentos`;

  constructor(private http: HttpClient) { }

  // listar pagamentos de um aluno
  getByAluno(idAluno: number): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/aluno/${idAluno}`);
  }

  // criar pagamento para um aluno
  create(idAluno: number, pagamento: Pagamento): Observable<Pagamento> {
    return this.http.post<Pagamento>(`${this.apiUrl}/criar/${idAluno}`, pagamento);
  }

  // atualizar pagamento
  update(id: number, pagamento: Pagamento): Observable<Pagamento> {
    return this.http.put<Pagamento>(`${this.apiUrl}/atualizar/${id}`, pagamento);
  }

  // deletar pagamento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
  }

  getUltimos(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/ultimos`);
  }

  getById(id: number): Observable<Pagamento> {
    return this.http.get<Pagamento>(`${this.apiUrl}/buscar/${id}`);
  }

  getUltimoPagamento(idAluno: number) {
    return this.http.get<Pagamento>(`${this.apiUrl}/aluno/${idAluno}/ultimo`);
  }

  getAll(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}/listar`);
  }


}
