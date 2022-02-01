import React from 'react';
import CSSModules from 'react-css-modules';

import FileRow from './FileRow';

import styles from './styles/index.css';

function FileList({ lastId, entries, setPriority, setWanted }) {
  const nbEntries = Object.keys(entries).length;
  var i = 1;

  return (
    <ul styleName='fileList'>
      {Object.keys(entries).map((key, index) => (
        <li key={index}>
          <FileRow
            id={lastId+index}
            name={key}
            node={entries[key]}
            setPriority={setPriority}
            setWanted={setWanted}
          />
        </li>
      ))}
    </ul>
  );
};

export default CSSModules(styles)(FileList);
