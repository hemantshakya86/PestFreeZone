import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { ContentListComponent } from './content/content-list.component';
import { ContentFormComponent } from './content/content-form.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      // default admin landing - dashboard
      { path: '', component: AdminDashboardComponent },
      // content management routes
      { path: 'content', component: ContentListComponent },
      { path: 'content/new', component: ContentFormComponent },
      { path: 'content/:id/edit', component: ContentFormComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
