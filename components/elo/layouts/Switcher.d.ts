import PropTypes from 'prop-types'
import { InferPropTypes } from '../types'
declare const Switcher: import('styled-components').StyledComponent<
  'div',
  any,
  InferPropTypes<
    {
      limit: PropTypes.Requireable<number>
      space: PropTypes.Requireable<string>
      threshold: PropTypes.Requireable<string>
    },
    {
      limit: number
      space: string
      threshold: string
    },
    PropTypes.InferProps<{
      limit: PropTypes.Requireable<number>
      space: PropTypes.Requireable<string>
      threshold: PropTypes.Requireable<string>
    }>
  >,
  never
>
export default Switcher
