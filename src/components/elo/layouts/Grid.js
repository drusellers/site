import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import useResize from 'react-resize-observer-hook';
import styled from 'styled-components';
const GridPropTypes = {
    min: PropTypes.string,
    isWide: PropTypes.bool,
    space: PropTypes.string,
};
const GridDefaultProps = {
    min: '250px',
    isWide: false,
    space: 'var(--s0)',
};
const StyledGrid = styled.div `
  align-content: start;
  display: grid;
  gap: ${(props) => props.space};
  grid-template-columns: ${(props) => props.isWide ? `repeat(auto-fit, minmax(${props.min}, 1fr))` : '100%'};
`;
const Grid = (props) => {
    const gridRef = useRef(null);
    const [isWide, setIsWide] = useState(props.isWide);
    useResize(gridRef, () => {
        const element = gridRef.current;
        if (element) {
            const test = document.createElement('div');
            test.style.width = props.min;
            element.appendChild(test);
            const minToPixels = test.offsetWidth;
            element.removeChild(test);
            setIsWide(element.scrollWidth > minToPixels);
        }
    });
    return React.createElement(StyledGrid, Object.assign({}, props, { isWide: isWide, ref: gridRef }));
};
Grid.propTypes = GridPropTypes;
Grid.defaultProps = GridDefaultProps;
export default Grid;
//# sourceMappingURL=Grid.js.map