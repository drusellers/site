import PropTypes from 'prop-types'
import styled from 'styled-components'
const FramePropTypes = {
  ratio: PropTypes.string.isRequired,
}
const FrameDefaultProps = {
  ratio: '6:9',
}
const Frame = styled.div`
  display: block;
  padding-bottom: ${({ ratio }) => {
    const [ratioNumerator, ratioDenominator] = selectRatioArray(ratio)
    return `calc(${ratioNumerator} / ${ratioDenominator} * 100%)`
  }};
  position: relative;

  > * {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  > img,
  > video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`
function selectRatioArray(ratio) {
  const ratioParts = ratio.split(':', 2)
  return [ratioParts[0], ratioParts[1]]
}
Frame.propTypes = FramePropTypes
Frame.defaultProps = FrameDefaultProps
export default Frame
//# sourceMappingURL=Frame.js.map
