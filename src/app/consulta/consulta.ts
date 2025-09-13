import { routes } from './../app.routes';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule
],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta implements OnInit {

  nomeBusca: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "acoes"];
  snack: MatSnackBar = inject(MatSnackBar);
// deleteando: boolean  = false;

  constructor(
    private service: ClienteService,
    private router: Router
  ){

  }

  ngOnInit(){
    //console.log("passou por aqui");
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string){
    //console.log ("id recebido: ", id);
    this.router.navigate(['/cadastro'], {queryParams:{"id" : id}});

  }

  preparaDeletar(cliente:Cliente){
    cliente.deleteando = true;
  }

  deletar(cliente:Cliente){
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    //this.deleteando = false;
    this.snack.open('Item deletado com sucesso!', 'ok')
  }
}
