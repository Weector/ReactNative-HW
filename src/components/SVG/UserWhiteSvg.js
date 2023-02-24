import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function UserWhiteSvg(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M28 29v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2"
        stroke="#FFFFFF"
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M20 19a4 4 0 100-8 4 4 0 000 8z"
        stroke="#FFFFFF"
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default UserWhiteSvg;
