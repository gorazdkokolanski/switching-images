const photoDivs = [
    `
    <div>
        <img src="img/1.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/2.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/3.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/4.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/5.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/6.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/7.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/8.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/9.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/10.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/11.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/12.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/13.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/14.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/15.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/16.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/17.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/18.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/19.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/20.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/21.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/22.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/23.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/24.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/25.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/26.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/27.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/28.jpg" alt="photo">
    </div>
    `,
    `
    <div>
        <img src="img/29.jpg" alt="photo">
    </div>
    `
];

const widths = [
    20, 45, 45, 20, 20, 20, 25, 20, 20, 25, 20, 25, 20, 20, 20,
    45, 20, 25, 20, 25, 20, 25, 22, 22, 22, 22, 22, 20, 20
];

let lastX = null;
let lastY = null;
let totalDistance = 0;
let iterator = -1;
let madeDivs = 0;

if(window.innerWidth>768) {
    document.addEventListener('mousemove', (e) => {
        const currentX = e.clientX;
        const currentY = e.clientY;

        if (lastX !== null && lastY !== null) {
            const deltaX = currentX - lastX;
            const deltaY = currentY - lastY;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            totalDistance += distance;
        }

        lastX = currentX;
        lastY = currentY;

        if(totalDistance >= window.innerWidth / 11){
            addNewDiv(currentX, currentY);
            totalDistance = 0;
        }
    });
} else {
    setInterval(() => {
        const randomX = Math.random() * (window.innerWidth * 0.3);
        const randomY = Math.random() * (window.innerHeight * 0.3);
        addNewDiv(randomX, randomY);
    }, 1000);
}

function addNewDiv(x, y) {
    iterator++;
    madeDivs++;
    if(iterator > photoDivs.length - 1) {
        iterator = 0;
    }
    if(iterator > 8) {
        document.querySelector(".number").innerText = iterator+1;
    } else {
        document.querySelector(".number").innerText = `0${iterator+1}`;
    }

    if(madeDivs > 5) {
        document.querySelectorAll(".main>div")[0].remove();
    }
    

    let newDiv = document.createElement("div");
    newDiv.style.top = `${y}px`;
    newDiv.style.left = `${x}px`;
    newDiv.style.width = `${widths[iterator]}%`;
    newDiv.innerHTML = photoDivs[iterator];
    document.querySelector(".main").appendChild(newDiv);
}
