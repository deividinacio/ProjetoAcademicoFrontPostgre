import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso-listar',
  imports: [RouterLink, FormsModule],
  templateUrl: './curso-listar.component.html',
  styleUrl: './curso-listar.component.css'
})
export class CursoListarComponent implements OnInit {
  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit(): void {
    //Executado quando inicia a página
    this.listarCurso();
  }
  filtro: string = '';
  cursos : any[] = [];
  cursosFiltrados : any[] = [];

  listarCurso(){
    this.cursoService.listar().subscribe({
      next: response => {
        this.cursos = response.dados;
        this.cursosFiltrados = this.cursos
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
  filtrarCursos() {
    const termo = this.filtro.toLowerCase().trim(); // Converte para minúsculas e remove espaços extras
    this.cursosFiltrados = this.cursos.filter(curso =>
      curso.nome.toLowerCase().includes(termo) || // Filtra pelo nome
      curso.periodo.toLowerCase().includes(termo) // Filtra pelo período
    );    
  }  
  editar(id: any)
  {
    this.router.navigate(['curso/editar', id]);
  }
  removerCurso(id: any) {
    Swal.fire({
      title: "Tem certeza disso ?",
      text: "Deseja deletar permanentemente este curso ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar agora!"
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }  
}
