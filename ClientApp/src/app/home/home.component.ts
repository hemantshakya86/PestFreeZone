import { Component, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ContentPageModel } from '../core/models/content-page.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  content: ContentPageModel | undefined;
  slides: ContentPageModel[] = [];
  constructor(private contentService: ContentService) { }
  ngOnInit(): void {

    this.contentService.getContentPageById(1).subscribe(res => {
      this.content = res;
    });
    this.contentService.getSlides().subscribe(res => {
      this.slides = res;
    });
  }
}

