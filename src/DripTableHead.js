import React from "react";
import classNames from "classnames";
import TableHead from "@material-ui/core/TableHead";
import { withStyles } from "@material-ui/core/styles";
import DripTableHeadRow from "./DripTableHeadRow";
import DripTableHeadCell from "./DripTableHeadCell";
import DripTableSelectCell from "./DripTableSelectCell";

/** デフォルトスタイル */
const defaultHeadStyles = {
  main: {},
  responsiveStacked: {
    "@media screen and (max-width: 960px)": {
      display: "none",
    },
  },
};

class DripTableHead extends React.Component {
  state = {
    activeColumn: null, // 初期状態：選択状態カラム無
    selectChecked: false, // 初期状態：Deleteモード無
  };

  componentDidMount() {
    this.props.handleHeadUpdateRef(this.handleUpdateCheck);
  }

  /**
   *  カラム選択時ソート処理
   * 選択したカラムのインデックスを設定
   * 設定後、ソートキーに設定
   */
  handleToggleColumn = index => {
    this.setState(() => ({
      activeColumn: index,
    }));
    this.props.toggleSort(index);
  };

  /**
   * 全件(行)選択時、
   * ON ：選択リストにページ内のデータインデックスを追加する。
   * OFF：選択リストからページ内のデータインデックスを削除する。
   */
  handleRowSelect = () => {
    this.setState(
      prevState => ({
        selectChecked: !prevState.selectChecked,
      }),
      () => this.props.selectRowUpdate("head", this.state.selectChecked),
    );
  };

  /**
   * 行選択フラグを更新
   * 削除実行後はfalseが設定される
   */
  handleUpdateCheck = status => {
    this.setState(() => ({
      selectChecked: status,
    }));
  };

  render() {
    const { classes, columns, options } = this.props;
    const { selectChecked } = this.state;

    return (
      <TableHead
        className={classNames({ [classes.responsiveStacked]: options.responsive === "stacked", [classes.main]: true })}>
        <DripTableHeadRow>
          {options.selectableRows ? (
            <DripTableSelectCell onChange={this.handleRowSelect.bind(null)} checked={selectChecked} />
          ) : (
            false
          )}
          {columns.map(
            (column, index) =>
              column.display ? (
                <DripTableHeadCell
                  key={index}
                  index={index}
                  sort={column.sort}
                  sortDirection={column.sortDirection}
                  toggleSort={this.handleToggleColumn}
                  options={options}>
                  {column.name}
                </DripTableHeadCell>
              ) : (
                false
              ),
          )}
        </DripTableHeadRow>
      </TableHead>
    );
  }
}

export default withStyles(defaultHeadStyles, { name: "DripTableHead" })(DripTableHead);
