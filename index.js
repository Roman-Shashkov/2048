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

    //передвижение плиток вправо

    function swipeRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let rowArr = [+totalOne, +totalTwo, +totalThree, +totalFour]

                let filteredRowArr = rowArr.filter (num => num)

                let empty = 4 - filteredRowArr.length
                let zeroes = Array(empty).fill('')

                let newRowArr = zeroes.concat(filteredRowArr)

                squares[i].innerHTML = newRowArr [0]
                squares[i + 1].innerHTML = newRowArr [1]
                squares[i + 2].innerHTML = newRowArr [2]
                squares[i + 3].innerHTML = newRowArr [3]
            }
        }
    } 

    //передвижение плиток влево

    function swipeLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let rowArr = [+totalOne, +totalTwo, +totalThree, +totalFour]

                let filteredRowArr = rowArr.filter (num => num)

                let empty = 4 - filteredRowArr.length
                let zeroes = Array(empty).fill('')

                let newRowArr = filteredRowArr.concat(zeroes)

                squares[i].innerHTML = newRowArr [0]
                squares[i + 1].innerHTML = newRowArr [1]
                squares[i + 2].innerHTML = newRowArr [2]
                squares[i + 3].innerHTML = newRowArr [3]
            }
        }
    } 

    //сложение строк

    function concatRow () {
        for (let i = 0; i < 15; i++) {
            if ((i % 4 !== 3) && squares[i].innerHTML === squares[i + 1].innerHTML) {
                let concatTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = concatTotal
                squares[i + 1].innerHTML = 0
            }
        }
    }

    //назначение клавиш

    function check(e) {
        if(e.key === 'ArrowRight' || e.key === 'd') {
            keyRight()
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            keyLeft()
        }
    }
   
    document.addEventListener('keyup', check)

    function keyRight() {
        swipeRight()
        concatRow()
        swipeRight()
        generateRandomNumbers()
    }

    function keyLeft() {
        swipeLeft()
        concatRow()
        swipeLeft()
        generateRandomNumbers()
    }







}
