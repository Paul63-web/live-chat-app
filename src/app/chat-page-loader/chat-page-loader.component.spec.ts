import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPageLoaderComponent } from './chat-page-loader.component';

describe('ChatPageLoaderComponent', () => {
  let component: ChatPageLoaderComponent;
  let fixture: ComponentFixture<ChatPageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPageLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
