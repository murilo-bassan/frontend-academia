import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../../models/aluno';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private apiUrl = `${environment.apiUrl}/alunos`;

  constructor(private http: HttpClient) { }

  // listar todos os alunos
  getAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/listar`);
  }

  // criar um novo aluno
  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${this.apiUrl}/criar`, aluno);
  }

  // buscar aluno por id
  getById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/buscar/${id}`);
  }

  // atualizar aluno
  update(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/atualizar/${id}`, aluno);
  }

  // deletar aluno
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletar/${id}`);
  }
}
