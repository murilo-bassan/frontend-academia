import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PagamentosService } from '../../core/services/pagamentos.service';
import { Pagamento } from '../../models/pagamento';

@Component({
  selector: 'app-lista-pagamentos',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './lista-pagamentos.html',
  styleUrls: ['./lista-pagamentos.scss']
})
export class ListaPagamentos implements OnInit {
  pagamentos: Pagamento[] = [];
  displayedColumns: string[] = ['id', 'data', 'vencimento', 'hora', 'valor', 'acoes'];

  idAluno!: number;

  constructor(
    private pagamentosService: PagamentosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idAluno = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarPagamentos();
  }

  carregarPagamentos(): void {
    this.pagamentosService.getByAluno(this.idAluno).subscribe({
      next: (dados) => this.pagamentos = dados,
      error: (err) => console.error('Erro ao carregar pagamentos:', err)
    });
  }

  irParaNovoPagamento(): void {
    this.router.navigate([`/alunos/${this.idAluno}/pagamentos/novo`]);
  }

  irParaEdicao(idPagamento: number): void {
    this.router.navigate([`/pagamentos/${idPagamento}/editar`]);
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar este pagamento?')) {
      this.pagamentosService.delete(id).subscribe({
        next: () => this.carregarPagamentos(),
        error: (err) => console.error('Erro ao deletar pagamento:', err)
      });
    }
  }
}
