import React from 'react';
import WorkTimeModel from '../../models/workTime';

import "./Dashboard.css";

class TimeActivity {
  constructor(clock_in, clock_out, activity) {
    this.clock_in = clock_in
    this.clock_out = clock_out
    this.activity = activity
  }
}

class Dashboard extends React.Component {


  state = {
    time_activity: [
      new TimeActivity(new Date(2020,5,24,22,0,0,0), new Date(2020,5,24,23,0,0,0), "Test App"),
      new TimeActivity(new Date(2020,5,24,23,0,0,0), new Date(2020,5,24,24,0,0,0), "Read")
    ]
  }

  componentDidMount() {
    WorkTimeModel.createWorkTime({weekdays: [{activities: [{activity: "test"}]}]})
    .then((result) => {
      console.log(result);
      this.props.history.push('/work-time');
    })
    .catch((err) => console.log(err))
  }

  timeRow = (clock_in, clock_out, activity) => {
    console.log("props",clock_in)
    return(         
        <tr>
          <td>{clock_in.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</td>
          <td>{clock_out.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })}</td>
          <td>{activity}</td>
        </tr>
      )
  }
  
  timeRows = (props) => {
    const items = []
    console.log("timeRows", props)
    for (const values of props)
    {
        items.push(this.timeRow(values.clock_in, values.clock_out, values.activity))
    }
    return(items)

  }

  render() {
    return (
      <div>

        <p>When i feel discomfort, i'm using it as a signal to stop, I need to change the
        way I see discomfort to the belief that discomfort means go. It means i'm on
        to something meaningful. It means that i must keep going because the things
        that are rewarding are the things that cause me discomfort</p>

        <h1>Dashboard</h1>

        <h3>Total Time: 15:21</h3>

        <table>
          <thead>
            <tr>
              <td colSpan="3">Monday 10/03/2020</td>
            </tr>
            <tr>
              <td>Clock In</td>
              <td>Clock Out</td>
              <td>Activity</td>
            </tr>
          </thead>

          <tbody>
            {this.timeRows(this.state.time_activity)}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="3">10:00</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }

}
export default Dashboard;