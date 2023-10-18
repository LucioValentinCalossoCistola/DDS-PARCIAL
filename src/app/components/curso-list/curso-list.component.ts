import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos?: Curso[];
  allCursos?: Curso[]; // Agregar una variable para almacenar todos los cursos sin filtrar
  currentElement: Curso = {};
  currentIndex = -1;
  title = '';

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.retrieveCursos();
  }

  retrieveCursos(): void {
    this.cursoService.getAll()
      .subscribe({
        next: (data) => {
          this.cursos = data;
          this.allCursos = data; // Almacena todos los cursos sin filtrar
          console.log(this.cursos);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCursos();
    this.currentElement = {};
    this.currentIndex = -1;
  }

  setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }

  removeAllElements(): void {
    this.cursoService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentElement = {}; // Limpiamos el elemento actual
    this.currentIndex = -1;

    // Comprobamos si this.allCursos es una matriz definida
    if (this.allCursos) {
      this.cursos = this.allCursos.filter(curso => {
        // Comprobamos si curso.nombre es una cadena definida
        if (curso.nombre) {
          return curso.nombre.toLowerCase().includes(this.title.toLowerCase());
        }
        return false; // No hay coincidencia si curso.nombre es indefinido
      });
    }
  }
}

