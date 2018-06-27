import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import * as localForage from 'localforage';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TagsFilterComponent } from './components/tags-filter/tags-filter.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemTagsComponent } from './components/item-tags/item-tags.component';
import { RepoSearchPipe } from './pipes/repo-search.pipe';
import { TagsFilterPipe } from './pipes/tags-filter.pipe';

registerLocaleData(zh);
localForage.config({
  name: 'nz-stars',
  storeName: 'nz-stars'
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserPanelComponent,
    SearchBarComponent,
    TagsFilterComponent,
    ItemListComponent,
    ItemTagsComponent,
    RepoSearchPipe,
    TagsFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
