import React from "react";
import classNames from "classnames";
import TableHead from "@material-ui/core/TableHead";
import DripTableHeadRow from "./DripTableHeadRow";
import DripTableHeadCell from "./DripTableHeadCell";
import DripTableSelectCell from "./DripTableSelectCell";
import { withStyles } from "@material-ui/core/styles";

const defaultHeadStyles = {
  main: {},
  responsiveStacked: {
    "@media screen and (max-width: 960px)": {
      display: "none",
    },
  },
};

class DripTableHead extends React.Component {
  state = {
    activeColumn: null,
    selectChecked: false,
  };

  componentDidMount() {
    this.props.handleHeadUpdateRef(this.handleUpdateCheck);
  }

  handleToggleColumn = index => {
    this.setState(() => ({
      activeColumn: index,
    }));
    this.props.toggleSort(index);
  };

  handleRowSelect = () => {
    this.setState(
      prevState => ({
        selectChecked: !prevState.selectChecked,
      }),
      () => this.props.selectRowUpdate("head", this.state.selectChecked),
    );
  };

  handleUpdateCheck = status => {
    this.setState(() => ({
      selectChecked: status,
    }));
  };

  render() {
    const { classes, columns, options } = this.props;
    const { selectChecked } = this.state;

    return (
      <TableHead
        className={classNames({ [classes.responsiveStacked]: options.responsive === "stacked", [classes.main]: true })}>
        <DripTableHeadRow>
          {options.selectableRows ? (
            <DripTableSelectCell onChange={this.handleRowSelect.bind(null)} checked={selectChecked} />
          ) : (
            false
          )}
          {columns.map(
            (column, index) =>
              column.display ? (
                <DripTableHeadCell
                  key={index}
                  index={index}
                  sort={column.sort}
                  sortDirection={column.sortDirection}
                  toggleSort={this.handleToggleColumn}
                  options={options}>
                  {column.name}
                </DripTableHeadCell>
              ) : (
                false
              ),
          )}
        </DripTableHeadRow>
      </TableHead>
    );
  }
}

export default withStyles(defaultHeadStyles, { name: "DripTableHead" })(DripTableHead);
