# ラベルのカスタム
*****
textLabels・・・カスタムラベルの設定用。

*****
### 使用例

・カスタムラベル
```sh
const options = {
  textLabels: {
    body: {
      noMatch: "データは存在しません",
      toolTip: "ソート",
    },
    pagination: {
      next: "次へ",
      previous: "前へ",
      rowsPerPage: "表示行数:",
      displayRows: "　合計：",
    },
    toolbar: {
      search: "検索",
      downloadCsv: "CSV ダウンロード",
      print: "印刷",
      viewColumns: "カラム表示切替",
      filterTable: "フィルターリスト",
    },
    filter: {
      all: "全件",
      title: "フィルター",
      reset: "クリア",
    },
    viewColumns: {
      title: "表示切替",
      titleAria: "表示/非表示",
    },
    selectedRows: {
      text: "行を選択",
      delete: "削除",
      deleteAria: "選択行を削除",
    },
  },
};
```
*****
### デモページ

・[demo](https://kento75.github.io/mui-drip-table-demo4)  
・[sample code](https://github.com/Kento75/mui-drip-table-demo4)
