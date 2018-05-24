# テーブルスタイルのカスタマイズ
*****

・追加パッケージ
```sh
npm install material-ui@next
```
*****

### 使用例

・スタイルの適用
```sh 
getMuiTheme = () => createMuiTheme({
  overrides: {
    // ヘッダー行
    DripTableHeadRow: {
      root: {
        backgroundColor: "#FF0000"
      }
    },
    // ボディーセル
    DripTableBodyCell: {
      root: {
        backgroundColor: "#00FF00"
      }
    },
  }
})
  
...  

return (
  <MuiThemeProvider theme={this.getMuiTheme()}>
    <DripTable 
      title={"ACME Employee list"} 
      data={data} 
      columns={columns} 
      options={options} 
    />
  </MuiThemeProvider>
);

```
*****

### デモページ

・[demo](https://kento75.github.io/mui-drip-table-demo5)  
・[sample code](https://github.com/Kento75/mui-drip-table-demo5)
