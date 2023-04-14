import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicsListRoutingModule } from './comics-list-routing.module';
import { ComicsListComponent } from './comics-list.component';
import { ReactiveFormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    ComicsListComponent
  ],
  exports: [
    ComicsListComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ComicsListRoutingModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class ComicsListModule { }
