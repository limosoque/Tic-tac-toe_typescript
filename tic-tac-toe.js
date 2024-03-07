"use strict";
var FieldValue;
(function (FieldValue) {
    FieldValue[FieldValue["FirstPlayer"] = 1] = "FirstPlayer";
    FieldValue[FieldValue["SecondPlayer"] = 0] = "SecondPlayer";
    FieldValue[FieldValue["NeutralElement"] = -1] = "NeutralElement";
})(FieldValue || (FieldValue = {}));
var GameSign;
(function (GameSign) {
    GameSign["FirstPlayerSign"] = "X";
    GameSign["SecondPlayerSign"] = "O";
})(GameSign || (GameSign = {}));
const playfield_size = 3;
//Создаем игровое поле и инициализируем его нейтральным значением
let playfield = [
    [FieldValue.NeutralElement, FieldValue.NeutralElement, FieldValue.NeutralElement],
    [FieldValue.NeutralElement, FieldValue.NeutralElement, FieldValue.NeutralElement],
    [FieldValue.NeutralElement, FieldValue.NeutralElement, FieldValue.NeutralElement]
];
const playfield_view = document.getElementById('playfield');
//Определяем, кто ходит первым
let current_player = Math.random() < 0.5 ? FieldValue.FirstPlayer : FieldValue.SecondPlayer;
function InitializePlayfield() {
    //создание клеток игрового поля
    for (let i = 0; i < playfield.length; i++) {
        for (let j = 0; j < playfield[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => OnCellClick(i, j));
            playfield_view.appendChild(cell);
        }
    }
}
function OnCellClick(row, column) {
    if (playfield[row][column] == FieldValue.NeutralElement) {
        playfield[row][column] = current_player;
        ShowPlayfield();
        //проверить победу или ничью
    }
}
function ShowPlayfield() {
    const cells = Array.from(playfield_view.children);
    //ТУТ МОГУТ БЫТЬ ПРОБЛЕМЫ С КОНВЕРТАЦИЕЙ ИНДЕКСА
    for (let i = 0; i < cells.length; i++) {
        //Рассчитываем 2 индекса и 1
        let row = Math.floor(i / playfield_size); //возможно, это не равно делению нацело
        let column = i % playfield_size;
        if (playfield[row][column] != FieldValue.NeutralElement) {
            //Записываем в ячейку нужный символ
            cells[i].textContent = playfield[row][column] == FieldValue.FirstPlayer ? GameSign.FirstPlayerSign : GameSign.SecondPlayerSign;
        }
    }
}
InitializePlayfield();
