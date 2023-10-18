
import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Tema } from 'src/app/models/tema.model';
import { TemaService } from 'src/app/services/tema.service';

declare var $: any; // Declaración ambiental para jQuery
declare var jQuery: any; // Declaración ambiental para jQuery (en caso de ser necesario)
declare var Datepicker: any; //

@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
  curso: Curso = <Curso>{
    nombre: '',
     fechaInicio: new Date(),
    idDocente: new Number(), //campo obligatorio
    tema: { id: 0, nombre: '', duracion: 0 }
   
    
  };
  
  showAlert = false; // Propiedad para controlar la visibilidad de la alerta

  submitted = false;
  temas: any[] = []; // Arreglo para almacenar los temas
	constructor(private cursoService: CursoService) {}
  
  ngOnInit(): void {
    this.cargarTemasDisponibles();
    $('.datepicker').datepicker({
      autoclose: true
    });
  }

  cargarTemasDisponibles() {
    // 
    this.temas = [
      { id: 1, nombre: 'Diseño de Sistemas', duracion: 36 },
      { id: 2, nombre: 'Programación en C++', duracion: 12 }
      // Agrega más temas según sea necesario
    ];
  }
  seleccionarTema(nombreTema: string) {
    const temaSeleccionado = this.temas.find((tema) => tema.nombre === nombreTema);
    if (temaSeleccionado) {
      this.curso.tema = temaSeleccionado;
    }
  }
  saveCurso(): void {
    if (!this.curso.idDocente || !this.curso.tema) {
      this.showAlert = true; // Mostrar la alerta si faltan campos obligatorios
    } else {
      const data = {
        id: this.curso.id,
        nombre: this.curso.nombre,
        tema: this.curso.tema,
        fechaInicio: this.curso.fechaInicio,
        idDocente: this.curso.idDocente,
      };
      this.cursoService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }
  newCurso(): void {
    this.submitted = false;
    this.curso = <Curso>{
    	nombre: '',
    	fechaInicio: new Date(),
    	idDocente: new Number(), //campo obligatorio
    	tema: { id: 0, nombre: '', duracion: 0 }
    	
    	
    	
    };
  }

}

