import PropTypes from 'prop-types'
import { InferPropTypes } from '../types'
declare const Stack: import('styled-components').StyledComponent<
  'div',
  any,
  InferPropTypes<
    {
      recursive: PropTypes.Requireable<boolean>
      splitAfter: PropTypes.Requireable<number>
      space: PropTypes.Requireable<string>
    },
    {
      recursive: boolean
      space: string
    },
    PropTypes.InferProps<{
      recursive: PropTypes.Requireable<boolean>
      splitAfter: PropTypes.Requireable<number>
      space: PropTypes.Requireable<string>
    }>
  >,
  never
>
export default Stack
