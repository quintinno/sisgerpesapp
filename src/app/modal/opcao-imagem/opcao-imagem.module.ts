import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcaoImagemPageRoutingModule } from './opcao-imagem-routing.module';

import { OpcaoImagemPage } from './opcao-imagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcaoImagemPageRoutingModule
  ],
  declarations: [OpcaoImagemPage]
})
export class OpcaoImagemPageModule {}
