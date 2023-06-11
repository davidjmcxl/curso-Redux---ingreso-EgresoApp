import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private store:Store<AppState>) { }
  nombreUser:string='';
  ngOnInit(): void {
    this.store.select('user').subscribe(({user})=>{
      this.nombreUser=user?.nombre as string;

    })
  }

}
