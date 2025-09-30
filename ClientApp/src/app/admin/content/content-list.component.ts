import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../core/services/content.service';
import { ContentPageModel } from '../../core/models/content-page.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {
  contents: ContentPageModel[] = [];
  loading = false;

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.contentService.getAllContentPages().subscribe({
      next: (data) => { this.contents = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  create() {
    this.router.navigate(['/admin/content/new']);
  }

  edit(id?: number) {
    if (id == null) return;
    this.router.navigate(['/admin/content', id, 'edit']);
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Delete this content?')) return;
    this.contentService.deleteContentPage(id).subscribe({ next: () => this.load() });
  }
}
