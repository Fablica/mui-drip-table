import React from "react";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import DripTableHead from "../src/DripTableHead";
import DripTableHeadCell from "../src/DripTableHeadCell";
import Tooltip from "@material-ui/core/Tooltip";

describe("<DripTableHead />", function() {
  let columns;
  let handleHeadUpdateRef;

  before(() => {
    columns = [
      { name: "First Name", display: true, sort: null },
      { name: "Company", display: true, sort: null },
      { name: "City", display: true, sort: null },
      { name: "State", display: true, sort: null },
    ];

    handleHeadUpdateRef = () => {};
  });

  // ヘッダーカラム要素数整合性チェック
  it("should render a table head", () => {
    const options = {};
    const toggleSort = () => {};

    const mountWrapper = mount(
      <DripTableHead
        columns={columns}
        options={options}
        handleHeadUpdateRef={handleHeadUpdateRef}
        toggleSort={toggleSort}
      />,
    );
    const actualResult = mountWrapper.find(DripTableHeadCell);
    assert.strictEqual(actualResult.length, 4);
  });

  // ヘッダーセルが存在しない場合のチェック
  it("should render a table head with no cells", () => {
    const options = {};
    const toggleSort = () => {};

    const newColumns = columns.map(column => ({ ...column, display: false }));
    const mountWrapper = mount(
      <DripTableHead
        columns={newColumns}
        options={options}
        handleHeadUpdateRef={handleHeadUpdateRef}
        toggleSort={toggleSort}
      />,
    );
    const actualResult = mountWrapper.find(DripTableHeadCell);
    assert.strictEqual(actualResult.length, 0);
  });

  // ソート実行時の整合性チェック
  it("should trigger toggleSort prop callback when calling method handleToggleColumn", () => {
    const options = { sort: true };
    const toggleSort = spy();

    const shallowWrapper = shallow(
      <DripTableHead
        columns={columns}
        options={options}
        handleHeadUpdateRef={handleHeadUpdateRef}
        toggleSort={toggleSort}
      />,
    ).dive();

    const instance = shallowWrapper.instance();
    instance.handleToggleColumn(2);
    shallowWrapper.update();

    let state = shallowWrapper.state();
    assert.strictEqual(state.activeColumn, 2);
    assert.strictEqual(toggleSort.callCount, 1);
  });

  // 行選択時(セル)、整合性チェック
  it("should trigger selectRowUpdate prop callback and selectChecked state update when calling method handleRowSelect", () => {
    const options = { sort: true, selectableRows: true };
    const rowSelectUpdate = spy();

    const shallowWrapper = shallow(
      <DripTableHead
        columns={columns}
        options={options}
        handleHeadUpdateRef={handleHeadUpdateRef}
        selectRowUpdate={rowSelectUpdate}
      />,
    ).dive();

    const instance = shallowWrapper.instance();
    instance.handleRowSelect(2);
    shallowWrapper.update();

    let state = shallowWrapper.state();
    assert.strictEqual(state.selectChecked, true);
    assert.strictEqual(rowSelectUpdate.callCount, 1);
  });
});
