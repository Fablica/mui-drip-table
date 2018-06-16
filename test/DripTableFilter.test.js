import React from "react";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import textLabels from "../src/textLabels";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import DripTableFilter from "../src/DripTableFilter";

describe("<DripTableFilter />", function() {
  let data;
  let columns;
  let filterData;

  beforeEach(() => {
    columns = [
      { name: "First Name", display: true, sort: true, filter: true, sortDirection: "desc" },
      { name: "Company", display: true, sort: true, filter: true, sortDirection: "desc" },
      { name: "City", display: true, sort: true, filter: true, sortDirection: "desc" },
      { name: "State", display: true, sort: true, filter: true, sortDirection: "desc" },
    ];

    data = [
      ["Joe James", "Test Corp", "Yonkers", "NY"],
      ["John Walsh", "Test Corp", "Hartford", "CT"],
      ["Bob Herm", "Test Corp", "Tampa", "FL"],
      ["James Houston", "Test Corp", "Dallas", "TX"],
    ];

    filterData = [
      ["Joe James", "John Walsh", "Bob Herm", "James Houston"],
      ["Test Corp"],
      ["Yonkers", "Hartford", "Tampa", "Dallas"],
      ["NY", "CT", "FL", "TX"],
    ];
  });

  // フィルタモード(checkbox)、フィルタリスト要素数の整合性チェック
  it("should data table filter view with checkboxes if filterType = 'checkbox'", () => {
    const options = { filterType: "checkbox", textLabels };
    const filterList = [[], [], [], []];
    const shallowWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = shallowWrapper.find(Checkbox);
    assert.strictEqual(actualResult.length, 13);
  });

  // フィルタモード(checkbox、要素選択)、フィルタリスト要素数の整合性チェック
  it("should data table filter view with checkboxes if filterType = 'checkbox'", () => {
    const options = { filterType: "checkbox", textLabels };
    const filterList = [["Joe James"], [], [], []];
    const shallowWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = shallowWrapper.find(Checkbox);
    assert.strictEqual(actualResult.length, 13);
  });

  // フィルタモード(checkbox)、カラムフィルタ無効、フィルタリスト要素数の整合性チェック
  it("should data table filter view with no checkboxes if filter=false for each column", () => {
    const options = { filterType: "checkbox", textLabels };
    const filterList = [[], [], [], []];
    columns = columns.map(item => (item.filter = false));

    const shallowWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = shallowWrapper.find(Checkbox);
    assert.strictEqual(actualResult.length, 0);
  });

  // フィルタモード(select)、フィルタリスト要素数の整合性チェック(onChange発火)
  it("should data table filter view with checkboxes if filterType = 'select'", () => {
    const options = { filterType: "select", textLabels };
    const filterList = [["Joe James"], [], [], []];
    const shallowWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = shallowWrapper.find(Select);
    assert.strictEqual(actualResult.length, 4);
  });

  // フィルタモード(select)、フィルタリスト要素数の整合性チェック
  it("should data table filter view with selects if filterType = 'select'", () => {
    const options = { filterType: "select", textLabels };
    const filterList = [["Joe James"], [], [], []];

    const mountWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = mountWrapper.find(Select);
    assert.strictEqual(actualResult.length, 4);
  });

  // フィルタモード(select)、カラムフィルタ無効、フィルタリスト要素数の整合性チェック
  it("should data table filter view no selects if filter=false for each column", () => {
    const options = { filterType: "select", textLabels };
    const filterList = [["Joe James"], [], [], []];
    columns = columns.map(item => (item.filter = false));

    const mountWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = mountWrapper.find(Select);
    assert.strictEqual(actualResult.length, 0);
  });

  // フィルタモード(multiselect、要素1、複数)、フィルタリスト要素数の整合性チェック
  it("should data table filter view with checkbox selects if filterType = 'multiselect'", () => {
    const options = { filterType: "multiselect", textLabels };
    const filterList = [["Joe James", "John Walsh"], [], [], []];

    const mountWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = mountWrapper.find(Select);
    assert.strictEqual(actualResult.length, 4);
  });

  // フィルタモード(multiselect、要素1、1件)、フィルタリスト要素数の整合性チェック
  it("should data table filter view with checkbox selects if filterType = 'multiselect'", () => {
    const options = { filterType: "multiselect", textLabels };
    const filterList = [["John Walsh"], [], [], []];

    const mountWrapper = mount(
      <DripTableFilter columns={columns} filterData={filterData} filterList={filterList} options={options} />,
    );

    const actualResult = mountWrapper.find(Select);
    assert.strictEqual(actualResult.length, 4);
  });

  // フィルタモード(checkbox)、フィルタリスト更新時の整合性チェック
  it("should trigger onFilterUpdate prop callback when calling method handleCheckboxChange", () => {
    const options = { filterType: "checkbox", textLabels };
    const filterList = [[], [], [], []];
    const onFilterUpdate = spy();

    const shallowWrapper = shallow(
      <DripTableFilter
        columns={columns}
        onFilterUpdate={onFilterUpdate}
        filterData={filterData}
        filterList={filterList}
        options={options}
      />,
    ).dive();
    const instance = shallowWrapper.instance();

    //const event = { target: { value: 0 }};
    instance.handleCheckboxChange(0, 0);
    assert.strictEqual(onFilterUpdate.callCount, 1);
  });

  // フィルタモード(select)、フィルタリスト更新時の整合性チェック
  it("should trigger onFilterUpdate prop callback when calling method handleDropdownChange", () => {
    const options = { filterType: "select", textLabels };
    const filterList = [[], [], [], []];
    const onFilterUpdate = spy();

    const shallowWrapper = shallow(
      <DripTableFilter
        columns={columns}
        onFilterUpdate={onFilterUpdate}
        filterData={filterData}
        filterList={filterList}
        options={options}
      />,
    ).dive();
    const instance = shallowWrapper.instance();

    let event = { target: { value: "All" } };
    instance.handleDropdownChange(event, 0);
    assert.strictEqual(onFilterUpdate.callCount, 1);

    event = { target: { value: "test" } };
    instance.handleDropdownChange(event, 0);
    assert.strictEqual(onFilterUpdate.callCount, 2);
  });

  // フィルタモード(multiselect)、フィルタリスト更新時の整合性チェック
  it("should trigger onFilterUpdate prop callback when calling method handleMultiselectChange", () => {
    const options = { filterType: "multiselect", textLabels };
    const filterList = [[], [], [], []];
    const onFilterUpdate = spy();

    const shallowWrapper = shallow(
      <DripTableFilter
        columns={columns}
        onFilterUpdate={onFilterUpdate}
        filterData={filterData}
        filterList={filterList}
        options={options}
      />,
    ).dive();
    const instance = shallowWrapper.instance();

    let event = { target: { value: "All" } };
    instance.handleMultiselectChange(event, 0);
    assert.strictEqual(onFilterUpdate.callCount, 1);

    event = { target: { value: "test" } };
    instance.handleMultiselectChange(event, 0);
    assert.strictEqual(onFilterUpdate.callCount, 2);
  });
});
