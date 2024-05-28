document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profile-pic');
    const clickSound = document.getElementById('click-sound');
    const musicSound = document.getElementById('music');
    const background = document.querySelector('.bubbles');
    let clickCount = 0;
    let lastClickedTime = 0;

// Bubble Controller
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        const size = Math.floor(Math.random() * 45) + 10; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        background.appendChild(bubble);
        setTimeout(() => {
            background.removeChild(bubble);
        }, 5000); 
    }
    setInterval(createBubble, 700); // Lower = More Bubbles

    // Moving Background
    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const backgroundRect = background.getBoundingClientRect();
        const backgroundCenterX = backgroundRect.left + backgroundRect.width / 2;
        const backgroundCenterY = backgroundRect.top + backgroundRect.height / 2;

        const deltaX = mouseX - backgroundCenterX;
        const deltaY = mouseY - backgroundCenterY;

        const moveX = deltaX / -200;
        const moveY = deltaY / 90;

        background.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

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

        clickSound.volume = 0.35;
        clickSound.currentTime = 0;
        clickSound.play();
        profilePic.classList.add('spin');
        setTimeout(() => {
            profilePic.classList.remove('spin');
        }, 1000);

        createComboCounter(event.clientX, event.clientY, clickCount);

// Change background gradient on every 10 clicks
        if (clickCount % 10 === 0) {
            changeBackgroundGradient();
            if (musicSound.paused) {
                musicSound.currentTime = 0;
                musicSound.play();
                musicSound.volume = 0.55;
                profilePic.src = 'pic/john.png';

                setInterval(createBubble, 90); // Adjust the interval for more frequent spawns
            }
        }
    });

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
