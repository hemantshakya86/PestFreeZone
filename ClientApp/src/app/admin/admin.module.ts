import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from '../layouts/admin-layout/admin-header/admin-header.component';
import { AdminSidebarComponent } from '../layouts/admin-layout/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from '../layouts/admin-layout/admin-footer/admin-footer.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { ContentListComponent } from './content/content-list.component';
import { ContentFormComponent } from './content/content-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminFooterComponent
    ,AdminDashboardComponent
    ,ContentListComponent
    ,ContentFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
