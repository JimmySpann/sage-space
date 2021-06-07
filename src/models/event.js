import debugLog from "../utils/customDebugging";

const url = `${process.env.REACT_APP_API}/events`
const token = localStorage.getItem('token');

class Event {
  constructor(eventSpecs) {
    this._id     = eventSpecs.id
    this._title  = eventSpecs.title
    this._start  = eventSpecs.start
    this._end    = eventSpecs.end
    this._allDay = eventSpecs.allDay
  }

  //id
    get id() {
      return this._id
    }
    set id(value) {
      this._id = value
    }
  
  //title
    get title() {
      return this._title
    }
    set title(value) {
      this._title = value
    }
  
  //start
    get start() {
      return this._start
    }
    set start(value) {
      this._start = value
    }
  
  //end
    get end() {
      return this._end
    }
    set end(value) {
      this._end = value
    }
  
  //allDay
    get allDay() {
      return this._allDay
    }
    set allDay(value) {
      this._allDay = value
    }


  // // Getter
  // get area() {
  //   return this.calcArea();
  // }
  // // Method
  // calcArea() {
  //   return this.height * this.width;
  // }
}

class EventModel {
  static getAll = () => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

  static getById = (eventID) => {
    return fetch(`${url}/${eventID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

  static create = (event) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(event)
    })
      .then((response) => response.json())
  }

  static update = (event) => {
    return fetch(`${url}/${event._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(event)
    })
      .then((response) => response.json())
  }

  static delete = (event) => {
    return fetch(`${url}/${event._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

}

export default EventModel
export { Event, EventModel }