import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from '../../core/services/content.service';
import { ContentPageModel } from '../../core/models/content-page.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css']
})
export class ContentFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  previewHtml: SafeHtml = '';

  titles = ['Home', 'AboutUs', 'Services', 'ContactUs'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService
    ,private sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subTitle: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
        this.contentService.getContentPageById(this.id).subscribe(c => {
          this.form.patchValue(c);
          // set editor HTML content
          setTimeout(() => {
            if (this.editorRef && this.editorRef.nativeElement) {
              this.editorRef.nativeElement.innerHTML = c.description || '';
              this.updatePreview();
            }
          });
        });
      }
    });
    // initialize preview from form
    this.updatePreview();
  }

  save() {
    const payload: ContentPageModel = this.form.value;
    if (this.id) {
      this.contentService.updateContentPage(this.id, payload).subscribe(() => this.router.navigate(['/admin/content']));
    } else {
      this.contentService.createContentPage(payload).subscribe(() => this.router.navigate(['/admin/content']));
    }
  }

  updatePreview() {
    const raw = this.form.get('description')?.value || '';
    this.previewHtml = this.sanitizer.bypassSecurityTrustHtml(raw);
  }

  @ViewChild('editor', { static: true }) editorRef!: ElementRef<HTMLDivElement>;

  onEditorInput(event: Event) {
    const html = this.editorRef.nativeElement.innerHTML;
    this.form.get('description')?.setValue(html);
    this.updatePreview();
  }

  exec(command: string, value?: string) {
    document.execCommand(command, false, value);
    // keep form in sync
    const html = this.editorRef.nativeElement.innerHTML;
    this.form.get('description')?.setValue(html);
    this.updatePreview();
  }

  createLink() {
    const url = prompt('Enter URL', 'https://');
    if (url) {
      this.exec('createLink', url);
    }
  }
}
