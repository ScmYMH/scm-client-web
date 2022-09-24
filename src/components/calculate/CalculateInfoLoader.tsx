import { RootState } from "modules";
import { calculateDetailRequestAsync, calculateRequestAsync, vslCdRequestAsync } from "modules/calculate/actions";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "reactstrap";
import CalculateInfoForm from "./CalculateInfoForm";
import {
  baseCodeAsync
} from "modules/contractCoa/action";
import { useEffect, useState } from "react";

const CalculateInfoLoader = () => {
  const [params, setParams] = useState({
    vslCd : "",
    vslNm: ""
  })
  const dispatch = useDispatch();

  const calculateInfoData = useSelector(
    (state: RootState) => state.calculateInfo.calculateInfo
  );

  const baseCodeData = useSelector(
    (state: RootState) => state.baseCode.baseCode
  );

  const calculateDetailCodeData = useSelector(
    (state: RootState) => state.calculateDetailInfo.calculateDetailInfo
  );

  const vslCodeData = useSelector(
    (state: RootState) => state.vslCdInfo.vslCdInfo
  );

  const onSubmitCalculateDetailInfo = (parmas: any) => {
    dispatch(calculateDetailRequestAsync.request(parmas));
  };

  const onSubmitCalculateInfo = (calSelectParams: any) => {
    dispatch(calculateRequestAsync.request(calSelectParams));
  };

  useEffect(() => {
    dispatch(baseCodeAsync.request(""));
  }, []);

  useEffect(() => {
    dispatch(vslCdRequestAsync.request(params));
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
              marginLeft: "2em",
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
      <Card style={{ marginLeft:"2em", minHeight: "900px", width:"1300px" }}>
        <CalculateInfoForm calculateDetailCodeData={calculateDetailCodeData} onSubmitCalculateDetailInfo={onSubmitCalculateDetailInfo} baseCodeData={baseCodeData} vslCodeData={vslCodeData} onSubmitCalculateInfo={onSubmitCalculateInfo} calculateInfoData={calculateInfoData}/>
      </Card>
    </>
  );
};

export default CalculateInfoLoader;
