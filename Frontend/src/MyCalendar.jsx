import React from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'My event',
    start: new Date(),
    end: new Date(),
  },
];


const MyCalendar = () => {
  return (
    <div style={{ height: '500pt' }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
  )
}

export default MyCalendar