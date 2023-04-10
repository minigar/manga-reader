import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsListComponent } from './comics-list.component';

const routes: Routes = [
  { path: 'movies', component: ComicsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicsListRoutingModule { }
