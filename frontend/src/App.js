import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add the custom styles here

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEventUrl, setSelectedEventUrl] = useState('');

  // Fetch events from the backend on component mount
  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle opt-in checkbox change
  const handleOptInChange = () => {
    setOptIn(!optIn);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/ticket-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, eventUrl: selectedEventUrl, optIn }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Redirect to the event URL after successful submission
          window.location.href = selectedEventUrl;
        } else {
          alert('Failed to submit the ticket request.');
        }
      })
      .catch((error) => {
        console.error('Error submitting the ticket request:', error);
      });
  };

  // Open the modal with the selected event URL
  const handleGetTicketsClick = (eventUrl) => {
    setSelectedEventUrl(eventUrl);
    setModalVisible(true);
  };

  // Redirect to the event URL immediately after clicking "Get Tickets"
  const handleRedirectToEvent = () => {
    window.location.href = selectedEventUrl;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Upcoming Events in Sydney</h1>
      <div className="row">
        {/* Display events */}
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events.map((event) => (
            <div className="col-md-4" key={event._id}>
              <div className="card event-card mb-4 shadow-sm border-0">
                <div className="card-body">
                <h5 className="card-title event-title">{event.event_name}</h5>
<p className="card-text event-location">Location: {event.location}</p>
<p className="card-text event-date">Date: {new Date(event.scraped_at).toLocaleDateString()}</p>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleGetTicketsClick(event.event_url)}
                  >
                    Get Tickets
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for email opt-in and redirection */}
      {modalVisible && (
        <div
          className="modal fade show"
          style={{ display: 'block' }}
          tabIndex="-1"
          aria-labelledby="emailModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="emailModalLabel">
                  Get Tickets
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setModalVisible(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="emailOptIn"
                      checked={optIn}
                      onChange={handleOptInChange}
                    />
                    <label className="form-check-label" htmlFor="emailOptIn">
                      Opt-in for event updates
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    <a href={`https://whatson.cityofsydney.nsw.gov.au/${selectedEventUrl}`} className="text-white">
                      Get Tickets
                    </a>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
