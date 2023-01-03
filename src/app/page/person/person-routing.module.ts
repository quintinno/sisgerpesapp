import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonPage } from './person.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'person-create',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PersonPage
  },
  {
    path: 'person-create',
    loadChildren: () => import('./person-create/person-create.module').then( m => m.PersonCreatePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonPageRoutingModule {}
