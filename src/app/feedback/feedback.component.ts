import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
 selectedAccuracy: string;
 selectedTreatment: string;
 private text: Object;
 yesno: Array<any>[];
 treatments: Array<any>[];
 constructor(private _TranslateService: TranslateService) {this._TranslateService.langObservable.subscribe(
      data => this.text = data
      );  
      this.yesno = [this.text["feedback"].yes, this.text["feedback"].no];
      this.treatments = [this.text["feedback"].notreatment, this.text["feedback"].nurse, this.text["feedback"].nurseoh, this.text["feedback"].doctor ];
    }

  ngOnInit() {
  }

}


