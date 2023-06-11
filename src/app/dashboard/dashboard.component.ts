import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription, filter } from 'rxjs';
import { unSetUser } from '../auth/auth.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { collectionData } from '@angular/fire/firestore';
import { setItem } from '../ingreso-egreso/ingreso-egreso.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {
  userSub!:Subscription;
  ingresoSub!:Subscription;
  constructor(private store:Store<AppState>, private ingresoEgresoServices:IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSub=this.store.select("user").pipe(
      filter(auth=>auth.user!=null)
    ).subscribe(({user})=>{
      this.ingresoSub=this.ingresoEgresoServices.initIngresoEgresoListener(user?.uid as string).subscribe((data:any)=>{
        console.log(data);
        this.store.dispatch(setItem({items:data}))
      })


  })
}
  ngOnDestroy(){
    this.ingresoSub.unsubscribe();
    this.userSub.unsubscribe();

    }

}
