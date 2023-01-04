import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.page.html',
  styleUrls: ['./person-create.page.scss'],
})
export class PersonCreatePage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  public formBuilderGroup = this.formBuilder.group({
    firtName: ["", [Validators.required] ],
    lastName: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(100)] ],
    email: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(100)] ],
    phone: ["", [Validators.required, Validators.pattern('^\\d{10}$'), Validators.minLength(3), Validators.maxLength(100)] ],
  });

  public create() {
    console.log("create....");
    this.apresentarAlerta();
  }

  public async apresentarAlerta() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Dados Recebidos!',
      buttons: [
        {
          text: 'OK',
        },
      ],
    });
    return await alert.present();
  }

}
