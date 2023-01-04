import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcaoImagemPage } from './opcao-imagem.page';

const routes: Routes = [
  {
    path: '',
    component: OpcaoImagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcaoImagemPageRoutingModule {}
