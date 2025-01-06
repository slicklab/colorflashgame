import { COLORS } from '../constants.js';

export class ColorSelector {
    constructor(onSelect) {
        this.element = this.createColorSelector(onSelect);
    }

    createColorSelector(onSelect) {
        const container = document.createElement('div');
        container.className = 'color-selector';
        
        Object.entries(COLORS).forEach(([name, color]) => {
            const button = document.createElement('button');
            button.style.backgroundColor = color;
            button.className = 'color-option';
            button.onclick = () => onSelect(color);
            container.appendChild(button);
        });

        return container;
    }

    show() {
        document.body.appendChild(this.element);
    }

    hide() {
        this.element.remove();
    }
}