import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import DeleteIcon from 'react-icons/lib/md/delete-forever';
import Dialog from '../Dialog'

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class DeleteDialog extends Component {
  @autobind onDeleteWithData() {
    this.props.view_store.toggleDeleteDialog();

    this.props.torrents_store.remove(this.props.view_store.selectedTorrents, {
      'delete-local-data': true
    });
  }

  @autobind onDelete() {
    this.props.view_store.toggleDeleteDialog();

    this.props.torrents_store.remove(this.props.view_store.selectedTorrents);
  }

  @autobind onHide() {
    this.props.view_store.toggleDeleteDialog();
  }

  render() {
    const btnColor = 'var(--dialog-font)';
    const btnPrimaryColor = 'var(--dialog-button-bg)';
    const actions = [
      { label: 'Cancel', onClick: this.onHide, style: { color: btnColor } },
      { label: 'Delete w/ Data', onClick: this.onDeleteWithData, accent: true },
      {
        label: 'Delete',
        onClick: this.onDelete,
        primary: true,
        raised: true,
        style: { backgroundColor: btnPrimaryColor }
      }
    ]

    return (
      <Dialog
        actions={actions}
        show={this.props.view_store.isDeleteDialogShown}
        onHide={this.onHide}
        icon={<DeleteIcon size='28' />}
        header='Delete Torrent'
        type='normal'
      >
        <div styleName='body'>
          Once removed, continuing the transfer will require the torrent file. Are you sure you want to remove it?
        </div>

      </Dialog>
    );
  }
}

export default DeleteDialog;
