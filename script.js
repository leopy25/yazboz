document.addEventListener('DOMContentLoaded', () => {
    const timerButtons = document.querySelectorAll('.timer-options button');
    const normalRadio = document.getElementById('normal');
    const daredevilRadio = document.getElementById('daredevil');
    const countdownDisplay = document.getElementById('countdown');
    const writingPad = document.getElementById('writing-pad');
    const copyButton = document.getElementById('copy-button');
    const wordCountDisplay = document.getElementById('word-count');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let timerId;
    let inactiveTimerId;
    let blinkTimerId;
    let deleteTimerId;
    let timeRemaining;
    const INACTIVITY_BLINK_TIME = 7;
    let INACTIVITY_DELETE_TIME = 10;

    const clearAllTimers = () => {
        clearInterval(timerId);
        clearTimeout(inactiveTimerId);
        clearTimeout(blinkTimerId);
        clearInterval(deleteTimerId);
    };
    
    const startBackspaceAnimation = () => {
        deleteTimerId = setInterval(() => {
            if (writingPad.value.length > 0) {
                writingPad.value = writingPad.value.slice(0, -1);
            } else {
                clearInterval(deleteTimerId);
                writingPad.classList.remove('rapid-blink');
            }
        }, 50);
    };

    const startInactiveTimer = () => {
        clearTimeout(inactiveTimerId);
        clearTimeout(blinkTimerId);
        clearInterval(deleteTimerId);
        writingPad.classList.remove('rapid-blink');

        blinkTimerId = setTimeout(() => {
            writingPad.classList.add('rapid-blink');
        }, INACTIVITY_BLINK_TIME * 1000);

        inactiveTimerId = setTimeout(() => {
            if (writingPad.value.length > 0) {
                writingPad.focus();
                startBackspaceAnimation();
            }
        }, INACTIVITY_DELETE_TIME * 1000);
    };

    const startTimer = (duration) => {
        clearAllTimers();
        timeRemaining = duration * 60;
        writingPad.value = '';
        writingPad.disabled = false;
        writingPad.focus();
        copyButton.classList.add('hidden');
        wordCountDisplay.textContent = 'Kelime: 0';

        timerId = setInterval(() => {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            countdownDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeRemaining <= 0) {
                clearAllTimers();
                writingPad.disabled = true;
                copyButton.classList.remove('hidden');
                writingPad.classList.remove('rapid-blink');
                alert('Süre doldu! Yazma mücadelesi sona erdi.');
            }
        }, 1000);
    };
    
    const updateWordCount = () => {
        const text = writingPad.value.trim();
        const words = text === '' ? 0 : text.split(/\s+/).length;
        wordCountDisplay.textContent = `Kelime: ${words}`;
    };

    timerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const duration = parseInt(button.dataset.time);
            startTimer(duration);
            startInactiveTimer();
        });
    });

    normalRadio.addEventListener('change', () => {
        if (normalRadio.checked) {
            INACTIVITY_DELETE_TIME = 10;
        }
    });

    daredevilRadio.addEventListener('change', () => {
        if (daredevilRadio.checked) {
            INACTIVITY_DELETE_TIME = 5;
        }
    });
    
    writingPad.addEventListener('input', () => {
        startInactiveTimer();
        updateWordCount();
    });

    darkModeToggle.addEventListener('click', () => {
        writingPad.classList.toggle('dark-mode');
    });

    copyButton.addEventListener('click', () => {
        writingPad.select();
        try {
            document.execCommand('copy');
            alert('Metin başarıyla panoya kopyalandı!');
        } catch (err) {
            console.error('Kopyalama başarısız oldu:', err);
            alert('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.');
        }
    });
});