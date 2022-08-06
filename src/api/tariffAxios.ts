import axios from "axios";
import { TariffHeaderCond } from "modules/tariff/types";

export async function getTariffHeaderCond() {
  const response = await axios.get<TariffHeaderCond>(
    `http://localhost:9092/contract/tariff/header/cond`
  );
}
