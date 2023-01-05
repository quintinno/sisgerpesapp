import { Directory, Filesystem } from '@capacitor/filesystem';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource, Photo } from '@capacitor/camera/dist/esm/definitions';
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

  public photos: any[] = [];

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
          // this.capturarFotoCamera();
          this.addNewToGallery();
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

  public verificarImagemPerfil() : Boolean {
    return this.imagemPerfil == undefined;
  }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
    this.imagemPerfil = capturedPhoto;
  }

  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    this.uploadData(blob);
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async uploadData(blob: any) {
    const formData = new FormData();
    formData.append('file', blob, 'profile');
    console.log("formData: ", formData);
  }

}
