import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/** material-ui */
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";


/** デフォルトスタイル */
const defaultBodyRowStyles = {
  root: {},
  responsiveStacked: {
    "@media screen and (max-width: 960px)": {
      border: "solid 2px rgba(0, 0, 0, 0.15)",
    },
  },
};

class DripTableBodyRow extends React.Component {
  static propTypes = {
    /** オプション一覧 */
    options: PropTypes.object.isRequired,
    /** 行選択フラグ */
    rowSelected: PropTypes.bool,
    /** スタイル */
    classes: PropTypes.object,
  };

  render() {
    const { classes, options, rowSelected } = this.props;

    return (
      <TableRow
        hover={options.rowHover ? true : false}
        className={classNames({
          [classes.root]: true,
          [classes.responsiveStacked]: options.responsive === "stacked",
        })}
        selected={rowSelected}>
        {this.props.children}
      </TableRow>
    );
  }
}

export default withStyles(defaultBodyRowStyles, { name: "DripTableBodyRow" })(DripTableBodyRow);
