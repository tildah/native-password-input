import "/node_modules/dispatcher-button/dispatcher-button.js"
import "/node_modules/mdi-component/mdi-component.js";
import { mdiEye, mdiEyeOff } from "/node_modules/@mdi/js/mdi.js";

class NativePasswordInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (!this.id || !this.getAttribute("name"))
      throw new Error("The password input should have an id and a name attributes");
    this.watch();
  }

  watch() {
    document.addEventListener(this.toggleEvent, (e) => {
      this.toggle();
    })
  }

  get toggleEvent() {
    return `${this.id}:toggle`;
  }

  get value() {
    const defaultValue = this.getAttribute("value") || "";
    return this.input ? this.input.value : defaultValue;
  }

  get input() {
    return this.shadowRoot.querySelector("input");
  }

  get template() {
    const open = this.hasAttribute("open");
    const type = open ? "text" : "password";
    const image = open ? mdiEye : mdiEyeOff;
    return /*html*/`
      <style>

        .container  {
          background-color: transparent;
          display: flex;
          align-items: center;
          margin: 8px;
        }

        input {
          flex: 1;
          border: none;
          margin: 0 8px;
          outline: none;
          padding: 8px;
          background-color: transparent;
        }

        .icon {
          cursor: pointer;
        }
      </style>
      <div class='container'>
        <input 
          id="${this.id}:input"
          value="${this.value}" 
          placeholder="${this.getAttribute("placeholder") || ""}"
          type="${type}"
          name="${this.getAttribute("name")}"
          >
        <dispatcher-button clk="${this.toggleEvent}">
          <mdi-component
            class="icon"
            size="24px"
            path="${image}"
            color="${this.getAttribute("icon-color") || ""}"
            >
          <mdi-component>
        </dispatcher-button>
      </div>
    `
  }

  toggle() {
    this.toggleAttribute("open");
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.template;
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateEl.content.cloneNode(true));
    this.input.focus();
    const cursorPosition = this.value.length;
    this.input.setSelectionRange(cursorPosition, cursorPosition);
  }

  static get observedAttributes() {
    return ['placeholder', 'name', 'value', "open"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }
}

window.customElements.define("native-password-input", NativePasswordInput);

