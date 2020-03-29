import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent implements OnInit {
  public isCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
