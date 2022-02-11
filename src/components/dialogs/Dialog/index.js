import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import Button from 'react-toolbox/lib/button';

import Left from 'react-icons/lib/md/chevron-left';
import MDialog from 'react-toolbox/lib/dialog';

import styles from './styles/index.css';

/* For some reasons 'dialog' component from react-toolbox doesn't handle my
'data-theme={theme}' parameter set in App.js, and css variables from
'theme/styles/index.css' are not set properly. So I made a dirty workaround
using a second light/dark theme setting test again (line 26) and declare
new css var in ./styles/index.css.  */

@inject('view_store', 'prefs_store')
@observer
@CSSModules(styles)
class Dialog extends Component {
  render() {
    const theme = this.props.prefs_store.themeStyle;

    return (
      <MDialog
        styleName={theme === 'dark' ? 'dark' : 'light'}
        actions={this.props.actions}
        active={this.props.show}
        onEscKeyDown={this.props.onHide}
        onOverlayClick={this.props.onHide}
        theme={styles}
        title={
          <div className={styles.contentDialog} >
            <Button
              icon={<Left size='28' className={styles.buttonIcon} />}
              label=' '
              theme={{
                button: styles.button
              }}
              onClick={this.props.onHide}
            />
            {this.props.icon}{' '}
            {this.props.header}
          </div>
        }
        type={this.props.type}
      >
        {this.props.children}
      </MDialog>
    );
  }
}

export default Dialog;
