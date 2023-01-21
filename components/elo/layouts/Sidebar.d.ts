import PropTypes from 'prop-types'
import { InferPropTypes } from '../types'
declare const Sidebar: import('styled-components').StyledComponent<
  'div',
  any,
  InferPropTypes<
    {
      contentMin: PropTypes.Requireable<string>
      noStretch: PropTypes.Requireable<boolean>
      side: PropTypes.Requireable<string>
      sideWidth: PropTypes.Requireable<string>
      space: PropTypes.Requireable<string>
      wrapReverse: PropTypes.Requireable<boolean>
    },
    {
      contentMin: string
      noStretch: boolean
      side: string
      sideWidth: string
      space: string
      wrapReverse: boolean
    },
    PropTypes.InferProps<{
      contentMin: PropTypes.Requireable<string>
      noStretch: PropTypes.Requireable<boolean>
      side: PropTypes.Requireable<string>
      sideWidth: PropTypes.Requireable<string>
      space: PropTypes.Requireable<string>
      wrapReverse: PropTypes.Requireable<boolean>
    }>
  >,
  never
>
export default Sidebar
