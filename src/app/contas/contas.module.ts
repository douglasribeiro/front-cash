import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ContasRoutingModule } from './contas-routing.module';
import { ContasListComponent } from './contas-list/contas-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContasCreateComponent } from './contas-create/contas-create.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
  declarations: [
    ContasListComponent,
    ContasCreateComponent
  ],
  imports: [
    CommonModule,
    ContasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule
  ],
  providers:[
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
    CurrencyPipe
  ]
})
export class ContasModule { }
