"use strict";
document.body.innerHTML += `<p>${"Tic-tac-toe"}</p>`;
const playfield_size = 3;
//Создаем игровое поле и инициализируем его нейтральным значением
let playfield = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
const playfield_view = document.getElementById('playfield');
function InitializePlayfield() {
    //создание клеток игрового поля
    for (let i = 0; i < playfield_size * playfield_size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', () => OnCellClick());
        playfield_view === null || playfield_view === void 0 ? void 0 : playfield_view.appendChild(cell);
    }
}
function OnCellClick() {
}
InitializePlayfield();
