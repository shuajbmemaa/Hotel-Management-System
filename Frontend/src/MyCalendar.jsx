import React, { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import {Tooltip} from 'react-tooltip';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaRegFilePdf } from "react-icons/fa6";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3002/bookingsC');
        const bookings = response.data.Result;

        console.log(bookings);

        if (Array.isArray(bookings)) {
          const formattedEvents = bookings.flatMap(booking => {
            const start = new Date(booking.checkIn);
            const end = new Date(booking.checkOut);

            const eventsForBooking = [];
            for (let current = start; current <= end; current.setDate(current.getDate() + 1)) {
              eventsForBooking.push({
                title: `Room ${booking.room_id} - ${booking.name}`,
                start: new Date(current),
                end: new Date(current.setHours(23, 59, 59, 999)),
                tooltip: `Room ${booking.room_id} - ${booking.name}`
              });
            }

            return eventsForBooking;
          });

          setEvents(formattedEvents);
        } else {
          console.error('Unexpected format of bookings:', bookings);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, []);

  const eventStyleGetter = (event) => {
    const backgroundColor = 'red';
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
    };
    return {
      style: style,
    };
  };

  const handleDownloadPDF = () => {
    html2canvas(document.querySelector(".rbc-calendar")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.height;

      while (heightLeft >= 0) {
        position -= pdf.internal.pageSize.height;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.height;
      }

      pdf.save('calendar.pdf');
    });
  };


  return (
    <div>
      <div style={{ height: '420pt' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          components={{
            event: ({ event }) => (
              <div data-tip={event.tooltip} style={{ padding: '5px' }}>
                {event.title}
              </div>
            )
          }}
        />
        <Tooltip />
      </div>
      <button onClick={handleDownloadPDF}>Download <FaRegFilePdf style={{ fontSize: '30px', marginLeft: '8px' }}/></button>
    </div>
  );
};

export default MyCalendar;
