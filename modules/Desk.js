'use strict';
import Component from './framework/component.js'
export default class Landing extends Component {
    constructor() {
        super({}, './assets/css/desk.css');
        const blacks = ['&#9823', '&#9820', '&#9821', '&#9818', '&#9819', '&#9822'];
        const data = [
            ['&#9814', '&#9816', '&#9815', '&#9812', '&#9813', '&#9815', '&#9816', '&#9814'],
            ['&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823'],
            ['&#9820', '&#9822', '&#9821', '&#9818', '&#9819', '&#9821', '&#9822', '&#9820']
        ];
        this.data.cells = data.map((row, rowIndex) => row.map( (col, colIndex) => {
            return {
                figure: col,
                player: col ? blacks.includes(col) + 1 : 0,
                row: rowIndex,
                col: colIndex
            }
        }));
    }
    template() {
        return `
        <main>

        <div class="time">
            <img src ="./assets/images/00_15.jpg">
        </div>   
    
    <table class="chess-board">
                <tbody align="center">
                </tbody>
            </table>
     
      
    <div class="btn">
        <img src ="./assets/images/hands.jpg">
        <input class="button" value="Timer">
        <img src ="./assets/images/disk.jpg">
    </div>
    
    </main>
        `
    }
    onRender() {
        let switchFlag = false;
        const chessBoard = this.$el.querySelector('.chess-board tbody');
        for (let row of this.data.cells) {
            const rowEl = document.createElement('tr');
            for (let cell of row) {
                if( cell.col === 0 ) switchFlag = !switchFlag;
                let background
                if (switchFlag) {
                    background = cell.col % 2 ? 'light' : 'dark'
                } else {
                    background = cell.col % 2 ? 'dark' : 'light'
                }
                const cellEl = document.createElement('td');
                cellEl.innerHTML = cell.figure;
                cellEl.setAttribute('class', `${background} ${cell.player === 1 ? 'white' : 'black'}`);
                rowEl.appendChild(cellEl);
            }
            chessBoard.appendChild(rowEl);
        }
    }
}
