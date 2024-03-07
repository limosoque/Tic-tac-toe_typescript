enum FieldValue {
    FirstPlayer = 1,
    SecondPlayer = 0,
    NeutralElement = -1
}

enum GameSign {
    FirstPlayerSign = 'X',
    SecondPlayerSign = 'O'
}

const playfield_size: number = 3;
//Создаем игровое поле и инициализируем его нейтральным значением
let playfield: FieldValue[][] = [
    [FieldValue.NeutralElement, FieldValue.NeutralElement, FieldValue.NeutralElement],
    [FieldValue.NeutralElement, FieldValue.NeutralElement, FieldValue.NeutralElement],
    [FieldValue.NeutralElement, FieldValue.NeutralElement, FieldValue.NeutralElement]];

const playfield_view = document.getElementById('playfield')!;
//Определяем, кто ходит первым
let current_player: FieldValue = Math.random() < 0.5 ? FieldValue.FirstPlayer : FieldValue.SecondPlayer;

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

function OnCellClick(row: number, column: number) {
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
        let row: number = Math.floor(i / playfield_size); //возможно, это не равно делению нацело
        let column: number = i % playfield_size;

        if (playfield[row][column] != FieldValue.NeutralElement) {
            //Записываем в ячейку нужный символ
            cells[i].textContent = playfield[row][column] == FieldValue.FirstPlayer ? GameSign.FirstPlayerSign : GameSign.SecondPlayerSign;
        }
    }
}


InitializePlayfield();