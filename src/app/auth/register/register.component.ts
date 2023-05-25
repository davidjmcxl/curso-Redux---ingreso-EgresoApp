import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public cargando: boolean = false;
  uiSubscription!: Subscription;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    }
    )

  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  crearUser() {
    if (this.registerForm.invalid) {
      return;
    }
    this.store.dispatch(isLoading());
    const { nombre, correo, password } = this.registerForm.value;
    Swal.fire({
      title: 'Loading',

      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService
      .crearUser(nombre, correo, password)
      .then((credenciales) => {
        this.store.dispatch(
          stopLoading())
        Swal.close();
        this.router.navigate(['/']);
        console.log(credenciales);
      })
      .catch((error) => {
        this.store.dispatch(
          stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: error.message,
        });
      });
  }
}
