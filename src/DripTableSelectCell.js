import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

/** デフォルトスタイル */
const defaultSelectCellStyles = {
  root: {
    "@media screen and (max-width: 960px)": {
      display: "none",
    },
  },
  checkboxRoot: {
    "&$checked": {
      color: "#027cb5",
    },
  },
  checked: {},
  disabled: {},
};

class DripTableSelectCell extends React.Component {
  static propTypes = {
    /** 行選択フラグON、OFF */
    checked: PropTypes.bool.isRequired,
    /** 親要素からのfuncを実装 */
    onChange: PropTypes.func,
    /** スタイル */
    classes: PropTypes.object,
  };

  render() {
    const { classes, ...otherProps } = this.props;

    return (
      <TableCell className={classes.root} padding="checkbox">
        <Checkbox
          classes={{
            root: classes.checkboxRoot,
            checked: classes.checked,
            disabled: classes.disabled,
          }}
          {...otherProps}
        />
      </TableCell>
    );
  }
}

export default withStyles(defaultSelectCellStyles, { name: "DripTableSelectCell" })(DripTableSelectCell);
