import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-curso-listar',
  imports: [RouterLink],
  templateUrl: './curso-listar.component.html',
  styleUrl: './curso-listar.component.css'
})
export class CursoListarComponent implements OnInit {
  constructor(private cursoService: CursoService) {
    
    
  }
  ngOnInit(): void {
    //Executado quando inicia a página
    this.listarCurso();
  }
  cursos : any[] = [];

  listarCurso(){
    this.cursoService.listar().subscribe({
      next: response => {
        this.cursos = response.dados;
      },
      error: error => {
        Swal.fire({
          title: 'Sistema Acadêmico', 
          text: 'Erro ao listar curso.', 
          icon: 'error', 
          confirmButtonText: 'OK'
        })
      }
    })
  }
  removerCurso(id: any) {
    this.cursoService.remover(id).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Sistema Acadêmico', 
          text: response.dados.mensagem, 
          icon: 'success', 
          confirmButtonText: 'OK'
        })        
        this.listarCurso();
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
