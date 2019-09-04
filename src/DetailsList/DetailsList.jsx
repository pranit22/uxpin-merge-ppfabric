import * as React from 'react';
import { DetailsList as FDetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import * as PropTypes from 'prop-types';

/**
 * @uxpinwrappers
 * SkipContainerWrapper, ResizableWrapper
 */

const columns = [
  { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true }
];

let items = [];
for (let i = 0; i < 5; i++) {
  items.push({
    key: i,
    name: 'Item ' + i,
    value: i
  });
}

function DetailsList(props) {
  let columns = props.columns
    .split('|')
    .map(col => col.trim())
    .map((col, i) => ({
      key: col.toLowerCase() + Math.random().toString().slice(2, 11),
      name: col,
      fieldName: col.toLowerCase(),
      isResizable: true,
      minWidth: props.minWidth,
      maxWidth: props.maxWidth
    }))

  let items = props.items
    .split('||')
    .map(row => (row.split('|').map(val => val.trim())))
    .map((row, rowInd) => {
      let r = { key: rowInd }
      columns.forEach((column, colInd) => {
        r[column.fieldName] = row[colInd]
      })
      return r
    })

  return (
    <FDetailsList {...props}
      columns={columns}
      items={items}
      selectionMode={props.selectable ? SelectionMode.multiple : SelectionMode.none}>
    </FDetailsList>
  );
}

DetailsList.propTypes = {
  /** Separate with | each item, 
   * Separate with || each row */
  items: PropTypes.string,

  /** Separate with | each column name */
  columns: PropTypes.string,

  /** Defines if rows might be selected with checkmark on the left hand side  */
  selectable: PropTypes.bool,

  /** Is table resizable */
  isResizable: PropTypes.bool,

  /** Min width for columns */
  minWidth: PropTypes.number,

  /** Max width for columns */
  maxWidth: PropTypes.number
};

DetailsList.defaultProps = {
  columns: "Aa|Bb|Cc",
  items: "A-1 | B-1 | C-1 || A-2 | B-2 | C-2",
  selectable: false,
  isResizable: true,
  minWidth: 100,
  maxWidth: 200
};

export { DetailsList as default };
