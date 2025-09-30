import { Component, OnInit } from '@angular/core';
// Angular ka Component decorator aur OnInit lifecycle interface import kiya gaya hai.

import { ContentService } from '../core/services/content.service';
// ContentService import kiya gaya hai, jo backend se content data fetch karta hai.

import { ContentPageModel } from '../core/models/content-page.model';
// ContentPageModel import kiya gaya hai, jo ek content page ka data structure define karta hai.

@Component({
  selector: 'app-footer',
  // Is component ka selector 'app-footer' hai, jo HTML me <app-footer> tag se use hota hai.

  templateUrl: './footer.component.html',
  // Is component ka HTML template file.

  styleUrls: ['./footer.component.css']
  // Is component ki styling file.
})
export class FooterComponent implements OnInit {
  // FooterComponent class define ki gayi hai, jo OnInit interface implement karti hai.

  content: ContentPageModel | undefined;
  // Ek property 'content' banayi gayi hai, jisme ContentPageModel ka data aayega. Shuru me undefined hai.

  constructor(private contentService: ContentService) {}
  // Constructor me ContentService ko inject kiya gaya hai, taki is class me use ho sake.

  ngOnInit(): void {
    // ngOnInit ek Angular lifecycle method hai, jo component load hote hi chalti hai.

    this.contentService.getContentPageById(5).subscribe(res => {
      // ContentService ka method getContentPageById(5) call kiya gaya hai, jo id=5 ka content fetch karta hai.
      // subscribe ka matlab hai jab data aayega, tab neeche wali function chalegi.

      this.content = res;
      // Jab data milta hai, toh usse 'content' property me store kar diya jata hai.
    });
  }
}