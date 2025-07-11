import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusComponent } from '../core/models/content-page.model';

describe('ContactusComponent', () => {
  let component: ContactusComponent;
  let fixture: ComponentFixture<ContactusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactusComponent]
    });
    fixture = TestBed.createComponent(ContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
