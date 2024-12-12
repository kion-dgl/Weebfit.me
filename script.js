document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const characterImage = document.querySelector('.header-character');

    // Movement settings
    const settings = {
        character: {
            speed: 0.08,
            maxMove: {
                x: 15,
                y: 15  // We'll only use this for downward movement
            }
        }
    };

    // Update positions on mouse move
    document.addEventListener('mousemove', (e) => {
        // Get mouse position relative to center of viewport
        const mouseX = e.clientX - window.innerWidth / 2;
        const mouseY = e.clientY - window.innerHeight / 2;

        // Calculate movement amounts
        const charMoveX = -mouseX * settings.character.speed;
        let charMoveY = -mouseY * settings.character.speed;

        // Get the current position of the character relative to the header
        const headerRect = header.getBoundingClientRect();
        const charRect = characterImage.getBoundingClientRect();
        
        // Calculate how much of the character is visible at the bottom
        const bottomOverflow = charRect.bottom - headerRect.bottom;

        // If character is already at or below the bottom of the header,
        // only allow downward movement (positive Y values)
        if (bottomOverflow <= 0) {
            charMoveY = Math.max(0, charMoveY);
        }

        // Apply movement with constraints
        const charTransformX = Math.max(Math.min(charMoveX, settings.character.maxMove.x), -settings.character.maxMove.x);
        const charTransformY = Math.max(Math.min(charMoveY, settings.character.maxMove.y), -settings.character.maxMove.y);

        // Apply transforms with smooth transition
        characterImage.style.transform = `translate(calc(-50% + ${charTransformX}px), ${charTransformY}px)`;
    });

    // Add smooth transition on load
    characterImage.style.transition = 'transform 0.3s ease-out';

    // Reset position when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        characterImage.style.transform = 'translate(-50%, 0)';
    });
});


