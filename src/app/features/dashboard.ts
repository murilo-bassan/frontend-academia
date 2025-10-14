import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Chart } from 'chart.js/auto';

import { PagamentosService } from '../core/services/pagamentos.service';
import { Pagamento } from '../models/pagamento';
import { AlunosService } from '../core/services/alunos.service';
import { Aluno } from '../models/aluno';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  // Propriedades exibidas nos cards
  totalAlunos = 0;
  alunosAtivos = 0;
  pagamentosMes = 0;
  totalMes = 0;

  // Lista usada na tabela
  ultimosPagamentos: Pagamento[] = [];

  constructor(
    private pagamentosService: PagamentosService,
    private alunosService: AlunosService
  ) { }

  ngOnInit(): void {
    this.alunosService.getAll().subscribe({
      next: (alunos: Aluno[]) => {
        this.totalAlunos = alunos.length;
        this.alunosAtivos = alunos.length;

        // só chama pagamentos depois que já temos alunos
        this.carregarPagamentos();
      },
      error: (err) => console.error('Erro ao carregar alunos:', err)
    });
  }

  private carregarAlunos(): void {
    this.alunosService.getAll().subscribe({
      next: (alunos: Aluno[]) => {
        this.totalAlunos = alunos.length;
        this.alunosAtivos = alunos.length; // por enquanto considera todos ativos
      },
      error: (err) => console.error('Erro ao carregar alunos:', err)
    });
  }

  private carregarPagamentos(): void {
    this.pagamentosService.getAll().subscribe({
      next: (dados: Pagamento[]) => {
        this.ultimosPagamentos = dados.slice(-5).reverse();

        const hoje = new Date();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

        // Filtra apenas os pagamentos do mês atual
        const pagamentosDoMes = dados.filter(p => {
          const dataPag = new Date(p.data);
          return dataPag.getMonth() === mesAtual && dataPag.getFullYear() === anoAtual;
        });

        // Conta quantos pagamentos ocorreram no mês
        this.pagamentosMes = pagamentosDoMes.length;

        // 💰 Soma o valor total dos pagamentos do mês
        this.totalMes = pagamentosDoMes.reduce((acc, p) => acc + (p.valor || 0), 0);

        // Calcula pagos e pendentes
        const pagos = dados.filter(p => {
          if (!p.vencimento) return false;
          const vencimento = new Date(p.vencimento);
          return vencimento >= hoje;
        }).length;

        const pendentes = this.totalAlunos - pagos;

        this.createPieChart(pagos, pendentes);
      },
      error: (err) => console.error('Erro ao carregar pagamentos:', err)
    });
  }


  private createPieChart(pagos: number, pendentes: number): void {
    new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ['Pagos', 'Pendentes'],
        datasets: [{
          data: [pagos, pendentes],
          backgroundColor: ['#1E3A8A', '#8ba5ebff'] // azul e azul claro
        }]
      }
    });
  }
}
