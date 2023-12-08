import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;

  constructor(private alert : AlertService, private router: Router, private formBuilder: FormBuilder, private authService : AuthService) {
    this.formLogar = new FormGroup({
      email: new FormControl(''), 
      senha: new FormControl('')
    });
   }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      senha : ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm(){
    if(!this.formLogar.valid){
      this.alert.presentAlert('Erro', 'erro ao preencher')
      return false;
    } else {
      this.logar();
      return true;  
    }
  }

  private logar(){
    this.authService.signIn(this.formLogar.value['email'], this.formLogar.value['senha']).then((res)=>{
      this.alert.presentAlert('Eae', 'tranquilo?');
      this.router.navigate(["/home"]);  
    }).catch((error)=>{
      this.alert.presentAlert('erro','email e/ou senha invalidos');
      console.log(error.message);
    })
  }

  logarComGoogle(){}

  irParaSignUp(){
    this.router.navigate(["/signup"]);
  }

}
