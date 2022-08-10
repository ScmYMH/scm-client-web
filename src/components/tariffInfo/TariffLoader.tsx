import Header from "./Header";
import { useEffect, useState } from "react";
import TariffCondHForm from "./TariffCondHForm";
import TariffInfoForm from "./TariffInfoForm";

const TariffLoader = () => {
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    setIsSave(false);
  }, []); // 모달창 띄울때마다 isSave false로 바꿔주기

  return (
    <>
      <Header></Header>
      <TariffInfoForm isSaveTrue={() => setIsSave(true)}></TariffInfoForm>
      <TariffCondHForm isSave={isSave}></TariffCondHForm>
    </>
  );
};

export default TariffLoader;
