import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { PessoaService } from './../../../service/pessoa.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.page.html',
  styleUrls: ['./person-create.page.scss'],
})
export class PersonCreatePage implements OnInit {

  public tipoPessoaList: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private pessoaService: PessoaService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.findAllTipoPessoa();
  }

  public formBuilderGroup = this.formBuilder.group({
    tipoPessoa: ["", [Validators.required] ],
    nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)] ],
  });

  public findAllTipoPessoa() {
    return this.pessoaService.findAllTipoPessoa().subscribe( response => {
      this.tipoPessoaList = response;
      console.log(this.tipoPessoaList);
    });
  }

  public create() {
    this.pessoaService.saveOnePessoa(this.configurarPessoaRequestDTO()).subscribe( response => {
      this.showLoading();
      setTimeout(() => {
        this.apresentarAlerta();
        this.limparCampos();
      }, 2000);
    });
  }

  private configurarPessoaRequestDTO() : any {
    const pessoaRequestDTO = {
      tipo: {
        codigo: this.formBuilderGroup.controls["tipoPessoa"].value
      },
      nome: this.formBuilderGroup.controls["nome"].value
    }
    return pessoaRequestDTO;
  }

  public async apresentarAlerta() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Pessoa Cadastrada com Sucesso!',
      buttons: [
        {
          text: 'OK',
        },
      ],
    });
    return await alert.present();
  }

  public async showLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
    });
    loading.present();
  }

  private limparCampos() {
    return this.formBuilderGroup.reset();
  }

}
