import { Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  @Input() currentPageData: any;
  currentUser: any;
  isPermission : boolean = false;
  @ViewChild('myMenu') myMenu:any;
  isHovering = false;
  @ViewChildren(MatMenuTrigger) trigger: QueryList<MatMenuTrigger>;

  constructor(private router: Router, private authService: AuthService){
    this.currentUser = this.authService.getUser();
    this.isPermission = this.currentUser?.roles?.includes("admin");
  }

  navigation(path: string): void{
    if(path) this.router.navigate([path]);
  }

  openMenu(index: number) {
    this.trigger.toArray().forEach((item: MatMenuTrigger, i: number) => {
      if(i !== index && item.menuOpen) {
        item.closeMenu()
      }
    });
  }


}
