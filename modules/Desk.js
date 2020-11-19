'use strict';
import Component from './framework/component.js'
export default class Landing extends Component {
    constructor() {
        super({}, './assets/css/desk.css');
        this.data.blacks = ['&#9823', '&#9820', '&#9821', '&#9818', '&#9819', '&#9822'];
        this.data.game = [
            ['&#9814', '&#9816', '&#9815', '&#9812', '&#9813', '&#9815', '&#9816', '&#9814'],
            ['&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817', '&#9817'],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823', '&#9823'],
            ['&#9820', '&#9822', '&#9821', '&#9818', '&#9819', '&#9821', '&#9822', '&#9820']
        ];
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
    methods = {
        verifyMove({from, to}) {
            const figure = from.figure
            const moveVector = {
                x: to.col - from.col,
                y: to.row - from.row,
                length() {
                    return Math.hypot(this.x, this.y);
                }
            }
            if(to.player === from.player) return false
            if (figure === '&#9817' || figure === '&#9823') {
                /*if(moveVector.length() > 2) return false;
                if(moveVector.length() === 2 && from.row !== 1 && from.row !== 6) return false;
                if(!to.figure && moveVector.length() === 2**(1/2)) return false
                if(moveVector.y === 0) return false
                if(moveVector.length() !== 2**(1/2) && to.figure) return false
                if(from.player === 1 && moveVector.y < 0) return false
                if(from.player === 2 && moveVector.y > 0) return false*/
                if((from.row === 1 || from.row === 6) && (moveVector.length() === 2 || moveVector.length() === 1) && !to.figure) return true
                if(to.figure && moveVector.length() === 2**(1/2)) return true
                if(moveVector.x === 0 && moveVector.length() === 1 && (from.player === 1 && moveVector.y > 0 || from.player === 2 && moveVector.y < 0) && !to.figure) return true
            }
            return false;
        },
        onDragFigure (callback) {
            return callback;
        }
    }
    onRender() {
        let switchFlag = false;
        this.data.cells = this.data.game.map((row, rowIndex) => row.map( (col, colIndex) => {
            return {
                figure: col,
                player: col ? this.data.blacks.includes(col) + 1 : 0,
                row: rowIndex,
                col: colIndex
            }
        }));
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
                cellEl.innerHTML = `<span>${cell.figure}</span>`;
                cellEl.setAttribute('class', `${background} ${cell.player === 1 ? 'white' : 'black'}`);
                cellEl.firstChild.setAttribute('draggable', true);
                cellEl.firstChild.ondragstart = this.methods.onDragFigure(e => {
                    e.dataTransfer.setData('text', JSON.stringify(cell));
                })
                cellEl.ondragover = e => {
                    e.preventDefault();
                }
                cellEl.ondrop = e => {
                    const from = JSON.parse(e.dataTransfer.getData('text'));
                    if(this.methods.verifyMove({from, to: cell})) {
                        this.data.game[from.row][from.col] = '';
                        this.data.game[cell.row][cell.col] = from.figure;
                    }
                    this.render();
                }
                rowEl.appendChild(cellEl);
            }
            chessBoard.appendChild(rowEl);
        }
    }
}
