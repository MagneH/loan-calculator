import React, { useMemo } from 'react';
import { LoanAmount, Container, PaybackTime, Table, Label, TableWrapper, Cost } from './styles';
import { useLoan } from './useLoan';

export const LoanCalculator = () => {
  // {month: number; year: number; deduction: number; interest: number, remaindingLoan: number}
  const [
    setLoanAmount,
    loanAmount,
    setPaybackTime,
    paybackTime,
    setLoanType,
    loanType,
    setInterestRate,
    interestRate,
    paybackPlan,
  ] = useLoan();

  console.log(paybackPlan);

  const columns = [
    {
      name: 'Month',
      selector: 'month',
    },
    {
      name: 'Year',
      selector: 'year',
    },
    {
      name: 'Deduction',
      selector: 'deduction',
    },
    {
      name: 'Interest',
      selector: 'interest',
    },
    {
      name: 'Remainder',
      selector: 'formattedRemaindingLoan',
      type: 'currency',
    },
  ];

  return (
    <Container>
      <Label htmlFor="payback">
        Years
        <PaybackTime
          id="payback"
          type="number"
          value={paybackTime}
          onChange={(e) => setPaybackTime(parseInt(e.target.value))}
        />
      </Label>
      <Label htmlFor="amount">
        Amount
        <LoanAmount type="number" value={loanAmount} onChange={(e) => setLoanAmount(parseInt(e.target.value))} />
      </Label>
      <Cost>Total Cost: {paybackPlan.formattedCost} NOK</Cost>
      <TableWrapper>
        <Table title="Payment Plan" columns={columns} data={Object.values(paybackPlan.payments)} />
      </TableWrapper>
    </Container>
  );
};
