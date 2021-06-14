import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

import "./EditEventDialog.css"

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} classes={{paper: "dialog-box"}}>
      <DialogTitle id="simple-dialog-title">Edit Event</DialogTitle>
        <form noValidate autoComplete="off">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container spacing={2}>


                  <Grid item xs={12}>
                    <TextField label="Title" fullWidth />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="Start Time/Date"
                      variant="inline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      autoOk={true}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DateTimePicker
                      label="End Time/Date"
                      variant="inline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      autoOk={true}
                      // style={{width: "20px"}}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rowsMax={4}
                      // value={value}
                      // onChange={handleChange}
                    />
                  </Grid>


              </Grid>
          </MuiPickersUtilsProvider>
        </form>
    </Dialog>
  );
}

// const eventSchema = mongoose.Schema({
//   title: 
//   allDay: 
//   start:
//   end:
//   startStr:
//   endStr:
//   url:
//   classNames:
//   editable:
//   display:
//   backgroundColor:
//   borderColor:
//   textColor:
//   source:
// }, {timestamps: true});

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default SimpleDialog