import React from "react";
import simulant from "simulant";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import TextField from "@material-ui/core/TextField";
import DripTableSearch from "../src/DripTableSearch";
import textLabels from "../src/textLabels";

describe("<DripTableSearch />", function() {
  it("should render a search bar", () => {
    const options = { textLabels };
    const onSearch = () => {};
    const onHide = () => {};

    const mountWrapper = mount(<DripTableSearch onSearch={onSearch} onHide={onHide} options={options} />);

    const actualResult = mountWrapper.find(TextField);
    assert.strictEqual(actualResult.length, 1);
  });

  // 検索ボックス動作チェック
  it("should trigger handleTextChange prop callback when calling method handleTextChange", () => {
    const options = { onSearchChange: () => true, textLabels };
    const onSearch = spy();
    const onHide = () => {};

    const shallowWrapper = shallow(<DripTableSearch onSearch={onSearch} onHide={onHide} options={options} />).dive();

    const instance = shallowWrapper.instance();

    instance.handleTextChange({ target: { value: "" } });
    assert.strictEqual(onSearch.callCount, 1);
  });

  // ESCキー押下時、検索ボックス非表示、動作チェック
  it("should hide the search bar when hitting the ESCAPE key", () => {
    const options = { textLabels };
    const onHide = spy();

    const mountWrapper = mount(<DripTableSearch onHide={onHide} options={options} />, { attachTo: document.body });

    simulant.fire(document.body.querySelector("input"), "keydown", { keyCode: 27 });
    assert.strictEqual(onHide.callCount, 1);
  });

  // ESC以外のキー(Enter)押下時、検索ボックス表示維持、動作チェック
  it("should hide not hide search bar when entering anything but the ESCAPE key", () => {
    const options = { textLabels };
    const onHide = spy();

    const mountWrapper = mount(<DripTableSearch onHide={onHide} options={options} />, { attachTo: document.body });

    simulant.fire(document.body.querySelector("input"), "keydown", { keyCode: 25 });
    assert.strictEqual(onHide.callCount, 0);
  });
});
