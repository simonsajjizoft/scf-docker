import { Component } from '@angular/core';

@Component({
  selector: 'app-gtins-list',
  templateUrl: './gtins-list.component.html',
  styleUrl: './gtins-list.component.scss'
})
export class GtinsListComponent {
  gtins = [
    {"gtin": "123456789012", "checked": false},
    {"gtin": "234567890123", "checked": true},
    {"gtin": "345678901234", "checked": false},
    {"gtin": "456789012345", "checked": false},
    {"gtin": "567890123456", "checked": false},
    {"gtin": "678901234567", "checked": false},
    {"gtin": "789012345678", "checked": true},
    {"gtin": "890123456789", "checked": false},
    {"gtin": "901234567890", "checked": false},
    {"gtin": "012345678901", "checked": false},
    {"gtin": "112345678901", "checked": false},
    {"gtin": "212345678901", "checked": false},
    {"gtin": "312345678901", "checked": true},
    {"gtin": "412345678901", "checked": false},
    {"gtin": "512345678901", "checked": false},
    {"gtin": "612345678901", "checked": false},
    {"gtin": "712345678901", "checked": false},
    {"gtin": "812345678901", "checked": false},
    {"gtin": "912345678901", "checked": false},
    {"gtin": "013245678901", "checked": false},
    {"gtin": "567890123456", "checked": false},
    {"gtin": "678901234567", "checked": false},
    {"gtin": "789012345678", "checked": false},
    {"gtin": "890123456789", "checked": false},
    {"gtin": "901234567890", "checked": false},
    {"gtin": "012345678901", "checked": false},
    {"gtin": "112345678901", "checked": false},
    {"gtin": "212345678901", "checked": false},
    {"gtin": "312345678901", "checked": false},
    {"gtin": "412345678901", "checked": false},
    {"gtin": "512345678901", "checked": true},
    {"gtin": "612345678901", "checked": false},
    {"gtin": "712345678901", "checked": true},
    {"gtin": "812345678901", "checked": false},
    {"gtin": "912345678901", "checked": false},
  ];
}
