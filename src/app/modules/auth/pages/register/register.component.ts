import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    });
  }
  passwordsMatch(): boolean {
    return (
      this.registerForm.value.password ===
      this.registerForm.value.confirmPassword
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    if (!this.passwordsMatch()) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const { fullName, email, username, password } = this.registerForm.value;

    const success = this.authService.register(
      fullName!,
      email!,
      username!,
      password!,
    );

    if (!success) {
      alert('El usuario ya existe');
      return;
    }

    alert('Usuario creado correctamente');
    this.router.navigate(['/auth/login']);
  }
}
