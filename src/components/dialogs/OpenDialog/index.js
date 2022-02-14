import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { size } from 'util/formatters';

import Dialog from '../Dialog'
import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import UploadIcon from 'react-icons/lib/md/file-upload';

import TorrentUpload from 'stores/torrent-upload';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store', 'session_store')
@observer
@CSSModules(styles)
class OpenDialog extends Component {
  constructor(props) {
    super(props);

    this.torrentUpload = new TorrentUpload();
    this.torrentUpload.setDownloadDir(this.props.session_store.settings['download-dir']);

    this.state = { shouldStart: true }
  }

  @autobind onUpload(event) {
    event.preventDefault();
    this.torrentUpload.serialize().then((torrents) => {
      torrents.forEach((torrentData) => this.props.torrents_store.add(torrentData));
    });
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onCancel(event) {
    event.preventDefault();
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onHide() {
    this.props.view_store.toggleOpenDialog();
  }

  @autobind onChangeFiles({ target }) {
    this.torrentUpload.setTorrentFiles(target.files);
  }

  @autobind onChangeUrl(value) {
    this.torrentUpload.setTorrentUrl(value);
  }

  @autobind onChangeDownloadDirectory(value) {
    this.torrentUpload.setDownloadDir(value);
  }

  @autobind onBlurDownloadDirectory({ target }) {
    this.props.session_store.getFreeSpace(target.value);
  }

  @autobind onChangeStart() {
    this.torrentUpload.setPaused(this.state.shouldStart);
    this.setState({ shouldStart: !this.state.shouldStart })
  }

  renderFreeSpace() {
    const freeSpace = this.props.session_store.freeSpace;

    if (freeSpace < 0) {
      return '';
    }

    return `(${ size(freeSpace) } Free)`;
  }


  render() {
    const btnColor = 'var(--dialog-font)';
    const actions = [
      { label: 'Cancel', onClick: this.onCancel, style: { color: btnColor } },
      { label: 'Upload', onClick: this.onUpload, style: { color: btnColor } }
    ]

    const themesInput = {
      label: styles.open__dialog__label,
      inputElement: styles.open__dialog__input_element,
      bar: styles.open__dialog__input_bar,
      hint: styles.open__dialog__input_hint,
      disable: styles.open__dialog__input_disable
    }

    return (
      <Dialog
        theme={styles}
        show={this.props.view_store.isOpenDialogShown}
        onHide={this.onHide}
        icon={<UploadIcon size='28'/>}
        header='Upload Torrent Files'
        type='normal'
        actions={actions}
      >
        <div styleName='body'>
          <div styleName='form'>
            <form onChange={this.onChange}>
              <section>
                <fieldset>
                  <label>Please select a torrent file to upload:</label>
                  <input
                     name="files"
                     type="file"
                     multiple="multiple"
                     accept=".torrent"
                     onChange={this.onChangeFiles}
                  />
                </fieldset>

                <fieldset>
                  <Input
                    theme={themesInput}
                    label='Magnet Link'
                    name="filename"
                    type="url"
                    onChange={this.onChangeUrl}
                  />
                </fieldset>

                <fieldset>
                  <Input
                    theme={themesInput}
                    label={`Destination folder ${this.renderFreeSpace()}`}
                    name="download-dir"
                    type="text"
                    onChange={this.onChangeDownloadDirectory}
                    onBlur={this.onBlurDownloadDirectory}
                    value={this.torrentUpload.downloadDir}
                  />
                </fieldset>

                <fieldset>
                  <label styleName='inlineCheck'>
                    <Checkbox
                      theme={styles}
                      name="paused"
                      checked={this.state.shouldStart}
                      label="Start when added"
                      onChange={this.onChangeStart}
                    />
                  </label>
                </fieldset>
              </section>
            </form>
          </div>
        </div>

      </Dialog>
    );
  }
}

export default OpenDialog;
