import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild} from '@angular/core';
import { Winterlicious } from '../../classes/winterlicious';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Filter } from '../../classes/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() neighbourhoods: string[] = [];
  @Input() totalRestaurants: number;
  @Input() cuisines: string[] = [];
  @Output() closeFilter: EventEmitter<void> = new EventEmitter();
  @Output() filterChanged: EventEmitter<Filter> = new EventEmitter();
  @ViewChild('typeAheadRef') typeAheadRef: ElementRef;

  private _selectedCuisines: string[] = [];
  typeAheadMatches: string[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      neighbourhoods: ['any'],
      sortBy: ['Name - Asc'],
      lunch: false,
      dinner: false,
      preferences: this.fb.group({
        accessible: false,
        vegetarian: false,
        vegan: false,
        local: false
      }),
      rating: this.fb.group({
        yelp: ['']
      }),
      cuisines: ['']
    });
    this.form.get('cuisines').valueChanges.subscribe((s) => {
      this.typeAheadMatches = this.cuisines
            .filter((c) => c.toLowerCase().indexOf(this.form.get('cuisines').value.toLowerCase()) >= 0);
    });
    this.form.valueChanges.subscribe((s) => {
      this.updateFilters();
    });
   }

  form: FormGroup;

  ngOnInit() {
    this.updateFilters();
  }

  updateFilters() {
    const val = this.form.value;
    val.cuisines = this._selectedCuisines;
    this.filterChanged.emit(val);
  }



  // MAKE THIS ASC
  selectMatch(result) {
    if (this._selectedCuisines.indexOf(result) < 0) this._selectedCuisines.push(result);
    else this._selectedCuisines.splice(this._selectedCuisines.findIndex((s) => s === result), 1);
    this.form.controls['cuisines'].setValue('');
    this.typeAheadRef.nativeElement.focus();
    this.updateFilters();
  }

  removeSelection(match) {
    this._selectedCuisines.splice(this._selectedCuisines.findIndex((s) => s === match), 1);
    this.updateFilters();
  }

  removeAllSelected() {
    this._selectedCuisines = [];
    this.updateFilters();
  }

  get selectedCuisines(): string[] {
    return this._selectedCuisines.sort((a, b) => a > b ? 1 : (a < b ? -1 : 0));
  }

  // Preferences
  get accessible() {
    return this.form.get('preferences').get('accessible');
  }

  get vegan() {
    return this.form.get('preferences').get('vegan');
  }
  get vegetarian() {
    return this.form.get('preferences').get('vegetarian');
  }

  get local() {
    return this.form.get('preferences').get('local');
  }

  get lunch() {
    return this.form.get('lunch');
  }

  get dinner() {
    return this.form.get('dinner');
  }

  get yelpRating() {
    return this.form.get('rating').get('yelp');
  }

}
