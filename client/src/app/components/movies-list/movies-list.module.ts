import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesListRoutingModule } from './movies-list-routing.module';
import { MoviesListComponent } from './movies-list.component';


@NgModule({
  declarations: [
    MoviesListComponent
  ],
  exports: [
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    MoviesListRoutingModule
  ]
})
export class MoviesListModule { }
