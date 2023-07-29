import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { appStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit,OnDestroy {
  ingresoEgreso:IngresoEgreso[]=[];
  ingresoSub!:Subscription;
  constructor(private store:Store<appStateWithIngreso>,private ingresoEgresoServices:IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoSub=this.store.select('ingresosEgresos').subscribe(({items})=>{
      console.log(items);

      this.ingresoEgreso=items;
    })
  }
  ngOnDestroy(){
    this.ingresoSub.unsubscribe();
  }
  borrar(id:string |undefined){
this.ingresoEgresoServices.borrarItem(id as string).then(()=>{
 Swal.fire('Borrado','Item Borrado','success')

}).catch(error=>{
  Swal.fire('Error',error.message,'error')
})

  }

}
