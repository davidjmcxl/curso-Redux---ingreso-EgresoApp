import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit ,OnDestroy {
  public cargando:boolean=false;
  uiSubcrition!:Subscription;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['test1@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    });
   this.uiSubcrition = this.store.select('ui').subscribe(
                          ui=>{
                            this.cargando=ui.isLoading;
                          })
  }
  ngOnDestroy(): void {
    this.uiSubcrition.unsubscribe();
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }

      this.store.dispatch(isLoading())
   /*  Swal.fire({
      title: 'Loading',

      didOpen: () => {
        Swal.showLoading();
      },
    }); */
    const { correo, password } = this.loginForm.value;
    this.authService
      .login(correo, password)
      .then((credenciales) => {
        /* Swal.close(); */
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.message,
        });
      });
  }
}
