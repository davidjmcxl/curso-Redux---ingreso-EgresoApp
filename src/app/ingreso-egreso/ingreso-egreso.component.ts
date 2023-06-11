import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {
  ingresoForm!:FormGroup;
  tipo:string='ingreso';
  cargando:boolean=false;
  loadingSubs!:Subscription;
  constructor(private fb:FormBuilder,
    private ingresoEgresoService:IngresoEgresoService,
    private store:Store<AppState>) { }

  ngOnInit(): void {
   this.loadingSubs= this.store.select('ui').subscribe(({isLoading})=>{
      this.cargando=isLoading;
    })
    this.ingresoForm = this.fb.group({
      description:['',Validators.required],
      monto:['',Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }
  guardar(){

    if(this.ingresoForm.invalid){
      return;
    }
    this.store.dispatch(isLoading());

    const {description,monto}=this.ingresoForm.value
    const ingresoEgreso = new IngresoEgreso(description,monto,this.tipo)

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(()=>{
      this.store.dispatch(stopLoading());
      Swal.fire('success',`${this.tipo} guardado correctamente`,'success');

      this.ingresoForm.reset();
    }).catch(err=>{
      this.store.dispatch(stopLoading());
      Swal.fire('Error',err.message,'error')
    })}
}
