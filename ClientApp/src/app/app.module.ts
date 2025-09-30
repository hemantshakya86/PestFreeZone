import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WordLimitPipe } from './word-limit.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ServicesComponent,
    HomeComponent,
    ContactusComponent,
    PublicLayoutComponent,
    ReadMoreComponent,
    WordLimitPipe,
    WordLimitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{provide:LocationStrategy, useClass:HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
