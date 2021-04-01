import React from 'react';
import WorkTimeModel from '../../models/workTime';

import "./Dashboard.css";

class Dashboard extends React.Component {

  componentDidMount() {
    WorkTimeModel.createWorkTime({weekdays: [{activities: [{activity: "test"}]}]})
    .then((result) => {
      console.log(result);
      this.props.history.push('/work-time');
    })
    .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>

        <h3>Total Time: 15:21</h3>

        <table>
         <tr>
          <td colspan="3">Monday 10/03/2020</td>
         </tr>
         <tr>
          <td>Clock In</td>
          <td>Clock Out</td>
          <td>Activity</td>
         </tr>
         <tr>
          <td>10:00PM</td>
          <td>11:00PM</td>
          <td>Test app</td>
         </tr>
         <tr>
          <td colspan="3">1:00</td>
         </tr>
        </table>
      </div>
    );
  }

}
export default Dashboard;