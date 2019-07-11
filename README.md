# native-password-input

a password input with visibility native web component.

## Installation


```bash
npm install native-password-input
```

## Attributes

- placeholder
- name
- value
- icon-color

| Attribute     | Default | Details/Example |
|---------------|---------|---------|
| `name`        | null    | `password` |
| `placeholder` | null    | `Enter a password` |
| `value`       | null    | `123456` |
| `open`        | inexistant | Add this attribute to make password visible |
| `icon-color`  | null       | Color of icon |


## Usage

Using ES6 Modules is required!

```html
<!Doctype html>
<html>
    <head>
        ...
    </head>
    <body>
        <native-password-input 
            id="password" 
            placeholder="password..." 
            name="password"
            open
            >
        </native-password-input>
        <script src="./main.js" type="module"></script>
    </body>
</html>
```

**main.js**
```javascript
import "/node_modules/native-password-input/index.js";
```
