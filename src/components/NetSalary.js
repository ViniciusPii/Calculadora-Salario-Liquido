import React from 'react';
import styled from 'styled-components/native';

const Page = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

const Text = styled.Text`
  font-size: 18px;
`;

const NetSalary = () => {
  return (
    <Page>
      <Text>Olá mundo!!</Text>
    </Page>
  );
};

export default NetSalary;
