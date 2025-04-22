import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CardComponent } from '../../layout/card-layout/card/card.component';
import { TableComponent } from '../../layout/table-layout/table/table.component';
import { LoanRequest } from '../../core/models/loan-request.model';
import { LoanRequestService } from '../../core/services/loan-request.service';
import { AuthSessionService } from '../../core/services/auth-session.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-loan-request',
  standalone: true,
  imports: [CardComponent, TableComponent, NgIf, CommonModule],
  templateUrl: './loan-request.component.html',
  styleUrl: './loan-request.component.css',
})
export class LoanRequestComponent implements OnInit {
  loan_requests: LoanRequest[] = [];
  isLoading = true;
  pageOffset = 0;
  columns: any[] = [];

  @ViewChild('reviewTpl', { static: true }) reviewTpl!: TemplateRef<any>;
  @ViewChild('approvalTpl', { static: true }) approvalTpl!: TemplateRef<any>;
  @ViewChild('disbursementTpl', { static: true }) disbursementTpl!: TemplateRef<any>;


  constructor(private loanRequestService: LoanRequestService, private authSessionService: AuthSessionService) {}

  ngOnInit(): void {
    this.columns = [
      { header: 'Customer', field: 'customerEmail' },
      { header: 'Jumlah Pengajuan', field: 'formattedAmount' },
      { header: 'Refferal', field: 'refferalMarketing' },
      { header: 'Marketing', field: 'marketingEmail' },
      { header: 'Review', field: 'marketingApprove', isCustom: true, templateRef: this.reviewTpl},
      { header: 'Branch Manager', field: 'branchManagerEmail' },
      { header: 'Approval', field: 'branchManagerApprove' , isCustom: true, templateRef: this.approvalTpl},
      { header: 'Back Office', field: 'backOfficeEmail' },
      { header: 'Disbursement', field: 'backOfficeApprove' , isCustom: true, templateRef: this.disbursementTpl},
    ];
    if (this.hasFeature('FEATURE_MANAGE_LOAN_REQUESTS')) {
      this.loanRequestService.getAllLoanRequest().subscribe({
        next: (value) => {
          this.loan_requests = value.map((loan_request) => ({
            ...loan_request,
            refferalMarketing: loan_request.refferal ?? "-",
            customerEmail: loan_request.customer.email,
            marketingEmail: loan_request.marketing?.email ?? "-",
            branchManagerEmail: loan_request.branchManager?.email?? "-",
            backOfficeEmail: loan_request.backOffice?.email ?? "-",
            formattedAmount: new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(loan_request.amount),
          }));

          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
    } else if (this.hasFeature('FEATURE_MARKETING_REVIEW')) {
      this.loanRequestService.getAllReviewLoan().subscribe({
        next: (value) => {
          this.loan_requests = value.map((loan_request) => ({
            ...loan_request,
            refferalMarketing: loan_request.refferal ?? "-",
            customerEmail: loan_request.customer.email,
            marketingEmail: loan_request.marketing?.email ?? "-",
            branchManagerEmail: loan_request.branchManager?.email?? "-",
            backOfficeEmail: loan_request.backOffice?.email ?? "-",
            formattedAmount: new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(loan_request.amount),
          }));

          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }


  hasFeature(feature: string): boolean {
    const features = this.authSessionService.features;
    return features.includes(feature);
  }

  onPage(event: any) {
    this.pageOffset = event.offset;
  }

  reviewRequest(id: string): void {}
}
