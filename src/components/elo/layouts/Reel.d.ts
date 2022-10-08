import PropTypes from 'prop-types'
import React from 'react'
import { InferPropTypes } from '../types'
declare const ReelPropTypes: {
  height: PropTypes.Requireable<string>
  itemWidth: PropTypes.Requireable<string>
  overflowing: PropTypes.Requireable<boolean>
  space: PropTypes.Requireable<string>
  thumbColor: PropTypes.Requireable<string>
  trackColor: PropTypes.Requireable<string>
}
declare const ReelDefaultProps: {
  itemWidth: string
  overflowing: boolean
  space: string
  height: string
  trackColor: string
  thumbColor: string
}
declare type ReelProps = InferPropTypes<
  typeof ReelPropTypes,
  typeof ReelDefaultProps
>
declare const Reel: React.FC<ReelProps> & {
  defaultProps: Partial<ReelProps>
}
export default Reel
