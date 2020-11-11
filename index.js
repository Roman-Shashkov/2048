document.addEventListener('DOMContentLoaded', () => startGame(4))

function startGame(field) {
    let gridView = document.querySelector('.grid')
    
    const CHANGE_COLOR = {
        "": "rgba(238, 228, 218, 0.35)",
        2: "#eee4da",
        4: "#eee1c9",
        8: "#f3b27a",
        16: "#f69664",
        32: "#f77c5f",
        64: "#f75f3b",
        128: "#edd073",
        256: "#344d6e",
        512: "#edc950",
        1024: "#edc53f",
        2048: "#edc22e",
    }

    const CHANGE_FONT = {
        "": "55px",
        2: "55px",
        4: "55px",
        8: "55px",
        16: "55px",
        32: "55px",
        64: "55px",
        128: "45px",
        256: "45px",
        512: "45px",
        1024: "40px",
        2048: "40px",
    }
    let countView = document.querySelector('#count')
    let resultView = document.querySelector('#result')
    let width = field
    let squares = new Array()
    let count = 0;
    
    //создаю игровое поле

    function createField() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.textContent = ''
            changeColor(square)
            gridView.appendChild(square)
            squares.push(square)
        }
        for (let i = 0; i < gridView.children.length; i++){
            if (squares.length == 16) {
                gridView.children[i].style.width = '140px'
                gridView.children[i].style.height = '140px'
            }
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
            changeColor(squares[randomNumber]);
            checkForStop()
        } else {
            generateRandomNumbers()
        }
    }

    //меняю стили

    function changeColor(element) {
        element.style.backgroundColor = CHANGE_COLOR[element.textContent]
        element.style.fontSize = CHANGE_FONT[element.textContent]
      }
    
    //передвижение плиток вправо

    function swipeRight() {
        for (let i = 0; i < width * width; i++) {
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
            changeColor(squares[i])
        }
    } 

    //передвижение плиток влево

    function swipeLeft() {
        for (let i = 0; i < width * width; i++) {
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
            changeColor(squares[i])
        }
    } 

    //передвижение плиток вниз

    function swipeDown () {
        for (let i = 0; i < width; i++) {
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
        for (let i = 0; i < width * width; i++) {
            changeColor(squares[i])
        }
    }

    //передвижение плиток вверх

    function swipeUp () {
        for (let i = 0; i < width; i++) {
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
        for (let i = 0; i < width * width; i++) {
            changeColor(squares[i])
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
        let count = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') {
                count++
            }
        }
        for (let i = 0; i < 15; i++) {
            if ((i % 4 !== 3) && squares[i].innerHTML === squares[i + 1].innerHTML) {
                count++
            }
        }
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                count++
            }
        }
        if (count === 0) {
            resultView.innerHTML = 'Game Over!'
            document.removeEventListener('keyup', check)
        }
    }

}
