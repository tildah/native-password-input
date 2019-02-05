class NativePasswordInput extends HTMLElement {
    constructor() {
        super() ;
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = 
        /*html*/`
        <style>
            
            #password {
                width: 100%;
                
                font-size: 14px;
                border-bottom: 1px solid rgba(0, 0, 0, .12);
                
                margin: 8px 0;
                outline: none;
                padding: 8px;
                box-sizing: border-box;
                transition: 0.3s;
                padding-left: 40px;
            }
            
            #password : focus {
                border-color: dodgerBlue;
                box-shadow: 0 0 8px 0 dodgerBlue;
            }
            
            .inputWithIcon  {
                position: relative;
            }
            
            #showPassword {
                position: absolute;
                left: -2px ;
                top: 5px;
                padding: 9px 8px;
                color: #aaa;
                transition: 0.3s;
                width: 30px ;
                height: 25px;
            }
            
            .inputWithIcon #password : focus + i {
                color: rgba(0, 0, 0, .38);
            }
        </style>
            <div class=${'inputWithIcon'}>
                <i aria-hidden="true">
                    <img id=${'showPassword'} src=${'./node_modules/native-password-input/img/closed.svg'}>
                </i>
                <input id=${'password'} value="" placeholder="" type=${'password'} name="">
            </div>
         ` ;
    }
    set passwordValue(value) {
        this.setAttribute('password-value', value);
    };
    get passwordValue() {
        return this._passwordValue ;
    };

    set placeholder(value) {
        this.setAttribute('placeholder', value);
    };
    get placeholder() {
        return this._placeholder ;
    };

    set name(value) {
        this.setAttribute('name', value);
    };
    get name() {
        return this._name ;
    };
    

    connectedCallback() {
        this._placeholder = this.getAttribute('placeholder') ;
        if(!this._placeholder) {this._placeholder= " ";}
        this._name = this.getAttribute('name') ;
        this._passwordValue = this.getAttribute('password-value') ;
        this._backgroundColor = this.getAttribute('background-color-att') ;
        this._border = this.getAttribute('border-att') ;
       
        this.shadowRoot.querySelector('input').addEventListener('focusout', (event) => {
            document.getElementById('password').placeholder = this.shadowRoot.querySelector('input').value ;
            this._passwordValue = this.shadowRoot.querySelector('input').value ;
         });
        
         this.shadowRoot.getElementById('showPassword').addEventListener(
            'click', (event) => {
                var password = this.shadowRoot.getElementById('password');
                var image = this.shadowRoot.getElementById('showPassword') ;

                if(password.getAttribute('type') == 'password') {
                    image.setAttribute('src','./node_modules/native-password-input/img/open.svg');
                    password.setAttribute('type', 'text');
                }
                else if (password.getAttribute('type') == 'text'){
                    image.setAttribute('src','./node_modules/native-password-input/img/closed.svg');
                    password.setAttribute('type', 'password');
                }
            }
        );
        this.render() ;
    }

    render() {
        this.shadowRoot.querySelector('input').name = this._name ;
        this.shadowRoot.querySelector('input').placeholder = this._placeholder ;
        this.shadowRoot.querySelector('input').value = this._passwordValue ;
        this.shadowRoot.querySelector('input').style.backgroundColor = this._backgroundColor ;
        this.shadowRoot.querySelector('input').style.border = this._border ;
    }

    static get obserevedAttributes() {
        return ['placeholder', 'name', 'password-value'] ;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(name == 'placeholder')
            this._placeholder = newVal ;
        if(name == 'name')
            this._name = newVal ;
        if(name == 'password-value')
            this._passwordValue = newVal ;

        this.render() ;
    }
}

window.customElements.define("native-password-input", NativePasswordInput);

