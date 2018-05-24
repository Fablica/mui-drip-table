# 削除アイコン押下時カスタムロジック
*****
onRowsDelete・・・削除アイコン押下時の処理を設定。  
    　　　　　             ※ カスタムロジックを設定した場合、デフォルトの削除ロジックは実行されない。

*****
### 引数
・第1引数・・・画面表示データリスト＜array＞  
・第2引数・・・今回選択行を含むインデックスリスト＜array＞
*****
### 使用例

・カスタムロジック  
```sh
handleOnDeleteIcon(displayDataList, selectedList) {
  let selectedDataList = [];
  selectedList.forEach(function(index) {
    selectedDataList.push(displayDataList[index]);
  });
  // 選択行データのリストポップアップ表示
  alert(selectedDataList);
}
```
*****
### デモページ

・[demo](https://kento75.github.io/mui-drip-table-demo3)
