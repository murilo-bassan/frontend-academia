import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard';
import { ListaAlunos } from './features/alunos/lista-alunos';
import { FormAluno } from './features/alunos/form-aluno';
import { ListaPagamentos } from './features/pagamentos/lista-pagamentos';
import { FormPagamento } from './features/pagamentos/form-pagamento';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'alunos', component: ListaAlunos },
    { path: 'alunos/novo', component: FormAluno },
    { path: 'alunos/:id/editar', component: FormAluno },
    { path: 'alunos/:id/pagamentos', component: ListaPagamentos },
    { path: 'alunos/:id/pagamentos/novo', component: FormPagamento },
    { path: 'pagamentos/:id/editar', component: FormPagamento },
    { path: '**', redirectTo: '' }
];
