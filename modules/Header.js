'use strict';
import Component from './framework/component.js';
export default class Header extends Component {
    constructor() {
        super(null, './assets/css/header.css');
    }
    template() {
        return `
                <header>
                    <div>&#9819; Amazing Checkmates</div>
                    <div>
                        <div class="burger"></div>
                        <div class="burger2"></div>
                        <div class="burger3"></div>
                    </div>
                </header>
        `
    }
}
