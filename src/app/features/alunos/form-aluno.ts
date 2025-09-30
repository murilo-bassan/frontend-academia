import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../../core/services/alunos.service';
import { Aluno } from '../../models/aluno';

@Component({
  selector: 'app-form-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-aluno.html',
  styleUrls: ['./form-aluno.scss']
})
export class FormAluno implements OnInit {
  form: FormGroup;
  idAluno: number | null = null;
  modoEdicao = false;

  constructor(
    private fb: FormBuilder,
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cep: [''],
      bairro: [''],
      logradouro: [''],
      numero: [''],
      dataNascimento: ['']
    });
  }

  ngOnInit(): void {
    this.idAluno = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idAluno) {
      this.modoEdicao = true;
      this.alunosService.getById(this.idAluno).subscribe({
        next: (aluno: Aluno) => this.form.patchValue(aluno),
        error: (err) => console.error('Erro ao carregar aluno:', err)
      });
    }
  }

  salvar() {
    if (this.form.valid) {
      if (this.modoEdicao && this.idAluno) {
        this.alunosService.update(this.idAluno, this.form.value).subscribe({
          next: () => {
            alert('Aluno atualizado com sucesso!');
            this.router.navigate(['/alunos']);
          },
          error: (err) => {
            console.error('Erro ao atualizar aluno:', err);
            alert('Erro ao atualizar aluno');
          }
        });
      } else {
        this.alunosService.create(this.form.value).subscribe({
          next: () => {
            alert('Aluno cadastrado com sucesso!');
            this.form.reset();
          },
          error: (err) => {
            console.error('Erro ao cadastrar aluno:', err);
            alert('Erro ao cadastrar aluno');
          }
        });
      }
    } else {
      alert('Preencha os campos obrigatórios!');
    }
  }
}
