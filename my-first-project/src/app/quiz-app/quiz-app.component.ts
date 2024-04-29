import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: [],
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
  playedQuestionIndices: Set<number> = new Set<number>(); // Track played question indices

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadQuestions() {
    this.http.get('assets/question.json').subscribe((res: any) => {
      const allQuestions: any[] = res;

      this.questionsList = this.selectRandomQuestions(allQuestions, 10);

      this.shuffleQuestions();
    });
  }

  selectRandomQuestions(allQuestions: any[], count: number): any[] {
    const availableQuestions = allQuestions.filter(
      (_, index) => !this.playedQuestionIndices.has(index)
    );

    if (availableQuestions.length < count) {
      // If not enough available questions, reset played indices set
      this.playedQuestionIndices.clear();
    }

    const shuffledAvailableQuestions = [...availableQuestions].sort(
      () => 0.5 - Math.random()
    );
    const selectedQuestions = shuffledAvailableQuestions.slice(0, count);

    // Add selected question indices to played set
    selectedQuestions.forEach((question) => {
      this.playedQuestionIndices.add(allQuestions.indexOf(question));
    });

    return selectedQuestions;
  }

  shuffleQuestions() {
    for (let i = this.questionsList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questionsList[i], this.questionsList[j]] = [
        this.questionsList[j],
        this.questionsList[i],
      ];

      this.shuffleOptions(this.questionsList[i]);
    }
  }

  shuffleOptions(question: any) {
    const optionsCopy = [...question.options];
    for (let i = optionsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsCopy[i], optionsCopy[j]] = [optionsCopy[j], optionsCopy[i]];
    }
    question.options = optionsCopy;
  }

  start() {
    this.resetQuiz();
    this.startQuiz();
  }

  resetQuiz() {
    this.showWarning = false;
    this.isQuizEnded = false;
    this.isQuizStarted = false;
    this.currentQuestionNo = 0;
    this.correctAnswerCount = 0;
    this.remainingTime = 10;

    // Clear played question indices for a new session
    this.playedQuestionIndices.clear();

    this.loadQuestions();
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
      this.remainingTime = 10;
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
    const selectionCount = options.filter(
      (option: any) => option.isSelected
    ).length;
    return selectionCount > 0;
  }

  showWarningPopup() {
    this.showWarning = true;
  }
}
