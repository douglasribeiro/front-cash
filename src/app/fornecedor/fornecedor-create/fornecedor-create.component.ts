import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fornecedor } from 'src/app/model/fornecedor';
import { FornecedorService } from 'src/app/service/fornecedor.service';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  novo: boolean = false;
  address: boolean = false;
  phone: boolean = false;
  refer: boolean = false;
  formulario: boolean = true;
  selectedValue: string;
  pessoasOp: any[];

 
  fornecedor: Fornecedor = {
    id:         '',
    nome:       '',
    email:      '',
    telefone:   '',
    observacao: ''
  }

  id:           FormControl = new FormControl(null);
  nome:         FormControl = new FormControl(null, [Validators.required]);
  email:        FormControl = new FormControl(null);
  telefone:     FormControl = new FormControl(null);
  observacao:   FormControl = new FormControl(null);
  
  constructor(
    private service: FornecedorService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') !== null){
      this.fornecedor.id = this.route.snapshot.paramMap.get('id');
      this.findById();
      this.novo = false;
    }else{
      this.novo = true;
    }
  }

  busca($event){
    let datePipe = new DatePipe("pt-BR");
    let data = datePipe.transform(new Date($event.value), "dd/MM/yyyy");
  }

  findById() :void{
    this.service.findbyId(this.fornecedor.id).subscribe(resposta => {
      this.fornecedor = resposta;
    })
  }

  validaCampos(){
    return this.nome.valid;
  }

  create() {  
    if(!this.novo) {
      this.update()
    } else {
      this.service.create(this.fornecedor).subscribe(resposta => {
        this.toast.success('Inquilino criado com sucesso.', 'Cadastro')
        this.router.navigate(['fornecedor'])
      }, ex => {
        if(ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      })
    }
  }

  update(){
    this.service.update(this.fornecedor).subscribe(resposta => {
      this.toast.success('Fornecedor alterado com sucesso.', 'Cadastro')
      this.router.navigate(['fornecedor'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
  
  
}