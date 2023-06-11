import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  nombreUser:string='';
  constructor(private authService:AuthService,private router:Router,private store:Store<AppState>) { }



  ngOnInit(): void {
    this.store.select('user').subscribe(({user})=>{
      this.nombreUser=user?.nombre as string;

    })
  }
  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login']);
    });

  }

}
