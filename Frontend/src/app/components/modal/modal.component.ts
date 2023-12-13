import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ControleService } from 'src/services/controle.service';

import { faSearch, faTimes, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/services/messages.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { funcionario } from 'src/app/models/funcionario';
import { ControleFuncService } from 'src/services/controle-func.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
    funcionarios: funcionario[] = [];
    faSearch = faSearch; faTrash = faTrash; faTimes = faTimes; faPenToS = faPenToSquare;
    title = ''
    showMensage = false;

    constructor(private controla:ControleFuncService,
                private mensage: MessagesService,
                private route: Router,
    ){
      this.controla.list() //deveria estar no service
       .pipe(
        catchError(error => {
          this.mensage.add("Erro ao carregar");
          return of([])})
       )
       .subscribe(data => {
          this.funcionarios = data
      });
    };

    ngOnInit(): void {
    };

    async deletar(dados: funcionario){ //não ta pronto
      this.controla.deletaTudo(dados.cpf).subscribe(resul => console.log(resul));
      this.mensage.add("Dado excluido com sucesso");

      this.route.navigate(['home']);
    }

    editar(dados: funcionario){ //não ta pronto
      this.route.navigate(['edit', dados.cpf]);
    }

    displayedColumns = ['Name','CPF', 'Funções']
}
