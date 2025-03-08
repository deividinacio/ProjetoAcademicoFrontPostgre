import { Routes } from '@angular/router';
import { CursoAdicionarComponent } from './curso/curso-adicionar/curso-adicionar.component';
import { ProfessorAdicionarComponent } from './professor/professor-adicionar/professor-adicionar.component';
import { CursoListarComponent } from './curso/curso-listar/curso-listar.component';
import { ProfessorListarComponent } from './professor/professor-listar/professor-listar.component';

export const routes: Routes = [
    {path: 'curso/adicionar', component: CursoAdicionarComponent},
    {path: 'curso/listar', component: CursoListarComponent},
    {path: 'professor/adicionar', component: ProfessorAdicionarComponent},
    {path: 'professor/listar', component: ProfessorListarComponent}
];
