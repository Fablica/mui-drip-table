import React from "react";
import PropTypes from "prop-types";

/** material-ui */
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";

/** デフォルトスタイル */
const defaultToolbarSelectStyles = {
  root: {
    backgroundColor: "#f7f7f7",
    flex: "1 1 100%",
    display: "flex",
    height: "64px",
    justifyContent: "space-between",
  },
  title: {
    paddingLeft: "26px",
    top: "50%",
    position: "relative",
    transform: "translateY(-50%)",
  },
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "block",
    position: "relative",
    transform: "translateY(-50%)",
  },
  deleteIcon: {
    color: "#000",
  },
};

/**
 * 行選択時、表示するツールバー
 * Deleteアイコンを表示
 */
class DripTableToolbarSelect extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    rowSelected: PropTypes.bool,
    onRowsDelete: PropTypes.func,
    classes: PropTypes.object,
  };

  render() {
    const { classes, onRowsDelete, selectedRows, options } = this.props;
    const textLabels = options.textLabels.selectedRows;

    return (
      <Paper className={classes.root}>
        <div>
          <Typography variant="subheading" className={classes.title}>
            {selectedRows.length} {textLabels.text}
          </Typography>
        </div>
        <Tooltip title={textLabels.delete}>
          <IconButton className={classes.iconButton} onClick={onRowsDelete} aria-label={textLabels.deleteAria}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </Paper>
    );
  }
}

export default withStyles(defaultToolbarSelectStyles, { name: "DripTableToolbarSelect" })(DripTableToolbarSelect);
