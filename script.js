const projectButtons = document.querySelectorAll('.nav-item');
const gradientBackground = document.querySelector('.gradient-background');
const mainBox = document.querySelector('.main-box');
const projectSections = document.querySelectorAll('.project-section');
const openMenuButton = document.getElementById('openMenuButton');
const closeMenuButton = document.getElementById('closeMenuButton');
const bladeOverlay = document.getElementById('bladeOverlay');
const navButtons = document.querySelectorAll('.nav-buttons .nav-item');
const textToType = "Joshua Lamb's Portfolio";
const typingText = document.getElementById('typingText');
const bladeButton = document.getElementById('bladeButton');
const socialIcons = document.querySelector('.social-icons');

const gradientColors = [
    { color: 'orange', position: 0 },
    { color: 'pink', position: 30 },
];

const gradientTransitionDuration = 500; 

function updateGradient(scrollPosition) {
    const scrollPercentage = (scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100;

    let startColor, endColor, startPosition, endPosition;
    for (let i = 0; i < gradientColors.length - 1; i++) {
        if (scrollPercentage >= gradientColors[i].position && scrollPercentage <= gradientColors[i + 1].position) {
            startColor = gradientColors[i].color;
            endColor = gradientColors[i + 1].color;
            startPosition = gradientColors[i].position;
            endPosition = gradientColors[i + 1].position;
            break;
        }
    }

    const transitionPercentage = (scrollPercentage - startPosition) / (endPosition - startPosition);
    const easedTransitionPercentage = easeInOutCubic(transitionPercentage); // Apply easing function
    const transitionDuration = easedTransitionPercentage * gradientTransitionDuration;

    gradientBackground.style.transition = `background ${transitionDuration}ms ease-in-out`;
    gradientBackground.style.background = `linear-gradient(to bottom right, ${startColor}, ${endColor})`;

    setTimeout(() => {
        gradientBackground.style.transition = '';
    }, transitionDuration);
}

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const isInMainBox = scrollPosition >= mainBox.offsetTop && scrollPosition <= (mainBox.offsetTop + mainBox.offsetHeight);

    if (!isInMainBox) {
        updateGradient(scrollPosition);
    }
});

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const projectSection = document.getElementById(targetId);
        if (projectSection) {
            projectSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

openMenuButton.addEventListener('click', () => {
    bladeOverlay.style.left = '0';
});

closeMenuButton.addEventListener('click', () => {
    bladeOverlay.style.left = '-300px';
});

bladeOverlay.style.left = '-300px';
window.addEventListener('resize', () => {
    // Close the overlay if the window width goes beyond 768px (or any other desired threshold)
    if (window.innerWidth > 768) {
        bladeOverlay.style.left = '-300px';
    }
});


navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Close the blade overlay
        bladeOverlay.style.left = '-300px';

        // Scroll to the target project
        const target = button.getAttribute('data-target');
        const projectSection = document.getElementById(target);
        projectSection.scrollIntoView({ behavior: 'smooth' });
    });
});


function typeText() {
    typingText.innerHTML = ''; // Clear existing content
    let index = 0;
    const typingInterval = setInterval(() => {
        if (index < textToType.length) {
            typingText.innerHTML += textToType.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100); // Adjust typing speed here (milliseconds)
}

// Call the typeText function after a delay
setTimeout(() => {
    typeText();
}, 1); // Adjust the delay time (milliseconds)

// Show the blade button on smaller resolutions
function toggleBladeButton() {
    if (window.innerWidth <= 768) {
        bladeButton.style.display = 'block';
    } else {
        bladeButton.style.display = 'none';
        closeBlade(); // Close the blade if it's open on larger resolutions
    }
}

// Attach the toggleBladeButton function to window resize event
window.addEventListener('resize', toggleBladeButton);

// Initial check for the blade button visibility
toggleBladeButton();


// Easing function: Ease In Out Cubic
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
