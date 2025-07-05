document.addEventListener('DOMContentLoaded', () => {
            // Page elements
            const page1 = document.getElementById('page1');
            const page2 = document.getElementById('page2');
            const page3 = document.getElementById('page3');
            const page4 = document.getElementById('page4');
            const page5 = document.getElementById('page5'); // New page 5

            // Bubu Dudu images for each page
            const bubuDuduImage1 = document.getElementById('bubuDuduImage1');
            const bubuDuduImage2 = document.getElementById('bubuDuduImage2');
            const bubuDuduImage3 = document.getElementById('bubuDuduImage3');
            const bubuDuduImage4 = document.getElementById('bubuDuduImage4');
        

            // Buttons
            const answerButton1 = document.getElementById('answerButton1');
            const yesButton = document.getElementById('yesButton');
            const noButton = document.getElementById('noButton');
            const answerButton3 = document.getElementById('answerButton3');

            // Radio options for page 1
            const radioOptionsPage1 = document.querySelectorAll('input[name="loveOption"]');

            // Slider elements for page 3
            const loveSlider = document.getElementById('loveSlider');
            const loveValueDisplay = document.getElementById('loveValueDisplay');

            // Elements for page 4
            const yayText = document.getElementById('yayText');
            const loveYouTooText = document.getElementById('loveYouTooText');

            // Elements for page 5
            const flowerTitle = document.getElementById('flowerTitle');

            // Floating message (only for page 1 incorrect answer now)
            const floatingMessage = document.getElementById('floatingMessage');

            // New element for sequential messages on page 2
            const noInteractionMessage = document.getElementById('noInteractionMessage');
            const noMessages = [
                "Really?",
                "Are you sure?",
                "Please, babe, think again!",
                "I will be so sad...",
                "My heart will break.",
                "Don't do this to me!",
                "Is this truly your answer?",
                "I'm begging you!",
                "Just say yes!",
                "Please, please, please...",
                "You're hurting my feelings!",
                "I thought we had something special...",
                "This isn't like you!",
                "Come on, say 'Yes'!",
                "My world will crumble!",
                "One more chance to say 'Yes'..."
            ];
            let noMessageIndex = 0;

            // Image URLs for different reactions (placeholders)
            const bubuDuduFocus = "assets/thinking.gif";
            const bubuDuduHappy = "assets/cuddle-cute.gif";
            const bubuDuduAngry = "assets/angry.gif";
            const bubuDuduBegging = "assets/afraid.gif";
            const bubuDuduCrying = "assets/sad2.gif";
            const bubuDuduHappyLarge = "assets/yay-jump.gif";
            const bubuDuduStaring = "assets/sseeyall-bubu-dudu.gif";
            const bubuDuduDancing = "assets/dancing.gif";

           
            // Function to show a specific page
            const showPage = (pageToShowId) => {
                const allPages = [page1, page2, page3, page4, page5]; // Include page 5
                allPages.forEach(page => {
                    if (page.id === pageToShowId) {
                        page.classList.add('active');
                        // Reset Bubu Dudu images and animations when page changes
                        if (page.id === 'page1') bubuDuduImage1.src = bubuDuduFocus;
                        if (page.id === 'page2') {
                            bubuDuduImage2.src = bubuDuduBegging;
                            noButton.style.position = 'relative';
                            noButton.style.left = 'auto';
                            noButton.style.top = 'auto';
                            noInteractionMessage.classList.remove('show');
                            noInteractionMessage.textContent = '';
                            noMessageIndex = 0;
                        }
                        if (page.id === 'page3') {
                            bubuDuduImage3.src = bubuDuduStaring;
                            loveValueDisplay.textContent = loveSlider.value + '%';
                            answerButton3.style.position = 'relative';
                            answerButton3.style.left = 'auto';
                            answerButton3.style.top = 'auto';
                        }
                        if (page.id === 'page4') {
                            bubuDuduImage4.src = bubuDuduHappyLarge;
                            yayText.classList.remove('animate');
                            loveYouTooText.classList.remove('animate');
                            void yayText.offsetWidth;
                            void loveYouTooText.offsetWidth;
                            yayText.classList.add('animate');
                            loveYouTooText.classList.add('animate');
                        }
                        if (page.id === 'page5') {
                            // When page 5 is active, ensure animations are not paused
                            document.body.classList.remove("not-loaded");
                            // Set the Dudu sticker image source
                            document.getElementById('duduSticker').src = duduFlowerSticker;

                            // Trigger typing animation for flower title
                            flowerTitle.classList.remove('animate-typing');
                            void flowerTitle.offsetWidth; // Trigger reflow
                            flowerTitle.classList.add('animate-typing');
                        }
                    } else {
                        page.classList.remove('active');
                    }
                });
                hideMessage(); // Always hide floating message when changing pages
            };

            // Function to hide the floating message (only for page 1)
            const hideMessage = () => {
                floatingMessage.classList.remove('show');
                setTimeout(() => {
                    floatingMessage.style.visibility = 'hidden';
                }, 500);
            };

            // Function to move a button randomly within the viewport
            const moveButtonRandomly = (buttonElement) => {
                const buttonRect = buttonElement.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                const scrollX = window.scrollX || window.pageXOffset;
                const scrollY = window.scrollY || window.pageYOffset;

                let newLeft = Math.random() * (viewportWidth - buttonRect.width);
                let newTop = Math.random() * (viewportHeight - buttonRect.height);

                newLeft += scrollX;
                newTop += scrollY;

                if (buttonElement.style.position !== 'absolute') {
                    buttonElement.style.position = 'absolute';
                }
                buttonElement.style.left = `${newLeft}px`;
                buttonElement.style.top = `${newTop}px`;
            };

            // Initially hide the floating message and show page 1
            hideMessage();
            showPage('page1');

            // --- Page 1 Logic ---
            answerButton1.addEventListener('click', () => {
                let selectedValue = null;
                for (const radio of radioOptionsPage1) {
                    if (radio.checked) {
                        selectedValue = radio.value;
                        break;
                    }
                }

                if (selectedValue === 'yourCake') {
                    bubuDuduImage1.src = bubuDuduDancing;
                    setTimeout(() => {
                        showPage('page2');
                    }, 1000);
                } else if (selectedValue) {
                    bubuDuduImage1.src = bubuDuduAngry;
                    floatingMessage.style.visibility = 'visible';
                    floatingMessage.classList.add('show');
                    setTimeout(hideMessage, 3000);
                } else {
                    console.log("Please select an option.");
                }
            });

            // --- Page 2 Logic ---
            yesButton.addEventListener('click', () => {
                bubuDuduImage2.src = bubuDuduHappy;
                setTimeout(() => {
                    showPage('page3');
                }, 1000);
            });

            // Function to display sequential "No" messages
            const displayNoMessage = () => {
                noInteractionMessage.textContent = noMessages[noMessageIndex];
                noInteractionMessage.classList.add('show');
                noMessageIndex = (noMessageIndex + 1) % noMessages.length;
            };

            // Event listener for the 'No' button on Page 2
            noButton.addEventListener('mouseover', () => {
                bubuDuduImage2.src = bubuDuduCrying;
                moveButtonRandomly(noButton);
                displayNoMessage();
            });

            noButton.addEventListener('click', (event) => {
                event.preventDefault();
                bubuDuduImage2.src = bubuDuduCrying;
                moveButtonRandomly(noButton);
                displayNoMessage();
            });

            // --- Page 3 Logic ---
            loveSlider.addEventListener('input', () => {
                loveValueDisplay.textContent = loveSlider.value + '%';
                if (parseInt(loveSlider.value) === parseInt(loveSlider.max)) {
                    bubuDuduImage3.src = bubuDuduHappy;
                } else {
                    bubuDuduImage3.src = bubuDuduFocus;
                }
            });

            // Event listener for the 'Answer' button on Page 3
            answerButton3.addEventListener('mouseover', () => {
                if (parseInt(loveSlider.value) < parseInt(loveSlider.max)) {
                    moveButtonRandomly(answerButton3);
                }
            });

            answerButton3.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedLove = parseInt(loveSlider.value);
                const maxLove = parseInt(loveSlider.max);

                if (selectedLove < maxLove) {
                    moveButtonRandomly(answerButton3);
                    console.log("You need to love me more! Try to reach 1,000,000%");
                } else {
                    console.log(`You love me ${selectedLove}%! That's the max!`);
                    bubuDuduImage3.src = bubuDuduHappy;
                    setTimeout(() => {
                        showPage('page4'); // Go to page 4
                        setTimeout(() => {
                            showPage('page5'); // Then to page 5 after a reasonable time
                        }, 2000); // 2-second delay after page 4
                    }, 1000);
                }
            });
        });