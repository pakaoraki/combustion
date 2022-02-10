import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'autobind-decorator';

import Input from 'react-toolbox/lib/input';

import Dialog from '../Dialog'

import styles from './styles/index.css';

@CSSModules(styles)
class PromptDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toggle !== this.props.toggle) {
      this.setState({value: nextProps.placeholder});
    }
  }

  @autobind onChange(value) {
    this.setState({ value });
  }

  @autobind onSubmit() {
    this.props.onSubmit(this.state.value);
    this.onHide();
  }

  @autobind onDismiss(event) {
    event.preventDefault();
    this.onHide();
  }

  @autobind onHide() {
    this.props.onToggle();
  }

  render() {
    let actions = [
      { label: 'Cancel', onClick: this.onHide, className: "snm-close-dialog" },
      { label: this.props.action || 'Ok',
         onClick: this.onSubmit,
         className: 'test',
         primary: true
      }
    ];

    const themesInput = {
      label: styles.prompt__dialog__label,
      inputElement: styles.prompt__dialog__input_element,
      bar: styles.prompt__dialog__input_bar,
      hint: styles.prompt__dialog__input_hint,
      disable: styles.prompt__dialog__input_disable
    }

    return (
      <Dialog
        show={this.props.toggle}
        onHide={this.onHide}
        header={this.props.header}
        actions={actions}
        type='fullscreen'
      >
        <div styleName='body'>
          <div styleName='content'>
            <Input type='text'
              theme={themesInput}
              label={this.props.question && this.props.question}
              onChange={this.onChange}
              value={this.state.value}
            />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PromptDialog;
