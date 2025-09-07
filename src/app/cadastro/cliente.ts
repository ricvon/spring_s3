import {v4 as uuid} from 'uuid'

export class Cliente{
  id?:string;
  nome?:string;
  cpf?:string;
  dataNascimento?:string;
  email?:string;
  deleteando:boolean=false;

  static newCliente(){
      const cliente = new Cliente();
      cliente.id = uuid();
      return cliente;
  }
}
