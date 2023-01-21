import PropTypes from 'prop-types'
import { InferPropTypes } from '../types'
declare const Imposter: import('styled-components').StyledComponent<
  'div',
  any,
  InferPropTypes<
    {
      breakout: PropTypes.Requireable<boolean>
      margin: PropTypes.Requireable<string>
      fixed: PropTypes.Requireable<boolean>
    },
    {
      breakout: boolean
      margin: string
      fixed: boolean
    },
    PropTypes.InferProps<{
      breakout: PropTypes.Requireable<boolean>
      margin: PropTypes.Requireable<string>
      fixed: PropTypes.Requireable<boolean>
    }>
  >,
  never
>
export default Imposter
