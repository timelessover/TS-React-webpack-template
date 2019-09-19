import * as React from 'react'
import * as PropTypes from 'prop-types'
import './style'


class Button extends React.Component {

  public static defaultProps = {
    type: 'default',
  }

  public static propTypes = {
    type: PropTypes.oneOf(['default', 'dashed', 'primary', 'danger']),
  }

  public render() {
    return (
        <button className='btn'>
          {this.children}
        </button>
    )
  }
}

export default Button
