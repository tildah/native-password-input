class NativePasswordInput extends HTMLElement {
    constructor() {
        super() ;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = 
        /*html*/`
        <style>
            #password {
                width: 30%;
                border: 2px solid #aaa;
                border-radius: 4px;
                margin: 8px 0;
                outline: none;
                padding: 8px;
                box-sizing: border-box;
                transition: 0.3s;
                padding-left: 40px;
            }
            #password: focus {
                border-color: dodgerBlue;
                box-shadow: 0 0 8px 0 dodgerBlue;
            }
            #inputWithIcon {
                position: relative;
            }
            #showPassword {
                position: absolute;
                left: 2px;
                top: 12px;
                padding: 9px 8px;
                color: #aaa;
                transition: 0.3s;
                width: 30px ;
                height: 25px;
            }
            #inputWithIcon #password : focus + i {
                color: dodgerBlue;
            }
        </style>
        <div id=${'container'}>
            <div class=${'inputWithIcon'}>
                <input id=${'password'} placeholder=${'password'} type=${'password'}>
                    <i aria-hidden="true">
                    <img id=${'showPassword'} src=${'./img/closed.svg'}>
                    </i>
                
            </div>
        </div>` ;
    }
    connectedCallback() {
        this.shadowRoot.getElementById('showPassword').addEventListener(
            'click', (event) => {
                var password = this.shadowRoot.getElementById('password');
                var image = this.shadowRoot.getElementById('showPassword') ;

                if(password.getAttribute('type') == 'password') {
                    image.setAttribute('src','./img/open.svg');
                    password.setAttribute('type', 'text');
                }
                else if (password.getAttribute('type') == 'text'){
                    image.setAttribute('src','./img/closed.svg');
                    password.setAttribute('type', 'password');
                }
            }
        );
        
    }
}

window.customElements.define("native-password-input", NativePasswordInput);
