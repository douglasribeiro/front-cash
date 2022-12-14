import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FornecedorCreateComponent } from './fornecedor-create/fornecedor-create.component';


@NgModule({
  declarations: [
    FornecedorListComponent,
    FornecedorCreateComponent
  ],
  imports: [
    CommonModule,
    FornecedorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FornecedorModule { }
