import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  ShimmeredDetailsList as FDetailsList,
  SelectionMode,
  ConstrainMode,
  SearchBox,
  Stack,
  StackItem
} from 'office-ui-fabric-react';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { getTokens, csv2arr } from '../_helpers/parser.jsx'



/**
 * UPDATED Mar 31, 2020 by Anthony Hand
 * - Replaced the TextField with a SearchBox control for the filter feature. 
 * - Added props to let the user specify an icon and a placeholder string for the SearchBox. 
 * - Implemented a Stack control to control the layouts for the SearchBox and DetailsList.  
 * */

/**
 * UPDATED Mar 26, 2020 by Anthony Hand
 * - Updated the filter text field's icon and set its width to more closely match 3 columns. 
 * - Added support for multi-line text in table cells.
 * - Fixed the 'jumping table' bug. Setting the search filter box's margin to 0 from 0.2em appears to have fixed it. 
 * - Set the margin between the filter textbox and the table to 24 px. It had been too close before. 
 * - Set the background color of the column headers to a lighter grey 100 until the theme can be formally updated.
 * - Updated the default column and row values to more closely illustrate common use cases. 
 * - Added descriptions and prop names for each property with some updates. Changed some prop names.
 * 
 * TODOs
 * - There are lots of asks in the Github issue ticket. 
 * 
 * For additional outstanding issues, please see: 
 *  https://github.paypal.com/Console-R/uxpin-merge-ms-fabric/issues/89
 * */



const searchFieldWidth = 330;
const searchFieldIconName = "Funnel";
const searchFieldPlaceholder = "Filter"
const searchFieldMarginBottom = '24px';


//Use this in the default props below.
const defaultColumnValues = "Column A,  Column B, Column C, Column D, Actions";
const defaultRowValues =
  `link(Component_Name_A), icon(CircleCheckSolid|color-green-600) Ready, C-1, D-1, icon(Document|color-blue-600) icon(MoreVertical|color-blue-600)
      link(Component_Name_B), icon(CircleWarningSolid|color-orange-500) Restarting..., C-2, D-2, icon(Document|color-blue-600) icon(MoreVertical|color-blue-600)
      link(Component_Name_C), icon(CircleClearSolid|color-red-500) Unavailable, C-3, D-3, icon(Document|color-blue-600) icon(MoreVertical|color-blue-600)`;

const defaultShimmerDuration = 1;
const defaultShimmerLines = 3;

class DetailsList extends React.Component {
  constructor(props) {
    super(props);

    this.searchTable = this.searchTable.bind(this);
    this.onSearchClear = this.onSearchClear.bind(this);

    this.state = {
      shimmer: true,
      columns: [],
      rows: [],
      allItems: [],
      alignRight: [],
      alignCenter: []
    };
  }

  set() {
    this.setState(
      {
        alignRight: this.props.alignRight ? this.props.alignRight.split(',').map(v => parseInt(v.trim())) : [],
        alignCenter: this.props.alignCenter ? this.props.alignCenter.split(',').map(v => parseInt(v.trim())) : [],
        shimmer: this.props.shimmer
      },
      () => this.setColumns(this.setRows)
    );

    if (this.props.shimmer) {
      setTimeout(
        () => {
          this.setState({
            shimmer: false
          })
        },
        (this.props.shimmerDuration || defaultShimmerDuration) * 1000
      )
    }

  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.alignRight !== this.props.alignRight ||
      prevProps.alignCenter !== this.props.alignCenter ||
      prevProps.columns !== this.props.columns ||
      prevProps.items !== this.props.items ||
      prevProps.minWidth !== this.props.minWidth ||
      prevProps.maxWidth !== this.props.maxWidth ||
      prevProps.shimmer !== this.props.shimmer ||
      prevProps.shimmerDuration !== this.props.shimmerDuration ||
      prevProps.shimmerLines !== this.props.shimmerLines
    ) {
      this.set();
    }
  }


  getColumnClasses(colIndex) {
    let alignHeaderLabels = {}
    if (this.state.alignCenter.includes(colIndex + 1)) alignHeaderLabels = { margin: '0 auto' }
    if (this.state.alignRight.includes(colIndex + 1)) alignHeaderLabels = { margin: '0 0 0 auto' }

    return mergeStyles({
      background: 'var(--color-grey-100)',
      selectors: {
        '& .ms-DetailsHeader-cellName': alignHeaderLabels,
      }
    })
  }

  /**
   * This function sorts the visible/filtered rows based on the text visible to the user and ignores the tags and attributes (colors and icon names) passed as children.
   * @param rows current visible rows
   * @param columnKey the column key to sort rows with
   * @param isSortedDescending the order of the sort
   * @returns the sorted rows based on the text content of the column values
   */
  sortColumns(rows, columnKey, isSortedDescending) {
    return rows.slice(0).sort((a, b) => {
      const aVal = this.getTextContent(a[columnKey]).toLowerCase();
      const bVal = this.getTextContent(b[columnKey]).toLowerCase();
      return isSortedDescending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }

  /**
   * Goes through all children contained in a row object in state and uses element.props.children to get all text visible to the user (ignores the props and attributes like color and icons passed as user input) and returns the string by joining all parts after trimming.
   * @param elem the react element or a component that renders a cell
   * @returns the text content of the elements/components (similar to DOM textContent property which returns the text content of the specified node, and its immediate descendants)
   * 
   */
  getTextContent(elem) {
    return elem.reduce((_text, part) => {
      const children = part.props.children;
      if (children) {
        if (Array.isArray(children)) {
          _text.push(children.join('').trim())
        } else {
          _text.push(children.trim())
        }
      }
      return _text;
    }, []).join(' ')
  }

  /**
   * 
   * This function checks whether row contains any cell that has the text visible to the user which contains the search term. The tags and attributes (colors and icon names) passed as children as ignored from the search.
   * @param i the row object that holds data for a row
   * @param search the search term
   * @returns true, if the search term is a substring of the text content of any cell, false, otherwise
   * 
   */
  includesText(i, search) {
    return Object.values(i).some(elem => {
      if (Array.isArray(elem)) {
        const text = this.getTextContent(elem);
        return text.toLowerCase().includes(search.toLowerCase())
      }
      return false;
    });
  }

  searchText(text) {
    return this.state.allItems.filter(i => this.includesText(i, text));
  }

  searchTable(event) {

    let inputValue = event.target.value;
    let filteredRows = this.searchText(inputValue);
    this.setState({
      rows: filteredRows
    });
  }

  onColumnClick(columnKey) {

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

          let name = getTokens(columnName).mixed
            .map((el, i) => typeof el === 'string' ?
              <span key={i}> {el} </span> :
              el.suggestions[0]())

          const columnParams = {
            key: columnName,
            name,
            fieldName: columnName,
            isResizable: true,
            minWidth: this.props.minWidth,
            maxWidth: this.props.maxWidth,
            isSorted: false,
            isSortedDescending: false,
            onColumnClick: () => this.onColumnClick(columnName),
            headerClassName: this.getColumnClasses(colIndex)
          }

          //This param allows each cell to support multi-line text. 
          columnParams.isMultiline = true;

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


  onSearchClear(event) {
    //This means that the user has hit the clear button, so we need to clear the text out. 

    event.target.value = "";

    //Propagate the change to the SearchTable event
    this.searchTable(event);
  }


  render() {

    return (

      <Stack>

        {this.props.isSearchEnabled &&
          <StackItem
            align="end"
            styles={{ root: { marginBottom: searchFieldMarginBottom } }}
          >
            <SearchBox
              iconProps={{ iconName: this.props.icon }}
              placeholder={this.props.placeholder}
              onChange={this.searchTable}
              onClear={this.onSearchClear}
              styles={{ root: { width: searchFieldWidth } }}
            />
          </StackItem>
        }
        <StackItem>

          <div style={{ display: 'block' }} className={
            mergeStyles({
              selectors: {
                '& .ms-DetailsHeader': {
                  paddingTop: 0,
                },
              }
            })
          }>
            <FDetailsList
              enableShimmer={this.state.shimmer}
              {...this.props}
              columns={this.state.columns}
              items={this.state.rows}
              selectionMode={SelectionMode.none} //Hard coding this to off for the time being. 
              constrainMode={ConstrainMode[ConstrainMode.horizontalConstrained]} //Hard coding this. 
              onRenderRow={(props, defaultRender) => (
                <>
                  {defaultRender({ ...props, styles: { root: { background: 'white' } } })}
                </>
              )}
              isHeaderVisible={this.props.header}
            />
          </div>
        </StackItem>

      </Stack>

    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
DetailsList.propTypes = {

  /**
  * @uxpindescription Whether to show the filter SearchBox 
  * @uxpinpropname Show Filter
  */
  isSearchEnabled: PropTypes.bool,

  /**
   * @uxpindescription The exact name from the PayPal icon library. Displays on the right side. 
   * @uxpinpropname Search Icon
   * */
  icon: PropTypes.string,

  /**
   * @uxpindescription Placeholder text to show in the text field when it's empty
   * @uxpinpropname Search Placeholder
   * */
  placeholder: PropTypes.string,

  /**
  * @uxpindescription Whether to display the table headers 
  * @uxpinpropname Show Headers
  */
  header: PropTypes.bool,

  /** 
   *  Separate each item with new line or | symbol.
   *  Put at the end of the line [color:blue-600] token to set color for whole column.
   * @uxpindescription Enter one column per row. Supports these features: link(Link Text) and icon(Name|color-blue-600). Also supports CSV formatting.
   * @uxpinpropname Headers
   * @uxpincontroltype codeeditor
   * */
  columns: PropTypes.string,

  /** 
   * 
   * Separate each item with | , Separate each row with new line or || symbol.
   * Icon token [icon:Snow:blue-600]
   * Get icons at https://uifabricicons.azurewebsites.net/
   * @uxpindescription Enter one row per line. Supports these features: link(Link Text) and icon(Name|color-blue-600). Also supports CSV formatting. 
   * @uxpinpropname Rows
   * @uxpincontroltype codeeditor
   * */
  items: PropTypes.string,

  /**
  * Example: 2, 3
  * @uxpindescription Enter a comma-separated list of column numbers for right aligning their contents (Optional)
  * @uxpinpropname Align Right
  */
  alignRight: PropTypes.string,

  /**
  * Example: 2, 3
  * @uxpindescription Enter a comma-separated list of column numbers for center aligning their contents (Optional)
  * @uxpinpropname Align Center
  */
  alignCenter: PropTypes.string,

  /**
  * @uxpindescription Minimum column width width 
  * @uxpinpropname Min Width
  */
  minWidth: PropTypes.number,

  /**
  * @uxpindescription Maximum column width width 
  * @uxpinpropname Max Width
  */
  maxWidth: PropTypes.number,

  /**
  * @uxpindescription Whether to display the shimmer 
  * @uxpinpropname Shimmer
  */
  shimmer: PropTypes.bool,

  /**
  * @uxpindescription Shimmer duration, in seconds
  * @uxpinpropname Shimmer Duration
  */
  shimmerDuration: PropTypes.number,

  /**
  * @uxpindescription Number of Shimmer lines
  * @uxpinpropname Shimmer Lines
  */
  shimmerLines: PropTypes.number,

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
DetailsList.defaultProps = {
  columns: defaultColumnValues,
  items: defaultRowValues,
  minWidth: 125,
  maxWidth: 350,
  header: true,
  alignRight: "5",
  alignCenter: "3, 4",
  isSearchEnabled: true,
  icon: searchFieldIconName,
  placeholder: searchFieldPlaceholder,
  shimmer: true,
  shimmerDuration: defaultShimmerDuration,
  shimmerLines: defaultShimmerLines
};


export { DetailsList as default };
