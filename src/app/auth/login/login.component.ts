import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['daniel@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const { correo, password } = this.loginForm.value;
    Swal.fire({
      title: 'Loading',

      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService
      .login(correo, password)
      .then((credenciales) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.message,
        });
      });
  }
}
