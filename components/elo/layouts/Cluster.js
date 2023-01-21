import PropTypes from 'prop-types'
import styled from 'styled-components'
const ClusterPropTypes = {
  align: PropTypes.string,
  justify: PropTypes.string,
  space: PropTypes.string,
}
const ClusterDefaultProps = {
  align: 'center',
  justify: 'flex-start',
  space: 'var(--s1)',
}
const Cluster = styled.div`
  > * {
    align-items: ${(props) => props.align};
    display: flex;
    justify-content: ${(props) => props.justify};
    margin: calc(${(props) => props.space} / 2 * -1);
    flex-wrap: wrap;
  }

  > * > * {
    margin: calc(${(props) => props.space} / 2);
  }
`
Cluster.propTypes = ClusterPropTypes
Cluster.defaultProps = ClusterDefaultProps
export default Cluster
//# sourceMappingURL=Cluster.js.map
