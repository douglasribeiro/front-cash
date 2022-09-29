import { Perfil } from "./perfil";

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    perfis: Set<number>;
}