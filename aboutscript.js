document.addEventListener('DOMContentLoaded', () => { 
    let bubOpac = 1;
    const background = document.querySelector('.bubbles');

    // --Bubble Controller
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

    setInterval(createBubble, 350); // Lower = More Bubbles


function updateBubblePosition() {
    const backgroundRect = background.getBoundingClientRect();
    const backgroundCenterX = backgroundRect.left + backgroundRect.width / 2;
    const distance = mouseX - backgroundCenterX;
    background.style.setProperty('--mouse-distance', distance);
}

// Update bubble position when mouse moves
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    updateBubblePosition();
});

let mouseX = window.innerWidth / 2; // Start at the center
updateBubblePosition(); // Initial update
function animateBubbles() {
    updateBubblePosition();
    requestAnimationFrame(animateBubbles);
}
animateBubbles();       

});