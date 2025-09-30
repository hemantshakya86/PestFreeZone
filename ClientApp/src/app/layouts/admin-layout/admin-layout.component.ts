import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private bootstrapLink?: HTMLLinkElement;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    // If any bootstrap stylesheet is already present (global), do not inject another one.
    const anyBootstrap = Array.from(this.document.querySelectorAll('link[rel="stylesheet"]')).some(
      (l: Element) => (l as HTMLLinkElement).href?.includes('bootstrap.min.css')
    );

    if (!anyBootstrap) {
      // Load Bootstrap CSS specifically for admin layout (only when absent globally)
      this.bootstrapLink = this.renderer.createElement('link') as HTMLLinkElement;
      this.renderer.setAttribute(this.bootstrapLink, 'rel', 'stylesheet');
      // Use the project asset path (matches index.html usage)
      this.renderer.setAttribute(this.bootstrapLink, 'href', './assets/css/bootstrap.min.css');
      this.renderer.setAttribute(this.bootstrapLink, 'data-admin-bootstrap', 'true');
      this.renderer.appendChild(this.document.head, this.bootstrapLink);
    }
  }

  ngOnDestroy(): void {
    // Remove admin bootstrap if we added it
    if (this.bootstrapLink && this.bootstrapLink.parentNode) {
      this.renderer.removeChild(this.document.head, this.bootstrapLink);
    }
  }
}
