import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PlusSvg(props) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 13.5h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6z"
        fill="#212121"
        fillOpacity={0.8}
      />
    </Svg>
  );
}

export default PlusSvg;
