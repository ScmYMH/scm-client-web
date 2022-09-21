import { Card } from "reactstrap";
import GoogleMapForm from "./GoogleMapForm";

const ShipMentInfoForm = () => {
    return (
    <>
    <div>
        <h1>구글 맵</h1>
        <div style={{width:700, height:600}}>
          <GoogleMapForm />
        </div>
      </div>
    </>
    )
}

export default ShipMentInfoForm;
