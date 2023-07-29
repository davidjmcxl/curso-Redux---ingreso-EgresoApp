import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType, ChartEvent } from 'chart.js';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { appStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {

  ingresos:number=0;
  egresos:number=0;

  totalIngresos:number=0;
  totalEgresos:number=0;

  constructor(private store:Store<appStateWithIngreso>) { }
  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData!: ChartData<'doughnut'>
  public doughnutChartType: ChartType = 'doughnut';


  ngOnInit(): void {
    this.store.select('ingresosEgresos').subscribe(({items})=>this.generarEstadisticas(items));
  }
  generarEstadisticas(items:IngresoEgreso[]){
    for(  const item of items){
      if(item.tipo==='ingreso'){
        this.totalIngresos+=item.monto;
        this.ingresos++;
      }else{
        this.totalEgresos+=item.monto;
        this.egresos++;
      }
    }
    this.doughnutChartData= {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [ this.totalIngresos,this.totalEgresos  ],backgroundColor:[ '#93F58F','#F5978F'],}
      ],

    };

  }

   // events
   public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
