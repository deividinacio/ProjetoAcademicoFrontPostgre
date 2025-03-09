import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-professor-listar',
  imports: [RouterLink, FormsModule],
  templateUrl: './professor-listar.component.html',
  styleUrl: './professor-listar.component.css'
})
export class ProfessorListarComponent implements OnInit {
  constructor(
    private professorService: ProfessorService,
    private route: ActivatedRoute,
    private router: Router) {
    
    
  }
  ngOnInit(): void {
    //Executado quando inicia a página
    this.listarProfessor();
  }

  filtro: string = '';
  professores : any[] = [];
  professoresFiltrados : any[] = [];

  listarProfessor(){
    this.professorService.listar().subscribe({
      next: response => {
        this.professores = response.dados;
        this.professoresFiltrados = this.professores
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
  filtrarProfessores() {
    const termo = this.filtro.toLowerCase().trim(); // Converte para minúsculas e remove espaços extras
    this.professoresFiltrados = this.professores.filter(professor =>
      professor.nome.toLowerCase().includes(termo) || // Filtra pelo nome
      professor.biografia.toLowerCase().includes(termo) // Filtra pelo período
    );    
  }  
  editar(id: any)
  {
    this.router.navigate(['professor/editar', id]);
  }

removerProfessor(id: any) {
    Swal.fire({
      title: "Tem certeza disso ?",
      text: "Deseja deletar permanentemente este professor ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar agora!"
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }  
}

