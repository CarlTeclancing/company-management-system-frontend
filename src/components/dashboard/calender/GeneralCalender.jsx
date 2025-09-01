import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";
import axios from "axios";
import "./calender.css";
import { BASE_URL, MEETINGS } from "../../../../globals";
import { Link } from "react-router-dom";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    axios.get(`${MEETINGS}`)
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    const event = {
      date: selectedDate,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ...formData
    };
    try {
      await axios.post(`${BASE_URL}/events`, event);
      setEvents([...events, event]);
      setShowModal(false);
      setFormData({ title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const renderHeader = () => (
    <div className="calendar-header">
      <button className="nav-button" onClick={handlePrevMonth}>&lt;</button>
      <h2 className="month-label">{format(currentMonth, "MMMM yyyy")}</h2>
      <button className="nav-button" onClick={handleNextMonth}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="day-name">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="days-row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isToday = isSameDay(day, new Date());
        const isInMonth = isSameMonth(day, currentMonth);
        const hasEvent = events.some(event => isSameDay(new Date(event.date), day));
        days.push(
          <div
            key={day}
            onClick={() => handleDateClick(day)}
            className={`cell ${isToday ? "today" : isInMonth ? "in-month" : "out-month"} ${hasEvent ? "has-event" : ""}`}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="week-row" key={day}>{days}</div>);
      days = [];
    }
    return <div className="cells">{rows}</div>;
  };

  const renderEvents = () => (
    <div className="event-panel">
      <h3 className="event-heading">Events</h3>
      {events.map((event, idx) => (
        <div key={idx} className="event-card">
          <div className="event-date">{format(new Date(event.date), "MMM d, yyyy")}</div>
          <div className="event-time">{event.time}</div>
          <div className="event-title">{event.title}</div>
          <div className="event-title">{event.type}</div>
          <div className="event-title"><Link to={event.meeting_link} target="_blank">Join Now</Link></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="calendar-container">
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      {renderEvents()}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Add Event</h2>
            <input
              name="title"
              placeholder="Event Title"
              className="modal-input"
              value={formData.title}
              onChange={handleFormChange}
            />
            <textarea
              name="description"
              placeholder="Event Description"
              className="modal-textarea"
              value={formData.description}
              onChange={handleFormChange}
            ></textarea>
            <button className="btn-primary-100" onClick={handleFormSubmit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;