import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as localForage from 'localforage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LayoutComponent } from './components/layout/layout.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TagsFilterComponent } from './components/tags-filter/tags-filter.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemTagsComponent } from './components/item-tags/item-tags.component';

registerLocaleData(zh);
localForage.config({
  name: 'nz-stars',
  storeName: 'nz-stars'
});

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    UserPanelComponent,
    SearchBarComponent,
    TagsFilterComponent,
    ItemListComponent,
    ItemTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
