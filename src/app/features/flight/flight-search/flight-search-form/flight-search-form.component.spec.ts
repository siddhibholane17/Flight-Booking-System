import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { FlightSearchFormComponent } from './flight-search-form.component';

describe('FlightSearchFormComponent', () => {
  let component: FlightSearchFormComponent;
  let fixture: ComponentFixture<FlightSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightSearchFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the search form', () => {
    expect(component.searchForm).toBeTruthy();
    expect(component.searchForm.contains('from')).toBeTrue();
    expect(component.searchForm.contains('to')).toBeTrue();
  });

  it('should make the form invalid when fields are empty', () => {
    expect(component.searchForm.invalid).toBeTrue();
  });

  it('should make the form valid when both fields are filled', () => {
    component.searchForm.setValue({
      from: 'Pune',
      to: 'Mumbai'
    });

    expect(component.searchForm.valid).toBeTrue();
  });

  it('should not emit search event when form is invalid', () => {
    spyOn(component.search, 'emit');

    component.searchFlights();

    expect(component.search.emit).not.toHaveBeenCalled();
  });

  it('should emit search request when form is valid', () => {
    spyOn(component.search, 'emit');

    component.searchForm.setValue({
      from: 'Pune',
      to: 'Mumbai'
    });

    component.searchFlights();

    expect(component.search.emit).toHaveBeenCalledWith({
      from: 'Pune',
      to: 'Mumbai'
    });
  });

  it('should trim spaces before emitting search request', () => {
    spyOn(component.search, 'emit');

    component.searchForm.setValue({
      from: '  Pune  ',
      to: '  Mumbai  '
    });

    component.searchFlights();

    expect(component.search.emit).toHaveBeenCalledWith({
      from: 'Pune',
      to: 'Mumbai'
    });
  });
});