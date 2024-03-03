import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../all-header/header/header.component";
import { UserGetResponse } from '../../../model/UserGetResponse';
import { AuthenService } from '../../../services/api/authen.service';
import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [RouterLink, RouterOutlet, HeaderComponent]
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
                    // console.log(true);
                    const type = this.user.type; 
                    localStorage.setItem('userID', this.user.userID.toString());
                    
                    if(type == 1){
                        this.router.navigate(['mash']);
                    }else{
                        this.router.navigate(['userslist', this.user.userID]);
                    }
                }
                else{
                    console.log(false);
                }
            }
            else{
                console.log("Not have user na!");
            }
        }
        else{
            throw console.error();
        }
    }

}
