import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';

const baseUrl = 'http://localhost:4200/api/cursos';
//const baseUrl = 'http://localhost:8080/temas';

@Injectable({
  providedIn: 'root'
})

export class TemaService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseUrl);
  }
  get(id: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}/${id}`);
  }
  
  update(id: any, data: Tema): Observable<any> {
	//Conversione a form data
	const bodyData = {
		"id": id,
    	"nombre": data.nombre,
    	"duracion": data.duracion
    	
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, {responseType: 'text'});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nombre: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}?nombre=${nombre}`);
  }
}
