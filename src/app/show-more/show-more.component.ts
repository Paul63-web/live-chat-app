import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css']
})
export class ShowMoreComponent implements OnInit {
  name = "";
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['username']
  }

}
