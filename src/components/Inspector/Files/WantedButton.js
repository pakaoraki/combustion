import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';
/*import Switch from 'react-toolbox/lib/switch';*/

import styles from './styles/index.css';

class WantedButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked:  props.wanted,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({checked: nextProps.wanted});
  }

  @autobind onChange() {
    this.setState(
      (prevState) => ({checked: !prevState.checked}),
      () => this.props.setWanted({
        fileIds: this.props.fileIds,
        wanted: this.state.checked ? 'wanted' : 'unwanted',
      })
    );
  }
/*      <Switch
          id={this.props.fileIds}
          checked={this.state.checked}
          onChange={this.onChange}
        />*/
  render() {
    return (
      <input
          type='checkbox'
          onChange={this.onChange}
          checked={this.state.checked}
      />
    );
  }
}

export default CSSModules(styles)(WantedButton);
