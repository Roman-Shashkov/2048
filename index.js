document.addEventListener('DOMContentLoaded', () => startGame(4))

function startGame(fileldSize) {
    
    let gridView = document.querySelector('.grid');
    let countView = document.querySelector('#count')
    let resultView = document.querySelector('#result')
    let width = fileldSize;
    let squares = new Array()

    //создаю игровое поле

    function createField() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = ''
            gridView.appendChild(square)
            squares.push(square)

        }
        generateRandomNumbers()
        generateRandomNumbers()
    }
    createField();

    //генерирую случайные числа

    function generateRandomNumbers() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == '') {
            squares[randomNumber].innerHTML = Math.floor(Math.random() * 10) == 9 ? 4 : 2
        } else {
            generateRandomNumbers()
        }
    }




}
