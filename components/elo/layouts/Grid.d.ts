import PropTypes from 'prop-types';
import React from 'react';
import { InferPropTypes } from '../types';
declare const GridPropTypes: {
    min: PropTypes.Requireable<string>;
    isWide: PropTypes.Requireable<boolean>;
    space: PropTypes.Requireable<string>;
};
declare const GridDefaultProps: {
    min: string;
    isWide: boolean;
    space: string;
};
declare type GridProps = InferPropTypes<typeof GridPropTypes, typeof GridDefaultProps>;
declare const Grid: React.FC<GridProps> & {
    defaultProps: Partial<GridProps>;
};
export default Grid;
