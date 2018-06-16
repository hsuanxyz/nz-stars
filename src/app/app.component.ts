import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AppStorageService } from "./services/app-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private appStorageService: AppStorageService) {
  }

  ngOnInit() {

  }
}
