enum FieldValue {
    FirstPlayer = 1,
    SecondPlayer = 0,
    NeutralElement = -1
}

enum GameSign {
    FirstPlayerSign = 'X',
    SecondPlayerSign = 'O'
}

enum GameStatus {
    InProcess,
    FirstPlayerWin,
    SecondPlayerWin,
    Draw
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
        let game_status: GameStatus = CheckGameStatus();
        if (game_status == GameStatus.FirstPlayerWin || game_status == GameStatus.SecondPlayerWin) {
            alert(`${current_player} wins!`);
            RestartGame();
        }
        else if (game_status == GameStatus.Draw) {
            alert(`Draw!`);
            RestartGame();
        }
        else {
            current_player = current_player == FieldValue.FirstPlayer ? FieldValue.SecondPlayer : FieldValue.FirstPlayer;
        }
    }
}

function ShowPlayfield() {
    const cells = Array.from(playfield_view.children);
    for (let i = 0; i < cells.length; i++) {
        //Рассчитываем 2 индекса из 1
        let row: number = Math.floor(i / playfield_size);
        let column: number = i % playfield_size;

        if (playfield[row][column] != FieldValue.NeutralElement) {
            //Записываем в ячейку нужный символ
            cells[i].textContent = playfield[row][column] == FieldValue.FirstPlayer ? GameSign.FirstPlayerSign : GameSign.SecondPlayerSign;
        }
    }
}

function CheckGameStatus(): GameStatus {
    /*Проверка выигрыша*/
    //Проверяем строки
    for (let row = 0; row < playfield.length; row++) {
        //Проверяем, что все элементы одной строки равны
        if (playfield[row][0] != FieldValue.NeutralElement &&
            playfield[row].every((value, _index, array) => value == array[0])) {
            return playfield[row][0] == FieldValue.FirstPlayer ? GameStatus.FirstPlayerWin : GameStatus.SecondPlayerWin;
        }
    }

    //Проверяем столбцы
    for (let column = 0; column < playfield[0].length; column++) {
        if (playfield[0][column] != FieldValue.NeutralElement) {
            //Запоминаем первый элемент и проходимся по столбцу, смотря, есть ли другие FieldValue
            let potential_winner: FieldValue = playfield[0][column];
            for (let row = 1; row < playfield.length; row++) {
                if (playfield[row][column] != potential_winner) {
                    potential_winner = FieldValue.NeutralElement;
                    break;
                }
            }
            //Если в переменной остается один из игроков, значит он выиграл
            if (potential_winner != FieldValue.NeutralElement) {
                return potential_winner == FieldValue.FirstPlayer ? GameStatus.FirstPlayerWin : GameStatus.SecondPlayerWin;
            }
        }
    }

    //Проверяем левую диагональ
    if (playfield[0][0] != FieldValue.NeutralElement) {
        //Запоминаем первый элемент и проходимся по столбцу, смотря, есть ли другие FieldValue
        let potential_winner: FieldValue = playfield[0][0];
        for (let index = 1; index < playfield.length; index++) {
            if (playfield[index][index] != potential_winner) {
                potential_winner = FieldValue.NeutralElement;
                break;
            }
        }
        //Если в переменной остается один из игроков, значит он выиграл
        if (potential_winner != FieldValue.NeutralElement) {
            return potential_winner == FieldValue.FirstPlayer ? GameStatus.FirstPlayerWin : GameStatus.SecondPlayerWin;
        }
    }

    //Проверяем правую диагональ
    if (playfield[0][playfield.length - 1] != FieldValue.NeutralElement) {
        //Запоминаем первый элемент и проходимся по столбцу, смотря, есть ли другие FieldValue
        let potential_winner: FieldValue = playfield[0][playfield.length - 1];
        for (let index = 1; index < playfield.length; index++) {
            if (playfield[index][playfield.length - index - 1] != potential_winner) {
                potential_winner = FieldValue.NeutralElement;
                break;
            }
        }
        //Если в переменной остается один из игроков, значит он выиграл
        if (potential_winner != FieldValue.NeutralElement) {
            return potential_winner == FieldValue.FirstPlayer ? GameStatus.FirstPlayerWin : GameStatus.SecondPlayerWin;
        }
    }

    /*Проверка ничьей*/
    let rows_draw: number = 0;
    for (let row = 0; row < playfield.length; row++) {
        if (playfield[row].every((value, _index, _array) => value != FieldValue.NeutralElement)) {
            rows_draw++;
        }
    }
    if (rows_draw == playfield.length) {
        return GameStatus.Draw;
    }

    return GameStatus.InProcess;
}

function RestartGame() {
    //Очищаем переменные
    for (let row = 0; row < playfield.length; row++) {
        for (let column = 0; column < playfield[row].length; column++) {
            playfield[row][column] = FieldValue.NeutralElement;
        }
    }
    current_player = Math.random() < 0.5 ? FieldValue.FirstPlayer : FieldValue.SecondPlayer;

    //Очищаем клетки
    const cells = Array.from(playfield_view.children);
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
}

/*main*/
InitializePlayfield();