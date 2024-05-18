import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-component-list-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './component-list-page.component.html'
})
export class ComponentListPageComponent {
}
