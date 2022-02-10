import React from 'react';
import CSSModules from 'react-css-modules';
import { IconButton } from 'react-toolbox/lib/button'

import Edit from 'react-icons/lib/md/edit';
import styles from './styles/index.css';

function ActivityRow({ label, value, actionable, action }) {
  const iconEdit = <Edit className={styles.iconEdit} />;
  
  return (
    <div styleName='row'>
      <div styleName='key'>{label}:</div>
      <div styleName='value'>
        {value}
        {actionable && <IconButton onClick={action} icon={iconEdit} />}
      </div>
    </div>
  );
}

export default CSSModules(styles)(ActivityRow);
