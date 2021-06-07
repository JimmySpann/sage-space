import React from 'react'
import EventModel from '../../models/event';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import debugLog from "../../utils/customDebugging"

export default class ScheduleContainer extends React.Component {

    state = {
      weekendsVisible: true,
      currentEvents: []
    }



  componentDidMount() {
    // NoteModel.getAllNotes()
    //   .then((result) => {
    //     if(this.props.match.params.id) {
    //       this.setState({notes: result, note: result.find(element => element._id === this.props.match.params.id)});
    //     } else {
    //       const recentNote = result.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
    //       this.setState({notes: result, note: recentNote});
    //       this.props.history.push(`/notes/${recentNote._id}`);
    //     }
    //   })
    //   .catch((err) => debugLog(err))
    
    let val1 = [];
    EventModel.getAll()
      .then((result) => {
        debugLog("works", result)
        val1 = result;
        this.setState({
          currentEvents: val1
        })
      })
      .catch((error) => {
        debugLog("error", error)
      })
  }


  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            contentHeight='auto'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.currentEvents}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      const event = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }
      debugLog(selectInfo)

      EventModel.create(event)
       .then((newEvent) => {
         calendarApi.addEvent(newEvent)
       })
       .catch(error => {
        debugLog("error", error)
       })
      
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {

      clickInfo.event.remove()
    }
  }

  // handleEvents = (events) => {
  //   this.setState({
  //     currentEvents: events
  //   })
  // }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
