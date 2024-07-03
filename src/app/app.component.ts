import { Component, OnInit } from '@angular/core';
declare var document: any;
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'scf-docker';
  themes: any = {
    tealTheme: {
      '--primary-color': '#146678',
      '--secondary-color': '#f5f5f5',
      '--button-bg-color': '#fff',
      '--button-hover-bg-color': '#007791',
      '--button-hover-color': '#fff',
      '--button-active-bg-color': '#00b0bb',
      '--button-active-color': '#fff',
      '--button-disabled-bg-color': '#e5e6e6',
      '--button-disabled-color': '#acaeaf',
      '--button-disabled-border-color': '#A1A1A1',
      '--button-focus-bg-color': '#00b0bb',
      '--button-focus-border-color': '#a3e3f7',
      '--input-border-color': '#A1A1A1',
      '--input-focus': '#0DB0BC',
      '--th-bg-color': '#E0F2F4',
      '--tbody-bg-color': '#fff',
      '--tr-hover-color': '#F9F9F9',
      '--card-border-color': '#66CDF3',
      '--dropdown-bg-color': '#fff',
      '--dropdown-border-color': '#d0e8e8',
      '--dropdown-color': '#000',
      '--dropdown-contents-color': '#000',
      '--dropdown-contents-hover-color': '#fff',
      '--dropdown-contents-hover-bg-color': '#007791',
      '--blue-text': '#1B7692',
      '--grey-text': '#575757',
      '--light-grey-text': '#CFCFCF',
      '--text-color': '#000',
      '--selected-item': '#F0FFFF',
      '--form-builder-primary': 'rgb(250, 255, 255)',
      '--form-builder-secondary': '#E0F2F4',
      '--checkbox-background-color': '#0DB0BC',
      '--tr-selected': '#D3E7E7'

    },
    electricBlueTheme: {
      '--primary-color': '#1C75BC',
      '--secondary-color': '#81b6e094',
      '--button-bg-color': '#fff',
      '--button-hover-bg-color': '#007791',
      '--button-hover-color': '#fff',
      '--button-active-bg-color': '#00b0bb',
      '--button-active-color': '#fff',
      '--button-disabled-bg-color': '#e5e6e6',
      '--button-disabled-color': '#acaeaf',
      '--button-disabled-border-color': '#A1A1A1',
      '--button-focus-bg-color': '#00b0bb',
      '--button-focus-border-color': '#a3e3f7',
      '--input-border-color': '#A1A1A1',
      '--input-focus': '#0DB0BC',
      '--th-bg-color': '#E0F2F4',
      '--tbody-bg-color': '#fff',
      '--tr-hover-color': '#b6d1e640',
      '--card-border-color': '#66CDF3',
      '--dropdown-bg-color': '#fff',
      '--dropdown-border-color': '#d0e8e8',
      '--dropdown-color': '#000',
      '--dropdown-contents-color': '#000',
      '--dropdown-contents-hover-color': '#fff',
      '--dropdown-contents-hover-bg-color': '#007791',
      '--blue-text': '#1C75BC',
      '--grey-text': '#575757',
      '--light-grey-text': '#CFCFCF',
      '--text-color': '#000',
      '--form-builder-primary': '#e4f0fa94',
      '--form-builder-secondary': '#81b6e094',
      '--checkbox-background-color': '#1C75BC',
       '--tr-selected': '#98d3fa'
    }
  };

  constructor(public translate: TranslateService, private commonService: CommonService) {
    translate.addLangs(['en', 'fr']);
    let frenchView: any = '';
    if (typeof localStorage !== 'undefined') frenchView = localStorage.getItem('frenchView');
    translate.setDefaultLang(frenchView === 'true' ? 'fr' : 'en');
  }

  ngOnInit(): void {
    this.commonService.themeChange.subscribe(data => this.setTheme(data));
  }

  setTheme(theme: any): void {
    if (typeof document !== 'undefined') {
      for (let item in this.themes?.[theme]) {
        document.querySelector('html').style.setProperty(item, this.themes?.[theme][item]);
      }
    }
  }
}
