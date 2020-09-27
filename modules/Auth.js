'use strict';
import Component from './framework/component.js'
export default class Auth extends Component {
    constructor() {
        super({}, './assets/css/auth.css');
        this.data.password = '';
        this.data.email = '';
        this.data.mailErr = undefined;
        this.data.passErr = undefined;
    }
    template() {
        return `
        <main>
            <h3> &#9819; Amazing Checkmates </h3>
           <article class="article">
              <input class="${this.data.mailErr !== undefined ? (this.data.mailErr ? 'text_input error' : 'text_input success') : 'text_input'}" type="text" placeholder="E-mail" value="${this.data.email}">
              <input class="${this.data.passErr !== undefined ? (this.data.passErr ? 'text_input error' : 'text_input success') : 'text_input'}" type="passsword" placeholder="Password" value="${this.data.password}">
           </article>
           <article class="article1">
               <input class="button" type="submit" value="Login">
               <input class="button underline" type="submit" value="Register">
           </article>
       </main>
        `
    }
    methods () {
        return {
            remove() {
                this.destroy()
            },
            changeEmail() {
                const EmailInputValue = this.$el.children[1].children[0].value;
                this.data.email = EmailInputValue;
                const mailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                this.data.mailErr = !mailRegEx.test(this.data.email);
                this.render();
            },
            changePassword() {
                const PasswordInputValue = this.$el.children[1].children[1].value;
                this.data.password = PasswordInputValue;
                const passRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
                this.data.passErr = !passRegEx.test(this.data.password);
                this.render();
            }
        }
    }

    onRender () {
        // const phoneRegEx = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/
        const submitButton = this.$el.children[2].children[0];
        submitButton.addEventListener('click', this.methods.submit);
        const emailInput = this.$el.children[1].children[0];
        emailInput.addEventListener('blur', this.methods.changeEmail);
        const passwordInput = this.$el.children[1].children[1];
        passwordInput.addEventListener('blur', this.methods.changePassword);
    }

}
