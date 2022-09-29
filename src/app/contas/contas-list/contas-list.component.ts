import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Observable, switchMap, tap } from 'rxjs';
import { Conta } from 'src/app/model/conta';
import { ContaService } from 'src/app/service/conta.service';

@Component({
  selector: 'app-contas-list',
  templateUrl: './contas-list.component.html',
  styleUrls: ['./contas-list.component.css']
})
export class ContasListComponent implements OnInit {

  ELEMENT_DATA: Conta[] = []
  form: FormGroup;

  displayedColumns: string[] = ['fornecedor', 'descr', 'situacao', 'dtVenc', 'acoes'];
  dataSource = new MatTableDataSource<Conta>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ContaService,
    private formBuilder: FormBuilder
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dtIni: [''],
      dtFim: ['']
    })
   this.findAll();
    this.form.get('dtFim').valueChanges
    .pipe(
      tap(value => console.log('status data Fim.: ', value)),
    ).subscribe()
  }

  findAll(){
    const data = new Date()
    const today = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
    this.service.findDataVenc(today).subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Conta>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtrar() {
    const ini: moment.Moment = moment.utc(this.form.value.dtIni).local();
    const fim: moment.Moment = moment.utc(this.form.value.dtFim).local();
    console.log(ini.isValid())
    if(!ini.isValid() || !fim.isValid()){
      this.form.reset();
      this.findAll();
    }else{
      this.service.filtroBetween(ini.format("DD-MM-YYYY"), fim.format("DD-MM-YYYY")).subscribe(resposta => {
        this.ELEMENT_DATA = resposta;
        this.dataSource = new MatTableDataSource<Conta>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      })
    }
  }

}