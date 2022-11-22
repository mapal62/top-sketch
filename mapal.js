console.log('running');

let gridSize = 64;
let itemCount = gridSize * gridSize;

const wrapper = document.querySelector('.board');
for (i = 0; i < itemCount; i++) {
    const item = document.createElement('div');
    item.classList.add('pixel');
    // item.style.backgroundColor = 'green';
    item.addEventListener('mouseenter', (e)=> {
        if (e.button === 0) {
            // console.log(e.button);
            // item.style.backgroundColor = 'green';
            item.classList.add('setbg');
        }
    })
    item.addEventListener('touchmove', (e)=> {
        if (e.button === 0) {
            // console.log(e.button);
            item.style.backgroundColor = 'green';
        }
    })

    wrapper.appendChild(item);
}
