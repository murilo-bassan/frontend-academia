import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PagamentosService } from '../../core/services/pagamentos.service';
import { Pagamento } from '../../models/pagamento';

@Component({
  selector: 'app-form-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-pagamento.html',
  styleUrls: ['./form-pagamento.scss']
})
export class FormPagamento {
  idAluno!: number;
  idPagamento: number | null = null;
  modoEdicao = false;

  pagamento: Pagamento = {
    valor: 0,
    data: '',
    hora: '',
    vencimento: '',
    aluno: { 
      id: 0, 
      nome: '', 
      email: '', 
      telefone: '', 
      cpf: '', 
      cep: '',
      numero: '', 
      bairro: '',
      logradouro: '',
      dataNascimento: ''
    }
  };

  

  constructor(
    private pagamentosService: PagamentosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.idAluno = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.idAluno = Number(this.route.snapshot.paramMap.get('idAluno') || this.route.snapshot.paramMap.get('id'));

    if (this.router.url.includes('/editar')) {
      this.idPagamento = Number(this.route.snapshot.paramMap.get('id'));
      if (this.idPagamento) {
        this.modoEdicao = true;
        this.pagamentosService.getById(this.idPagamento).subscribe({
          next: (p) => this.pagamento = p,
          error: (err) => console.error('Erro ao carregar pagamento:', err),
        });
      }
    } else {
      this.pagamento = { 
        valor: 0, 
        data: '', 
        hora: '', 
        vencimento: '', 
        aluno: { 
          id: this.idAluno, 
          nome: '', 
          email: '', 
          telefone: '', 
          cpf: '', 
          cep: '', 
          numero: '', 
          bairro: '', 
          logradouro: '', 
          dataNascimento: '' 
        } 
      };
    }
  }


  salvar(): void {
    if (this.pagamento.hora && this.pagamento.hora.length === 5) {
      this.pagamento.hora += ':00';
    }
    
    if (this.modoEdicao && this.idPagamento) {
      this.pagamentosService.update(this.idPagamento, this.pagamento).subscribe({
        next: () => this.router.navigate([`/alunos/${this.pagamento.aluno?.id ?? this.idAluno}/pagamentos`]),
        error: (err) => console.error('Erro ao atualizar pagamento:', err)
      });
    } else {
      this.pagamentosService.create(this.idAluno, this.pagamento).subscribe({
        next: () => this.router.navigate([`/alunos/${this.idAluno}/pagamentos`]),
        error: (err) => console.error('Erro ao salvar pagamento:', err)
      });
    }
  }

}
