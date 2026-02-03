document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const content = document.getElementById('content');
    const successMessage = document.getElementById('success-message');
    const heartsContainer = document.querySelector('.hearts-container');

    // Create background floating hearts
    function createHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.animationDuration = Math.random() * 5 + 5 + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heartsContainer.appendChild(heart);
        }
    }
    createHearts();

    // Interaction for No button
    let noClickCount = 0;
    const phrases = [
        "¿Estás segura? 🥺",
        "¡iénsalo bien!",
        "¡Por favor! 🙏",
        "¡Mira que te quiero!",
        "¡No me hagas esto!",
        "¡Voy a llorar! 😭",
        "¡Di que sí! ❤️"
    ];

    noBtn.addEventListener('click', () => {
        noClickCount++;

        // Make Yes button bigger
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        const currentPadding = parseFloat(window.getComputedStyle(yesBtn).paddingTop);

        yesBtn.style.fontSize = `${currentSize * 1.3}px`;
        yesBtn.style.padding = `${currentPadding * 1.2}px ${currentPadding * 2.5}px`;

        // Change No button text or behavior
        if (noBtn.innerText !== "¡SÍ!") {
            // If we haven't converted it yet, cycle through phrases or convert
            if (noClickCount < 4) {
                noBtn.innerText = phrases[Math.floor(Math.random() * phrases.length)];
                // Make no button smaller/move or just text change? User said "el no si se apreta es un SI mas grande"
                // Let's implement specifically: "El No si se apreta es un Si mas grande"
                // So the NO button ITSELF becomes a BIGGER YES.

                // But wait, the user also said "y todos son SI".
            } else {
                // Convert No button to a BIG YES
                noBtn.innerText = "¡SÍ!";
                noBtn.classList.add('transformed');
                noBtn.classList.remove('no-btn');
                noBtn.classList.add('yes-btn'); // Style as yes button

                // Add event to handle success on this new yes button
                noBtn.onclick = handleSuccess;
            }
        } else {
            // It's already a YES button
            handleSuccess();
        }
    });

    // Interaction for Yes button
    yesBtn.addEventListener('click', handleSuccess);

    function handleSuccess() {
        content.classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Launch confetti
        launchConfetti();

        // Bonus: Play a cute sound if we had one, but we'll stick to confetti
    }

    function launchConfetti() {
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function () {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }
});
