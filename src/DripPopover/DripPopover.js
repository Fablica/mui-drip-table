import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import Popover from "@material-ui/core/Popover";
import DripPopoverContent from "./DripPopoverContent";
import DripPopoverTarget from "./DripPopoverTarget";

class DripPopover extends React.Component {
  static propTypes = {
    arrow: PropTypes.bool,
    refClose: PropTypes.func,
    refExit: PropTypes.func,
    children: (props, propName, componentName) => {
      let childMatch = true;
      const expectedComponents = [DripPopoverContent, DripPopoverTarget];

      React.Children.map(props.children, (child, index) => {
        if (expectedComponents.indexOf(child.type) === -1) childMatch = false;
      });

      if (!childMatch) {
        return new Error(
          "`" +
            componentName +
            "` " +
            "should only have children of the following types: `DripPopoverTarget`, `DripPopoverContent`.",
        );
      }
    },
  };

  state = {
    open: false,
  };

  componentWillMount() {
    this.anchorEl = null;
  }

  componentDidMount() {
    if (this.props.refClose) {
      this.props.refClose(this.handleRequestClose);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.open === true) {
      this.anchorEl = findDOMNode(this.anchorEl);
      this.popoverActions.updatePosition();
    }
  }

  handleClick = () => {
    this.anchorEl = findDOMNode(this.anchorEl);
    this.setState({ open: true });
  };

  handleRequestClose = cb => {
    this.setState({ open: false }, cb && typeof cb === "function" ? cb() : () => {});
  };

  handleOnExit = () => {
    if (this.props.refExit) {
      this.props.refExit();
    }
  };

  render() {
    let popoverRender = [];

    const { className, placement, refClose, refExit, children, ...providedProps } = this.props;

    React.Children.map(children, (child, index) => {
      if (child.type === DripPopoverContent || child.type === <DripPopoverContent />.type) {
        const transformOriginSpecs = {
          vertical: "top",
          horizontal: "center",
        };

        const anchorOriginSpecs = {
          vertical: "bottom",
          horizontal: "center",
        };

        const popoverContent = (
          <Popover
            action={actions => (this.popoverActions = actions)}
            key={index}
            elevation={2}
            open={this.state.open}
            onClose={this.handleRequestClose}
            onExited={this.handleOnExit}
            anchorEl={this.anchorEl}
            ref={el => this.popoverEl}
            anchorOrigin={anchorOriginSpecs}
            transformOrigin={transformOriginSpecs}
            {...providedProps}>
            {child}
          </Popover>
        );

        popoverRender.push(popoverContent);
      } else if (child.type === DripPopoverTarget || child.type === <DripPopoverTarget />.type) {
        const targetContent = React.cloneElement(child, {
          key: index,
          targetRef: el => (this.anchorEl = el),
          onClick: this.handleClick,
        });

        popoverRender.push(targetContent);
      }
    });
    return popoverRender;
  }
}

export default DripPopover;
