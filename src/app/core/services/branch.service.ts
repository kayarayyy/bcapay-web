import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Branch } from "../models/branch.model";
import { response } from "express";

@Injectable({ providedIn: 'root' })
export class BranchService {
    private baseUrl = 'http://localhost:8080/api/v1';
    constructor(private http: HttpClient) {

    }

    getAllBranches(): Observable<Branch[]> {
        return this.http.get<{ data: Branch[] }>(`${this.baseUrl}/branches`)
            .pipe(map(response => response.data))
    }
}