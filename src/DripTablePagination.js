import React from "react";
import PropTypes from "prop-types";

/** material-ui */
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import { withStyles } from "@material-ui/core/styles";

/** デフォルトスタイル */
const defaultPaginationStyles = {
  root: {
    "&:last-child": {
      padding: "0px 24px 0px 24px",
    },
  },
  toolbar: {},
  selectRoot: {},
  "@media screen and (max-width: 400px)": {
    toolbar: {
      "& span:nth-child(2)": {
        display: "none",
      },
    },
    selectRoot: {
      marginRight: "8px",
    },
  },
};

class DripTablePagination extends React.Component {
  static propTypes = {
    /** 行の合計値 */
    count: PropTypes.number.isRequired,
    /** オプション一覧 */
    options: PropTypes.object.isRequired,
    /** 現在のページ番号 */
    page: PropTypes.number.isRequired,
    /** １ページ当たりの表示行数 */
    rowsPerPage: PropTypes.number.isRequired,
    /** 表示行数変更時アクション */
    changeRowsPerPage: PropTypes.func.isRequired,
  };

  /**
   * 表示行数変更時
   * 表示行数の更新
   */
  handleRowChange = event => {
    this.props.changeRowsPerPage(event.target.value);
  };

  /**
   * ページ切り替え時
   * 現在ページの更新
   */
  handlePageChange = (_, page) => {
    this.props.changePage(page);
  };

  render() {
    const { count, classes, options, rowsPerPage, page } = this.props;
    const textLabels = options.textLabels.pagination;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            className={classes.root}
            classes={{
              caption: classes.caption,
              toolbar: classes.toolbar,
              selectRoot: classes.selectRoot,
            }}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={textLabels.rowsPerPage}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${textLabels.displayRows} ${count}`}
            backIconButtonProps={{
              "aria-label": textLabels.previous,
            }}
            nextIconButtonProps={{
              "aria-label": textLabels.next,
            }}
            rowsPerPageOptions={options.rowsPerPageOptions}
            onChangePage={this.handlePageChange}
            onChangeRowsPerPage={this.handleRowChange}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(defaultPaginationStyles, { name: "DripTablePagination" })(DripTablePagination);
