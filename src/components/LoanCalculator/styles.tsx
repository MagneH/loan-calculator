import styled from 'styled-components';
import DataTable from 'react-data-table-component';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  font-size: 1.3em;
`;

export const Label = styled.label`
  color: #000;
  margin: 10px 30px 0 30px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const LoanAmount = styled.input``;

export const PaybackTime = styled.input``;

export const Cost = styled.span`
  margin-top: 30px;
  margin-left: 30px;
`;

export const TableWrapper = styled.div`
  margin: 20px 0 20px 15px;
  padding-bottom: 100px;
`;

export const Table = styled(DataTable)`
  overflow: visible;
`;
