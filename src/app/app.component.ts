import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuariosForm!: FormGroup;
  usuarios : any;
  title: any;
  displayedColumns: string[] = ['id', 'nombre', 'usuario', 'correo', 'telefono', 'direccion'];


  constructor(
    public fb: FormBuilder,
    public usuarioService: UsuariosService
  ) {

  }
  ngOnInit(): void {

    this.usuariosForm = this.fb.group({
      id : [''],
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],

    })
    this.usuarioService.getAllUsuarios().subscribe(resp =>{
      this.usuarios = resp;
    },
    error=> {console.error(error);}
    
    );
  }



  guardar(): void {
    this.usuarioService.saveUsuarios(this.usuariosForm.value).subscribe(resp => {
      this.usuariosForm.reset();
      //this.usuariosForm.setErrors(null);
      //this.usuario=this.usuarios.filter(persona=> resp.id!==persona.id);
      this.usuarios.push(resp);    
    },
    error=>{console.error(error)}
    )
  }
  eliminar(usuarios: any){
    this.usuarioService.deleteUsuario(this.usuarios.id).subscribe(resp=>{
      if(resp === true){
        this.usuarios.pop(this.usuarios)
      }
      ;
      
    })
  }
  editar(usuario: { id: any; nombre: any; usuario: any; correo: any; telefono: any; direccion: any; }){
    this.usuariosForm.setValue({
      id : usuario.id,
      nombre:   usuario.nombre,
      usuario:  usuario.usuario,
      correo:   usuario.correo,
      telefono: usuario.telefono,
      direccion:usuario.direccion,
    })
  }

}
