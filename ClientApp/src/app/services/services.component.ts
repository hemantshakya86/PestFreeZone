import { Component, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ContentPageModel } from '../core/models/content-page.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  content: ContentPageModel | undefined;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getContentPageById(2).subscribe(res => {
      this.content = res;
    });
  }
}