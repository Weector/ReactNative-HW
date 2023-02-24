import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function GridSvg(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path transform="translate(8 8)" fill="#fff" d="M0 0H24V24H0z" />
      <Path
        clipRule="evenodd"
        d="M11 11h7v7h-7v-7zM22 11h7v7h-7v-7zM22 22h7v7h-7v-7zM11 22h7v7h-7v-7z"
        stroke="#212121"
        strokeOpacity={0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default GridSvg;
