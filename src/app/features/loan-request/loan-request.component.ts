import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../layout/card-layout/card/card.component';
import { TableComponent } from '../../layout/table-layout/table/table.component';
import { LoanRequest } from '../../core/models/loan-request.model';
import { LoanRequestService } from '../../core/services/loan-request.service';

@Component({
  selector: 'app-loan-request',
  standalone: true,
  imports: [CardComponent, TableComponent],
  templateUrl: './loan-request.component.html',
  styleUrl: './loan-request.component.css'
})
export class LoanRequestComponent implements OnInit {
  loan_requests: LoanRequest[] = [];
  isLoading = true;
  pageOffset = 0;

  columns = [
    { header: 'Customer', field: 'customer.email' },
    { header: 'Jumlah Pengajuan', field: 'formattedAmount' },
    { header: 'Refferal', field: 'refferal' },
    { header: 'Marketing', field: 'marketing.email' },
    { header: 'Branch Manager', field: 'branchManager.email' },
    { header: 'Back Office', field: 'backOffice.email' },
  ];

  constructor(private loanRequestService: LoanRequestService) { }

  ngOnInit(): void {
    this.loanRequestService.getAllLoanRequest().subscribe({
      next: (value) => {
        this.loan_requests = value.map(loan_request => ({
          ...loan_request,
          formattedAmount: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(loan_request.amount)
        }));
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    })
  }

  onPage(event: any) {
    this.pageOffset = event.offset;
  }

  deleteLoanRequest(id: string): void { }
}
