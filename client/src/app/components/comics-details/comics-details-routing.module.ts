import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsDetailsComponent } from './comics-details.component';

const routes: Routes = [
  { path: 'titles/:id', component: ComicsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicsDetailsRoutingModule { }
