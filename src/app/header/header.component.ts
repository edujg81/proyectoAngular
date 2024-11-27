import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title!: String;

  private isLightTheme: boolean = true;

  constructor(private render: Renderer2) {}

  // Metodo para cambiar el tema
  cambiarTema() {
    if (this.isLightTheme) {
      this.render.addClass(document.body, 'dark-theme');
    } else {
      this.render.removeClass(document.body, 'dark-theme');
    }
    this.isLightTheme = !this.isLightTheme;
  }
}
