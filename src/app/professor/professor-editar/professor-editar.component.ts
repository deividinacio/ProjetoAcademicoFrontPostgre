import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professor-editar',
  imports: [FormsModule, CommonModule],
  templateUrl: './professor-editar.component.html',
  styleUrl: './professor-editar.component.css'
})
export class ProfessorEditarComponent  implements OnInit{

 
   constructor(
    private professorService: ProfessorService,
    private route: ActivatedRoute,
    private router: Router){}
    
    professor = {
      id: '',
      nome: '',
      biografia: ''
    }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // pega id da url
    if(id)
    {
      this.obterProfessor(id);
    }
  }

  obterProfessor(id: any)
    {
      this.professorService.obter(id).subscribe({
        next: response => {
          this.professor = response.dados;
        },
        error: error => {
          Swal.fire({
            title: 'Sistema Acadêmico', 
            text: 'Erro ao obter professor.', 
            icon: 'error', 
            confirmButtonText: 'OK'
          })
        }
      });
    }
  
  
   atualizar ( form: NgForm){
     if(this.professor.nome.length > 100)
     {
       form.controls['nome'].setErrors({maxlength: true});
       return;
     }
     if(this.professor.biografia.length > 1000)
       {
         form.controls['biografia'].setErrors({maxlength: true});
         return;
       }
     this.professorService.atualizar(this.professor).subscribe({
       next: response => {
         Swal.fire({
           title: 'Sistema Acadêmico',
           text: response.dados.mensagem,
           icon: 'success',
           confirmButtonText: 'OK'
         });  
         this.router.navigate(['/professor/listar']); 
       },
       error: error => {
         Swal.fire({
           title: 'Sistema Acadêmico', 
           text: 'Erro ao adicionar professor.', 
           icon: 'error', 
           confirmButtonText: 'OK'
         })
       }
     });
   }

   cancelar() {
    this.router.navigate(['/professor/listar']);     
  }

 }
 
 