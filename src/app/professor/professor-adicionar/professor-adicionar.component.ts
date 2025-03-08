import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfessorService } from '../../services/professor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professor-adicionar',
  imports: [FormsModule, CommonModule],
  templateUrl: './professor-adicionar.component.html',
  styleUrl: './professor-adicionar.component.css'
})
export class ProfessorAdicionarComponent {

  constructor(private professorService: ProfessorService){}
  professor = {
    nome: '',
    biografia: ''
  }

  adicionar ( form: NgForm){
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
    this.professorService.adicionar(this.professor).subscribe({
      next: response => {
        Swal.fire({
          title: 'Sistema Acadêmico',
          text: response.dados.mensagem,
          icon: 'success',
          confirmButtonText: 'OK'
        });  
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
}

