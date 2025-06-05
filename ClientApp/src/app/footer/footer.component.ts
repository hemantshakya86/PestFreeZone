import { Component, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ContentPageModel } from '../core/models/content-page.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  content: ContentPageModel | undefined;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getContentPageById(5).subscribe(res => {
      this.content = res;
    });
  }
}