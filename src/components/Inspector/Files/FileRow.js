import React from 'react';
import CSSModules from 'react-css-modules';

import FileList from './FileList';
import PriorityButton from './PriorityButton';
import WantedButton from './WantedButton';
import FilesIcon from 'react-icons/lib/md/insert-drive-file';
import FolderIcon from 'react-icons/lib/md/folder-open';

import styles from './styles/index.css';

function FileRow({ id, name, node, setPriority, setWanted }) {
  if (!node) return <div styleName='fileRowContainer' />
  const { priority, fileIds, entries } = node;
  const wanted = !!node.wanted;
  const iconsSize = 20;
  const folder = Object.keys(entries).length === 0
                ? <FilesIcon size={iconsSize} />
                : <FolderIcon size={iconsSize} />;
  id+=1;

            /*<div styleName='icons'>{folder}</div>
            <div styleName='name'>{id}:{name}</div>*/

  return (
    <div styleName='fileRowContainer'>
      <div styleName={ id % 2 ? 'fileRowColor' : null }>
        <div styleName='fileRow'>
          <WantedButton
            wanted={wanted}
            fileIds={fileIds}
            setWanted={setWanted}
          />
          <div styleName='icons'>{folder}</div>
          <div styleName='name'>{name}</div>

          <div>
            <PriorityButton
              priority={priority}
              fileIds={fileIds}
              setPriority={setPriority}
            />
          </div>
        </div>
      </div>
      {entries && <FileList lastId={id} entries={entries} setPriority={setPriority} setWanted={setWanted} />}
    </div>
  );
}

export default CSSModules(styles)(FileRow);
