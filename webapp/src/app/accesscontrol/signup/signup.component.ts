import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

export class ConfirmPasswordValidator {
  static ConfirmPassword(control: AbstractControl): ValidationErrors | null {
    if (control) {
      const passwordCntrl = control.get('password');
      const confirmPasswordCntrl = control.get('confirmPassword');
      const password = passwordCntrl?.value;
      const confirmPassword = confirmPasswordCntrl?.value;

      if (confirmPasswordCntrl?.errors){
        return null;
      }

      if (confirmPassword === password) {
        confirmPasswordCntrl?.setErrors(null);
        return null;
      }
      else {
        confirmPasswordCntrl?.setErrors({ mustMatch: true });
        return ({ mustMatch: true });
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup({});



  constructor(
    private formBuilder: FormBuilder,
    private route: Router) { }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')]],
      confirmPassword: ['', Validators.required]
    }
    , {validators: [ConfirmPasswordValidator.ConfirmPassword]}
    );
  }

  get signup(): any {
    return this.signUpForm.controls;
  }

  MustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  onSubmit(): void {
   // console.log(this.signUpForm);
  }

}
