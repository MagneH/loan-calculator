import { formattedPrice } from '../../lib/formattedPrice';
import { LoanType } from '../../types/LoanType';
import { LoanPlan } from '../../types/LoanPlan';

export const computeLoanPlan = (loanType: LoanType, loanAmount: number, paybackTime: number, interestRate: number) => {
  let plan: LoanPlan = {
    payments: {},
    cost: 0,
    formattedCost: '0',
  };
  const months = Array.from({ length: paybackTime * 12 }, (_, i) => i + 1);

  if (loanType === LoanType.Serial) {
    const integerAmount = 100 * loanAmount;
    const monthlySum = Math.round(integerAmount / (paybackTime * 12));

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
            remaindingLoan: integerAmount,
            formattedRemaindingLoan: `${formattedPrice(Math.round(integerAmount / 100))} NOK`,
          },
        },
        cost: 0,
        formattedCost: '0',
      },
    );

    const lastMonthIndex = Object.values(plan.payments).length - 1;
    const lastMonth = plan.payments[lastMonthIndex];

    if (lastMonth.remaindingLoan !== 0) {
      plan.payments[lastMonthIndex].deduction = `${formattedPrice(
        (monthlySum + plan.payments[lastMonthIndex].remaindingLoan) / 100,
      )} NOK`;
      plan.payments[lastMonthIndex].remaindingLoan = 0;
      plan.payments[lastMonthIndex].formattedRemaindingLoan = `0 NOK`;
    }
  }

  return plan;
};
