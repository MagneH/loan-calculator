import { computeLoanPlan } from './computeLoanPlan';
import { LoanType } from '../../types/LoanType';
import MockedLoanPlan30Years1Mill from '../../mocks/loanPlanMill30Years.json';
import MockedLoanPlan1Year1Mill from '../../mocks/loanPlanMill1Year.json';

const invalidPlan = {
  payments: {},
  cost: 0,
  formattedCost: '0',
};

describe('Calculate loan plans', function () {
  test('Should calculate loan plan for 1 mill, 30 years', function () {
    expect(computeLoanPlan(LoanType.Serial, 1000000, 30, 0.035)).toEqual(MockedLoanPlan30Years1Mill);
  });
  test('Should calculate loan plan for 1 mill 12 months', function () {
    expect(computeLoanPlan(LoanType.Serial, 1000000, 1, 0.035)).toEqual(MockedLoanPlan1Year1Mill);
  });
  test('Should not calculate loan plan if wrong loan type', function () {
    // @ts-ignore
    expect(computeLoanPlan('Something else', 1000000, 1, 0.035)).toEqual(invalidPlan);
  });
});
