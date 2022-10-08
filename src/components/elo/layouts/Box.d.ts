import PropTypes from 'prop-types'
import { InferPropTypes } from '../types'
declare const Box: import('styled-components').StyledComponent<
  'div',
  any,
  InferPropTypes<
    {
      borderWidth: PropTypes.Requireable<string>
      invert: PropTypes.Requireable<boolean>
      padding: PropTypes.Requireable<string>
    },
    {
      borderWidth: string
      invert: boolean
      padding: string
    },
    PropTypes.InferProps<{
      borderWidth: PropTypes.Requireable<string>
      invert: PropTypes.Requireable<boolean>
      padding: PropTypes.Requireable<string>
    }>
  >,
  never
>
export default Box
