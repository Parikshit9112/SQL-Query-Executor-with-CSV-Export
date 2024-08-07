import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QueryFormComponent } from "./query-form/query-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QueryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'query';
}
