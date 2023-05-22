import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.registerForm= this.fb.group(
      {
        nombre:['daniel@gmail.com',Validators.required],
        correo:['',[Validators.required,Validators.email]],
        password:['',Validators.required]



      }
    )
  }
  crearUser(){
    if(this.registerForm.invalid){return}
    const {nombre,correo,password}=this.registerForm.value;
    Swal.fire({
      title: 'Loading',

      didOpen: () => {
        Swal.showLoading()
      },

    })
  this.authService.crearUser(nombre,correo,password).then(credenciales=>{
    Swal.close();
    this.router.navigate(['/']);
    console.log(credenciales);
  }).catch
  (error=>{

    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: error.message,

    })
  });

}}
