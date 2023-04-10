import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicsListRoutingModule } from './comics-list-routing.module';
import { ComicsListComponent } from './comics-list.component';


@NgModule({
  declarations: [
    ComicsListComponent
  ],
  exports: [
    ComicsListComponent
  ],
  imports: [
    CommonModule,
    ComicsListRoutingModule
  ]
})
export class ComicsListModule { }
