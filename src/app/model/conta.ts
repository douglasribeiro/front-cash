import { Fornecedor } from "./fornecedor";
import { Situacao } from "./situacao";
import { Usuario } from "./usuario";

export interface Conta {
    
    id: number;
    descr: string;
	fornecedor: Fornecedor;
	situacao: Situacao;
	dtVenc: Date;
	includeDate: Date;
	dtPagto: Date;
	valorInicial: number;
	valorJuro: number;
	valorDesconto: number;
	valorPago: number;
	usuario: Usuario;
	replica: number;
}