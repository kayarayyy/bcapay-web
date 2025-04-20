import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { LoanRequest } from "../models/loan-request.model";
import { response } from "express";

@Injectable({ providedIn: 'root' })
export class LoanRequestService {
    private baseUrl = 'http://localhost:8080/api/v1';
    constructor(private http: HttpClient) {
        
    }

    getAllLoanRequest(): Observable<LoanRequest[]>{
        return this.http.get<{ data:LoanRequest[] }>(`${this.baseUrl}/loan-requests`)
        .pipe(map(response => response.data));
    }

}