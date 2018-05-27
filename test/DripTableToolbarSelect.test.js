import React from "react";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import DeleteIcon from "@material-ui/icons/Delete";
import DripTableToolbarSelect from "../src/DripTableToolbarSelect";
import textLabels from "../src/textLabels";

describe("<DripTableSelectCell />", function() {
  before(() => {});

  // 削除アイコン表示、動作確認
  it("should render table toolbar select", () => {
    const onRowsDelete = () => {};
    const mountWrapper = mount(
      <DripTableToolbarSelect options={{ textLabels }} selectedRows={[1]} onRowsDelete={onRowsDelete} />,
    );

    const actualResult = mountWrapper.find(DeleteIcon);
    assert.strictEqual(actualResult.length, 1);
  });
});
