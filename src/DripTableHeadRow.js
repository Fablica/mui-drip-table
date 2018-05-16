import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/** material-ui */
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

/** デフォルトスタイル */
const defaultHeadRowStyles = {
  root: {},
};

class DripTableHeadRow extends React.Component {
  static propTypes = {
    /** スタイル */
    classes: PropTypes.object,
  };

  render() {
    const { classes } = this.props;

    return (
      <TableRow
        className={classNames({
          [classes.root]: true,
        })}>
        {this.props.children}
      </TableRow>
    );
  }
}

export default withStyles(defaultHeadRowStyles, { name: "DripTableHeadRow" })(DripTableHeadRow);
