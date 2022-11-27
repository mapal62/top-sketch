console.log('running');
let gridSize;


const restart = document.querySelector('button');
restart.onclick = () => {
    gridSize = enterInteger();
    if (gridSize != NaN) {

        document.getElementById('board').remove();
        //
        const startNode = document.createElement('div');
        startNode.id = 'board';
        startNode.style.gridTemplateColumns = `repeat(${gridSize},1fr)`;
        startNode.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
        appendSquare(startNode, gridSize);
        startNode.addEventListener('mousemove', (e) => {
            e.target.style.backgroundColor = 'black';
        })
        startNode.addEventListener('touchmove', (e) => {
            e.target.style.backgroundColor = 'grey';
            //targeting the event start ALWAYS!!!
            const touchPoint = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
            touchPoint.style.backgroundColor = 'blue';
        })
        document.getElementById('base').appendChild(startNode);
    }
}

function enterInteger() {
    let userInput;
    do {
        const inputString = prompt('Enter sketchboard size (16 - 100)');
        userInput = parseInt(inputString);
        if (userInput >= 16 && userInput <= 100) {
            console.log('USER: ', userInput)
            break;
        }
        alert('Not a valid size!');
    } while (userInput === NaN);
    return userInput;
}

function appendSquare(node, squareSide) {
    const pixels = [];
    for (i = 0; i < squareSide; i++) {
        for (j = 0; j < squareSide; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixels.push(pixel);
        }
    }
    node.append(...pixels);
}
