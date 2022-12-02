console.log('running');

const restart = document.querySelector('button');
restart.onclick = () => {
    const gridSize = enterInteger();
    if (gridSize != NaN) {
        let board = buildBoard(gridSize);
        appendSquares(board, gridSize);
        addEvents(board);
        document.getElementById('base').appendChild(board);
    }
}

function enterInteger() {
    let userInput;
    do {
        const inputString = prompt('Enter sketchboard size (16 - 100)');
        userInput = parseInt(inputString);
        if (userInput >= 16 && userInput <= 100) {
            break;
        }
        alert('Not a valid size!');
    } while (userInput === NaN);
    return userInput;
}

function buildBoard(size) {
    document.getElementById('board').remove();
    //
    const startNode = document.createElement('div');
    startNode.id = 'board';
    startNode.style.backgroundColor = 'rgb(200, 250, 250)';
    startNode.style.border = '1px solid black'; // more visibility
    startNode.style.gridTemplateColumns = `repeat(${size},1fr)`;
    startNode.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    return startNode;
}

function appendSquares(node, squareSide) {
    const pixels = [];
    for (i = 0; i < squareSide; i++) {
        for (j = 0; j < squareSide; j++) {
            const pixel = document.createElement('div');
            pixels.push(pixel);
        }
    }
    node.append(...pixels);
}

function addEvents(element) {
    element.addEventListener('mousemove', (e) => {
        setColoring(e.target)
    })
    element.addEventListener('touchmove', (e) => {
        console.log(e.target.style);
        e.preventDefault();
        if (e.target.style.backgroundColor === '') {
            setColoring(e.target)
        }
        //an event ALWAYS targeting the touch start!!!
        const touchPoint = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
        setColoring(touchPoint);
    })

}

function setColoring(targetPixel) {
    if (targetPixel.id) return; // exclude board border event !!!
    const pixelBg = {
        baseColor: document.getElementById('basecolor').value,
        mono(target) {
            target.style.backgroundColor = this.baseColor;
            target.style.opacity = '1';
        },
        random(target) {
            const hslRandom = Math.floor(Math.random() * 359 + 1);
            target.style.backgroundColor = `hsl(${hslRandom}, 80%, 50%)`;
        },
        gradient(target) {
            const currentColor = target.style.backgroundColor;
            const gradient = 0.05;
            const opacity = target.style.opacity; //typeof string!!!
            if (!currentColor) {
                target.style.backgroundColor = this.baseColor;
                target.style.opacity = '0.05'
            } else {
                if (opacity != 1) {
                    target.style.opacity = parseFloat(opacity) + gradient;
                }
            }
        }
    }
    const choosen =
        document.querySelector('input[name="color"]:checked').value;
    pixelBg[choosen](targetPixel);
}
