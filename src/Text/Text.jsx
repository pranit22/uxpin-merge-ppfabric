import { Text as FText } from 'office-ui-fabric-react';
import { IFontStyles } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyles } from '@uifabric/merge-styles';

import * as PropTypes from 'prop-types';
import * as React from 'react';

function Text(props) {
  return (
    <FText
      className={mergeStyles({
        color: props.color
      })}
      variant={props.size}
      block={props.block}
      nowrap={props.wrap}>{props.value}</FText>
  );
}

Text.propTypes = {
  /**
  * Text value
  *  @uxpincontroltype codeeditor
  * */
  value: PropTypes.string,

  size: PropTypes.oneOf([
    'tiny',
    'xSmall',
    'small',
    'smallPlus',
    'medium',
    'mediumPlus',
    'large',
    'xLarge',
    'xxLarge',
    'mega',
  ]),
  nowrap: PropTypes.bool,
  block: PropTypes.bool,
  color: PropTypes.string
};

Text.defaultProps = {
  value: 'The quick brown fox jumped over the lazy dog.',
  size: 'medium',
  nowrap: false,
  block: true,
  color: 'var(--color-grey-700)'
};

export { Text as default };
