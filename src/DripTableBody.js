import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import DripTableBodyCell from "./DripTableBodyCell";
import DripTableBodyRow from "./DripTableBodyRow";
import DripTableSelectCell from "./DripTableSelectCell";
import { withStyles } from "@material-ui/core/styles";

/** デフォルトスタイル */
const defaultBodyStyles = {
  root: {},
  emptyTitle: {
    textAlign: "center",
  },
};

class DripTableBody extends React.Component {
  static propTypes = {
    /** 使用データ */
    displayData: PropTypes.array.isRequired,
    /** カラム一覧 */
    columns: PropTypes.array.isRequired,
    /** オプション一覧 */
    options: PropTypes.object.isRequired,
    /** フィルター一覧 */
    filterList: PropTypes.array,
    /** 選択行一覧 */
    selectedRows: PropTypes.array,
    /** 行選択実行時、更新処理 */
    selectRowUpdate: PropTypes.func,
    /** 検索文字列 */
    searchText: PropTypes.string,
    /** スタイリング文字列 */
    classes: PropTypes.object,
  };

  /** 行作成処理 */
  buildRows() {
    const { displayData, page, rowsPerPage } = this.props;

    let rows = [];
    /** 合計ページ数(切り上) */
    const totalPages = Math.floor(displayData.length / rowsPerPage);
    /**
     * 現在のページ
     * 表示ページ × 表示行数 = 表示するデータのインデックス(from)
     */
    const fromIndex = page === 0 ? 0 : page * rowsPerPage;
    /**
     * 次ページ
     * 表示ページ × 表示行数 = 表示するデータのインデックス(to)
     */
    const toIndex = Math.min(displayData.length, (page + 1) * rowsPerPage);

    if (page > totalPages && totalPages !== 0) {
      throw new Error(
        "Provided options.page of `" +
          page +
          "` is greater than the total available page length of `" +
          totalPages +
          "`",
      );
    }

    /**
     * 行作成
     * 使用データのインデックス(from) 〜 インデックス(to)までのデータを取得
     */
    for (let rowIndex = fromIndex; rowIndex < displayData.length && rowIndex < toIndex; rowIndex++) {
      rows.push(displayData[rowIndex]);
    }

    return rows.length ? rows : null;
  }

  /**
   * rowsデータのdisplayData内でのインデックスを取得
   * @param {number} index rowsインデックスを取得
   */
  getRowIndex(index) {
    const { page, rowsPerPage } = this.props;
    /** ページ番号 × 表示行数 */
    const startIndex = page === 0 ? 0 : page * rowsPerPage;

    return startIndex + index;
  }

  /**
   * 行選択true、false設定
   * @param {number} index rowsインデックスを取得
   */
  isRowSelected(index) {
    const { selectedRows } = this.props;
    return selectedRows.indexOf(this.getRowIndex(index)) >= 0 ? true : false;
  }

  /**
   * 行選択時、対象のインデックスを
   * 選択行リストに対して削除または追加
   */
  handleRowSelect = index => {
    this.props.selectRowUpdate("cell", this.getRowIndex(index));
  };

  render() {
    const { classes, columns, options } = this.props;
    const tableRows = this.buildRows();

    return (
      <TableBody>
        {tableRows ? (
          tableRows.map((row, rowIndex) => (
            <DripTableBodyRow
              options={options}
              rowSelected={options.selectableRows ? this.isRowSelected(rowIndex) : false}
              key={rowIndex}>
              {options.selectableRows ? (
                <DripTableSelectCell
                  onChange={this.handleRowSelect.bind(null, rowIndex)}
                  checked={this.isRowSelected(rowIndex)}
                />
              ) : (
                false
              )}
              {row.map(
                (column, index) =>
                  columns[index].display ? (
                    <DripTableBodyCell columnHeader={columns[index].name} options={options} key={index}>
                      {column}
                    </DripTableBodyCell>
                  ) : (
                    false
                  ),
              )}
            </DripTableBodyRow>
          ))
        ) : (
          <DripTableBodyRow options={options}>
            <DripTableBodyCell colSpan={options.selectableRows ? columns.length + 1 : columns} options={options}>
              <Typography variant="subheading" className={classes.emptyTitle}>
                {options.textLabels.body.noMatch}
              </Typography>
            </DripTableBodyCell>
          </DripTableBodyRow>
        )}
      </TableBody>
    );
  }
}

export default withStyles(defaultBodyStyles, { name: "DripTableBody" })(DripTableBody);
