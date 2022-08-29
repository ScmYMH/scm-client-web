import { RootState } from "modules";
import { calculateRequestAsync, vslCdRequestAsync } from "modules/calculate/actions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "reactstrap";
import CalculateInfoForm from "./CalculateInfoForm";
import {
  baseCodeAsync
} from "modules/contractCoa/action";
import { useEffect } from "react";

const CalculateInfoLoader = () => {
  
  const dispatch = useDispatch();

  const calculateInfoData = useSelector(
    (state: RootState) => state.calculateInfo.calculateInfo
  );

  const onSubmitCalculateInfo = (calSelectParams: any) => {
    dispatch(calculateRequestAsync.request(calSelectParams));
  };

  const baseCodeData = useSelector(
    (state: RootState) => state.baseCode.baseCode
  );

  
  const vslCodeData = useSelector(
    (state: RootState) => state.vslCdInfo.vslCdInfo
  );

  useEffect(() => {
    dispatch(baseCodeAsync.request(""));
    dispatch(vslCdRequestAsync.request(""));
  }, []);
  return (
    <>
      <div>
        <header>
          <div
            style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
            }}
          >
            <div
              style={{
                margin: "0",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h5 style={{ fontWeight: "bold", color: "#003366" }}>
                ● 국제해송 정산
              </h5>
            </div>
          </div>
        </header>
      </div>
      <Card style={{ minHeight: "900px" }}>
        <CalculateInfoForm baseCodeData={baseCodeData} vslCodeData={vslCodeData} onSubmitCalculateInfo={onSubmitCalculateInfo} calculateInfoData={calculateInfoData}/>
      </Card>
    </>
  );
};

export default CalculateInfoLoader;
