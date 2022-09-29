import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasCreateComponent } from './contas-create/contas-create.component';
import { ContasListComponent } from './contas-list/contas-list.component';

const routes: Routes = [
  {path: '', component: ContasListComponent},
  {path: 'create', component: ContasCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContasRoutingModule { }
