let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('easy')) {
        speed = 1000;
    } else if (e.target.classList.contains('normal')) {
        speed = 500;
    } else if (e.target.classList.contains('hard')) {
        speed = 200;
    }
    if (e.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame();
        
    }

})

function startGame() {
    let tetris = document.createElement('div');//создали переменную
    tetris.classList.add('tetris');

    for (let i = 1; i < 181; i++) {
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }
    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);

    let excel = document.getElementsByClassName('excel');
    let i = 0;

    for (let y = 18; y > 0; y--) {
        for (let x = 1; x < 11; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }

    let x = 5, y = 15;//ось x y

    //фигурки 
    let mainArr = [[[0, 1], [0, 2], [0, 3], [[-1, 1], [0, 0], [1, -1], [2, -2],], [[1, -1], [0, 0], [-1, 1], [-2, 2],], [[-1, 1], [0, 0], [1, -1], [2, -2],], [[1, -1], [0, 0], [-1, 1], [-2, 2],]],
    [[1, 0], [0, 1], [1, 1], [[0, 0], [0, 0], [0, 0], [0, 0],], [[0, 0], [0, 0], [0, 0], [0, 0],], [[0, 0], [0, 0], [0, 0], [0, 0],], [[0, 0], [0, 0], [0, 0], [0, 0],]],
    [[1, 0], [0, 1], [0, 2], [[0, 0], [-1, 1], [1, 0], [2, -1],], [[1, -1], [1, -1], [-1, 0], [-1, 0],], [[-1, 0], [0, -1], [2, -2], [1, -1],], [[0, -1], [0, -1], [-2, 0], [-2, 0],]],
    [[1, 0], [1, 1], [1, 2], [[0, 0], [0, 0], [1, -1], [-1, -1],], [[0, -1], [-1, 0], [-2, 1], [1, 0],], [[2, 0], [0, 0], [1, -1], [1, -1],], [[-2, 0], [1, -1], [0, 0], [-1, 1],]],
    [[1, 0], [-1, 1], [0, 1], [[0, -1], [-1, 0], [2, -1], [1, 0],], [[0, 0], [1, -1], [-2, 0], [-1, -1],], [[0, -1], [-1, 0], [2, -1], [1, 0],], [[0, 0], [1, -1], [-2, 0], [-1, -1],]],
    [[1, 0], [1, 1], [2, 1], [[2, -1], [0, 0], [1, -1], [-1, 0],], [[-2, 0], [0, -1], [-1, 0], [1, -1],], [[2, -1], [0, 0], [1, -1], [-1, 0],], [[-2, 0], [0, -1], [-1, 0], [1, -1],]],
    [[1, 0], [2, 0], [1, 1], [[1, -1], [0, 0], [0, 0], [0, 0],], [[0, 0], [-1, 0], [-1, 0], [1, -1],], [[1, -1], [1, -1], [1, -1], [0, 0],], [[-2, 0], [0, -1], [0, -1], [-1, -1],]]]


    let currentFigure = 0;
    let figureBody = 0;
    let rotate = 1;

    function create() {
        function getRandom() {
            return Math.round(Math.random() * (mainArr.length - 1))
        }
        rotate = 1;
        currentFigure = getRandom();
        figureBody = [
            document.querySelector(`[posX="${x}"][posY="${y}"]`),
            document.querySelector(`[posX="${x + mainArr[currentFigure][0][0]}"][posY="${y + mainArr[currentFigure][0][1]}"]`),

            document.querySelector(`[posX="${x + mainArr[currentFigure][1][0]}"][posY="${y + mainArr[currentFigure][1][1]}"]`),

            document.querySelector(`[posX="${x + mainArr[currentFigure][2][0]}"][posY="${y + mainArr[currentFigure][2][1]}"]`),

        ]

        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    } create();


    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `Ваши Очки: ${score}`;
    //функция падения фигур
    function move() {
        let moveFlag = true; //если перемен=true => фигурка на один ряд вниз

        //получаем координаты(их 4 у всех фигур) каждой ячейки из фигурки 
        let coordinates = [
            [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],// 5 по оси х и 15 по оси y
            [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],// 5 по оси х и 16 по оси y
            [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],// 5 по оси х и 17 по оси y
            [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],// 5 по оси х и 18 по оси y
        ];

        //проверяем если фигурка может падать дальше или нет

        //фигурка на последнем ряду||ниже есть упавшая фигурка(все двигающиеся = класс figureб останов = класс set)
        for (let i = 0; i < coordinates.length; i++) {
            if (coordinates[i][1] == 1 || document.querySelector(`[posX="${coordinates[i][0]}"][posY="${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                break;
            }
        }
        //  убираем класс figure
        if (moveFlag == true) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            //понижаем ряд на -1 поз х не меняетсяя, только поз y
            figureBody = [
                document.querySelector(`[posX="${coordinates[0][0]}"][posY="${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX="${coordinates[1][0]}"][posY="${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX="${coordinates[2][0]}"][posY="${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX="${coordinates[3][0]}"][posY="${coordinates[3][1] - 1}"]`),

            ];

            //добовляем класс figurе обрано
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        }
        //если moveFlag==false то меняем класс на set
        else {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
            }
            //убираем последний ряд если тот полный
            for (let i = 1; i < 15; i++) {
                let count = 0;
                for (let k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX="${k}"][posY="${i}"]`).classList.contains('set')) {
                        count++;
                        if (count == 10) {
                            score += 10;
                            input.value = `Ваши Очки: ${score}`;
                            for (let m = 1; m < 11; m++) {
                                document.querySelector(`[posX="${m}"][posY="${i}"]`).classList.remove('set')
                            }
                            let set = document.querySelectorAll('.set');
                            let newSet = [];
                            for (let s = 0; s < set.length; s++) {
                                let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                if (setCoordinates[1] > i) {
                                    set[s].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX="${setCoordinates[0]}"][posY="${setCoordinates[1] - 1}"]`));
                                }
                            }

                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set');
                            }
                            i--;
                        }
                    }
                }
            }
            for (let n = 1; n < 11; n++) {
                if (document.querySelector(`[posX="${n}"][posY="15"]`).classList.contains('set')) {
                    clearInterval(interval);
                    alert(`Игра окончена. Ваши Очки: ${score}`);
                    break;
                }
            }
            create();//создаем новую фигуру

        }
    }

    //запустили интервал каторый повторит функю move каждые 300мс
    let interval = setInterval(() => { move(); }, speed);




    //до этого момента фигурки просто падают вниз по серед. без остановки друг на друга пока не закончится пространство по оси y




    let flag = true; //вспомог переменная ниже


    // подключаем стрелки 
    window.addEventListener('keydown', function (e) {
        let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
        //определяем новое полож фигурки в пространстве
        function getNewState(a) {
            flag = true;
            let figureNew = [
                document.querySelector(`[posX="${+coordinates1[0] + a}"][posY="${coordinates1[1]}"]`),
                document.querySelector(`[posX="${+coordinates2[0] + a}"][posY="${coordinates2[1]}"]`),
                document.querySelector(`[posX="${+coordinates3[0] + a}"][posY="${coordinates3[1]}"]`),
                document.querySelector(`[posX="${+coordinates4[0] + a}"][posY="${coordinates4[1]}"]`),
            ];


            for (let i = 0; i < figureNew.length; i++) {

                //если figureNew не существ || или содержит класс set flag=false=> при нажатии ничего не произ.
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }


            //если figureNew  существ то убираем класс figure  и перезапис коордонаты в класс figureNew  затем перезапис нов коорд в класс figure
            if (flag == true) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }
                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
            }
        }
        //то что произайдет при нажатии
        if (e.key == "ArrowLeft") {
            getNewState(-1);//в функц гетню прибав (-1)
        } else if (e.key == "ArrowRight") {
            getNewState(1);//в функц гетню прибав (1)
        }
        //ускорение падения (но пч то оно не работает)
        else if (e.key == "ArrowDown") {
            move();
        }

        else if (e.key == "ArrowUp") {
            flag = true;
            let figureNew = [
                document.querySelector(`[posX="${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY="${+coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                document.querySelector(`[posX="${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY="${+coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                document.querySelector(`[posX="${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY="${+coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                document.querySelector(`[posX="${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY="${+coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
            ];


            for (let i = 0; i < figureNew.length; i++) {

                //если figureNew не существ || или содержит класс set flag=false=> при нажатии ничего не произ.
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }


            //если figureNew  существ то убираем класс figure  и перезапис коордонаты в класс figureNew  затем перезапис нов коорд в класс figure
            if (flag == true) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }
                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
                if (rotate < 4) {
                    rotate++;
                } else {
                    rotate = 1;
                }


            }
        }

    })


}