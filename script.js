document.addEventListener('DOMContentLoaded', () => {
    const copyrightElement = document.getElementById('copyright');
    const profilePic = document.getElementById('profile-pic');
    profilePic.setAttribute('draggable', 'false');
    const momText = document.querySelector('.profile h1');
    const notification = document.getElementById('sound-notification');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const spinSound = document.getElementById('spin-sound');
    spinSound.volume = 0.25;
    const musicSound = document.getElementById('music');
    musicSound.volume = 0.55;
    const hoverSound = document.getElementById('hover-sound');
    hoverSound.volume = 0.75;
    const clickSound = document.getElementById('click-sound');
    clickSound.volume = 0.75;
    const linkButtons = document.querySelectorAll('.link-button');
    const gfSound = document.getElementById('gfegg');
    const chaosSound = document.getElementById('enteregg');
    chaosSound.volume = 0.35;
    const fiiSound = document.getElementById('segaegg');
    const background = document.querySelector('.bubbles');
    const textBoxContainer = document.getElementById('text-box-container');
    const textBox = document.getElementById('text-box');
    const blackBox = document.getElementById('black-box');
    const majinScroll = document.querySelector('.scrolling-images');
    const funText = document.querySelector('.fii-text');
    const muteToggle = document.getElementById('muteToggle');
    let isMuted = false;
    var buttons = document.querySelectorAll('.link-button');

    let clickCount = 0;
    let bubOpac = 1;
    let arrowOpac = 1;
    let lastClickedTime = 0;
    let tutorialCode = [37, 39, 37, 39, 38, 40, 38, 40, ]; // Key codes for Up, Up, Down, Down, Left, Right, Left, Right
    let tutorialIndex = 0;
    let highestCombo = localStorage.getItem('highestCombo') ? parseInt(localStorage.getItem('highestCombo'), 10) : 0;



// Checking for User Interaction
    const removeNotification = () => {
            notification.classList.add('hidden');
            document.removeEventListener('click', removeNotification);
            document.removeEventListener('keypress', removeNotification);
    };

            document.addEventListener('click', removeNotification);
            document.addEventListener('keypress', removeNotification);

// Blur shits
    buttons.forEach(function(button) {
        profilePic.classList.add('blurred');
        momText.classList.add('blurred');
        button.classList.add('blurred');
    });

// Remove blur
    setTimeout(function() {
        buttons.forEach(function(button) {
            button.classList.remove('blurred');
            momText.classList.remove('blurred');
            profilePic.classList.remove('blurred');
        });
    }, 0);

// Function to toggle mute
            function toggleMute() {
                isMuted = !isMuted;
                const volumeIcon = isMuted ? '🔇' : '🔊';
                muteToggle.textContent = isMuted ? '🔇' : '🔊';
                
                const allAudioElements = document.querySelectorAll('audio');
                allAudioElements.forEach(audio => {
                    audio.muted = isMuted;
                });
            }

            muteToggle.addEventListener('click', toggleMute);

// Button Sounds
            const playHoverSound = () => {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(error => {
                    console.error('Error playing hover sound:', error);
                });
            };

            const playClickSound = () => {
                clickSound.currentTime = 0;
                clickSound.play().catch(error => {
                    console.error('Error playing click sound:', error);
                });
            };

            linkButtons.forEach(button => {
                button.addEventListener('mouseenter', playHoverSound);
                button.addEventListener('click', playClickSound);
            });

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
        const randomXOffset = Math.random() * 300 - 0;
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
        background.style.setProperty('--mouse-distance', distance);
    });            

//Sound Test

    document.addEventListener('keydown', (event) => {
        if (textBoxContainer.style.display === 'none'){
            if (event.key === 'Enter') {
                textBoxContainer.style.display = 'flex';
                textBox.style.width = '325px';
                textBox.focus();
                chaosSound.play()
            }
        }
        
    });

textBox.addEventListener('input', () => {
        const inputValue = textBox.value.trim();

        if (inputValue === '461225') {
            blackBox.style.display = 'block';
            copyrightElement.innerHTML = `&copy;SEGA Enterprises, Ltd. 1993 - 2024 All Rights Reserved.`;
            musicSound.volume = 0;
            fiiSound.play()
            funText.style.display = 'flex';
            majinScroll.style.display = 'block';
        } else {
            
        }
    });

function isBlackBoxVisible() {
    const blackBox = document.getElementById('black-box');
    const computedStyle = getComputedStyle(blackBox);
    return computedStyle.visibility === 'visible';
}

//FNF Arrows on Key Press
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
    if(event.keyCode === 37) {
        const image = document.createElement('img');
    image.src = 'pic/image4.png';
    image.classList.add('floating-image');
    const container = document.querySelector('.floating-images');
    container.appendChild(image);

    image.onload = () => {
        image.style.left = '50%';
        image.style.width = 'auto';
        image.style.height = `100px`;
        image.style.marginLeft = `-${image.offsetWidth / 2}px`;

        setTimeout(() => {
            container.removeChild(image);
        }, 3900);
    };

    }
    if(event.keyCode === 39) {
        const image = document.createElement('img');
    image.src = 'pic/image2.png';
    image.classList.add('floating-image');
    const container = document.querySelector('.floating-images');
    container.appendChild(image);

    image.onload = () => {
        image.style.left = '50%';
        image.style.width = 'auto';
        image.style.height = `100px`;
        image.style.marginLeft = `-${image.offsetWidth / 2}px`;

        setTimeout(() => {
            container.removeChild(image);
        }, 3900);
    };
    }
if (event.keyCode === 38) {
    const image = document.createElement('img');
    image.src = 'pic/image1.png';
    image.classList.add('floating-image');
    const container = document.querySelector('.floating-images');
    container.appendChild(image);

    image.onload = () => {
        image.style.left = '50%';
        image.style.width = 'auto';
        image.style.height = `100px`;
        image.style.marginLeft = `-${image.offsetWidth / 2}px`;

        setTimeout(() => {
            container.removeChild(image);
        }, 3900);
    };
}
    if(event.keyCode === 40) {
        const image = document.createElement('img');
    image.src = 'pic/image3.png';
    image.classList.add('floating-image');
    const container = document.querySelector('.floating-images');
    container.appendChild(image);

    image.onload = () => {
        image.style.left = '50%';
        image.style.width = 'auto';
        image.style.height = `100px`;
        image.style.marginLeft = `-${image.offsetWidth / 2}px`;

        setTimeout(() => {
            container.removeChild(image);
        }, 3900);
    };
    }
});

function activateTutorialCode() {
    gfSound.play()
    bubOpac = 0;
    setInterval(createFloatingImage, 250);
    for (let i = 0; i < 50; i++) {     
    }
}

//FNF Floating Arrows to replace bubbles
function createFloatingImage() {
    const imagePaths = [
        'pic/image4.png',
        'pic/image3.png',
        'pic/image2.png',
        'pic/image1.png'
    ];

    const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

    const image = document.createElement('img');
    image.src = randomImagePath;
    image.classList.add('floating-image');
    const container = document.querySelector('.floating-images');
    container.appendChild(image);
    
    const randomX = Math.random() * 100;
    const randomSize = Math.floor(Math.random() * 80) + 65;
    image.style.left = `${randomX}%`;
    image.style.height = arrowOpac;  
    image.style.width = `auto`;
    image.style.height = `${randomSize}px`;
    setTimeout(() => {
        container.removeChild(image);
    }, 3900); 

}

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
    spinSound.currentTime = 0;
    spinSound.play();

    const baseRotation = clickCount * 360; // Each click adds one full rotation
    const randomRotation = Math.random() * 720;
    const clockwiseRotation = baseRotation + randomRotation + Math.ceil(baseRotation / 360) * 360;

    profilePic.style.transition = 'transform 3s';
    profilePic.style.transform = `rotate(${clockwiseRotation}deg)`;

    createComboCounter(event.clientX, event.clientY, clickCount);

    // Change background gradient on every 10 clicks
    if (clickCount % 10 === 0) {
        changeBackgroundGradient();
        if (musicSound.paused) {
            musicSound.currentTime = 0;
            musicSound.play();
            
            profilePic.src = 'pic/Disk2.png';
            setInterval(createBubble, 75);
        }
    }

    // Update Combo Score
    if (clickCount > highestCombo) {
        highestCombo = clickCount;
        localStorage.setItem('highestCombo', highestCombo); // Save highest combo to localStorage
        highestComboElement.textContent = `Highest Combo: ${highestCombo}`;
    }
});

    function changeBackgroundGradient() {
    const colors = generateComplementaryColors();
    const gradient = `linear-gradient(135deg, ${colors[0]} 10%, ${colors[1]} 100%)`;

    // Apply animation to the background gradient
    document.body.style.background = gradient;
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradientAnimation 7.5s ease infinite'; 
}

    function generateComplementaryColors() {
        // Generate two random colors
        const color1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const color2 = '#' + Math.floor(Math.random() * 16777215).toString(16);

        // Ensure the colors are complementary (most of the time lol)
        const lightenedColor1 = lightenDarkenColor(color1, 20);
        const lightenedColor2 = lightenDarkenColor(color2, -20);

        return [lightenedColor1, lightenedColor2];
    }

    function lightenDarkenColor(color, amount) {
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
