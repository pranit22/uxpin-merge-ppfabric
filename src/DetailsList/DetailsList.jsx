import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DetailsList as FDetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyleSets, mergeStyles } from 'office-ui-fabric-react/lib/Styling';




const classNames = mergeStyleSets({
  headerCell: {
    background: 'var(--color-grey-300)',
  },
  links: {
    color: 'var(--color-blue-600)'
  }
});

class DetailsList extends React.Component {
  constructor(props) {
    super(props);
  }

  getToken(str) {
    const lBracket = str.indexOf('[')
    const rBracket = str.indexOf(']')
    let [token, value] = [null, str];
    if (lBracket !== -1) {
      token = str.substring(lBracket + 1, rBracket)
      value = lBracket === 0 ? str.substring(rBracket + 1, str.length) : str.substring(0, lBracket)
    }
    return [value.trim(), token];
  }

  tokenToSymbol(token) {
    if (!token) return null
    let tokenType = token.split(':')[0]
    switch (tokenType) {
      case 'color':
        return mergeStyles({
          color: `var(--color-${token.split(':')[1]})`
        })
        break;
      case 'icon':
        let shape = token.split(':')[1]
        let color = token.split(':')[2]
        return <Icon key="icon" className={mergeStyles({
          fontSize: 16,
          marginRight: 7,
          transform: 'translateY(3px)',
          color: `var(--color-${color})`
        })} iconName={shape} />
      default:
        console.warn(`Unknown token type:${tokenType} was passed to DetailsList`)
    }
  }

  getColumns() {
    return this.props.columns
      .split('\n')
      .join('|')
      .split('|')
      .map(col => col.trim())
      .map((col, i) => {
        let [columnName, token] = this.getToken(col);
        return {
          key: columnName.toLowerCase(),
          name: columnName,
          fieldName: columnName.toLowerCase(),
          isResizable: true,
          minWidth: this.props.minWidth,
          maxWidth: this.props.maxWidth,
          onColumnClick: () => columnName,
          headerClassName: classNames.headerCell,
          className: this.tokenToSymbol(token)
        }
      })
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
          let value = row[colInd]
          let [cellValue, token] = this.getToken(value);
          r[column.fieldName] = token ? [this.tokenToSymbol(token), cellValue] : value;
        })
        return r
      })
  }

  render() {
    return (
      <FDetailsList {...this.props}
        columns={this.getColumns()}
        items={this.getItems()}
        selectionMode={this.props.selectable ? SelectionMode.multiple : SelectionMode.none}
        onRenderRow={(props, defaultRender) => (
          <>
            {defaultRender({ ...props, styles: { root: { background: 'white' } } })}
          </>
        )}
        isHeaderVisible={this.props.isHeaderVisible === "yes"}>
      </FDetailsList>
    );
  }
}


DetailsList.propTypes = {

  /** 
   *  Separate each item with new line or | symbol.
   *  Put at the end of the line [color:blue-600] token to set color for whole column.
   * @uxpincontroltype textfield(4)
   * */
  columns: PropTypes.string,

  /** 
   * 
   * Separate each item with | , Separate each row with new line or || symbol.
   * Icon token [icon:Snow:blue-600]
   * Get icons at https://uifabricicons.azurewebsites.net/
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

  /** Defines to show or not to show the header */
  isHeaderVisible: PropTypes.oneOf(['yes', 'no']),

};

DetailsList.defaultProps = {
  columns: "Aa | Bb | Cc [color:blue-600]",
  items: `A-1  | B-1  | C-1
                A-2 | B-2 | C-2
                A-3 | B-3 | C-3`,
  selectable: false,
  isResizable: true,
  minWidth: 100,
  maxWidth: 200,
};

export { DetailsList as default };
