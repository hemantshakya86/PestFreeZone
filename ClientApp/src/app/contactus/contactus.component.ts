import { Component, OnInit } from '@angular/core';
import { ContentService } from '../core/services/content.service';
import { ContentPageModel } from '../core/models/content-page.model';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
 
  
  content:ContentPageModel | undefined;

  constructor(private contentService: ContentService) {}
 
  ngOnInit(): void {
    this.contentService.getContentPageById(3).subscribe(res => {
      this.content = res;
    });
  }}

  

