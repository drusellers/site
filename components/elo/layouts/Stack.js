import PropTypes from 'prop-types';
import styled from 'styled-components';
const StackPropTypes = {
    recursive: PropTypes.bool,
    splitAfter: PropTypes.number,
    space: PropTypes.string,
};
const StackDefaultProps = {
    recursive: false,
    space: 'var(--s1)',
};
const Stack = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${props => props.recursive ? '' : '>'} * + * {
    margin-top: ${props => props.space};
  }

  ${({ splitAfter }) => splitAfter ? `
    .stack-l > :nth-child(${splitAfter}) {
      margin-bottom: auto;
    }`
    : ''}
`;
Stack.propTypes = StackPropTypes;
Stack.defaultProps = StackDefaultProps;
export default Stack;
//# sourceMappingURL=Stack.js.map