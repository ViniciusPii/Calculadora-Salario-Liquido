import React, {Fragment, useState} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';

const Page = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

const StyledBar = styled.SafeAreaView`
  background-color: #006400;
`;

const Header = styled.View`
  align-items: center;
  background-color: #006400;
  height: 30%;
  width: 100%;
`;

const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 25px;
  margin-top: 25px;
`;

const Content = styled.View`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 5px #646464;
  height: auto;
  margin-top: -100px;
  width: 90%;
`;

const ContentInput = styled.TextInput`
  border-radius: 5px;
  border: 2px solid #006400;
  color: #656565;
  font-size: 18px;
  height: 50px;
  margin-top: 20px;
  padding-left: 10px;
  width: 90%;
`;

const ContentButtonCalculate = styled.TouchableOpacity`
  background-color: #006400;
  border-radius: 5px;
  color: #fff;
  height: 50px;
  margin: 20px;
  width: 90%;
`;

const ContentButtonCalculateText = styled.Text`
  color: #fff;
  font-size: 18px;
  line-height: 50px;
  text-align: center;
`;

const ContentResult = styled.View`
  height: auto;
  margin-top: 30px;
  width: 90%;
`;

const ContentResultDivision = styled.Text`
  background-color: #ddd;
  height: 3px;
  margin: 10px 0 20px 0px;
  width: 100%;
`;

const ContentResultInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContentResultInfoTitle = styled.Text`
  color: #656565;
  font-size: 18px;
  font-weight: bold;
`;

const ContentResultInfoBorderMoney = styled.View`
  border-radius: 3px;
  border: 2px solid #006400;
  flex-direction: row;
`;

const ContentResultInfo$ = styled.Text`
  background-color: #006400;
  border-radius: 1px;
  color: #fff;
  font-size: 18px;
  overflow: hidden;
  padding: 2px;
`;

const ContentResultInfoMoney = styled.Text`
  width: 100px;
  text-align: right;
  font-size: 18px;
  color: #656565;
  padding: 2px;
  padding-right: 10px;
`;

const ContentResultButtonBack = styled.TouchableOpacity`
  margin-top: 25px;
`;

const ContentResultButtonBackText = styled.Text`
  color: #006400;
  font-size: 18px;
  margin-bottom: 30px;
  text-align: center;
`;

const NetSalary = () => {
  const [showResult, setShowResult] = useState(false);
  const [salary, setSalary] = useState();
  const [bkpSalary, setBkpSalary] = useState();
  const [bkpInss, setBkpInss] = useState();
  const [bkpIrpf, setBkpIrpf] = useState();
  const [bkpNetSalary, setBkpNetSalary] = useState();

  return (
    <Fragment>
      <StyledBar />
      <Page>
        <Header>
          <HeaderTitle>Salário Líquido</HeaderTitle>
        </Header>
        <Content style={{elevation: 6}}>
          <ContentInput
            placeholder="Digite o seu Salário Bruto"
            keyboardType="numeric"
            value={salary}
            onChangeText={salary => setSalary(salary.replace(',', '.'))}
          />
          <ContentButtonCalculate>
            <ContentButtonCalculateText>Calcular</ContentButtonCalculateText>
          </ContentButtonCalculate>
          {showResult && (
            <ContentResult>
              <ContentResultDivision />
              <ContentResultInfo>
                <ContentResultInfoTitle>Seu Salário é: </ContentResultInfoTitle>
                <ContentResultInfoBorderMoney>
                  <ContentResultInfo$>R$</ContentResultInfo$>
                  <ContentResultInfoMoney>
                    {parseFloat(bkpSalary)
                      .toFixed(2)
                      .replace('.', ',')}
                  </ContentResultInfoMoney>
                </ContentResultInfoBorderMoney>
              </ContentResultInfo>
              <ContentResultInfo>
                <ContentResultInfoTitle>
                  Desconto do INSS:
                </ContentResultInfoTitle>
                <ContentResultInfoBorderMoney>
                  <ContentResultInfo$>R$</ContentResultInfo$>
                  <ContentResultInfoMoney>
                    {parseFloat(bkpInss)
                      .toFixed(2)
                      .replace('.', ',')}
                  </ContentResultInfoMoney>
                </ContentResultInfoBorderMoney>
              </ContentResultInfo>
              <ContentResultInfo>
                <ContentResultInfoTitle>
                  Desconto do IRPF:
                </ContentResultInfoTitle>
                <ContentResultInfoBorderMoney>
                  <ContentResultInfo$>R$</ContentResultInfo$>
                  <ContentResultInfoMoney>
                    {parseFloat(bkpIrpf)
                      .toFixed(2)
                      .replace('.', ',')}
                  </ContentResultInfoMoney>
                </ContentResultInfoBorderMoney>
              </ContentResultInfo>
              <ContentResultDivision />
              <ContentResultInfo>
                <ContentResultInfoTitle>Você receberá:</ContentResultInfoTitle>
                <ContentResultInfoBorderMoney>
                  <ContentResultInfo$>R$</ContentResultInfo$>
                  <ContentResultInfoMoney>
                    {parseFloat(bkpNetSalary)
                      .toFixed(2)
                      .replace('.', ',')}
                  </ContentResultInfoMoney>
                </ContentResultInfoBorderMoney>
              </ContentResultInfo>
              <ContentResultButtonBack>
                <ContentResultButtonBackText>
                  Ocultar
                </ContentResultButtonBackText>
              </ContentResultButtonBack>
            </ContentResult>
          )}
        </Content>
      </Page>
    </Fragment>
  );
};

export default NetSalary;
