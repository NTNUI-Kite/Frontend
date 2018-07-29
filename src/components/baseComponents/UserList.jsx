import React from 'react';
import Paper from 'material-ui/Paper';
import * as jsPDF from 'jspdf';
import AuthStore from '../../stores/AuthStore';
import Button from 'material-ui/RaisedButton';
require('jspdf-autotable');

const downloadAttendees = (info) => {
  let columns = [
    { title: "Nr", dataKey: 'number'},
    { title: "Name", dataKey: 'name'},
    { title: "Has car", dataKey: 'car'},
    { title: "Comment", dataKey: 'comment' },
    { title: "Has paid", dataKey: 'paid'}];
  let data = []

  for (let i = 0; i < info.userList.length; i++) {
    data.push({
      number: (i + 1),
      name: info.userList[i].name,
      car: (info.userList[i].has_car ? 'Yes' : 'No'),
      comment: info.userList[i].comment,
      paid: (info.userList[i].has_paid ? 'Yes' : 'No'),
    });
  }

  let doc = new jsPDF('p', 'pt');
  doc.autoTable(columns, data, {
    styles: {
      overflow: 'linebreak',
      columnWidth: 'wrap',
    },
    columnStyles: {
      comment: {columnWidth: 'auto'},
    },
    margin: {top: 60},
    addPageContent: function(data) {
    	doc.text("Attendee List", 250, 30);
    }}
  );
  doc.save('attendeeList.pdf')
}

const UserList = (info) => {
  let downloadButton = <div />;
  if (!info.userList) {
    return (<Paper className="attendeeList" />);
  }

  if (AuthStore.isBoardMember() && info.title === 'Attendees') {
    downloadButton = <Button onClick={() => downloadAttendees(info)} label="Download list" />;
  }

  return (
    <Paper className={info.cssName}>
      <div className="userListHeader">
      <h3>{info.title}</h3>
      {
        downloadButton
      }
      </div>
      {
        info.userList.map(user => (
          <div key={user.user_id}>
            <p>{user.name}</p>
          </div>
        ))
      }
    </Paper>
  );
};

export default UserList;
