document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profile-pic');
    profilePic.setAttribute('draggable', 'false');
    const clickSound = document.getElementById('click-sound');
    const musicSound = document.getElementById('music');
    const gfSound = document.getElementById('gfegg');
    const background = document.querySelector('.bubbles');
    let clickCount = 0;
    let bubOpac = 1;
    let lastClickedTime = 0;
    let tutorialCode = [37, 39, 37, 39, 38, 40, 38, 40, ]; // Key codes for Up, Up, Down, Down, Left, Right, Left, Right
    let tutorialIndex = 0;
    let highestCombo = localStorage.getItem('highestCombo') ? parseInt(localStorage.getItem('highestCombo'), 10) : 0;

document.addEventListener('keydown', (event) => {
    if (event.keyCode === tutorialCode[tutorialIndex]) {
        tutorialIndex++;
        if (tutorialIndex === tutorialCode.length) {
            activateTutorialCode();
            tutorialIndex = 0;
        }
    } else {
        tutorialIndex = 0;
    }
});

function activateTutorialCode() {
    gfSound.play()
    bubOpac = 0;
    setInterval(createFloatingImage, 500);// Replace this with any action you want to perform
    // For example, you could trigger more bubbles, change background, etc.
    for (let i = 0; i < 50; i++) {
        
    }
}

// Bubble Controller
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        const size = Math.floor(Math.random() * 40) + 15; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;  
        bubble.style.height = bubOpac;    
                // Generate random x-axis offset
        const randomXOffset = Math.random() * 300 - 0; // Adjust the range of offset as needed
        bubble.style.setProperty('--x-offset', randomXOffset);
        background.appendChild(bubble);
        setTimeout(() => {
            background.removeChild(bubble);
        }, 4000); 
    }

    setInterval(createBubble, 600); // Lower = More Bubbles

    // Bubbles move based on cursor position
    document.addEventListener('mousemove', (event) => {
         const mouseX = event.clientX;
        const backgroundRect = background.getBoundingClientRect();
        const backgroundCenterX = backgroundRect.left + backgroundRect.width / 2;
        
        // Calculate distance between mouse and background center
        const distance = mouseX - backgroundCenterX;
        
        // Update custom property for bubble movement
        background.style.setProperty('--mouse-distance', distance);
    });


    // Create and display the highest combo element
    const highestComboElement = document.createElement('div');
    highestComboElement.id = 'highest-combo';
    highestComboElement.textContent = `Speen! Combo: x${highestCombo}`;
    document.body.appendChild(highestComboElement);

    // Profile Picture Click
    profilePic.addEventListener('click', (event) => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickedTime;

    if (timeDiff < 1000) {
        clickCount++;
    } else {
        clickCount = 1;
    }

    lastClickedTime = currentTime;

    clickSound.volume = 0.25;
    clickSound.currentTime = 0;
    clickSound.play();

    const baseRotation = clickCount * 360; // Each click adds one full rotation
    const randomRotation = Math.random() * 720;
    const clockwiseRotation = baseRotation + randomRotation + Math.ceil(baseRotation / 360) * 360;

    profilePic.style.transition = 'transform 3s'; // Smooth transition
    profilePic.style.transform = `rotate(${clockwiseRotation}deg)`; // Apply the rotation

    createComboCounter(event.clientX, event.clientY, clickCount);

    // Change background gradient on every 10 clicks
    if (clickCount % 10 === 0) {
        changeBackgroundGradient();
        if (musicSound.paused) {
            musicSound.currentTime = 0;
            musicSound.play();
            musicSound.volume = 0.55;
            profilePic.src = 'pic/Disk2.png';
            setInterval(createBubble, 75);
        }
    }

    // Update highestCombo if the current combo exceeds it
    if (clickCount > highestCombo) {
        highestCombo = clickCount;
        localStorage.setItem('highestCombo', highestCombo); // Save highest combo to localStorage
        highestComboElement.textContent = `Highest Combo: ${highestCombo}`;
    }
});

function createFloatingImage() {
    const imagePaths = [
        'pic/image4.png',
        'pic/image3.png',
        'pic/image2.png',
        'pic/image1.png'
    ];

    // Select a random image path from the array
    const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

    const image = document.createElement('img');
    image.src = randomImagePath;
    image.classList.add('floating-image');
    const container = document.querySelector('.floating-images');
    container.appendChild(image);
    
    const randomX = Math.random() * 100;
    const randomSize = Math.floor(Math.random() * 80) + 65;
    image.style.left = `${randomX}%`;
    image.style.width = `${randomSize}px`;
    image.style.height = `${randomSize}px`;
    setTimeout(() => {
        container.removeChild(image);
    }, 3900); 

}

    function changeBackgroundGradient() {
    const colors = generateComplementaryColors();
    const gradient = `linear-gradient(135deg, ${colors[0]} 10%, ${colors[1]} 100%)`;

    // Apply animation to the background gradient
    document.body.style.background = gradient;
    document.body.style.backgroundSize = '400% 400%'; // Ensure the background size is set
    document.body.style.animation = 'gradientAnimation 7.5s ease infinite'; // Adjust animation duration and timing function as needed
}

    function generateComplementaryColors() {
        // Generate two random colors
        const color1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const color2 = '#' + Math.floor(Math.random() * 16777215).toString(16);

        // Ensure the colors are complementary
        // You can use any method/library to ensure this
        // Here, we'll just lighten/darken one color to make it complement the other
        const lightenedColor1 = lightenDarkenColor(color1, 20);
        const lightenedColor2 = lightenDarkenColor(color2, -20);

        return [lightenedColor1, lightenedColor2];
    }

    function lightenDarkenColor(color, amount) {
        // Remove the '#' from the beginning
        let usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }

        // Convert to RGB
        const num = parseInt(color, 16);
        let r = (num >> 16) + amount;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amount;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        // Return the new color
        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }

    // Combo Counter
    function createComboCounter(x, y, count) {
        const counter = document.createElement('div');
        counter.classList.add('combo-counter');
        counter.style.left = x + 'px';
        counter.style.top = y + 'px';
        counter.textContent = count + 'x';
        document.body.appendChild(counter);

        // Animate the counter
        const animationDuration = 2000; // milliseconds
        const startY = y;
        const endY = y - 100;
        const startTime = performance.now();

        function animateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            const newY = startY + (endY - startY) * progress;
            counter.style.top = newY + 'px';

            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                document.body.removeChild(counter);
            }
        }

        requestAnimationFrame(animateCounter);
    }
});
