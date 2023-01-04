import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { OpcaoImagemPage } from './../../modal/opcao-imagem/opcao-imagem.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public imagemPerfil: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.verificarImagemPerfil();
  }

  public formBuilderGroup = this.formBuilder.group({
    firtName: ["", [Validators.required] ],
    lastName: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(100)] ],
    email: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(100)] ],
    phone: ["", [Validators.required, Validators.pattern('[1-9]*'), Validators.minLength(3), Validators.maxLength(100)] ],
  });

  public selecionarOpcoesImagem() {
    this.abrirModal();
  }

  private async abrirModal() {
    const modal = await this.modalController.create({
      component: OpcaoImagemPage,
      initialBreakpoint: 0.3
    });
    modal.onDidDismiss().then( response => {
      switch ( response.data ) {
        case (1) :
          this.removerFotoPerfil();
          break;
        case (2) :
          this.recuperarFotoGaleria();
          break;
        case (3) :
          this.capturarFotoCamera();
          break;
      }
    });
    return await modal.present();
  }

  private removerFotoPerfil() { }

  private async recuperarFotoGaleria() {
    const imagemGaleria = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      resultType: this.verificarPlataformaExecucaoAplicativo() ? CameraResultType.DataUrl : CameraResultType.Uri,
    });
    this.imagemPerfil = imagemGaleria;
    if (this.verificarPlataformaExecucaoAplicativo()) {
      this.imagemPerfil.webPath = imagemGaleria.dataUrl;
    }
    this.verificarImagemPerfil();
  }

  private verificarPlataformaExecucaoAplicativo() : Boolean {
    return Capacitor.getPlatform() == 'web' ? true : false;
  }

  private capturarFotoCamera() { }

  private verificarImagemPerfil() {
    if (this.imagemPerfil == undefined) {
      this.imagemPerfil = "../../../assets/image/profile.jpg";
      console.log("Imagem Perfil: ", this.imagemPerfil);
    }
  }

}
