import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from '../model/proyectos';
import { TokenService } from '../security/service/token.service';
import { ProyectosService } from '../service/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public proyectos: Proyectos[];
  public editProyectos: Proyectos;
  public deleteProyectos: Proyectos;
  roles: string[];
  isAdmin: boolean = false;
  

  constructor(private proyectosService: ProyectosService,
    private tokenService: TokenService
    ) { }

  ngOnInit() {
    this.getProyectos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( role => {
      if(role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  public getProyectos(): void {
    this.proyectosService.getProyectos().subscribe(
      (response:Proyectos[]) => {
        this.proyectos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProyecto(addForm: NgForm):void {
    document.getElementById('add-proyecto-modal')?.click();
    this.proyectosService.addProyecto(addForm.value).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
    
  }

  public onUpdateProyecto(proyectos: Proyectos):void {
      this.proyectosService.updateProyecto(proyectos).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
    
  }

  public onDeleteProyecto(id: number):void {
    this.proyectosService.deleteProyecto(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getProyectos();
      
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  )
  
}

  public onOpenModal(proyectos: Proyectos, mode: string): void{
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addProyectosModal');
  }
  if (mode === 'edit') {
    this.editProyectos = proyectos;
    button.setAttribute('data-target', '#updateProyectosModal');
  }
  if (mode === 'delete') {
    this.deleteProyectos = proyectos;
    button.setAttribute('data-target', '#deleteProyectosModal');
  }
  container?.appendChild(button);
  button.click();
}


}
