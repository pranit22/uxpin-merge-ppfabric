import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

import { DetailsList as FDetailsList, SelectionMode, TextField } from 'office-ui-fabric-react';
import { mergeStyleSets, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { name2key, getTokens, csv2arr } from '../_helpers/parser.jsx'



const linkClasses = mergeStyles({
  color: 'var(--color-blue-600)'
})

const searchFilterStyle = {
  margin: '0.2em',
  selectors: {
    '& div': {
      marginLeft: 'auto',
      marginRight: '0',
    },
  },
}


class DetailsList extends React.Component {
  constructor(props) {
    super(props);

    this.searchTable = this.searchTable.bind(this);
    this.state = {
      columns: [],
      rows: [],
      allItems: [],
      alignRight: this.props.alignRight ? this.props.alignRight.split(',').map(v => parseInt(v.trim())) : [],
      alignCenter: this.props.alignCenter ? this.props.alignCenter.split(',').map(v => parseInt(v.trim())) : []
    }
  }

  componentDidMount() {
    this.setColumns(this.setRows)

  }

  getColumnClasses(colIndex) {
    let alignHeaderLabels = {}
    if (this.state.alignCenter.includes(colIndex + 1)) alignHeaderLabels = { margin: '0 auto' }
    if (this.state.alignRight.includes(colIndex + 1)) alignHeaderLabels = { margin: '0 0 0 auto' }

    return mergeStyles({
      background: 'var(--color-grey-300)',
      selectors: {
        '& .ms-Button': {
          transform: 'translateY(14px)',
        },
        '& .ms-DetailsHeader-cellName': alignHeaderLabels,
      }
    })
  }

  sortColumns(rows, columnKey, isSortedDescending) {
    const key = columnKey;
    return rows.slice(0).sort((a, b) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }

  includesText(i, text) {
    return Object.values(i).some(txt => txt.toString().toLowerCase().indexOf(text.toLowerCase()) > -1);
  }

  searchText(text) {
    return this.state.allItems.filter(i => this.includesText(i, text)) || this.state.allItems;
  }

  searchTable(event) {

    let inputValue = event.target.value;
    let filteredRows = this.searchText(inputValue);
    this.setState({
      rows: filteredRows
    });
  }

  onCloumnClick(columnKey) {

    const { columns, rows } = this.state;
    const newColumns = columns.slice();
    const currColumn = newColumns.filter(currCol => columnKey === currCol.key)[0];

    newColumns.forEach(newCol => {
      if (newCol == currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    })
    const newRows = this.sortColumns(rows, currColumn.fieldName, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      rows: newRows
    })
  }

  setColumns(callback) {

    this.setState({
      columns: csv2arr(this.props.columns)
        .flat()
        .map((columnName, colIndex) => {
          columnName = columnName.trim()

          let name = getTokens(columnName).mixed ? getTokens(columnName).mixed
            .map((el, i) => typeof el === 'string' ?
              <span key={i}> {el} </span> :
              el.suggestions[0]())
            :
            getTokens(columnName).text

          const columnParams = {
            key: columnName,
            name,
            fieldName: columnName,
            isResizable: true,
            minWidth: this.props.minWidth,
            maxWidth: this.props.maxWidth,
            isSorted: false,
            isSortedDescending: false,
            onColumnClick: () => this.onCloumnClick(columnName),
            headerClassName: this.getColumnClasses(colIndex)
          }

          if (this.state.alignRight.includes(colIndex + 1)) {
            columnParams.className = mergeStyles({
              textAlign: 'right',
            })
          }

          if (this.state.alignCenter.includes(colIndex + 1)) {
            columnParams.className = mergeStyles({
              textAlign: 'center',
            })
          }

          return columnParams
        })
    }, callback)
  }

  setRows(callback) {
    let rows = []

    csv2arr(this.props.items).forEach((row, rowIndex) => {
      let r = {
        key: rowIndex,
      }
      this.state.columns.forEach((column, colInd) => {
        if (row[colInd]) {
          const value = row[colInd].trim()
          let name = getTokens(value).mixed ? getTokens(value).mixed
            .map((el, i) => typeof el === 'string' ?
              <span key={i}> {el} </span> :
              el.suggestions[0]())
            :
            getTokens(value).text

          r[column.fieldName] = name
        }

      })
      rows.push(r)
    })

    this.setState({ rows }, callback)
    this.setState({ allItems: rows });
  }



  render() {
    return (
      <div style={{ display: 'block' }} className={
        mergeStyles({
          selectors: {
            '& .ms-DetailsHeader': {
              paddingTop: 0,
            },
          }
        })
      }>
        {this.props.isSearchEnabled && <TextField iconProps={{ iconName: 'Filter' }} onChange={this.searchTable} className={searchFilterStyle} styles={{ fieldGroup: { width: 200 } }} />}
        <FDetailsList {...this.props}
          columns={this.state.columns}
          items={this.state.rows}
          selectionMode={this.props.selectable ? SelectionMode.multiple : SelectionMode.none}
          onRenderRow={(props, defaultRender) => (
            <>
              {defaultRender({ ...props, styles: { root: { background: 'white' } } })}
            </>
          )}
          isHeaderVisible={this.props.header === "show"} />
      </div>
    );
  }
}


DetailsList.propTypes = {

  /** 
   *  Separate each item with new line or | symbol.
   *  Put at the end of the line [color:blue-600] token to set color for whole column.
   * @uxpincontroltype codeeditor
   * */
  columns: PropTypes.string,

  /** 
   * 
   * Separate each item with | , Separate each row with new line or || symbol.
   * Icon token [icon:Snow:blue-600]
   * Get icons at https://uifabricicons.azurewebsites.net/
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /** Align Right Columns indexes, <2,3>  */
  alignRight: PropTypes.string,

  /** Align Center Columns indexes, <2,3>  */
  alignCenter: PropTypes.string,

  /** Defines if rows might be selected with checkmark on the left hand side  */
  selectable: PropTypes.bool,

  /** Is table resizable */
  isResizable: PropTypes.bool,

  /** Min width for columns */
  minWidth: PropTypes.number,

  /** Max width for columns */
  maxWidth: PropTypes.number,

  /** Enable search text field to filter details list */
  isSearchEnabled: PropTypes.bool,

  /** Defines to show or hide the header */
  header: PropTypes.oneOf(['show', 'hide']),

};

DetailsList.defaultProps = {
  columns: "Aa, Bb, link(C)",
  items: `A-1, B-1, C-1
 A-2, B-2, C-2
 A-3, B-3, C-3`,
  selectable: false,
  isResizable: true,
  minWidth: 100,
  maxWidth: 200,
  header: "show",
  alignRight: "1,2",
  alignCenter: "3",
  isSearchEnabled: false,

};

export { DetailsList as default };
