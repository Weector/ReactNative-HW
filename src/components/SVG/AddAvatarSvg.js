import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function AddAvatarSvg(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={12.5} cy={12.5} r={12} fill="#fff" stroke="#FF6C00" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6z"
        fill="#FF6C00"
      />
    </Svg>
  );
}

export default AddAvatarSvg;
