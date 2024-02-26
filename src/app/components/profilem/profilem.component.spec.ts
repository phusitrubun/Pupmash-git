import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemComponent } from './profilem.component';

describe('ProfilemComponent', () => {
  let component: ProfilemComponent;
  let fixture: ComponentFixture<ProfilemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
