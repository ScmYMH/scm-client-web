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
    </>
    )
}

export default ShipTable;