import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonCreatePage } from './person-create.page';

const routes: Routes = [
  {
    path: '',
    component: PersonCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonCreatePageRoutingModule {}
