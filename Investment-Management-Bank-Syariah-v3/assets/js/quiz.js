/*
 * ====================================================================
 * quiz.js: (Logic and Typo Fix)
 * ====================================================================
 * BUGFIX:
 * - Fixed the quiz "disappearing" bug.
 * - 'showResults()' now correctly hides the question/controls
 * and shows the results, instead of hiding the whole container.
 * - Fixed all 'class.name=' typos.
 */

class Quiz {
    constructor(eventBus) {
        // --- 1. State and Selectors ---
        this.section = document.getElementById('kuis');
        this.eventBus = eventBus;
        this.hasInitialized = false;

        this.allQuestions = [];
        this.shuffledQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;

        // USE APPCONFIG CONSTANT: Use AppConfig.EVENTS.TAB_CHANGED
        this.eventBus.subscribe(AppConfig.EVENTS.TAB_CHANGED, (targetId) => this.handleTabChange(targetId));

        // --- BIND 'this' CONTEXT ---
        this.startQuiz = this.startQuiz.bind(this);
        this.handleAnswerClick = this.handleAnswerClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }

    // --- 2. Controller Logic ---
    async handleTabChange(targetId) {
        if (targetId !== 'kuis') {
            return;
        }

        if (this.hasInitialized) {
            this.startQuiz();
            return;
        }

        await this.init();
        this.hasInitialized = true;
    }

    async init() {
        this.renderSkeleton(); // Build the HTML view

        try {
            const response = await fetch(AppConfig.DATA_PATHS.QUIZ);
            if (!response.ok) { throw new Error('Quiz data not found'); }
            this.allQuestions = await response.json();

            this.startQuiz();

        } catch (error) {
            // --- THIS BLOCK IS UPDATED ---
            // OLD: console.error(...)
            // OLD: this.section.innerHTML = ...

            // NEW: Publish the error to the global handler
            this.eventBus.publish(AppConfig.EVENTS.CRITICAL_ERROR, {
                module: "Kuis",
                message: error.message
            });
            // -----------------------------
        }
    }
    startQuiz() {
        this.score = 0;
        this.currentQuestionIndex = 0;

        this.shuffledQuestions = this.allQuestions
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);

        // --- THE FIX ---
        // Show the question view and hide the results
        this.resultsContainer.classList.add('hidden');
        this.questionContainer.classList.remove('hidden');
        this.controlsContainer.classList.remove('hidden'); // Show controls

        this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex]);
    }

    handleAnswerClick(e) {
        const selectedButton = e.target;
        const answer = JSON.parse(selectedButton.dataset.answer);

        this.answerButtonsEl.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
            const btnAnswer = JSON.parse(btn.dataset.answer);
            if (btnAnswer.correct) {
                btn.classList.add('correct');
            }
        });

        if (answer.correct) {
            selectedButton.classList.add('correct');
            this.feedbackEl.innerHTML = `<p class="text-green-600 font-semibold">${answer.feedback}</p>`;
            this.score++;
        } else {
            selectedButton.classList.add('wrong');
            this.feedbackEl.innerHTML = `
                <p class="text-red-600 font-semibold">${answer.feedback}</p>
                ${answer.learn_more_tab ? 
                    `<button data-target="${answer.learn_more_tab}" class="learn-more-btn font-sans text-sm font-semibold text-brand-accent hover:text-brand-dark mt-2">
                        Pelajari di tab '${answer.learn_more_tab}' &rarr;
                    </button>` 
                    : ''}
            `;
        }

        this.feedbackEl.classList.remove('hidden');
        this.nextBtn.classList.remove('hidden');
    }

    handleNextClick() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.shuffledQuestions.length) {
            this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex]);
        } else {
            this.showResults();
        }
    }

    // --- 3. View Logic ---

    renderSkeleton() {
        const quizWrapper = document.createElement('div');
        quizWrapper.className = "w-full max-w-3xl mx-auto";
        // --- TYPOS FIXED HERE ---
        quizWrapper.innerHTML = `
            <div id="quiz-container" class="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <div id="question-container">
                    <p id="question-counter" class="text-sm font-semibold text-brand-accent"></p>
                    <h2 id="question-text" class="font-serif text-2xl text-brand-dark mt-2"></h2>
                    <div id="answer-buttons" class="grid grid-cols-1 gap-3 mt-6"></div>
                    <div id="feedback-container" class="hidden mt-4 p-4 bg-brand-light rounded-md"></div>
                </div>
                <div id="controls-container" class="mt-6 flex justify-end">
                    <button id="next-btn" class="hidden font-bold py-2 px-6 rounded-lg text-white bg-brand-accent hover:bg-brand-dark">
                        Berikutnya
                    </button>
                </div>
                <div id="results-container" class="hidden text-center">
                    <h2 class="font-serif text-3xl font-bold text-brand-dark">Kuis Selesai!</h2>
                    <p id="score-text" class="text-lg text-brand-dark/80 mt-4"></p>
                    <button id="restart-btn" class="mt-8 font-bold py-3 px-8 rounded-lg text-white bg-brand-accent hover:bg-brand-dark">
                        Coba Lagi
                    </button>
                </div>
            </div>
        `;
        this.section.innerHTML = '';
        this.section.appendChild(quizWrapper);

        // Now that skeleton exists, select the inner elements
        // (No 'quizContainer' selector, as it's the wrapper)
        this.questionContainer = this.section.querySelector('#question-container');
        this.controlsContainer = this.section.querySelector('#controls-container'); // Added this
        this.questionCounterEl = this.section.querySelector('#question-counter');
        this.questionTextEl = this.section.querySelector('#question-text');
        this.answerButtonsEl = this.section.querySelector('#answer-buttons');
        this.feedbackEl = this.section.querySelector('#feedback-container');
        this.nextBtn = this.section.querySelector('#next-btn');
        this.resultsContainer = this.section.querySelector('#results-container');
        this.scoreTextEl = this.section.querySelector('#score-text');
        const restartBtn = this.section.querySelector('#restart-btn');

        // Attach event listeners
        restartBtn.addEventListener('click', this.startQuiz);
        this.nextBtn.addEventListener('click', this.handleNextClick);
        this.feedbackEl.addEventListener('click', (e) => {
            const learnMoreBtn = e.target.closest('.learn-more-btn');
            if (learnMoreBtn) {
                const targetTab = learnMoreBtn.dataset.target;
                // USE APPCONFIG CONSTANT: Use AppConfig.EVENTS.NAVIGATE_TO_TAB
                this.eventBus.publish(AppConfig.EVENTS.NAVIGATE_TO_TAB, targetTab);
            }
        });
    }

    showQuestion(question) {
        this.feedbackEl.classList.add('hidden');
        this.nextBtn.classList.add('hidden');

        this.questionCounterEl.innerText = `Soal ${this.currentQuestionIndex + 1} dari ${this.shuffledQuestions.length}`;
        this.questionTextEl.innerText = question.question;

        this.answerButtonsEl.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.className = 'quiz-btn w-full text-left p-4 border border-brand-secondary/40 rounded-lg hover:bg-brand-light transition-colors';
            button.dataset.answer = JSON.stringify(answer);
            button.addEventListener('click', this.handleAnswerClick);
            this.answerButtonsEl.appendChild(button);
        });
    }

    /**
     * Renders the final results screen.
     */
    showResults() {
        // --- THE FIX ---
        // Hide the question and controls
        this.questionContainer.classList.add('hidden');
        this.controlsContainer.classList.add('hidden');
        // Show the results
        this.resultsContainer.classList.remove('hidden');

        this.scoreTextEl.innerText = `Skor Anda: ${this.score} dari ${this.shuffledQuestions.length}`;
    }
}
