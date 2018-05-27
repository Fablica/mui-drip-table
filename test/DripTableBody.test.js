import React from "react";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import textLabels from "../src/textLabels";
import DripTableBody from "../src/DripTableBody";
import DripTableSelectCell from "../src/DripTableSelectCell";

describe("<DripTableBody />", function() {
  let data;
  let columns;

  before(() => {
    columns = ["First Name", "Company", "City", "State"];
    data = [
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
    ];
  });

  // 行選択無効時、整合性チェック
  it("should render a table body with no selectable cells if selectableRows = false", () => {
    const options = { selectableRows: false };
    const selectRowUpdate = () => {};

    const mountWrapper = mount(
      <DripTableBody
        data={data}
        columns={columns}
        page={0}
        rowsPerPage={10}
        selectedRows={[]}
        selectRowUpdate={selectRowUpdate}
        options={options}
        searchText={""}
        filterList={[]}
      />,
    );

    const actualResult = mountWrapper.find(DripTableSelectCell);
    assert.strictEqual(actualResult.length, 0);
  });

  // データが存在しない場合、整合性チェック
  // 文言チェック
  it("should render a table body with no records if no data provided", () => {
    const options = { selectableRows: false, textLabels };
    const selectRowUpdate = () => {};

    const mountWrapper = mount(
      <DripTableBody
        data={[]}
        columns={columns}
        page={0}
        rowsPerPage={10}
        selectedRows={[]}
        selectRowUpdate={selectRowUpdate}
        options={options}
        searchText={""}
        filterList={[]}
      />,
    );

    const actualResult = mountWrapper.html();
    assert.include(actualResult, "Sorry, no matching records found");
  });

  // 行選択有効時、整合性チェック
  it("should render a table body with selectable cells if selectableRows = true", () => {
    const options = { selectableRows: true };
    const selectRowUpdate = () => {};

    const mountWrapper = mount(
      <DripTableBody
        data={data}
        columns={columns}
        page={0}
        rowsPerPage={10}
        selectedRows={[]}
        selectRowUpdate={selectRowUpdate}
        options={options}
        searchText={""}
        filterList={[]}
      />,
    );

    const actualResult = mountWrapper.find(DripTableSelectCell);
    assert.strictEqual(actualResult.length, 4);
  });

  // 行選択無効時、整合性チェック
  it("should render a table body with selectable cells if selectableRows = false", () => {
    const options = { selectableRows: false };
    const selectRowUpdate = () => {};

    const mountWrapper = mount(
      <DripTableBody
        data={data}
        columns={columns}
        page={0}
        rowsPerPage={10}
        selectedRows={[]}
        selectRowUpdate={selectRowUpdate}
        options={options}
        searchText={""}
        filterList={[]}
      />,
    );

    const actualResult = mountWrapper.find(DripTableSelectCell);
    assert.strictEqual(actualResult.length, 0);
  });

  // 行選択時(存在する)、選択行の配列の要素数チェック
  it("should return the correct rowIndex when calling instance method getRowIndex", () => {
    const options = { sort: true, selectableRows: true };
    const selectRowUpdate = () => {};

    const shallowWrapper = shallow(
      <DripTableBody
        data={data}
        columns={columns}
        page={1}
        rowsPerPage={2}
        selectedRows={[1, 2, 3]}
        selectRowUpdate={selectRowUpdate}
        options={options}
        searchText={""}
        filterList={[]}
      />,
    ).dive();

    const instance = shallowWrapper.instance();
    const actualResult = instance.getRowIndex(2);

    assert.strictEqual(actualResult, 4);
  });

  // 行選択時(存在しない)、選択行の配列のfalseチェック
  it("should return correctly if row exists in selectedRows when calling instance method isRowSelected", () => {
    const options = { sort: true, selectableRows: true };
    const selectRowUpdate = () => {};

    const shallowWrapper = shallow(
      <DripTableBody
        data={data}
        columns={columns}
        page={0}
        rowsPerPage={15}
        selectedRows={[1, 2, 3]}
        selectRowUpdate={selectRowUpdate}
        options={options}
        searchText={""}
        filterList={[]}
      />,
    ).dive();

    const instance = shallowWrapper.instance();
    const actualResult = instance.isRowSelected(5);

    assert.strictEqual(actualResult, false);
  });

  // 行選択時、更新データ数チェック
  it("should trigger selectRowUpdate prop callback when calling method handleRowSelect", () => {
    const options = { sort: true, selectableRows: true };
    const selectRowUpdate = spy();

    const shallowWrapper = shallow(
      <DripTableBody
        data={data}
        columns={columns}
        page={0}
        rowsPerPage={10}
        selectedRows={[]}
        selectRowUpdate={selectRowUpdate}
        options={options}
        searchText={""}
        filterList={[]}
      />,
    ).dive();

    const instance = shallowWrapper.instance();
    instance.handleRowSelect(2);
    shallowWrapper.update();

    assert.strictEqual(selectRowUpdate.callCount, 1);
  });
});
