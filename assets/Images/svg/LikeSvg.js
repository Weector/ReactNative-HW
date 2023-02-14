import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LikeSvg(props) {
  return (
    <Svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.365 6.6h-.5a.5.5 0 00.5.5v-.5zm0-3.2h.5-.5zM8.773 1V.5a.5.5 0 00-.45.284l.45.216zM5.32 8.2l-.451-.216a.5.5 0 00-.05.216h.5zm0 8.8h-.5a.5.5 0 00.5.5V17zm9.742 0l.005-.5h-.005v.5zm1.728-1.36l-.494-.082v.001l.494.08zm1.191-7.2l.494.082V8.52l-.494-.081zM16.253 6.6v.5h.005l-.005-.5zM5.32 17v.5a.5.5 0 00.5-.5h-.5zm0-8.8h.5a.5.5 0 00-.5-.5v.5zm6.546-1.6V3.4h-1v3.2h1zm0-3.2c0-1.637-1.421-2.9-3.092-2.9v1c1.192 0 2.092.886 2.092 1.9h1zM8.323.784l-3.455 7.2.901.432 3.455-7.2-.901-.432zM4.819 8.2V17h1V8.2h-1zm.5 9.3h9.742v-1H5.32v1zm9.737 0c1.08.011 2.053-.72 2.226-1.78l-.987-.16c-.085.517-.585.947-1.229.94l-.01 1zm2.226-1.778l1.192-7.2-.987-.164-1.192 7.2.987.164zm1.192-7.201a2.02 2.02 0 00-.533-1.713l-.73.684c.231.245.326.562.276.867l.987.162zm-.533-1.713a2.29 2.29 0 00-1.693-.708l.01 1a1.29 1.29 0 01.954.392l.729-.684zM16.253 6.1h-4.888v1h4.888v-1zM5.32 16.5H2.727v1H5.32v-1zm-2.592 0c-.714 0-1.227-.528-1.227-1.1h-1c0 1.195 1.034 2.1 2.227 2.1v-1zM1.5 15.4V9.8h-1v5.6h1zm0-5.6c0-.572.513-1.1 1.227-1.1v-1C1.534 7.7.5 8.605.5 9.8h1zm1.227-1.1H5.32v-1H2.727v1zm2.092-.5V17h1V8.2h-1z"
        fill="#BDBDBD"
      />
    </Svg>
  );
}

export default LikeSvg;
