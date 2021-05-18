import { formattedPrice } from './formattedPrice';

describe('Create formatted price', function () {
  test('Should render 1 mill with two spaces', function () {
    expect(formattedPrice(1000000)).toEqual('1 000 000');
  });
  test('Should render 3000 with one space', function () {
    expect(formattedPrice(3000)).toEqual('3 000');
  });
  test('Should render 3000.00 with one space and no digits', function () {
    expect(formattedPrice(3000.00)).toEqual('3 000');
  });
});
