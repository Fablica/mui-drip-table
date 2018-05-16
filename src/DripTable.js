import React from "react";
import PropTypes from "prop-types";

/** material-ui */
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";

/** custom */
import DripTableToolbar from "./DripTableToolbar";
import DripTableToolbarSelect from "./DripTableToolbarSelect";
import DripTableFilterList from "./DripTableFilterList";
import DripTableBody from "./DripTableBody";
import DripTableHead from "./DripTableHead";
import DripTablePagination from "./DripTablePagination";

import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
import textLabels from "./textLabels";

/** デフォルトスタイル */
const defaultTableStyles = {
  root: {},
  responsiveScroll: {
    overflowX: "auto",
  },
  caption: {
    position: "absolute",
    left: "-1000px",
  },
  liveAnnounce: {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
  },
};

class DripTable extends React.Component {
  static propTypes = {
    /** テーブルタイトル */
    title: PropTypes.string.isRequired,

    /** 使用データリスト */
    data: PropTypes.array.isRequired,

    /** 使用カラムリスト
     *  <values>
     *   name:         カラム名
     *   options:      カラム表示フラグ
     *   filter:       フィルター有効フラグ
     *   sort:         ソートキー有効フラグ
     *   customRender: 外部関数
     */
    columns: PropTypes.PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          options: PropTypes.shape({
            display: PropTypes.bool,
            filter: PropTypes.bool,
            sort: PropTypes.bool,
            customRender: PropTypes.func,
          }),
        }),
      ]),
    ).isRequired,

    /** オプションリスト */
    options: PropTypes.shape({
      /** ヘッダー固定ON、OFF */
      responsive: PropTypes.oneOf(["stacked", "scroll"]),
      /** フィルタータイプリスト */
      filterType: PropTypes.oneOf(["dropdown", "checkbox", "multiselect"]),
      /** テーブル内表示文字列一覧 */
      textLabels: PropTypes.object,
      /** ページネーション有効フラグ */
      pagination: PropTypes.bool,
      /** 行選択有効フラグ */
      selectableRows: PropTypes.bool,
      /**  */
      caseSensitive: PropTypes.bool,
      /** 行アクション有効フラグ */
      rowHover: PropTypes.bool,
      /** ページ */
      page: PropTypes.number,
      /** フィルターリスト */
      filterList: PropTypes.array,
      /** ページ内最大表示行数 */
      rowsPerPage: PropTypes.number,
      /** 最大行数選択リスト */
      rowsPerPageOptions: PropTypes.array,
      /** フィルター有効フラグ */
      filter: PropTypes.bool,
      /** ソートキー有効フラグ */
      sort: PropTypes.bool,
      /** 検索有効フラグ */
      search: PropTypes.bool,
      /** プリント有効フラグ */
      print: PropTypes.bool,
      /** カラム表示フラグ */
      viewColumns: PropTypes.bool,
      /** ダウンロード有効フラグ */
      download: PropTypes.bool,
    }),
    /** テーブルスタイル */
    className: PropTypes.string,
  };

  static defaultProps = {
    title: "",
    options: {},
    data: [],
    columns: [],
  };

  state = {
    open: false,
    announceText: null,
    data: [],
    displayData: [],
    page: 0,
    rowsPerPage: 0,
    columns: [],
    filterData: [],
    filterList: [],
    selectedRows: [],
    showResponsive: false,
    searchText: null,
  };

  constructor() {
    super();
    this.tableRef = false;
  }

  componentWillMount() {
    this.initializeTable(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data || this.props.columns !== nextProps.columns) {
      this.initializeTable(nextProps);
    }
  }

  initializeTable(props) {
    this.getDefaultOptions(props);
    this.setTableOptions(props);
    this.setTableData(props);
  }

  /*
   * デフォルトオプション
   */
  getDefaultOptions(props) {
    const defaultOptions = {
      responsive: "stacked",
      filterType: "checkbox",
      pagination: true,
      textLabels,
      selectableRows: true,
      caseSensitive: false,
      rowHover: true,
      rowsPerPage: 10,
      rowsPerPageOptions: [ 5, 10, 15, 100],
      filter: true,
      sortFilterList: true,
      sort: true,
      search: true,
      print: true,
      viewColumns: true,
      download: true,
    };

    this.options = merge(defaultOptions, props.options);
  }

  /** テーブルオプション設定 */
  setTableOptions(props) {
    const optionNames = ["rowsPerPage", "page", "filterList", "rowsPerPageOptions"];
    const optState = optionNames.reduce((acc, cur) => {
      if (this.options[cur]) {
        let val = this.options[cur];
        if (cur === "page") val--;
        acc[cur] = val;
      }
      return acc;
    }, {});
    this.setState(optState);
  }

  /**  テーブルデータ設定 */
  setTableData(props) {
    const { data, columns, options } = props;

    let columnData = [],
      filterData = [],
      filterList = [];

    columns.forEach((column, colIndex) => {
      let columnOptions = {
        display: true,
        filter: true,
        sort: true,
        sortDirection: null,
      };

      if (typeof column === "object") {
        columnOptions = {
          name: column.name,
          ...columnOptions,
          ...(column.options ? column.options : {}),
        };
      } else {
        columnOptions = { ...columnOptions, name: column };
      }

      columnData.push(columnOptions);

      filterData[colIndex] = [];
      filterList[colIndex] = [];

      for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
        let value = data[rowIndex][colIndex];
        if (typeof columnOptions.customRender === "function") {
          const funcResult = columnOptions.customRender(rowIndex, data[rowIndex][colIndex]);

          if (React.isValidElement(funcResult) && funcResult.props.value) {
            value = funcResult.props.value;
          } else if (typeof funcResult === "string") {
            value = funcResult;
          }
        }

        if (filterData[colIndex].indexOf(value) < 0) filterData[colIndex].push(value);
      }

      if (this.options.sortFilterList) {
        const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
        filterData[colIndex].sort(collator.compare);
      }
    });

    if (options.filterList) filterList = options.filterList;

    if (filterList.length !== columns.length) {
      throw new Error("Provided options.filterList does not match the column length!!");
    }

    /* ソースデータ、ディスプレイデータ設定 */
    this.setState(prevState => ({
      columns: columnData,
      filterData: filterData,
      filterList: filterList,
      selectedRows: [],
      data: data,
      displayData: this.getDisplayData(columnData, data, filterList, prevState.searchText),
    }));
  }

  /*
   *  
   */

  isRowDisplayed(columns, row, filterList, searchText) {
    let isFiltered = false,
      isSearchFound = false;

    for (let index = 0; index < row.length; index++) {
      let column = row[index];

      if (columns[index].customRender) {
        const funcResult = columns[index].customRender(index, column);
        column =
          typeof funcResult === "string"
            ? funcResult
            : funcResult.props && funcResult.props.value
              ? funcResult.props.value
              : column;
      }

      if (filterList[index].length && filterList[index].indexOf(column) < 0) {
        isFiltered = true;
        break;
      }

      const searchCase = !this.options.caseSensitive ? column.toString().toLowerCase() : column.toString();

      if (searchText && searchCase.indexOf(searchText.toLowerCase()) >= 0) {
        isSearchFound = true;
        break;
      }
    }

    if (isFiltered || (searchText && !isSearchFound)) return false;
    else return true;
  }

  updateDataCol = (row, index, value) => {
    this.setState(prevState => {
      let changedData = cloneDeep(prevState.data);
      let filterData = cloneDeep(prevState.filterData);

      const funcResult = prevState.columns[index].customRender(index, value);

      const filterValue =
        React.isValidElement(funcResult) && funcResult.props.value
          ? funcResult.props.value
          : prevState["data"][row][index];

      const prevFilterIndex = filterData[index].indexOf(filterValue);
      filterData[index].splice(prevFilterIndex, 1, filterValue);

      changedData[row][index] = value;

      if (this.options.sortFilterList) {
        const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
        filterData[index].sort(collator.compare);
      }

      return {
        data: changedData,
        filterData: filterData,
        displayData: this.getDisplayData(prevState.columns, changedData, prevState.filterList, prevState.searchText),
      };
    });
  };

  getDisplayData(columns, data, filterList, searchText) {
    let newRows = [];

    for (let index = 0; index < data.length; index++) {
      if (this.isRowDisplayed(columns, data[index], filterList, searchText))
        newRows.push(
          columns.map((column, colIndex) => {
            return typeof column.customRender === "function"
              ? column.customRender(index, data[index][colIndex], this.updateDataCol.bind(null, index, colIndex))
              : data[index][colIndex];
          }),
        );
    }

    return newRows;
  }

  toggleViewColumn = index => {
    this.setState(
      prevState => {
        const columns = cloneDeep(prevState.columns);
        columns[index].display = !columns[index].display;
        return {
          columns: columns,
        };
      },
      () => {
        if (this.options.onColumnViewChange) {
          this.options.onColumnViewChange(
            this.state.columns[index].name,
            this.state.columns[index].display ? "add" : "remove",
          );
        }
      },
    );
  };

  getSortDirection(column) {
    return column.sortDirection === "asc" ? "ascending" : "descending";
  }

  toggleSortColumn = index => {
    this.setState(
      prevState => {
        let columns = cloneDeep(prevState.columns);
        let data = prevState.data;
        const order = prevState.columns[index].sortDirection;

        for (let pos = 0; pos < columns.length; pos++) {
          if (index !== pos) {
            columns[pos].sortDirection = null;
          } else {
            columns[pos].sortDirection = columns[pos].sortDirection === "asc" ? "desc" : "asc";
          }
        }

        const orderLabel = this.getSortDirection(columns[index]);
        const announceText = `Table now sorted by ${columns[index].name} : ${orderLabel}`;
        const sortedData = this.sortTable(data, index, order);

        return {
          columns: columns,
          announceText: announceText,
          data: sortedData.data,
          displayData: this.getDisplayData(columns, sortedData.data, prevState.filterList, prevState.searchText),
          selectedRows: sortedData.selectedRows,
        };
      },
      () => {
        if (this.options.onColumnSortChange) {
          this.options.onColumnSortChange(
            this.state.columns[index].name,
            this.getSortDirection(this.state.columns[index]),
          );
        }
      },
    );
  };

  /**
   * 表示行数変更時
   * 表示行数の更新
   * rows: 画面上で選択した行数
   */
  changeRowsPerPage = rows => {
    this.setState(
      () => ({
        rowsPerPage: rows,
      }),
      // オプションで設定されたfuncを実行
      () => {
        if (this.options.onChangeRowsPerPage) {
          this.options.onChangeRowsPerPage(this.state.rowsPerPage);
        }
      },
    );
  };

  /**
   * ページ切り替え時
   * 現在ページ番号の更新
   * page: 現在のページ番号
   */
  changePage = page => {
    this.setState(
      () => ({
        page: page,
      }),
      // オプションで設定されたfuncを実行
      () => {
        if (this.options.onChangePage) {
          this.options.onChangePage(this.state.page);
        }
      },
    );
  };

  searchTextUpdate = text => {
    this.setState(prevState => ({
      searchText: text && text.length ? text : null,
      displayData: this.getDisplayData(prevState.columns, prevState.data, prevState.filterList, text),
    }));
  };

  resetFilters = () => {
    this.setState(
      prevState => {
        const filterList = prevState.columns.map((column, index) => []);

        return {
          filterList: filterList,
          displayData: this.getDisplayData(prevState.columns, prevState.data, filterList, prevState.searchText),
        };
      },
      () => {
        if (this.options.onFilterChange) {
          this.options.onFilterChange(null, this.state.filterList);
        }
      },
    );
  };

  filterUpdate = (index, column, type) => {
    this.setState(
      prevState => {
        const filterList = cloneDeep(prevState.filterList);
        const filterPos = filterList[index].indexOf(column);

        switch (type) {
          case "checkbox":
            filterPos >= 0 ? filterList[index].splice(filterPos, 1) : filterList[index].push(column);
            break;
          case "multiselect":
            filterList[index] = column === "" ? [] : column;
            break;
          default:
            filterList[index] = filterPos >= 0 || column === "" ? [] : [column];
        }

        return {
          filterList: filterList,
          displayData: this.getDisplayData(prevState.columns, prevState.data, filterList, prevState.searchText),
        };
      },
      () => {
        if (this.options.onFilterChange) {
          this.options.onFilterChange(column, this.state.filterList);
        }
      },
    );
  };

  /**
   * 選択行削除処理
   * 行選択時ツールバーに設定するfunc
   */
  selectRowDelete = () => {
    // 選択行リストのインデックスデータを利用データから除外
    const cleanRows = this.state.data.filter((_, index) => this.state.selectedRows.indexOf(index) === -1);

    // オプションに処理を設定している場合、後続処理を実行
    if (this.options.onRowsDelete) {
      this.options.onRowsDelete(this.state.selectedRows);
    }

    // 行選択フラグにfalseを設定
    this.updateToolbarSelect(false);

    // データの更新
    this.setTableData({
      columns: this.props.columns,
      data: cleanRows,
      options: {
        filterList: this.state.filterList,
      },
    });
  };

  selectRowUpdate = (type, value) => {
    /** テーブルヘッダー処理 */
    if (type === "head") {
      this.setState(
        prevState => {
          const { data, page } = prevState;
          // 画面上で、表示行数の変更がある場合はその値を、ない場合はデフォルトを使用
          const rowsPerPage = prevState.rowsPerPage ? prevState.rowsPerPage : this.options.rowsPerPage;

          // 不具合【No.1】add
          //// 表示するデータのFROMインデックスを設定(現在ページ)
          //const fromIndex = page === 0 ? 0 : page * rowsPerPage;
          //// 表示するページのTOインデックスを設定(現在ページ)
          //const toIndex = Math.min(data.length, (page + 1) * rowsPerPage);
          //// 表示データ分の配列を作成
          //let selectedRows = Array(toIndex - fromIndex)
          //  .fill()
          //  .map((d, i) => i + fromIndex);

          let selectedRows = Array(data.length)
            .fill()
            .map((d, i) => i);
          // 不具合【No.1】end

          /**
           *  @TODO
           * 不具合【No.1】
           * 不具合【No.2】
           */
          // 不具合【No.1】start
          //// 選択行に現在ぺージのインデックスを追加
          //let newRows = [...prevState.selectedRows, ...selectedRows];
          let newRows = [...selectedRows];
          // 不具合【No.1】end

          // 全体選択のチェックを外した場合はindexの値を削除
          if (value === false) {
            // 不具合【No.1】add
            //newRows = prevState.selectedRows.filter(val => selectedRows.indexOf(val) === -1);
            newRows = [];
            // 不具合【No.1】end
          }
          return {
            curSelectedRows: selectedRows,
            selectedRows: newRows,
          };
        },
        // 処理を実装している場合、処理を実行
        () => {
          if (this.options.onRowsSelect) {
            this.options.onRowsSelect(this.state.curSelectedRows, this.state.selectedRows);
          }
        },
      );
    } else if (type === "cell") {
      this.setState(
        prevState => {
          let selectedRows = [...prevState.selectedRows];
          const rowPos = selectedRows.indexOf(value);

          /** 行選択リストに存在する場合、リストから削除 */
          if (rowPos >= 0) {
            selectedRows.splice(rowPos, 1);
          /** 行選択リストに存在しない場合、リストに追加 */
          } else {
            selectedRows.push(value);
          }

          return {
            selectedRows: selectedRows,
          };
        },
        () => {
          if (this.options.onRowsSelect) {
            this.options.onRowsSelect([value], this.state.selectedRows);
          }
        },
      );
    }
  };

  sortCompare(order) {
    return (a, b) =>
      (typeof a.data.localeCompare === "function" ? a.data.localeCompare(b.data) : a.data - b.data) *
      (order === "asc" ? -1 : 1);
  }

  sortTable(data, col, order) {
    let sortedData = data.map((row, index) => ({
      data: row[col],
      position: index,
      rowSelected: this.state.selectedRows.indexOf(index) >= 0 ? true : false,
    }));

    sortedData.sort(this.sortCompare(order));

    let tableData = [];
    let selectedRows = [];

    for (let i = 0; i < sortedData.length; i++) {
      const row = sortedData[i];
      tableData.push(data[row.position]);
      if (row.rowSelected) {
        selectedRows.push(i);
      }
    }

    return {
      data: tableData,
      selectedRows: selectedRows,
    };
  }

  render() {
    const { classes, title } = this.props;
    const {
      announceText,
      data,
      displayData,
      columns,
      page,
      filterData,
      filterList,
      rowsPerPage,
      selectedRows,
      searchText,
    } = this.state;

    return (
      <Paper elevation={4} ref={el => (this.tableContent = el)}>
        {selectedRows.length ? (
          <DripTableToolbarSelect
            options={this.options}
            selectedRows={selectedRows}
            onRowsDelete={this.selectRowDelete}
          />
        ) : (
          <DripTableToolbar
            columns={columns}
            data={data}
            filterData={filterData}
            filterList={filterList}
            filterUpdate={this.filterUpdate}
            options={this.options}
            resetFilters={this.resetFilters}
            searchTextUpdate={this.searchTextUpdate}
            tableRef={() => this.tableContent}
            title={title}
            toggleViewColumn={this.toggleViewColumn}
          />
        )}
        <DripTableFilterList options={this.options} filterList={filterList} filterUpdate={this.filterUpdate} />
        <div className={this.options.responsive === "scroll" ? classes.responsiveScroll : null}>
          <Table ref={el => (this.tableRef = el)} tabIndex={"0"} role={"grid"}>
            <caption className={classes.caption}>{title}</caption>
            <DripTableHead
              columns={columns}
              handleHeadUpdateRef={fn => (this.updateToolbarSelect = fn)}
              selectRowUpdate={this.selectRowUpdate}
              toggleSort={this.toggleSortColumn}
              options={this.options}
            />
            <DripTableBody
              data={this.state.displayData}
              columns={columns}
              page={page}
              rowsPerPage={rowsPerPage}
              selectedRows={selectedRows}
              selectRowUpdate={this.selectRowUpdate}
              options={this.options}
              searchText={searchText}
              filterList={filterList}
            />
          </Table>
        </div>
        <Table>
          {this.options.pagination ? (
            <DripTablePagination
              count={displayData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              changeRowsPerPage={this.changeRowsPerPage}
              changePage={this.changePage}
              component={"div"}
              options={this.options}
            />
          ) : (
            false
          )}
        </Table>
        <div className={classes.liveAnnounce} aria-live={"polite"} ref={el => (this.announceRef = el)}>
          {announceText}
        </div>
      </Paper>
    );
  }
}

export default withStyles(defaultTableStyles, { name: "DripTable" })(DripTable);
