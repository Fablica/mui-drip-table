# mui-drip-table
### material-uiを使用したフルスタックなテーブルコンポーネント

[![NPM](https://nodei.co/npm/mui-drip-table.png?downloadRank=true)](https://nodei.co/npm/mui-drip-table/)  
  
[![Build Status](https://travis-ci.org/Kento75/mui-drip-table.svg?branch=master)](https://travis-ci.org/Kento75/mui-drip-table)
[![Coverage Status](https://coveralls.io/repos/github/Kento75/mui-drip-table/badge.svg?branch=master)](https://coveralls.io/github/Kento75/mui-drip-table?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/3cc7acde48e8d7e4b807/maintainability)](https://codeclimate.com/github/Kento75/mui-drip-table/maintainability)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
*****

### インストール
・パッケージ本体
```sh
npm install mui-drip-table
```
・依存パッケージ
```sh
npm install @material-ui/core @material-ui/icons
```

*****

### デモページ
・[demo](https://kento75.github.io/mui-drip-table-demo)  
  
・[sample code](https://github.com/Kento75/mui-drip-table-demo)

*****
### 変更履歴
・[CHENGE_LOG](https://github.com/Kento75/mui-drip-table/blob/master/Documents/CHANGE_LOG.md)
*****

### 機能
・テーブル一覧表示  
・カラムソート  
・フィルタリング  
・ページネーション  
・表示行数制御  
・行選択  
・検索  
・削除  
・CSVダウンロード  
・プリント  

*****

### API

#### &lt;DripTable />

サポートするprops:

|Name|Type|Description
|:--:|:-----|:-----|
|**`title`**|array|テーブルタイトル。
|**`columns`**|array|テーブルヘッダー。文字列の配列または、オプションを含むオブジェクト。
|**`data`**|array|テーブルデータ。文字列の配列。
|**`options`**|object|テーブル機能の制御を設定。

#### Options:
|Name|Type|Default|Description
|:--:|:-----|:--|:-----|
|**`filterType `**|string|'dropdown'|フィルタリングタイプを指定。 "checkbox"、"dropdown"、"multiselect"の3種類
|**`textLabels `**|object||ラベルを指定。[詳細](https://github.com/Kento75/mui-drip-table/blob/master/Documents/TEXT_LABELS.md)
|**`pagination`**|boolean|true|ページネーション機能の有効・無効。
|**`selectableRows`**|boolean|true|行選択機能の有効・無効。
|**`caseSensitive `**|boolean|false|検索アクション実行時、大文字と小文字の区別の有効・無効。
|**`responsive`**|string|'stacked'|ヘッダーのタイプを指定。 "stacked"、"scroll"の2種類
|**`rowsPerPage`**|number|10|1ページ当たりの最大表示行数。
|**`rowsPerPageOptions`**|array|[5,10,15,100]|表示行数選択項目。
|**`rowHover`**|boolean|true|行のホバー有効・無効。
|**`sortFilterList`**|boolean|true|フィルタリストのソート有効・無効。
|**`sort`**|boolean|true|列のソート有効・無効。
|**`filter`**|boolean|true|フィルターアイコン表示の有効・無効。
|**`search`**|boolean|true|検索アイコン表示の有効・無効。
|**`print`**|boolean|true|プリントアイコン表示の有効・無効。
|**`download`**|boolean|true|ダウンロードアイコン表示の有効・無効。
|**`onRowsSelect`**|function||行選択実行後の後続処理を設定。[詳細](https://github.com/Kento75/mui-drip-table/blob/master/Documents/ON_ROW_SELECT.md)
|**`onRowsDelete`**|function||行削除実行後の後続処理を設定。[詳細](https://github.com/Kento75/mui-drip-table/blob/master/Documents/ON_ROW_DELETE.md)
|**`onChangePage`**|function||ページネーション実行後の後続処理を設定。
|**`onChangeRowsPerPage`**|function||表示行数変更後の後続処理を設定。
|**`onSearchChange`**|function||検索実行後の後続処理を設定。
|**`onFilterChange`**|function||フィルター設定変更時の後続処理を設定。
|**`onColumnSortChange`**|function||ソート実行時の後続処理を設定。
|**`onColumnViewChange`**|function||表示カラムの変更後の後続処理を設定。

#### Column:
|Name|Type|Description
|:--:|:-----|:-----|
|**`Name`**|string|テーブルヘッダーに表示されるカラム名
|**`options`**|object|テーブル機能の制御を設定。下記オプション項目を参照。

#### Column Options:
|Name|Type|Default|Description
|:--:|:-----|:--|:-----|
|**`display`**|boolean|true|カラム表示の有効・無効。
|**`filter`**|boolean|true|フィルター機能の有効・無効。
|**`sort`**|boolean|true|ソート機能の有効・無効。
|**`customRender`**|function||データの表示をカスタム。

*****
#### テーブルスタイルのカスタマイズ  

・[詳細](https://github.com/Kento75/mui-drip-table/blob/master/Documents/CUSTOMIZE_STYLING.md)
