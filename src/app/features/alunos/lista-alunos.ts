import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AlunosService } from '../../core/services/alunos.service';
import { Aluno } from '../../models/aluno';
import { PagamentosService } from '../../core/services/pagamentos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule, RouterModule, MatFormFieldModule, 
    MatInputModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatTooltipModule],
  templateUrl: './lista-alunos.html',
  styleUrls: ['./lista-alunos.scss']
})
export class ListaAlunos implements OnInit {
  alunos: Aluno[] = [];
  displayedColumns: string[] = ['id', 'nome', 'email', 'telefone', 'dataNascimento', 'cpf', 
    'cep', 'bairro', 'logradouro', 'numero', 'acoes'];

  filtro: string = '';
  dataSource = new MatTableDataSource<Aluno>();
  statusFiltro: 'todos' | 'pendentes' | 'emDia' = 'todos';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private alunosService: AlunosService,
    private pagamentosService: PagamentosService,
    private router: Router
  ) { }

  alunoEditando: Aluno | null = null;

  ngOnInit(): void {
    this.alunosService.getAll().subscribe({
      next: (dados) => {
        this.alunos = dados;
        this.dataSource.data = dados;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Erro ao carregar alunos:', err)
    });
  }

  aplicarFiltro() {
    const filtroLower = this.filtro?.toLowerCase() || '';  
    this.dataSource.data = this.alunos.filter(aluno =>
      (aluno.nome?.toLowerCase() || '').includes(filtroLower) ||
      (aluno.email?.toLowerCase() || '').includes(filtroLower) ||
      (aluno.telefone?.toLowerCase() || '').includes(filtroLower) ||
      (aluno.cpf?.toLowerCase() || '').includes(filtroLower)
    );
  }

  aplicarFiltroStatus(tipo: 'todos' | 'pendentes' | 'emDia') {
    this.statusFiltro = tipo;

    const filtroLower = this.filtro.toLowerCase();

    if (tipo === 'todos') {
      this.dataSource.data = this.alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(filtroLower) ||
        aluno.email.toLowerCase().includes(filtroLower) ||
        aluno.telefone.toLowerCase().includes(filtroLower) ||
        aluno.cpf.toLowerCase().includes(filtroLower)
      );
      return;
    }

    // monta um array de observables (uma requisição por aluno)
    const requests = this.alunos.map(aluno =>
      this.pagamentosService.getUltimoPagamento(aluno.id).pipe(
        // retorna objeto com aluno + status
        // se der erro (sem pagamentos), marca como pendente
        // importante: evita quebrar o forkJoin
        (source) => new Observable(observer => {
          source.subscribe({
            next: (ultimoPag) => {
              const hoje = new Date();
              let emDia = false;

              if (ultimoPag?.vencimento) {
                const vencimento = new Date(ultimoPag.vencimento);
                emDia = vencimento >= hoje;
              }

              observer.next({ aluno, emDia });
              observer.complete();
            },
            error: () => {
              observer.next({ aluno, emDia: false });
              observer.complete();
            }
          });
        })
      )
    );

    // espera todos terminarem
    forkJoin(requests).subscribe((resultados: any[]) => {
      this.dataSource.data = resultados
        .filter(r => {
          if (tipo === 'emDia') return r.emDia;
          if (tipo === 'pendentes') return !r.emDia;
          return true;
        })
        .map(r => r.aluno)
        .filter(aluno =>
          aluno.nome.toLowerCase().includes(filtroLower) ||
          aluno.email.toLowerCase().includes(filtroLower) ||
          aluno.telefone.toLowerCase().includes(filtroLower) ||
          aluno.cpf.toLowerCase().includes(filtroLower)
        );
    });
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar este aluno?')) {
      this.alunosService.delete(id).subscribe({
        next: () => this.alunos = this.alunos.filter(a => a.id !== id),
        error: (err) => console.error('Erro ao deletar aluno:', err)
      });
    }
  }

  irParaEdicao(idAluno: number): void {
    this.router.navigate([`/alunos/${idAluno}/editar`]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
