import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Conta } from 'src/app/model/conta';
import { Fornecedor } from 'src/app/model/fornecedor';
import { Situacao } from 'src/app/model/situacao';
import { Usuario } from 'src/app/model/usuario';
import { ContaService } from 'src/app/service/conta.service';
import { FornecedorService } from 'src/app/service/fornecedor.service';

@Component({
  selector: 'app-contas-create',
  templateUrl: './contas-create.component.html',
  styleUrls: ['./contas-create.component.css']
})

export class ContasCreateComponent implements OnInit {

  fornecedores: Fornecedor[];
  form: FormGroup;
  situacao = Situacao;
  keys: any;
 
 
  conta: Conta = {
    id: null,
    descr: '',
	  fornecedor: null,
	  situacao: null,
	  dtVenc: null,
	  includeDate: null,
	  dtPagto: null,
	  valorInicial: null,
	  valorJuro: null,
	  valorDesconto: null,
	  valorPago: null,
	  usuario: null,
    replica: null
  }
  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private contaService: ContaService
  ) { 
    this.keys = Object.keys(this.situacao).filter(k => !isNaN(Number(k)));
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id:    [''],
      descr: ['',[Validators.required]],
	    fornecedor: ['',[Validators.required]] ,
	    situacao:      ['',[Validators.required]],
	    dtVenc:        ['',[Validators.required]],
	    includeDate:   [''],
	    dtPagto:       [''],
	    valorInicial:  ['',[Validators.required]],
	    valorJuro:     [''],
	    valorDesconto: [''],
	    valorPago:     [''],
	    usuario: [''],
      replica: ['']
    })
    this.fornecedorService.findAll().subscribe(f => {
      this.fornecedores = f;
      console.log("Fornecedores", f);
      this.form.get('usuario').setValue(this.fornecedores[0].usuario.id)  
    });
    
  }

  create(){
    console.log('Saida form ', this.form.value)
    //this.conta = this.form.value;
    //this.conta.dtVenc = null;
    //this.conta.valorInicial = 55.00
    this.contaService.create(this.form.value).subscribe(retorno => console.log(retorno))
  }

  validaCampos(){
    return this.form.valid;
  }

}
