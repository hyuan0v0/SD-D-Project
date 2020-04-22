/* eslint-disable func-names */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/*
  Calendar basic structure: Jack Ducasse- open source project;
  The main set up of the this calendar is a part of an open source project but,
  adding the events, goals and some of styling and setting up the calendar is
  Virtual connection's code
*/
// This function sets up the calendar and the sets up
// The default colors and formats
<<<<<<< HEAD
const Calendar = function (model, options, date) {
  // Default Values
  this.Options = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],
    ModelChange: model,
  };
  // Overwriting default values
  for (const key in options) {
    this.Options[key] = typeof options[key] === 'string' ? options[key].toLowerCase() : options[key];
  }

  model ? this.Model = model : this.Model = {};
  this.Today = new Date();
  // Handles getting today's day month and year
  this.Selected = this.Today;
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  if (date) { this.Selected = date; }
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();
  // This is the selected days
  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();
  // sets up previous days
  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  if (this.Selected.Month == 0) { this.Prev = new Date(this.Selected.Year - 1, 11, 1); }
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};
// This function creates a calendar and sets up the headings
function createCalendar(calendar, element, adjuster) {
  if (typeof adjuster !== 'undefined') {
    const newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  } else {
    for (const key in calendar.Options) {
      typeof calendar.Options[key] !== 'function' && typeof calendar.Options[key] !== 'object' && calendar.Options[key] ? element.className += ` ${key}-${calendar.Options[key]}` : 0;
=======
// converts the numbered month to a string
function convertMonthNum(num) {
  let monthStr;
  if (num === 0) {
    monthStr = 'January';
  }
  if (num === 1) {
    monthStr = 'February';
  }
  if (num === 2) {
    monthStr = 'March';
  }
  if (num === 3) {
    monthStr = 'April';
  }
  if (num === 4) {
    monthStr = 'May';
  }
  if (num === 5) {
    monthStr = 'June';
  }
  if (num === 6) {
    monthStr = 'July';
  }
  if (num === 7) {
    monthStr = 'August';
  }
  if (num === 9) {
    monthStr = 'September';
  }
  if (num === 9) {
    monthStr = 'October';
  }
  if (num === 10) {
    monthStr = 'November';
  }
  if (num === 11) {
    monthStr = 'December';
  }
  return monthStr;
}
const todayGoalsList = ['Finish DiffEq Problem Set', 'Submit Psych Essay', 'Go to the Gym', 'Start Algo P-set'];


// menu for the deleting goals
const cm = document.querySelector('.custom-cm');
function showContextMenu(show = true) {
  cm.style.display = show ? 'block' : 'none';
}
// rightclick delete goal
let clickCoords;
let clickCoordsX;
let clickCoordsY;

let menuWidth;
let menuHeight;

// position of context menu for delete
let windowWidth;
let windowHeight;
function getPosition(e) {
  let posx = 0;
  let posy = 0;


  if (e.pageX || e.pageY) {
    posx = e.clientX;
    posy = e.clientY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy,
  };
}
// sets up where the delete menu should be
function positionMenu(e) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;

  clickCoordsY = clickCoords.y;


  menuWidth = cm.offsetWidth + 4;
  menuHeight = cm.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if ((windowWidth - clickCoordsX) < menuWidth) {
    cm.style.left = `${windowWidth - menuWidth}px`;
  } else {
    cm.style.left = `${clickCoordsX}px`;
  }

  if ((windowHeight - clickCoordsY) < menuHeight) {
    cm.style.top = `${windowHeight - menuHeight}px`;
  } else {
    cm.style.top = `${clickCoordsY}px`;
  }
}

class Calendar {
  constructor(model, options, date) {
    // Default Values
    this.Options = {
      Color: '',
      LinkColor: '',
      NavShow: true,
      NavVertical: false,
      NavLocation: '',
      DateTimeShow: true,
      DateTimeFormat: 'mmm, yyyy',
      DatetimeLocation: '',
      EventClick: '',
      EventTargetWholeDay: false,
      DisabledDays: [],
      ModelChange: model,
    };
    // Overwriting default values
    for (const key in options) {
      this.Options[key] = typeof options[key] === 'string' ? options[key].toLowerCase() : options[key];
    }
    // eslint-disable-next-line no-unused-expressions
    model ? this.Model = model : this.Model = {};
    this.Today = new Date();
    // Handles getting today's day month and year
    this.Selected = this.Today;
    this.Today.Month = this.Today.getMonth();
    this.Today.Year = this.Today.getFullYear();
    if (date) {
      this.Selected = date;
>>>>>>> master
    }
    this.Selected.Month = this.Selected.getMonth();
    this.Selected.Year = this.Selected.getFullYear();
    // This is the selected days
    this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
    this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
    this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();
    // sets up previous days
    this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
    if (this.Selected.Month === 0) {
      this.Prev = new Date(this.Selected.Year - 1, 11, 1);
    }
    this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
  }
<<<<<<< HEAD
=======
}
// This function creates a calendar and sets up the headings
function createCalendar(calendar, element, adjuster) {
  if (typeof adjuster !== 'undefined') {
    const newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }
>>>>>>> master
  // array to hold the months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // sets up the months
  function AddSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    const monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

<<<<<<< HEAD
    for (var i = 0; i < months.length - 3; i++) {
      var x = document.createElement('li');
      x.className += 'cld-month';
      var n = i - (4 - calendar.Selected.Month);
      // Account for overflowing month values
      if (n < 0) { n += 12; } else if (n > 11) { n -= 12; }
      // Add Appropriate Class
      if (i == 0) {
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', () => {
          typeof calendar.Options.ModelChange === 'function' ? calendar.Model = calendar.Options.ModelChange() : calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);
        });
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      } else if (i == months.length - 4) {
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', () => {
          typeof calendar.Options.ModelChange === 'function' ? calendar.Model = calendar.Options.ModelChange() : calendar.Model = calendar.Options.ModelChange;
=======
    for (let i = 0; i < months.length - 3; i += 1) {
      const x = document.createElement('li');
      x.className += 'cld-month';
      let n = i - (4 - calendar.Selected.Month);
      // Account for overflowing month values
      if (n < 0) { n += 12; } else if (n > 11) { n -= 12; }
      // Add Appropriate Class
      if (i === 0) {
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', () => {
          createCalendar(calendar, element, -1);
        });
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      } else if (i === months.length - 4) {
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', () => {
>>>>>>> master
          createCalendar(calendar, element, 1);
        });
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      } else {
        if (i < 4) { x.className += ' cld-pre'; } else if (i > 4) { x.className += ' cld-post'; } else { x.className += ' cld-curr'; }

<<<<<<< HEAD
        // prevent losing var adj value
        (function () {
          const adj = (i - 4);
          x.addEventListener('click', () => {
            typeof calendar.Options.ModelChange === 'function' ? calendar.Model = calendar.Options.ModelChange() : calendar.Model = calendar.Options.ModelChange;
=======
        // prevent losing let adj value
        // eslint-disable-next-line func-names
        (function () {
          const adj = (i - 4);
          x.addEventListener('click', () => {
>>>>>>> master
            createCalendar(calendar, element, adj);
          });
          x.setAttribute('style', `opacity:${1 - Math.abs(adj) / 4}`);
          x.innerHTML += months[n].substr(0, 3);
        }()); // immediate invocation
        // sets up year
<<<<<<< HEAD
        if (n == 0) {
=======
        if (n === 0) {
>>>>>>> master
          const y = document.createElement('li');
          y.className += 'cld-year';
          if (i < 5) {
            y.innerHTML += calendar.Selected.Year;
          } else {
            y.innerHTML += calendar.Selected.Year + 1;
          }
          monthList.appendChild(y);
        }
      }
      monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if (calendar.Options.NavLocation) {
      document.getElementById(calendar.Options.NavLocation).innerHTML = '';
      document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    } else { element.appendChild(sidebar); }
  }

  const mainSection = document.createElement('div');
  mainSection.className += 'cld-main';
  // This function adds the date and time to the squares on the calendar
  function AddDateTime() {
    const datetime = document.createElement('div');
    datetime.className += 'cld-datetime';
    if (calendar.Options.NavShow && !calendar.Options.NavVertical) {
      const rwd = document.createElement('div');
      rwd.className += ' cld-rwd cld-nav';
      rwd.addEventListener('click', () => { createCalendar(calendar, element, -1); });
      rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
      datetime.appendChild(rwd);
    }
    // Styling for the today square
    const today = document.createElement('div');
    today.className += ' today';
    today.innerHTML = `${months[calendar.Selected.Month]}, ${calendar.Selected.Year}`;
    datetime.appendChild(today);
    if (calendar.Options.NavShow && !calendar.Options.NavVertical) {
      const fwd = document.createElement('div');
      fwd.className += ' cld-fwd cld-nav';
      fwd.addEventListener('click', () => { createCalendar(calendar, element, 1); });
      fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
      datetime.appendChild(fwd);
    }
    if (calendar.Options.DatetimeLocation) {
      document.getElementById(calendar.Options.DatetimeLocation).innerHTML = '';
      document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
    } else { mainSection.appendChild(datetime); }
  }
  // This function adds the labels for the days of the week
  function AddLabels() {
    const labels = document.createElement('ul');
    labels.className = 'cld-labels';
    const labelsList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
<<<<<<< HEAD
    for (let i = 0; i < labelsList.length; i++) {
=======
    for (let i = 0; i < labelsList.length; i += 1) {
>>>>>>> master
      const label = document.createElement('li');
      label.className += 'cld-label';
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }
  // this adds the days to the squres
  function AddDays() {
    // Create Number Element
    function DayNumber(n) {
      const number = document.createElement('p');
      number.className += 'cld-number';
      number.innerHTML += n;
      return number;
    }
    const days = document.createElement('ul');
    days.className += 'cld-days';
    // Previous Month"s Days
<<<<<<< HEAD
    for (var i = 0; i < (calendar.Selected.FirstDay); i++) {
      var day = document.createElement('li');
      day.className += 'cld-day prevMonth';
      // Disabled Days next month's days
      var d = i % 7;
      for (var q = 0; q < calendar.Options.DisabledDays.length; q++) {
        if (d == calendar.Options.DisabledDays[q]) {
=======
    for (let i = 0; i < (calendar.Selected.FirstDay); i += 1) {
      const day = document.createElement('li');
      day.className += 'cld-day prevMonth';
      // Disabled Days next month's days
      const d = i % 7;
      for (let q = 0; q < calendar.Options.DisabledDays.length; q += 1) {
        if (d === calendar.Options.DisabledDays[q]) {
>>>>>>> master
          day.className += ' disableDay';
        }
      }

<<<<<<< HEAD
      var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i + 1));
=======
      const number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i + 1));
>>>>>>> master
      day.appendChild(number);

      days.appendChild(day);
    }
    // Current Month"s Days
<<<<<<< HEAD
    for (var i = 0; i < calendar.Selected.Days; i++) {
      var day = document.createElement('li');
      day.className += 'cld-day currMonth';
      // Disabled Days
      var d = (i + calendar.Selected.FirstDay) % 7;
      for (var q = 0; q < calendar.Options.DisabledDays.length; q++) {
        if (d == calendar.Options.DisabledDays[q]) {
          day.className += ' disableDay';
        }
      }
      var number = DayNumber(i + 1);

      // Check Date against Event Dates
      // Here I check if there is an event on that specific day
      for (let n = 0; n < calendar.Model.length; n++) {
        const evDate = calendar.Model[n].Date;
        const toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i + 1));

        if (evDate.getTime() == toDate.getTime()) {
          number.className += ' eventday';
          const eventClass = days.className;
          // sets up the side panel to list the events
          if (document.addEventListener) {
=======
    for (let i = 0; i < calendar.Selected.Days; i += 1) {
      const day = document.createElement('li');
      day.className += 'cld-day currMonth';
      // Disabled Days
      const d = (i + calendar.Selected.FirstDay) % 7;
      for (let q = 0; q < calendar.Options.DisabledDays.length; q += 1) {
        if (d === calendar.Options.DisabledDays[q]) {
          day.className += ' disableDay';
        }
      }
      const number = DayNumber(i + 1);

      // Check Date against Event Dates
      // Here I check if there is an event on that specific day
      for (let n = 0; n < calendar.Model.length; n += 1) {
        const evDate = calendar.Model[n].Date;
        const toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i + 1));

        // eslint-disable-next-line eqeqeq
        if (evDate.getTime() == toDate.getTime()) {
          number.className += ' eventday';
          // sets up the side panel to list the events
          if (document.addEventListener) {
            // eslint-disable-next-line no-unused-vars
>>>>>>> master
            number.addEventListener('click', function (e) {
              const t = this.innerHTML;
              const edate = t.split(/<(.+)/)[0]; // gets the event date
              const eventsToday = [];
<<<<<<< HEAD
              for (let n = 0; n < calendar.Model.length; n++) {
=======
              for (let n = 0; n < calendar.Model.length; n += 1) {
>>>>>>> master
                const evDate = calendar.Model[n].Date;
                const monthyear = document.getElementsByClassName('today')[0].innerHTML;
                const getMonth = convertMonthNum(evDate.getMonth());
                const emonth = monthyear.split(/,(.+)/)[0];
<<<<<<< HEAD
                if (evDate.getDate() == edate && getMonth == emonth) {
                  var event_day = document.getElementById('specialDay');
                  const divwidth = event_day.offsetWidth;
                  const divheight = document.getElementsByClassName('cld-main')[0].offsetHeight;

                  event_day.style.display = 'block';
                  while (event_day.firstChild) {
                    event_day.removeChild(event_day.lastChild);
                  }
                  event_day.innerHTML = '';

                  const event_planned = `${edate} ${monthyear}`;
                  // Styling for the side panel
                  const header = document.createElement('button');
                  header.innerHTML += event_planned;
=======
                // eslint-disable-next-line eqeqeq
                if (evDate.getDate() == edate && getMonth === emonth) {
                  const eventDay = document.getElementById('specialDay');
                  const divwidth = eventDay.offsetWidth;


                  eventDay.style.display = 'block';
                  while (eventDay.firstChild) {
                    eventDay.removeChild(eventDay.lastChild);
                  }
                  eventDay.innerHTML = '';

                  const eventPlanned = `${edate} ${monthyear}`;
                  // Styling for the side panel
                  const header = document.createElement('button');
                  header.innerHTML += eventPlanned;
>>>>>>> master
                  header.style.backgroundColor = 'lavender';
                  header.style.color = 'black';
                  header.style.border = '1px';
                  header.style.borderColor = 'black';
                  header.style.border = '0';
                  header.style.width = `${divwidth - 32}px`;
                  header.style.fontFamily = 'Merienda One';
                  header.style.fontsize = '16pt';
                  header.style.margin = '0 auto';
                  header.style.textAlign = 'center';

<<<<<<< HEAD
                  event_day.appendChild(header);
=======
                  eventDay.appendChild(header);
>>>>>>> master
                  // to close out the evnts panel
                  const closeout = document.createElement('button');
                  closeout.innerHTML += 'x';
                  closeout.style.float = 'right';
                  closeout.style.height = '25px';
                  closeout.style.width = '25px';
                  closeout.style.color = 'black';
                  closeout.style.border = '1px';
                  closeout.style.borderColor = 'black';
                  closeout.style.fontFamily = "'Poppins', sans-serif";
                  closeout.style.backgroundColor = 'thistle';
                  closeout.style.borderRadius = '50%';
                  closeout.style.textAlign = 'center';
                  closeout.style.top = '0';
                  closeout.style.right = '0';
<<<<<<< HEAD
                  event_day.appendChild(closeout);
                  document.addEventListener('click', (e) => {
                    if (e.target.innerText == 'x') {
                      e.preventDefault();
                      event_day.style.display = 'none';
                    }
                  }, false);
                  event_day.innerHTML += '<br />' + 'Events Scheduled: ';
                  if (eventsToday.indexOf(calendar.Model[n].Title) > -1) {

                  } else {
                    eventsToday.push(calendar.Model[n].Title);
                  }

                  for (let i = 0; i < eventsToday.length; i++) {
=======
                  eventDay.appendChild(closeout);
                  document.addEventListener('click', (e) => {
                    if (e.target.innerText === 'x') {
                      e.preventDefault();
                      eventDay.style.display = 'none';
                    }
                  }, false);
                  eventDay.innerHTML += '<br />';
                  eventDay.innerHTML += 'Events Scheduled: ';
                  if (eventsToday.indexOf(calendar.Model[n].Title) <= -1) {
                    eventsToday.push(calendar.Model[n].Title);
                  }

                  for (let i = 0; i < eventsToday.length; i += 1) {
>>>>>>> master
                    const b = document.createElement('button');
                    b.innerHTML += `☆ ${eventsToday[i]}`;

                    b.style.backgroundColor = 'lavender';
                    b.style.color = 'black';
                    b.style.border = '1px';
                    b.style.borderColor = 'black';
                    b.style.border = '0';
                    b.style.width = '100%';
                    b.style.fontFamily = "'Poppins', sans-serif";
                    b.style.fontsize = '14pt';
                    b.style.textAlign = 'center';
<<<<<<< HEAD
                    event_day.appendChild(b);
=======
                    eventDay.appendChild(b);
>>>>>>> master
                  }
                }
              }
            }, false);
          }

          const title = document.createElement('span');
          // This part is to check if an event contains a link
          title.className += 'cld-title';

          if (typeof calendar.Model[n].Link === 'function' || calendar.Options.EventClick) {
            const a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML += calendar.Model[n].Title;
            if (calendar.Options.EventClick) {
              const z = calendar.Model[n].Link;
              if (typeof calendar.Model[n].Link !== 'string') {
<<<<<<< HEAD
                a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)));
                if (calendar.Options.EventTargetWholeDay) {
                  day.className += ' clickable';
                  day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)));
=======
                a.addEventListener('click', calendar.Options.EventClick.bind.apply(this.calendar.Options.EventClick, [null].concat(z)));
                if (calendar.Options.EventTargetWholeDay) {
                  day.className += ' clickable';
                  day.addEventListener('click', calendar.Options.EventClick.bind.apply(this.calendar.Options.EventClick, [null].concat(z)));
>>>>>>> master
                }
              } else {
                a.addEventListener('click', calendar.Options.EventClick.bind(null, z));
                if (calendar.Options.EventTargetWholeDay) {
                  day.className += ' clickable';
                  day.addEventListener('click', calendar.Options.EventClick.bind(null, z));
                }
              }
            } else {
              a.addEventListener('click', calendar.Model[n].Link);
              if (calendar.Options.EventTargetWholeDay) {
                day.className += ' clickable';
                day.addEventListener('click', calendar.Model[n].Link);
              }
            }
            title.appendChild(a);
          } else {
            title.innerHTML += `<a href="${calendar.Model[n].Link}">${calendar.Model[n].Title}</a>`;
          }
          number.appendChild(title);
        }
      }
      day.appendChild(number);
      // If Today..
      // The section below handles the goals
<<<<<<< HEAD
      if ((i + 1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year) {
        day.className += ' today';
        var tGoals = document.getElementById('todayGoals');
=======
      if ((i + 1) === calendar.Today.getDate() && calendar.Selected.Month
      === calendar.Today.Month && calendar.Selected.Year === calendar.Today.Year) {
        day.className += ' today';
        const tGoals = document.getElementById('todayGoals');
>>>>>>> master
        const month = convertMonthNum(calendar.Today.Month);
        tGoals.innerHTML = '';
        tGoals.innerHTML += `Goals for Today ~ ${calendar.Today.getDate()} ${month} ${calendar.Today.Year}`;
        const closeout = document.createElement('button');
        closeout.innerHTML += '+';
        closeout.style.float = 'right';
        closeout.style.height = '25px';
        closeout.style.width = '25px';
        closeout.style.color = 'black';
        closeout.style.border = '1px';
        closeout.style.borderColor = 'black';
        closeout.style.fontFamily = "'Poppins', sans-serif";
        closeout.style.backgroundColor = 'thistle';
        closeout.style.borderRadius = '50%';
        closeout.style.textAlign = 'center';
        closeout.style.top = '0';
        closeout.style.right = '0';
        tGoals.appendChild(closeout);
<<<<<<< HEAD
        var clickedon = '';
        var b3 = document.createElement('button');
        // adding a goal
        document.addEventListener('click', (e) => {
          if (e.target.innerText == '+') {
=======
        let clickedon = '';
        const b3 = document.createElement('button');
        // adding a goal
        document.addEventListener('click', (e) => {
          if (e.target.innerText === '+') {
>>>>>>> master
            e.preventDefault();
            const addGoal = document.createElement('textarea');
            addGoal.style.width = '100%';
            addGoal.style.fontSize = '14pt';
            addGoal.style.fontFamily = "'Poppins', sans-serif";
            addGoal.style.backgroundColor = 'lavender';
            tGoals.appendChild(addGoal);
            addGoal.addEventListener('keypress', (e) => {
              if (e.key === 'Enter') {
                // code for enter
                const txt = addGoal.value.trim();
<<<<<<< HEAD
                if (txt != '') {
                  todayGoalsList.push(txt);

=======
                if (txt !== '') {
                  todayGoalsList.push(txt);
>>>>>>> master
                  b3.style.backgroundColor = '#C3CDE6';
                  b3.style.color = 'black';
                  b3.style.border = '1px';
                  b3.style.borderColor = 'black';
                  b3.style.border = '0';
                  b3.style.width = '100%';
                  b3.style.fontFamily = "'Poppins', sans-serif";
                  b3.style.fontsize = '14pt';
                  b3.style.textAlign = 'center';
                  b3.innerHTML = `☆ ${txt}`;
                  tGoals.appendChild(b3);
                  addGoal.style.display = 'none';
                  // to delete a goal
                  if (document.addEventListener) { // IE >= 9; other browsers
                    b3.addEventListener('contextmenu', (e) => {
                      e.preventDefault();
                      showContextMenu();
                      positionMenu(e);
                      clickedon = e.target.innerText;
<<<<<<< HEAD
                      console.log(clickedon);
                    }, false);
                    document.addEventListener('click', (e) => {
                      showContextMenu(false);
                    });
=======
                    }, false);
                    // eslint-disable-next-line no-unused-vars
                    document.addEventListener('click', (e) => {
                      showContextMenu(false);
                    });
                    // eslint-disable-next-line no-unused-vars
>>>>>>> master
                    document.addEventListener('scroll', (e) => {
                      showContextMenu(false);
                    });
                  } else { // IE < 9
                    document.attachEvent('oncontextmenu', () => {
<<<<<<< HEAD
                      alert("You've tried to open context menu");
                      window.event.returnValue = false;
                    });
                  }
                } else {
                  alert('Please enter a Goal');
=======
                      window.event.returnValue = false;
                    });
                  }
>>>>>>> master
                }
              }
            });
            // break;
          }
        });
        tGoals.innerHTML += '<br />';
        const buttonsNames = [];
<<<<<<< HEAD
        for (let t = 0; t < todayGoalsList.length; t++) {
          // createGoalsButtons(todayGoalsList,t)
=======
        for (let t = 0; t < todayGoalsList.length; t += 1) {
>>>>>>> master
          var b2 = document.createElement('button');
          b2.style.backgroundColor = '#C3CDE6';
          b2.style.color = 'black';
          b2.style.border = '1px';
          b2.style.borderColor = 'black';
          b2.style.border = '0';
          b2.style.width = '100%';
          b2.style.fontFamily = "'Poppins', sans-serif";
          b2.style.fontsize = '14pt';
          b2.style.textAlign = 'center';
          b2.innerHTML = `☆ ${todayGoalsList[t]}`;
          buttonsNames.push(b2.innerHTML);
          tGoals.appendChild(b2);
          // context menu for delete item
          if (document.addEventListener) { // IE >= 9; other browsers
            b2.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              showContextMenu();
              positionMenu(e);
              clickedon = e.target.innerText;
<<<<<<< HEAD
              console.log(clickedon);
            }, false);
            document.addEventListener('click', (e) => {
              showContextMenu(false);
            });
=======
            }, false);
            // eslint-disable-next-line no-unused-vars
            document.addEventListener('click', (e) => {
              showContextMenu(false);
            });
            // eslint-disable-next-line no-unused-vars
>>>>>>> master
            document.addEventListener('scroll', (e) => {
              showContextMenu(false);
            });
          } else { // IE < 9
            document.attachEvent('oncontextmenu', () => {
<<<<<<< HEAD
              alert("You've tried to open context menu");
=======
>>>>>>> master
              window.event.returnValue = false;
            });
          }
        }
        // delete a goal that you have not added but are already there
        const delitem = document.getElementById('thisitem');
<<<<<<< HEAD
=======
        // eslint-disable-next-line no-unused-vars
>>>>>>> master
        delitem.addEventListener('click', (e) => {
          let stripped = clickedon.split(/☆(.+)/)[1];
          stripped = stripped.trim();
          for (const i in todayGoalsList) {
<<<<<<< HEAD
            if (todayGoalsList[i] == stripped) {
=======
            if (todayGoalsList[i] === stripped) {
>>>>>>> master
              todayGoalsList.splice(i, 1);
              break;
            }
          }
          for (let child = tGoals.firstChild; child !== null; child = child.nextSibling) {
<<<<<<< HEAD
            console.log(child.innerHTML);
            if (child.innerHTML == clickedon) {
=======
            if (child.innerHTML === clickedon) {
>>>>>>> master
              child.parentNode.removeChild(child);
            }
          }

<<<<<<< HEAD
          if (b2.innerHTML == clickedon) {
            b2.parentNode.removeChild(b2);
          }
          if (b3.innerHTML == clickedon) {
=======
          if (b2.innerHTML === clickedon) {
            b2.parentNode.removeChild(b2);
          }
          if (b3.innerHTML === clickedon) {
>>>>>>> master
            b3.parentNode.removeChild(b3);
          }
        }, false);
      }
      days.appendChild(day);
    }
    // Next Month"s Days
    let extraDays = 13;
<<<<<<< HEAD
    if (days.children.length > 35) { extraDays = 6; } else if (days.children.length < 29) { extraDays = 20; }

    for (var i = 0; i < (extraDays - calendar.Selected.LastDay); i++) {
      var day = document.createElement('li');
      day.className += 'cld-day nextMonth';
      // Disabled Days
      var d = (i + calendar.Selected.LastDay + 1) % 7;
      for (var q = 0; q < calendar.Options.DisabledDays.length; q++) {
        if (d == calendar.Options.DisabledDays[q]) {
=======
    if (days.children.length > 35) { extraDays = 6; } else if
    (days.children.length < 29) { extraDays = 20; }

    for (let i = 0; i < (extraDays - calendar.Selected.LastDay); i += 1) {
      const day = document.createElement('li');
      day.className += 'cld-day nextMonth';
      // Disabled Days
      const d = (i + calendar.Selected.LastDay + 1) % 7;
      for (let q = 0; q < calendar.Options.DisabledDays.length; q += 1) {
        if (d === calendar.Options.DisabledDays[q]) {
>>>>>>> master
          day.className += ' disableDay';
        }
      }

<<<<<<< HEAD
      var number = DayNumber(i + 1);
=======
      const number = DayNumber(i + 1);
>>>>>>> master
      day.appendChild(number);

      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  // calendar coloring
  if (calendar.Options.Color) {
    mainSection.innerHTML += `<style>.cld-main{color:${calendar.Options.Color};}</style>`;
  }
  if (calendar.Options.LinkColor) {
    mainSection.innerHTML += `<style>.cld-title a{color:${calendar.Options.LinkColor};}</style>`;
  }
  element.appendChild(mainSection);

  if (calendar.Options.NavShow && calendar.Options.NavVertical) {
    AddSidebar();
  }
  if (calendar.Options.DateTimeShow) {
    AddDateTime();
  }
  AddLabels();
  AddDays();
}
<<<<<<< HEAD
// converts the numbered month to a string
function convertMonthNum(num) {
  let monthStr;
  if (num == 0) {
    monthStr = 'January';
  }
  if (num == 1) {
    monthStr = 'February';
  }
  if (num == 2) {
    monthStr = 'March';
  }
  if (num == 3) {
    monthStr = 'April';
  }
  if (num == 4) {
    monthStr = 'May';
  }
  if (num == 5) {
    monthStr = 'June';
  }
  if (num == 6) {
    monthStr = 'July';
  }
  if (num == 7) {
    monthStr = 'August';
  }
  if (num == 9) {
    monthStr = 'September';
  }
  if (num == 9) {
    monthStr = 'October';
  }
  if (num == 10) {
    monthStr = 'November';
  }
  if (num == 11) {
    monthStr = 'December';
  }
  return monthStr;
}
=======

>>>>>>> master
// call to create calendar
function calendar(el, data, settings) {
  const obj = new Calendar(data, settings);
  createCalendar(obj, el);
}
<<<<<<< HEAD
=======
const settings = {};
>>>>>>> master
// Holds the events in a json format
const events = [
  { Date: new Date(2020, 2, 7), Title: 'Study at 3:25pm.' },
  { Date: new Date(2020, 2, 18), Title: 'Test at 4pm', Link: 'https://google.com' },
  { Date: new Date(2020, 2, 27), Title: 'Review Session1', Link: 'https://google.com' },
  { Date: new Date(2020, 3, 27), Title: 'Review Session2', Link: 'https://google.com' },
  { Date: new Date(2020, 3, 29), Title: 'Review Session3', Link: 'https://google.com' },
  { Date: new Date(2020, 3, 29), Title: 'Test at 5pm', Link: 'https://google.com' },
  { Date: new Date(2020, 3, 22), Title: 'Office Hours 12-2pm', Link: 'https://google.com' },
  { Date: new Date(2020, 3, 22), Title: 'Study Group at 3pm', Link: 'https://google.com' },
  { Date: new Date(2020, 3, 22), Title: 'Meet SD&D group 4pm', Link: 'https://google.com' },
  { Date: new Date(2020, 3, 22), Title: 'Quiz at 6pm', Link: 'https://google.com' },

];
<<<<<<< HEAD
var todayGoalsList = ['Finish DiffEq Problem Set', 'Submit Psych Essay', 'Go to the Gym', 'Start Algo P-set'];
const settings = {};
const element = document.getElementById('calendar');

calendar(element, events, settings);
// menu for the deleting goals
const cm = document.querySelector('.custom-cm');
function showContextMenu(show = true) {
  cm.style.display = show ? 'block' : 'none';
}
// rightclick delete goal
let clickCoords;
let clickCoordsX;
let clickCoordsY;
const menuState = 0;
let menuWidth;
let menuHeight;
let menuPosition;
let menuPositionX;
let menuPositionY;
// position of context menu for delete
let windowWidth;
let windowHeight;
function getPosition(e) {
  let posx = 0;
  let posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.clientX;
    posy = e.clientY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy,
  };
}
// sets up where the delete menu should be
function positionMenu(e) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;

  clickCoordsY = clickCoords.y;


  menuWidth = cm.offsetWidth + 4;
  menuHeight = cm.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if ((windowWidth - clickCoordsX) < menuWidth) {
    cm.style.left = `${windowWidth - menuWidth}px`;
  } else {
    cm.style.left = `${clickCoordsX}px`;
  }

  if ((windowHeight - clickCoordsY) < menuHeight) {
    cm.style.top = `${windowHeight - menuHeight}px`;
  } else {
    cm.style.top = `${clickCoordsY}px`;
  }
}
=======
const element = document.getElementById('calendar');

calendar(element, events, settings);
>>>>>>> master
