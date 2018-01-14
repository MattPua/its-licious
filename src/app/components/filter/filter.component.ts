import { Component, OnInit, Input } from '@angular/core';
import { Winterlicious } from '../../classes/winterlicious';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() winterlicious: Winterlicious;
  constructor() { }

  ngOnInit() {
  }

}
