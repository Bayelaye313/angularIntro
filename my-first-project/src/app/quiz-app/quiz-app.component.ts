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
      this.questionsList = res;
    });
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

    // Reset selected options in each question
    this.questionsList.forEach((question) => {
      question.options.forEach((option) => {
        option.isSelected = false;
      });
    });
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
