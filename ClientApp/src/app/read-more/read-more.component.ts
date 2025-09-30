import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { ContentPageModel } from '../core/models/content-page.model';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {
  contentId: number | null = null;
  content: ContentPageModel | undefined; // Replace 'any' with the appropriate type if available

  constructor(
    private route: ActivatedRoute,
   private contentService: ContentService
  ) {}
  


  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.contentId =idParam !== null ? parseInt(idParam, 10) : null;
    if (this.contentId!== null)
     this.contentService.getContentPageById(this.contentId).subscribe(res => {
      this.content = res;
    });
    // Yahan aap API call ya data fetch kar sakte hain
  }
}