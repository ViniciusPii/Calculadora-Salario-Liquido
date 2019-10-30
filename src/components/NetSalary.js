import React, {Fragment, useState} from 'react';
import styled from 'styled-components/native';
import {Keyboard, ScrollView} from 'react-native';

const Page = styled.SafeAreaView`
  align-items: center;
  flex: 1;
  height: 600px;
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
  margin-top: -80px;
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
  margin-bottom: 20px;
`;

const ContentResultInfoTitle = styled.Text`
  color: #656565;
  font-size: 17px;
  font-weight: bold;
  width: 45%;
`;

const ContentResultInfoBorderMoney = styled.View`
  border-radius: 3px;
  border: 2px solid #006400;
  flex-direction: row;
  width: auto;
`;

const ContentResultInfo$ = styled.Text`
  background-color: #006400;
  border-radius: 1px;
  color: #fff;
  font-size: 18px;
  overflow: hidden;
  padding: 2px 5px;
`;

const ContentResultInfoMoney = styled.Text`
  color: #656565;
  font-size: 18px;
  padding: 0 12px;
  text-align: center;
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
  const [bkpInss, setBkpInss] = useState();
  const [bkpIrpf, setBkpIrpf] = useState();
  const [bkpNetSalary, setBkpNetSalary] = useState();
  const [bkpSalary, setBkpSalary] = useState();
  const [salary, setSalary] = useState();
  const [showResult, setShowResult] = useState(false);

  const handleClick = () => {
    setShowResult(true);
    handleError();
    setBkpSalary(salary);
    calcSalaryInss();
    calcIrff();
    calcNetSalary();
    setSalary('');
    Keyboard.dismiss();
  };

  const calcSalaryInss = () => {
    let inss, salaryInss;

    if (salary <= 1751.81) {
      inss = salary * 0.08;
    } else if (salary <= 2919.72) {
      inss = salary * 0.09;
    } else if (salary <= 5839.45) {
      inss = salary * 0.11;
    } else {
      inss = 642.34;
    }

    salaryInss = salary - inss;

    setBkpInss(inss);

    return {salaryInss, inss};
  };

  const calcIrff = () => {
    let irpf, newSalary;

    newSalary = calcSalaryInss();

    const {salaryInss} = newSalary;

    if (salaryInss <= 1903.98) {
      irpf = 0;
    } else if (salaryInss <= 2826.65) {
      irpf = salaryInss * 0.075 - 142.8;
    } else if (salaryInss <= 3751.05) {
      irpf = salaryInss * 0.15 - 354.8;
    } else if (salaryInss <= 4664.68) {
      irpf = salaryInss * 0.225 - 636.13;
    } else {
      irpf = salaryInss * 0.275 - 869.36;
    }

    setBkpIrpf(irpf);
    return irpf;
  };

  const calcNetSalary = () => {
    let netSalary, discInss, discIrpf;

    discIrpf = calcIrff();
    discInss = calcSalaryInss();
    const {inss} = discInss;

    netSalary = salary - inss - discIrpf;

    setBkpNetSalary(netSalary);
  };

  const handleError = () => {
    if (salary <= 0 || isNaN(salary)) {
      alert('DIGITE UM SALÁRIO VÁLIDO!!!');
      setSalary('');
      setShowResult(false);
      return;
    } else if (salary > 99999) {
      alert(
        `UAU!!! R$ ${parseFloat(salary)
          .toFixed(2)
          .replace('.', ',')
          .replace(
            /(\d)(?=(\d{3})+(?!\d))/g,
            '$1.',
          )} POR MÊS? VOCÊ NÃO PRECISA DE UM APP, VOCÊ PRECISA É VIAJAR!!!`,
      );
      setSalary('');
      setShowResult(false);
    }
  };

  const close = () => {
    setShowResult(false);
    setSalary('');
  };

  return (
    <Fragment>
      <StyledBar />
      <ScrollView keyboardShouldPersistTaps="always">
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
            <ContentButtonCalculate onPress={handleClick}>
              <ContentButtonCalculateText>Calcular</ContentButtonCalculateText>
            </ContentButtonCalculate>
            {showResult && (
              <ContentResult>
                <ContentResultDivision />
                <ContentResultInfo>
                  <ContentResultInfoTitle>
                    Salário Bruto:
                  </ContentResultInfoTitle>
                  <ContentResultInfoBorderMoney>
                    <ContentResultInfo$>R$</ContentResultInfo$>
                    <ContentResultInfoMoney>
                      {parseFloat(bkpSalary)
                        .toFixed(2)
                        .replace('.', ',')
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
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
                        .replace('.', ',')
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
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
                        .replace('.', ',')
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </ContentResultInfoMoney>
                  </ContentResultInfoBorderMoney>
                </ContentResultInfo>
                <ContentResultDivision />
                <ContentResultInfo>
                  <ContentResultInfoTitle>
                    Você receberá:
                  </ContentResultInfoTitle>
                  <ContentResultInfoBorderMoney>
                    <ContentResultInfo$>R$</ContentResultInfo$>
                    <ContentResultInfoMoney>
                      {parseFloat(bkpNetSalary)
                        .toFixed(2)
                        .replace('.', ',')
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                    </ContentResultInfoMoney>
                  </ContentResultInfoBorderMoney>
                </ContentResultInfo>
                <ContentResultButtonBack>
                  <ContentResultButtonBackText onPress={close}>
                    Ocultar
                  </ContentResultButtonBackText>
                </ContentResultButtonBack>
              </ContentResult>
            )}
          </Content>
        </Page>
      </ScrollView>
    </Fragment>
  );
};

export default NetSalary;
