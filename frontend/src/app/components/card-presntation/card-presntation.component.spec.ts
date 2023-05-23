import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPresntationComponent } from './card-presntation.component';

describe('CardPresntationComponent', () => {
  let component: CardPresntationComponent;
  let fixture: ComponentFixture<CardPresntationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPresntationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPresntationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
