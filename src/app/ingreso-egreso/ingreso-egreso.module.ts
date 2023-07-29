import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { _ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    RouterModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresosEgresos',_ingresoEgresoReducer) ]
})
export class IngresoEgresoModule { }
