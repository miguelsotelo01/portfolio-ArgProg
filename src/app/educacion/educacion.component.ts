import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from '../model/educacion';
import { TokenService } from '../security/service/token.service';
import { EducacionService } from '../service/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educaciones: Educacion[];
  public editEducacion: Educacion;
  public deleteEducacion: Educacion;
  roles: string[];
  isAdmin: boolean = false;
  

  constructor(private educacionService: EducacionService,
    private tokenService: TokenService
    ) { }

  ngOnInit() {
    this.getEducacion();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach( role => {
      if(role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    })
  }

  public getEducacion(): void {
    this.educacionService.getEducacion().subscribe(
      (response:Educacion[]) => {
        this.educaciones = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEducacion(addForm: NgForm):void {
    document.getElementById('add-educacion-modal')?.click();
    this.educacionService.addEducacion(addForm.value).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.getEducacion();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
    
  }

  public onUpdateEducacion(educacion: Educacion):void {
      this.educacionService.updateEducacion(educacion).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.getEducacion();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
    
  }

  public onDeleteEducacion(id: number):void {
    this.educacionService.deleteEducacion(id).subscribe(
    (response: void) => {
      console.log(response);
      this.getEducacion();
      
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    }
  )
  
}

  public onOpenModal(educacion: Educacion, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducacionModal');
    }
    if (mode === 'edit') {
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#updateEducacionModal');
    }
    if (mode === 'delete') {
      this.deleteEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducacionModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
