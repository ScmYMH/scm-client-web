const TariffAddRow = () => {
  const currCdLov = [
    // 통화코드
    { value: "KRW", text: "Won" },
    { value: "USD", text: "US Dollar" },
    { value: "EUR", text: "Euro" },
    { value: "IDR", text: "Rupiah" },
    { value: "JPY", text: "Yen" },
    { value: "CAD", text: "Canadian Dollar" },
    { value: "CNY", text: "Renminbi Yuan" },
    { value: "HKD", text: "H.K.Dollar" },
    { value: "INR", text: "Rupee" },
    { value: "AUD", text: "Austr. Dollar" },
    { value: "TWD", text: "Dollar" },
    { value: "BRL", text: "Real" },
    { value: "ZAR", text: "Rand" },
  ];

  const trffItemCdLov = [
    // 품좀명
    { value: "A", text: "A-열연/냉연" },
    { value: "B", text: "B-선재" },
    { value: "C", text: "C-후판" },
    { value: "Y", text: "Y-일반" },
    { value: "Z", text: "Z-기타" },
  ];

  const unitCdLov = [
    // 단위코드
    { value: "TON", text: "TON" }, // 톤수
    { value: "AMT", text: "AMT" }, // 금액
  ];

  const tarrifInfoListData = [
    {
      departCd: "KORKANT01",
      departDesc: "광양제철소",
      arrivalCd: "IDNBLWP01", // 도착지코드
      arrivalDesc: "BELAWAN", // 도착지명
      lccCd: "10D1", // 물류비계정
      subLccCd: "105", // 세부물류비
      lccCdNm: "국제해송비 (COA)(제품)", // 세부물류비설명
      cntrtCurrCd: "USD", // 계약통화
      payCurrCd: "USD", // 지불통화
      tariffItemCd: "Y-일반", // 품종명
      cost: "58.2", // 단가
      unitCd: "TON", // 계산단위
      incoCd: "6A1", // 인도조건
      condId: "", // 조건ID
      condNm: "", // 조건명
    },
  ];
  return <></>;
};

export default TariffAddRow;
