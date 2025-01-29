import { Component, CUSTOM_ELEMENTS_SCHEMA, HostBinding } from '@angular/core';
// import {DateTime} from 'luxon';
import packageInfo from '../../../../../package.json';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class FooterComponent {
  @HostBinding('class') classes: string = 'main-footer';
  public appVersion = packageInfo.version;
  // public currentYear: string = DateTime.now().toFormat('y');

}