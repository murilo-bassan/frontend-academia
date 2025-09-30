import { Aluno } from "./aluno";

export interface Pagamento {
    id?: number;  // agora opcional
    valor: number;
    data: string;
    hora: string;
    vencimento?: string; // também pode ser opcional
    aluno?: {
        id: number;
        nome: string;
        email: string;
        telefone: string;
        cpf: string;
        cep: string;
        numero: string;
        bairro: string;
        logradouro: string;
        dataNascimento: string;
    };
}

