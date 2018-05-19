import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

/** material-ui */
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

/** デフォルトスタイル */
const defaultHeadCellStyles = {
  tooltip: {
    cursor: "pointer",
  },
  mypopper: {
    "&[data-x-out-of-boundaries]": {
      display: "none",
    },
  },
  data: {
    display: "inline-block",
  },
  sortAction: {
    display: "inline-block",
    verticalAlign: "top",
    cursor: "pointer",
    paddingLeft: "4px",
    height: "10px",
  },
  sortActive: {
    color: "rgba(0, 0, 0, 0.87)",
  },
  toolButton: {
    height: "10px",
    outline: "none",
    cursor: "pointer",
  },
};

class DripTableHeadCell extends React.Component {
  static propTypes = {
    /** スタイル */
    classes: PropTypes.object,
    /** オプション一覧 */
    options: PropTypes.object.isRequired,
    /** ソートキー( asc | desc ) */
    sortDirection: PropTypes.string,
    /** ソートアクション */
    toggleSort: PropTypes.func.isRequired,
  };

  /** ヘッダーカラムクリック時
   *  ソートアクション実行
   */
  handleSortClick = () => {
    this.props.toggleSort(this.props.index);
  };

  render() {
    const { children, classes, options, sortDirection } = this.props;
    // ソート有効フラグ
    const sortActive = sortDirection !== null && sortDirection !== undefined ? true : false;

    const sortLabelProps = {
      active: sortActive,
      ...(sortDirection ? { direction: sortDirection } : {}),
    };

    return (
      <TableCell className={classes.root} scope={"col"} sortDirection={sortDirection}>
        {options.sort ? (
          <Tooltip
            title={options.textLabels.body.toolTip}
            placement={"bottom-end"}
            className={classes.tooltip}
            enterDelay={300}
            classes={{ popper: classes.mypopper }}>
            <span
              role="button"
              onKeyUp={this.handleClickSort}
              onClick={this.handleSortClick}
              className={classes.toolButton}
              tabIndex={0}>
              <div
                className={classNames({
                  [classes.data]: true,
                  [classes.sortActive]: sortActive,
                })}>
                {children}
              </div>
              <div className={classes.sortAction}>
                <TableSortLabel {...sortLabelProps} />
              </div>
            </span>
          </Tooltip>
        ) : (
          children
        )}
      </TableCell>
    );
  }
}

export default withStyles(defaultHeadCellStyles, { name: "DripTableHeadCell" })(DripTableHeadCell);
