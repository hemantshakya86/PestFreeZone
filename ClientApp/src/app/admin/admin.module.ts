import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from '../layouts/admin-layout/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../layouts/admin-layout/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from '../layouts/admin-layout/admin-footer/admin-footer.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
