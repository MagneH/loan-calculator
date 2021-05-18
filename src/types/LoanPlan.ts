import { LoanPlanMonth } from './LoanPlanMonth';

export type LoanPlan = { payments: Record<number, LoanPlanMonth>; cost: number; formattedCost: string };
