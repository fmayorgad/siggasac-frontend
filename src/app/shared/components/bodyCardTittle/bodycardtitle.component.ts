import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'bodycardtitle',
  templateUrl: './bodycardtitle.component.html',
  styleUrls: ['./bodycardtitle.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit {
  @Input() nav: string[] = [];

  constructor() {}

  ngOnInit() {
  }

}
