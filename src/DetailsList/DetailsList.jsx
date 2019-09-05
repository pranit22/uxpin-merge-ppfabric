import * as React from 'react';
import { DetailsList as FDetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import * as PropTypes from 'prop-types';
import { render } from 'react-dom';



class DetailsList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  getColumns() {
    return this.props.columns
      .split('\n')
      .join('|')
      .split('|')
      .map(col => col.trim())
      .map((col, i) => ({
        key: col.toLowerCase(),
        name: col,
        fieldName: col.toLowerCase(),
        isResizable: true,
        minWidth: this.props.minWidth,
        maxWidth: this.props.maxWidth,
        onColumnClick: () => { console.log(col.toLowerCase() + " was clicked") }
      }))
  }

  getItems() {
    return this.props.items
      .split('\n')
      .join('||')
      .split('||')
      .map(row => (row.split('|').map(val => val.trim())))
      .map((row, rowInd) => {
        let r = {
          key: rowInd,
        }
        this.getColumns().forEach((column, colInd) => {
          r[column.fieldName] = row[colInd]
        })
        return r
      })
  }

  render() {
    return (
      <FDetailsList {...this.props}
        columns={this.getColumns()}
        items={this.getItems()}
        selectionMode={this.props.selectable ? SelectionMode.multiple : SelectionMode.none}>
      </FDetailsList>
    );
  }

}



DetailsList.propTypes = {

  /** Separate each item with new line or | symbol
  * @uxpincontroltype textfield(4)
  * */
  columns: PropTypes.string,

  /** Separate each item with | , Separate each row with new line or || symbol
   * @uxpincontroltype textfield(20) 
   * */
  items: PropTypes.string,

  /** Defines if rows might be selected with checkmark on the left hand side  */
  selectable: PropTypes.bool,

  /** Is table resizable */
  isResizable: PropTypes.bool,

  /** Min width for columns */
  minWidth: PropTypes.number,

  /** Max width for columns */
  maxWidth: PropTypes.number,

};

DetailsList.defaultProps = {
  columns: "Aa | Bb | Cc",
  items: `A-1  | B-1  | C-1 
          A-2 | B-2 | C-2
          A-3 | B-3 | C-3`,
  selectable: false,
  isResizable: true,
  minWidth: 100,
  maxWidth: 200,
};

export { DetailsList as default };
