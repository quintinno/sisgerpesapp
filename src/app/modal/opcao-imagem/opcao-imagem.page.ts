import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opcao-imagem',
  templateUrl: './opcao-imagem.page.html',
  styleUrls: ['./opcao-imagem.page.scss'],
})
export class OpcaoImagemPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  public recuperarFoto(tipoOperacao: number) {
    switch ( tipoOperacao ) {
      case (1):
        this.modalController.dismiss(tipoOperacao, "REMOVER");
        break;
      case (2) :
        this.modalController.dismiss(tipoOperacao, "GALERIA");
        break;
      default :
        this.modalController.dismiss(tipoOperacao, "CAMERA");
        break;
    }
  }

}
