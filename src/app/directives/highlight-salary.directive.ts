import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * HighlightSalaryDirective - highlights an element if the salary exceeds the threshold.
 * Applies a subtle gold/yellow background to table rows with high salaries.
 *
 * Usage: <tr [appHighlightSalary]="employee.salary">
 *
 * Default threshold is 80000. Can be customized via salaryThreshold input.
 */
@Directive({
  selector: '[appHighlightSalary]',
  standalone: true
})
export class HighlightSalaryDirective implements OnInit {

  /** The salary value to evaluate */
  @Input('appHighlightSalary') salary: number = 0;

  /** Customizable salary threshold (default: 80000) */
  @Input() salaryThreshold: number = 80000;

  constructor(private el: ElementRef) {}

  /**
   * OnInit lifecycle hook - applies highlight styling if salary exceeds threshold.
   */
  ngOnInit(): void {
    if (this.salary > this.salaryThreshold) {
      this.el.nativeElement.style.backgroundColor = '#FFF9C4'; // Light yellow
      this.el.nativeElement.style.borderLeft = '4px solid #FFC107'; // Gold accent
    }
  }
}
