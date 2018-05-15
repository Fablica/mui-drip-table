import React from "react";
import { spy, stub } from "sinon";
import { mount, shallow } from "enzyme";
import { assert, expect, should } from "chai";
import { DripPopover, DripPopoverTarget, DripPopoverContent } from "../src/DripPopover";
import Popover from "@material-ui/core/Popover";

describe("<DripPopover />", function() {
  it("should render a popover", () => {
    const mountWrapper = mount(
      <DripPopover>
        <DripPopoverTarget>
          <a href="#">Simple Link!</a>
        </DripPopoverTarget>
        <DripPopoverContent>Some content</DripPopoverContent>
      </DripPopover>,
    );

    const actualResult = mountWrapper.find(Popover);
    assert.strictEqual(actualResult.length, 1);
  });

  it("should not render a popover if children are not DripPopoverContent or DripPopoverTarget", () => {
    stub(console, "error");
    const mountWrapper = mount(
      <DripPopover>
        <div>testing</div>
      </DripPopover>,
    );

    assert(console.error.called);
    console.error.restore();
  });

  it("should return children when calling DripPopoverContent", () => {
    const shallowWrapper = shallow(<DripPopoverContent>Some content</DripPopoverContent>);

    assert.strictEqual(shallowWrapper.text(), "Some content");
  });

  it("should call handleOnExit when unmounting DripPopover", () => {
    const exitFunc = spy();
    const shallowWrapper = shallow(
      <DripPopover refExit={exitFunc}>
        <DripPopoverTarget>
          <a href="#">Simple Link!</a>
        </DripPopoverTarget>
        <DripPopoverContent>Some content</DripPopoverContent>
      </DripPopover>,
    );

    const instance = shallowWrapper.instance();
    instance.handleOnExit();
    assert.strictEqual(exitFunc.callCount, 1);
  });

  it("should close popover when calling method handleRequestClose", () => {
    const refClose = spy();
    const mountWrapper = mount(
      <DripPopover refClose={refClose}>
        <DripPopoverTarget>
          <a href="#">Simple Link!</a>
        </DripPopoverTarget>
        <DripPopoverContent>Some content</DripPopoverContent>
      </DripPopover>,
    );

    // open popover
    mountWrapper.setState({ open: true });
    mountWrapper.update();
    let state = mountWrapper.state();

    assert.strictEqual(state.open, true);
    assert.strictEqual(mountWrapper.find(Popover).length, 1);

    // hide popover
    const instance = mountWrapper.instance();
    instance.handleRequestClose();
    mountWrapper.update();
    state = mountWrapper.state();

    assert.strictEqual(state.open, false);
    assert.strictEqual(refClose.callCount, 1);
  });

  it("should open popover when calling method handleClick", () => {
    const mountWrapper = mount(
      <DripPopover>
        <DripPopoverTarget>
          <a href="#">Simple Link!</a>
        </DripPopoverTarget>
        <DripPopoverContent>Some content</DripPopoverContent>
      </DripPopover>,
    );

    let state = mountWrapper.state();
    const instance = mountWrapper.instance();
    assert.strictEqual(state.open, false);

    instance.handleClick();
    mountWrapper.update();

    state = mountWrapper.state();
    assert.strictEqual(state.open, true);
    assert.strictEqual(mountWrapper.find(Popover).length, 1);
  });
});
