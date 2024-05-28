document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profile-pic');
    const clickSound = document.getElementById('click-sound');
    let clickCount = 0;
    let lastClickedTime = 0;

    const background = document.querySelector('.bubbles');

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const backgroundRect = background.getBoundingClientRect();
        const backgroundCenterX = backgroundRect.left + backgroundRect.width / 2;
        const backgroundCenterY = backgroundRect.top + backgroundRect.height / 2;

        const deltaX = mouseX - backgroundCenterX;
        const deltaY = mouseY - backgroundCenterY;

        const moveX = deltaX / -300;
        const moveY = deltaY / -550;

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
        }
    });

    function changeBackgroundGradient() {
        const colors = generateComplementaryColors();
        const gradient = `linear-gradient(135deg, ${colors[0]} 10%, ${colors[1]} 100%)`;
        document.body.style.background = gradient;
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

//Combo Counter
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
