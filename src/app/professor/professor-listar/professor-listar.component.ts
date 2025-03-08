import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-professor-listar',
  imports: [RouterLink],
  templateUrl: './professor-listar.component.html',
  styleUrl: './professor-listar.component.css'
})
export class ProfessorListarComponent implements OnInit {
  constructor(private professorService: ProfessorService) {
    
    
  }
  ngOnInit(): void {
    //Executado quando inicia a página
    this.listarProfessor();
  }
  professores : any[] = [];

  listarProfessor(){
    this.professorService.listar().subscribe({
      next: response => {
        this.professores = response.dados;
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico', 
          text: 'Erro ao listar professor.', 
          icon: 'error', 
          confirmButtonText: 'OK'
        })
      }
    })
  }
  removerProfessor(id: any) {
    this.professorService.remover(id).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Sistema Acadêmico', 
          text: response.dados.mensagem, 
          icon: 'success', 
          confirmButtonText: 'OK'
        })        
        this.listarProfessor();
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico', 
          text: error.dados.mensagem, 
          icon: 'error', 
          confirmButtonText: 'OK'
        })
      }
    });    
  }  

}

