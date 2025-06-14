import { Component, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ContentPageModel } from '../core/models/content-page.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  content: ContentPageModel | undefined;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getContentPageById(4).subscribe(res => {
      this.content = res;
    });
  }
}