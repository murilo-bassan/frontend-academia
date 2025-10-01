import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard';
import { ListaAlunos } from './features/alunos/lista-alunos';
import { FormAluno } from './features/alunos/form-aluno';
import { ListaPagamentos } from './features/pagamentos/lista-pagamentos';
import { FormPagamento } from './features/pagamentos/form-pagamento';
import { LoginComponent } from './features/login/login';
import { AuthGuard } from './core/auth-guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },

    { path: '', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'alunos', component: ListaAlunos, canActivate: [AuthGuard] },
    { path: 'alunos/novo', component: FormAluno, canActivate: [AuthGuard] },
    { path: 'alunos/:id/editar', component: FormAluno, canActivate: [AuthGuard] },
    { path: 'alunos/:id/pagamentos', component: ListaPagamentos, canActivate: [AuthGuard] },
    { path: 'alunos/:id/pagamentos/novo', component: FormPagamento, canActivate: [AuthGuard] },
    { path: 'pagamentos/:id/editar', component: FormPagamento, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '' }
];
