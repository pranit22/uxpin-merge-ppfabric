import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';

import { DetailsList as FDetailsList, SelectionMode } from 'office-ui-fabric-react';
import { mergeStyleSets, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import parse from 'csv-parse'
import { name2key, getTokens } from '../_helpers/parser.jsx'



const classNames = mergeStyleSets({
  headerCell: {
    background: 'var(--color-grey-300)',
    selectors: {
      '& .ms-Button': {
        transform: 'translateY(14px)',
      }
    }
  },
  links: {
    color: 'var(--color-blue-600)'
  }
});


class DetailsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      rows: []
    }
  }

  componentDidMount() {
    this.setColumns(this.setRows)

  }

  setColumns(callback) {
    parse(this.props.columns, {
      skip_empty_lines: true
    },
      (err, data) => {
        this.setState({
          columns: data
            .flat()
            .map((columnName, i) => {
              columnName = columnName.trim()

              let name = getTokens(columnName).mixed ? getTokens(columnName).mixed
                .map((el, i) => typeof el === 'string' ?
                  <span key={i}> {el} </span> :
                  el.suggestions[0]())
                :
                getTokens(columnName).text


              return {
                key: columnName,
                name,
                fieldName: columnName,
                isResizable: true,
                minWidth: this.props.minWidth,
                maxWidth: this.props.maxWidth,
                onColumnClick: () => columnName,
                headerClassName: classNames.headerCell,
                // className: this.tokenToSymbol(token)
              }
            })
        }, callback)
      })
  }

  setRows(callback) {
    parse(this.props.items, {
      skip_empty_lines: true
    },
      (err, data) => {
        let rows = []

        data.forEach((row, rowIndex) => {
          let r = {
            key: rowIndex,
          }
          this.state.columns.forEach((column, colInd) => {
            const value = row[colInd].trim()
            let name = getTokens(value).mixed ? getTokens(value).mixed
              .map((el, i) => typeof el === 'string' ?
                <span key={i}> {el} </span> :
                el.suggestions[0]())
              :
              getTokens(value).text

            r[column.fieldName] = name
          })
          rows.push(r)
        })

        this.setState({ rows }, callback)
      })
  }

  render() {
    return (
      <FDetailsList {...this.props}

        columns={this.state.columns}
        items={this.state.rows}
        selectionMode={this.props.selectable ? SelectionMode.multiple : SelectionMode.none}
        onRenderRow={(props, defaultRender) => (
          <>
            {defaultRender({ ...props, styles: { root: { background: 'white' } } })}
          </>
        )}
        isHeaderVisible={this.props.header === "show"}>
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
  header: "show"
};

export { DetailsList as default };
