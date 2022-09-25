import { RootState } from "modules";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { calculateRequestAsync, vslCdRequestAsync } from "modules/calculate/actions";

const ShipTable = () => {
        
    const calculateInfoData : any = useSelector(
        (state: RootState) => state.calculateInfo.calculateInfo
    );
    const [calSelectParams, setCalSelectParams] = useState({
        startDate: "",
        endDate: "",
        lspId: "",
        vslCd: "",
        dstConfYn: "",
        transOrderNo: "",
        cdVmeaning: "",
      });

    console.log("calculateInfoData", calculateInfoData)

    const dateToString = (date) => {
        return (
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        date.getDate().toString().padStart(2, "0")
        );
    };

    function to_date(date_str) {
        const yyyyMMdd = String(date_str);
        const sYear = yyyyMMdd.substring(0, 4);
        const sMonth = yyyyMMdd.substring(4, 6);
        const sDate = yyyyMMdd.substring(6, 8);

        return new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));
    }
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(calculateRequestAsync.request(calSelectParams));
    },[])

    return (
    <>
      <div style={{
            maxHeight: "200px",
            overflowY: "auto"
          }} >
      <Table bordered style={{ marginTop: 10, width:"100%"}} id="table-sample">
            <thead style={{ textAlign: "center" }}>
                <tr id="tableForm" className="table-secondary">
                  <th>제철소코드</th>
                  <th>권역</th>
                  <th>물류 실행사명</th>
                  <th>선적일자</th>
                  <th>지시번호</th>
                  <th>선박코드</th>
                  <th>선박명</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
              <>
                {calculateInfoData.data?.map((data, index) => (
                  <tr key={index} aria-rowcount={index}>
                    <td>{data.fac_cd}</td>
                    <td id="nationNm">{data.nation_nm}</td>
                    <td id="lspNm">{data.cd_v_meaning}</td>
                    <td>{dateToString(to_date(data.bl_date))}</td>
                    <td>{data.trans_order_no}</td>
                    <td>{data.vsl_cd}</td>
                    <td id="vslNm">{data.vsl_nm}</td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
      </div>
    </>
    )
}

export default ShipTable;