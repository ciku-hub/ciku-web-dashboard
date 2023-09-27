import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import CikuLogo from "../../../../assets/images/logo/ciku_logo_png.png"
import themeConfig from '../../../../configs/themeConfig.jsx';

export default function MenuLogo(props) {
  const customise = useSelector(state => state.customise)

  return (
    <div className="hp-header-logo hp-d-flex hp-align-items-center">
      <Link
        to="/"
        onClick={props.onClose}
        className="hp-position-relative hp-d-flex"
      >
        {
          props.small ? (
            customise.theme == "light" ? (
              <img className="hp-logo" src={CikuLogo} alt="ciku" />
            ) : (
              <img className="hp-logo" src={CikuLogo} alt="ciku" />
            )
          ) : (
            customise.direction == "rtl" ? (
              customise.theme == "light" ? (
                <img className="hp-logo" src={CikuLogo} alt="ciku" />
              ) : (
                <img className="hp-logo" src={CikuLogo} alt="ciku" />
              )
            ) : (
              customise.theme == "light" ? (
                <img className="hp-logo" src={CikuLogo} alt="ciku" />
              ) : (
                <img className="hp-logo" src={CikuLogo} alt="ciku" />
              )
            )
          )
        }

    
      </Link>
    </div>
  );
};