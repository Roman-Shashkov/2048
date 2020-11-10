document.addEventListener('DOMContentLoaded', () => startGame(4))

function startGame(fileldSize) {
    
    let gridView = document.querySelector('.grid')
    let countView = document.querySelector('#count')
    let resultView = document.querySelector('#result')
    let width = fileldSize
    let squares = new Array()
    let count = 0;
    
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
            checkForStop()
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

    //передвижение плиток вниз

    function swipeDown () {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let colArr = [+totalOne, +totalTwo, +totalThree, +totalFour]

            let filteredColArr = colArr.filter (num => num)
            let empty = 4 - filteredColArr.length
            let zeroes = Array (empty).fill ('')

            let newColArr = zeroes.concat (filteredColArr)

            squares[i].innerHTML = newColArr [0]
            squares[i + width].innerHTML = newColArr [1]
            squares[i + (width * 2)].innerHTML = newColArr [2]
            squares[i + (width * 3)].innerHTML = newColArr [3]
        }
    }

    //передвижение плиток вверх

    function swipeUp () {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let colArr = [+totalOne, +totalTwo, +totalThree, +totalFour]

            let filteredColArr = colArr.filter (num => num)
            let empty = 4 - filteredColArr.length
            let zeroes = Array (empty).fill ('')

            let newColArr = filteredColArr.concat (zeroes)

            squares[i].innerHTML = newColArr [0]
            squares[i + width].innerHTML = newColArr [1]
            squares[i + (width * 2)].innerHTML = newColArr [2]
            squares[i + (width * 3)].innerHTML = newColArr [3]
        }
    }

    //сложение строк

    function concatRow () {
        for (let i = 0; i < 15; i++) {
            if ((i % 4 !== 3) && squares[i].innerHTML === squares[i + 1].innerHTML) {
                let concatTotal = Number(squares[i].innerHTML) + Number(squares[i + 1].innerHTML)
                squares[i].innerHTML = concatTotal
                squares[i + 1].innerHTML = 0
                count += concatTotal
                countView.innerHTML = count
            }
        }
        checkNumber()
        
    }

    //сложение столбцов

    function concatCol () {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let concatTotal = Number(squares[i].innerHTML) + Number(squares[i + width].innerHTML)
                squares[i].innerHTML = concatTotal
                squares[i + width].innerHTML = 0
                count += concatTotal
                countView.innerHTML = count
            }
        }
        checkNumber()
        
    }

    //назначение клавиш

    function check(e) {
        if(e.key === 'ArrowRight' || e.key === 'd') {
            keyRight()
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            keyLeft()
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            keyDown ()
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
            keyUp ()
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

    function keyDown() {
        swipeDown ()
        concatCol ()
        swipeDown ()
        generateRandomNumbers()
    }

    function keyUp() {
        swipeUp ()
        concatCol ()
        swipeUp ()
        generateRandomNumbers()
    }

    // проверяем наличие числа 2048 для завершения игры

    function checkNumber () {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048){
                resultView.innerHTML = 'You Win!!!'
                document.removeEventListener('keyup' , check)
            }
        }
    }

    // проверяем, возможны ли еще ходы для завершения игры

    function checkForStop() {
        let empty = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') {
                empty++
            }
        }
        for (let i = 0; i < 15; i++) {
            if ((i % 4 !== 3) && squares[i].innerHTML === squares[i + 1].innerHTML) {
                empty++
            }
        }
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                empty++
            }
        }
        if (empty === 0) {
            resultView.innerHTML = 'Game Over!'
            document.removeEventListener('keyup', check)
        }
    }

}
