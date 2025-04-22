import { User } from "./user.model";

export interface LoanRequest {
    id: string;
    amount: number;
    interest: number | null;
    refferal: string | null;
    customer: User;
    marketing: User | null;
    marketingApprove: boolean | null;
    branchManager: User | null;
    branchManagerApprove: boolean | null;
    backOffice: User | null;
    backOfficeApprove: boolean | null;
    latitude: number;
    longitude: number;
    branch: string | null;
}
