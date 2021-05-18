import { useMemo, useState } from 'react';
import { formattedPrice } from '../../lib/formattedPrice';

enum LoanType {
  Serial = 'Serial',
}

export type LoanPlanMonth = {
  id: string;
  month: number;
  year: number;
  deduction: string;
  interest: string;
  remaindingLoan: number;
  formattedRemaindingLoan: string;
};

export type LoanPlan = { payments: Record<number, LoanPlanMonth>; cost: number; formattedCost: string };

export const useLoan: () => (
  | ((value: ((prevState: number) => number) | number) => void)
  | number
  | ((value: ((prevState: LoanType) => LoanType) | LoanType) => void)
  | LoanType
  | any
)[] = () => {
  const [paybackTime, setPaybackTime] = useState(30);
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [loanType, setLoanType] = useState(LoanType.Serial);
  const [interestRate, setInterestRate] = useState(0.035);

  const months = useMemo(() => Array.from({ length: paybackTime * 12 }, (_, i) => i + 1), [paybackTime]);

  const paybackPlan = useMemo(() => {
    let plan;

    if (loanType === LoanType.Serial) {
      const integerAmount = 100 * loanAmount;
      const monthlySum = integerAmount / (paybackTime * 12);

      plan = months.reduce(
        (acc: LoanPlan, cur: number) => {
          acc.payments[cur] = {
            id: cur.toFixed(0),
            month: cur,
            year: Math.floor((cur - 1) / 12),
            deduction: `${formattedPrice(monthlySum / 100)} NOK`,
            interest: `${formattedPrice((acc.payments[cur - 1].remaindingLoan * (interestRate / 12)) / 100)} NOK`,
            remaindingLoan: acc.payments[cur - 1].remaindingLoan - monthlySum,
            formattedRemaindingLoan: `${formattedPrice((acc.payments[cur - 1].remaindingLoan - monthlySum) / 100)} NOK`,
          };
          const cost = acc.cost + acc.payments[cur - 1].remaindingLoan * (interestRate / 12);
          acc.cost = cost;
          acc.formattedCost = `${formattedPrice(cost / 100)}`;
          return acc;
        },
        {
          payments: {
            0: {
              id: '0',
              month: 0,
              year: 0,
              deduction: '0',
              interest: '0',
              remaindingLoan: Math.round(integerAmount),
              formattedRemaindingLoan: `${formattedPrice(Math.round(integerAmount / 100))} NOK`,
            },
          },
          cost: 0,
          formattedCost: '0',
        },
      );
    }

    return plan;
  }, [loanAmount, paybackTime, interestRate, loanType, months]);

  return [
    setLoanAmount,
    loanAmount,
    setPaybackTime,
    paybackTime,
    setLoanType,
    loanType,
    setInterestRate,
    interestRate,
    paybackPlan,
  ];
};
