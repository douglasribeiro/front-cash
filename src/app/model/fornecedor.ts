import { Usuario } from "./usuario";

export interface Fornecedor{
    
    id: string;
	nome: String;
    email: string;
    telefone: string;
    observacao: string;
    usuario: Usuario;
}