import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorCreateComponent } from './fornecedor-create/fornecedor-create.component';
import { FornecedorListComponent } from './fornecedor-list/fornecedor-list.component';

const routes: Routes = [
  {path: '', component: FornecedorListComponent},
  {path: 'create', component: FornecedorCreateComponent},
  {path: 'update/:id', component: FornecedorCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
