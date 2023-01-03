import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() { }

  public formBuilderGroup = this.formBuilder.group({
    firtName: ["", [Validators.required] ],
    lastName: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(100)] ],
    email: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(100)] ],
    phone: ["", [Validators.required, Validators.pattern('[1-9]*'), Validators.minLength(3), Validators.maxLength(100)] ],
  });

}
