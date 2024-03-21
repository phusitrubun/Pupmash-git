import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../all-header/header/header.component";
import { UserGetResponse } from '../../../model/UserGetResponse';
import { AuthenService } from '../../../services/api/authen.service';
import * as bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import { Header3Component } from "../../all-header/header3/header3.component";


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [RouterLink, RouterOutlet, HeaderComponent, Header3Component]
})
export class LoginComponent {
    user: UserGetResponse | undefined;

    constructor(private authenService: AuthenService, private router: Router){};

    async userLogin(email: string, password: string){
        console.log(email);
        console.log(password);

        if (email && password) {
            this.user = await this.authenService.checkUser(email);
            console.log(this.user);

            if (this.user) {
                const hashPass = await bcrypt.compare(password, this.user.password);
                if (hashPass) {
                    const type = this.user.type;
                    localStorage.setItem('userID', this.user.userID.toString());

                    if(type == 1){
                        this.router.navigate(['mash']);
                    } else {
                        this.router.navigate(['userslist']);
                    }

                    // Show Sweet Alert for successful login
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                else{
                    // Show Sweet Alert for login failed
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: 'Invalid email or password',
                        confirmButtonText: 'OK'
                    });
                }
            }
            else{
                console.log("Not have user na!");
            }
        }
        else{
            // Show Sweet Alert for login failed
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Please provide email and password',
                confirmButtonText: 'OK'
            });
        }
    }

}
