const imagePaths = [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/7.jpg",
    "img/8.jpg",
    "img/9.jpg",
    "img/10.jpg",
    "img/11.jpg",
    "img/12.jpg",
    "img/13.jpg",
    "img/14.jpg",
    "img/15.jpg",
    "img/16.jpg",
    "img/17.jpg",
    "img/18.jpg",
    "img/19.jpg",
    "img/20.jpg",
    "img/21.jpg",
    "img/22.jpg",
    "img/23.jpg",
    "img/24.jpg",
    "img/25.jpg",
    "img/26.jpg",
    "img/27.jpg",
    "img/28.jpg",
    "img/29.jpg"
];

const photoDivs = imagePaths.map(path => {
    return `
        <div>
            <img src="${path}" alt="photo">
        </div>
    `;
});

function preloadImages(paths, callback) {
    let loadedCount = 0;
    const totalCount = paths.length;
    paths.forEach((src) => {
        const img = new Image();
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalCount) {
                callback();
            }
        };
        img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            loadedCount++;
            if (loadedCount === totalCount) {
                callback();
            }
        };
        img.src = src;
    });
}

const widths = [
    20, 45, 45, 20, 20, 20, 25, 20, 20, 25, 20, 25, 20, 20, 20,
    45, 20, 25, 20, 25, 40, 25, 22, 22, 22, 22, 22, 20, 20
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

preloadImages(imagePaths, startInteraction);