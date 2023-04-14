import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicsDetailsRoutingModule } from './comics-details-routing.module';
import { ComicsDetailsComponent } from './comics-details.component';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    ComicsDetailsComponent
  ],
  exports: [
    ComicsDetailsComponent
  ],
  imports: [
    TabViewModule,
    DropdownModule,
    CommonModule,
    ComicsDetailsRoutingModule
  ]
})
export class ComicsDetailsModule { }
