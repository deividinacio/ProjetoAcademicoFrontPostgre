import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

 private readonly urlBase = "https://localhost:7059"; //'http://localhost:5228';
 
   constructor(private http: HttpClient) { }
 
   listar() : Observable<any> {
     return this.http.get<any>(`${this.urlBase}/listarprof`);
   }
 
   obter(id: any) : Observable<any> {
     return this.http.get<any>(`${this.urlBase}/obterprof/${id}`);
   }  
 
   adicionar(professor: any) : Observable<any> {
     return this.http.post<any>(`${this.urlBase}/adicionarprof`, professor);
   }
 
   atualizar(professor: any) : Observable<any> {
     return this.http.put<any>(`${this.urlBase}/atualizarprof`, professor);
   }  
 
   remover(id: any) : Observable<any> {
     return this.http.delete<any>(`${this.urlBase}/removerprof/${id}`);
   }
 }