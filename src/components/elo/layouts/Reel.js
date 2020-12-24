import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import useResize from 'react-resize-observer-hook';
import styled, { css } from 'styled-components';
const ReelPropTypes = {
    height: PropTypes.string,
    itemWidth: PropTypes.string,
    overflowing: PropTypes.bool,
    space: PropTypes.string,
    thumbColor: PropTypes.string,
    trackColor: PropTypes.string,
};
const ReelDefaultProps = {
    itemWidth: 'auto',
    overflowing: false,
    space: '1rem',
    height: 'auto',
    trackColor: '#000',
    thumbColor: '#fff',
};
const StyledReel = styled.div `
  display: flex;
  height: ${props => props.height};
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-color: ${props => props.thumbColor} ${props => props.trackColor};

  ::-webkit-scrollbar {
    height: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${props => props.trackColor};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.trackColor};
    background-image: linear-gradient(${props => props.trackColor} 0, ${props => props.trackColor} 0.25rem, ${props => props.thumbColor} 0.25rem, ${props => props.thumbColor} 0.75rem, ${props => props.trackColor} 0.75rem);
  }

  > * {
    flex: 0 0 ${props => props.itemWidth};
  }


  > img {
    height: 100%;
    flex-basis: auto;
    width: auto;
  }

  > * + * {
    margin-left: ${props => props.space};
  }

  ${props => props.overflowing && css `
    padding-bottom: ${props.space};
  `}
`;
const Reel = (props) => {
    const reelRef = useRef(null);
    const [overflowing, setOverflowing] = useState(props.overflowing);
    useResize(reelRef, (entry) => {
        const element = reelRef.current;
        if (element) {
            setOverflowing(element.scrollWidth > entry.width);
        }
    });
    return (React.createElement(StyledReel, Object.assign({}, props, { overflowing: overflowing, ref: reelRef })));
};
Reel.propTypes = ReelPropTypes;
Reel.defaultProps = ReelDefaultProps;
export default Reel;
//# sourceMappingURL=Reel.js.map