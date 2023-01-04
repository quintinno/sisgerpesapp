import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicInputMaskModule } from "@thiagoprz/ionic-input-mask";
import { PersonCreatePageRoutingModule } from './person-create-routing.module';
import { PersonCreatePage } from './person-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonCreatePageRoutingModule,
    ReactiveFormsModule,
    IonicInputMaskModule
  ],
  declarations: [PersonCreatePage]
})
export class PersonCreatePageModule {}
