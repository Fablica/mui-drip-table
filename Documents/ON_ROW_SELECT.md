# 行選択カスタムロジック
*****
onRowsSelect・・・行選択実行後の後続処理を設定。

*****
### 引数
・第1引数・・・画面表示データリスト＜array＞  
　・第2引数・・・前回選択行のインデックスリスト＜array＞  
　　・第3引数・・・今回選択行を含むインデックスリスト＜array＞
*****
### 使用例

・カスタムロジック  
```sh
handleOnSelectedRows(displayDataList, prevSelectedList, selectedList) {
  let selectedDataList = [];
  selectedList.forEach(function(index) {
    selectedDataList.push(displayDataList[index]);
  });
  // 選択行データのリストをコンソールに表示
  console.log(selectedDataList);
}
```