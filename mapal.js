console.log('running');
let gridSize;

const restart = document.querySelector('button');
restart.onclick = () => {
    gridSize = enterInteger();
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
    startNode.style.gridTemplateColumns = `repeat(${size},1fr)`;
    startNode.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    return startNode;
}

function appendSquares(node, squareSide) {
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

function addEvents(element) {
    element.addEventListener('mousemove', (e) => {
        setColoring(e.target)
        // e.target.style.backgroundColor = 'black';
    })
    element.addEventListener('touchmove', (e) => {
        e.target.style.backgroundColor = 'blue';
        //targeting the event start ALWAYS!!!
        const touchPoint = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
        touchPoint.style.backgroundColor = 'blue';
    })

}

function setColoring(targetPixel) {
    const pixelBg = {
        mono(target) {
            target.style.backgroundColor = 'black';
        },
        random(target) {
            const hslRandom = Math.floor(Math.random() * 359 + 1);
            target.style.backgroundColor = `hsl(${hslRandom}, 80%, 50%)`;
        },
        gradient(target) {
            const currentColor = target.style.backgroundColor;
            if (!currentColor) {
                target.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
            } else {
                target.style.backgroundColor = nextShade(currentColor);
            }
        }
    }
    const choosen =
        document.querySelector('input[name="color"]:checked').value;
    pixelBg[choosen](targetPixel);
}

function nextShade(shade) {
    const rgbaValue = shade.split(' ');
    if (rgbaValue.length < 4) return shade; //nothing to do, MAX reached
    rgbaValue[3] = parseFloat(rgbaValue[3]) + 0.05;
    rgbaValue.push(')')
    return rgbaValue.join('');
}
