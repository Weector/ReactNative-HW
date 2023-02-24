import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ActiveCommentSvg(props) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path fillRule="evenodd" clipRule="evenodd"
        d="M0 8.5a8.38 8.38 0 00.9 3.8A8.5 8.5 0 008.5 17a8.38 8.38 0 003.8-.9L18 18l-1.9-5.7a8.38 8.38 0 00.9-3.8A8.5 8.5 0 0012.3.9 8.38 8.38 0 008.5 0H8a8.48 8.48 0 00-8 8v.5z"
        fill="#FF6C00" />
    </Svg>
  );
}

export default ActiveCommentSvg;