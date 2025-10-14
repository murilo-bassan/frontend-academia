import { Pagamento } from "./pagamento";

export interface Aluno {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    cep: string;
    bairro: string;
    logradouro: string;
    numero: string;
    dataNascimento: string;
    observacao?: string;
    pagamentos?: Pagamento[];
}
