export class PlayerForm {
    constructor(onJoin) {
        this.element = this.createForm(onJoin);
    }

    createForm(onJoin) {
        const form = document.createElement('div');
        form.className = 'player-form';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your name';
        input.className = 'name-input';
        
        const button = document.createElement('button');
        button.textContent = 'Choose Color';
        button.className = 'join-button';
        button.onclick = () => {
            const name = input.value.trim();
            if (name) {
                onJoin(name);
            }
        };

        form.appendChild(input);
        form.appendChild(button);
        return form;
    }

    show() {
        document.body.appendChild(this.element);
    }

    hide() {
        this.element.remove();
    }
}