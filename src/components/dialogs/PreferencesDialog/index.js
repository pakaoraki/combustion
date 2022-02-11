import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import SettingsIcon from 'react-icons/lib/md/settings';
import Dialog from '../Dialog'

import TorrentsTabPanel from './TorrentsTabPanel'
import SpeedTabPanel from './SpeedTabPanel'
import PeersTabPanel from './PeersTabPanel'
import NetworkTabPanel from './NetworkTabPanel'
import QueueTabPanel from './QueueTabPanel'
import { parseStringIfNumber } from 'util/common'

import styles from './styles/index.css';

@inject('view_store', 'session_store')
@observer
@CSSModules(styles)
class PreferencesDialog extends Component {
  static childContextTypes = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }

  state = {
    index: 1
  }

  getChildContext() {
    return { onBlur: this.onBlur, onChange: this.onChange }
  }

  @autobind handleTabChange(index) {
    this.setState({index})
  }

  @autobind onBlur(event) {
    if (event.target.attributes.id) {
      const type = event.target.type;
      const id = event.target.attributes.id.value;
      const value = event.target.value;

      if (type !== 'checkbox' && type !== 'radio') {
        this.props.session_store.setPreference(id, parseStringIfNumber(value));
      }
    }
  }

  @autobind onChange(event) {
    if (event.target.attributes.id) {
      const type = event.target.type;
      const id = event.target.attributes.id.value;
      const value = event.target.checked;

      if (type === 'checkbox') {
        this.props.session_store.setPreference(id, value);
      }
    }
  }

  @autobind onHide() {
    this.props.view_store.togglePreferencesDialog();
  }

  render() {
    const themesInput = {
      label: styles.pref__dialog__label,
      inputElement: styles.pref__dialog__input_element,
      bar: styles.pref__dialog__input_bar,
      hint: styles.pref__dialog__input_hint,
      disable: styles.pref__dialog__input_disable
    }

    return (
      <Dialog
        theme={styles}
        show={this.props.view_store.isPreferencesDialogShown}
        onHide={this.onHide}
        icon={<SettingsIcon size='28' />}
        header='Preferences'
        type='fullscreen'
      >
        <div styleName='body'>
          <div styleName='content' onChange={this.onChange} onBlur={this.onBlur}>
            <Tabs theme={styles} index={this.state.index} onChange={this.handleTabChange} fixed>
              <Tab label='Torrents'>
                <TorrentsTabPanel theme={themesInput} />
              </Tab>
              <Tab label='Speed'>
                <SpeedTabPanel theme={themesInput} />
              </Tab>
              <Tab label='Peers'>
                <PeersTabPanel theme={themesInput} />
              </Tab>
              <Tab label='Network'>
                <NetworkTabPanel theme={themesInput} />
              </Tab>
              <Tab label='Queue'>
                <QueueTabPanel theme={themesInput} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PreferencesDialog;
