import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: []
})
export class QuizAppComponent implements OnInit, OnDestroy {

  showWarning: boolean = false;
  isQuizStarted: boolean = false;
  isQuizEnded: boolean = false;
  questionsList: any[] = [];
  currentQuestionNo: number = 0;
  remainingTime: number = 10;
  timerSubscription: Subscription | undefined;
  correctAnswerCount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadQuestions() {
    this.http.get("assets/question.json").subscribe((res: any) => {
      // Load all questions from JSON
      const allQuestions: any[] = res;

      // Randomly select 30 questions from all available questions
      this.questionsList = this.selectRandomQuestions(allQuestions, 30);

      // Shuffle selected questions and options
      this.shuffleQuestions();
    });
  }

  selectRandomQuestions(allQuestions: any[], count: number): any[] {
    // Shuffle all questions to randomize selection
    const shuffledQuestions = [...allQuestions].sort(() => 0.5 - Math.random());

    // Select the first 'count' questions from shuffled list
    return shuffledQuestions.slice(0, count);
  }

  shuffleQuestions() {
    // Randomize the order of selected questions
    for (let i = this.questionsList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questionsList[i], this.questionsList[j]] = [this.questionsList[j], this.questionsList[i]];

      // Shuffle options for each selected question (including keeping the correct answer in its new position)
      this.shuffleOptions(this.questionsList[i]);
    }
  }

  shuffleOptions(question: any) {
    // Copy options array to avoid modifying original reference
    const optionsCopy = [...question.options];

    // Shuffle options array
    for (let i = optionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
    }

    // Update question options with shuffled options (including correct answer in new position)
    question.options = optionsCopy;
  }

  start() {
    this.resetQuiz();
  }

  resetQuiz() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = false;
    this.currentQuestionNo = 0;
    this.correctAnswerCount = 0;
    this.remainingTime = 10;

    // Reset selected options in each selected question
    this.questionsList.forEach((question) => {
      question.options.forEach((option) => {
        option.isSelected = false;
      });

      // Shuffle options for each selected question at the start of each quiz session
      this.shuffleOptions(question);
    });

    // Shuffle selected questions at the start of each quiz session
    this.shuffleQuestions();
  }

  startQuiz() {
    this.showWarning = false;
    this.isQuizStarted = true;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.nextQuestion();
      }
    });
  }

  nextQuestion() {
    if (this.currentQuestionNo < this.questionsList.length - 1) {
      this.currentQuestionNo++;
      this.remainingTime = 10; // Restart time for the next question
    } else {
      this.finish();
    }
  }

  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  quitGame() {
    this.showWarning = false;
    this.isQuizStarted = false;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  exitGame() {
    this.resetQuiz();
    console.log('Quiz reset.');
  }

  selectOption(option: any) {
    if (option.isCorrect) {
      this.correctAnswerCount++;
    }
    option.isSelected = true;
  }

  isOptionSelected(options: any) {
    const selectionCount = options.filter((option: any) => option.isSelected).length;
    return selectionCount > 0;
  }

  showWarningPopup() {
    this.showWarning = true;
  }
}
