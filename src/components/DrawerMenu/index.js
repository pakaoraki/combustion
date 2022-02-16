import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import Input from 'react-toolbox/lib/input';
import { IconButton } from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list';
import SettingsIcon from 'react-icons/lib/md/settings';
import FilterToolbar from 'components/toolbars/FilterToolbar';
import { sortCriteria } from 'stores/torrent-store';

import SortDirUp from 'react-icons/lib/io/android-arrow-dropup-circle';
import SortDirDown from 'react-icons/lib/md/arrow-drop-down-circle';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store', 'prefs_store')
@CSSModules(styles)
class DrawerMenu extends Component {
  @autobind deselectAllTorrents() {
    this.props.view_store.selectTorrents([]);
  }

  @autobind onChangeSort(value) {
    this.props.prefs_store.setSortCriteria(value);
  }

  @autobind onChangeSortDir2() {
    var value = this.props.prefs_store.sortDirection;
    this.props.prefs_store.setSortDirection(value==='ascending'?'descending':'ascending');
  }

  @autobind onChangeSortDir(value) {
    this.props.prefs_store.setSortDirection(value);
  }

  @autobind onChangeTheme(value) {
    this.props.prefs_store.setTheme(value);
  }

  @autobind onChangeSearch(search) {
    this.deselectAllTorrents();
    this.props.torrents_store.setTextFilter(search);
  }

  @autobind onTogglePreferences() {
    this.props.view_store.togglePreferencesDialog();
  }

  @autobind onChangeFilterTracker(value) {
    this.deselectAllTorrents();
    this.props.torrents_store.setTrackerFilter(value);
  }

  render() {
    const search = this.props.torrents_store.textFilter;
    const currCriteria = this.props.prefs_store.sortCriteria;
    const currDir = this.props.prefs_store.sortDirection;

    const currTheme = this.props.prefs_store.themeStyle;

    const tracker = this.props.torrents_store.trackerFilter;
    const trackers = this.props.torrents_store.trackers.map((domain) => {
      const label = domain.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize

      return {value: domain, label};
    });

    const themesInput = {
      label: styles.drawer__search__label,
      inputElement: styles.drawer__search__input_element,
      bar: styles.drawer__search__input_bar,
      hint: styles.drawer__search__input_hint,
      disable: styles.drawer__search__input_disable
    }

    const sortByDirBtn = (currDir === 'ascending'
          ? <SortDirUp />
          : <SortDirDown />);

    return (
      <aside styleName='drawer'>
        <div styleName='aside'>
          <Input
            type='text'
            label='Search'
            name='search'
            className={styles.list_item}
            value={search}
            onChange={this.onChangeSearch}
            theme={themesInput}
          />
          <div styleName='sortBy__parent'>
            <div styleName='sortBy__dropdown'>
              <Dropdown
                auto
                label='SORT BY'
                source={sortCriteria}
                value={currCriteria}
                onChange={this.onChangeSort}
                theme={styles}
                className={styles.mdropdown}
              />
            </div>
            <div styleName='sortBy__btnIcon'>
             <IconButton styleName='sortBy__button' onClick={this.onChangeSortDir2}>
                {sortByDirBtn}
              </IconButton>
            </div>
          </div>
          <ListSubHeader
            caption='Filter by Status'
            theme={styles}
            className={styles.statusFilter}
          />
          <FilterToolbar />
          <ListSubHeader
            caption='Filter by Tracker'
            theme={styles}
            className={styles.statusFilter}
          />
          <Dropdown
            auto
            label='Tracker'
            source={[{value: '', label: 'All'}, ...trackers]}
            value={tracker}
            onChange={this.onChangeFilterTracker}
            theme={styles}
            className={styles.mdropdown}
          />
          <ListDivider theme={styles} />
          <Dropdown
            auto
            label='THEME'
            source={[
              {value: 'auto', label: 'Auto'},
              {value: 'light', label: 'Light'},
              {value: 'dark', label: 'Dark'}
            ]}
            value={currTheme}
            onChange={this.onChangeTheme}
            theme={styles}
            className={styles.mdropdown}
          />
          <ListDivider theme={styles} />
          <List >
            <ListItem
              caption='Settings'
              leftIcon={<SettingsIcon className={styles.icon}/>}
              onClick={this.onTogglePreferences}
              theme={styles}
              className={styles.settings}
              selectable
              ripple
            />
          </List>
        </div>
        <footer styleName='footer'>
          <span>Combustion © 2022</span>
          <span>Updated by <a href='https://github.com/pakaoraki/combustion'>Pakaoraki</a></span>
          <span>Created by <a href='https://arianv.com/'>Secretmapper</a></span>
        </footer>
      </aside>
    )
  }
}

export default DrawerMenu;
