import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsontransComponent } from './jsontrans.component';


describe('JsontransComponent', () => {
  let component: JsontransComponent;
  let fixture: ComponentFixture<JsontransComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsontransComponent]
    });
    fixture = TestBed.createComponent(JsontransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
