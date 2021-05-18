import { useMemo, useState } from 'react';
import { computeLoanPlan } from './computeLoanPlan';
import { LoanType } from '../../types/LoanType';

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

  const paybackPlan = useMemo(
    () => computeLoanPlan(loanType, loanAmount, paybackTime, interestRate),
    [loanAmount, paybackTime, interestRate, loanType],
  );

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
