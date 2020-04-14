/*
  Author: Jack Ducasse;
  Version: 0.1.0;
  
*/

var Calendar = function(model, options, date){
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
    ModelChange: model
  };
  // Overwriting default values
  for(var key in options){
    this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
  }

  model?this.Model=model:this.Model={};
  this.Today = new Date();

  this.Selected = this.Today
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  if(date){this.Selected = date}
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();

  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster){
  if(typeof adjuster !== 'undefined'){
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }else{
    for(var key in calendar.Options){
      typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function AddSidebar(){
    var sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    var monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

    for(var i = 0; i < months.length - 3; i++){
      var x = document.createElement('li');
      x.className += 'cld-month';
      var n = i - (4 - calendar.Selected.Month);
      // Account for overflowing month values
      if(n<0){n+=12;}
      else if(n>11){n-=12;}
      // Add Appropriate Class
      if(i==0){
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);});
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      }
      else if(i==months.length - 4){
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, 1);} );
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      }
      else{
        if(i < 4){x.className += ' cld-pre';}
        else if(i > 4){x.className += ' cld-post';}
        else{x.className += ' cld-curr';}

        //prevent losing var adj value (for whatever reason that is happening)
        (function () {
          var adj = (i-4);
          //x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
          x.addEventListener('click', function(){
            typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
            createCalendar(calendar, element, adj);} );
          x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj)/4));
          x.innerHTML += months[n].substr(0,3);
        }()); // immediate invocation

        if(n==0){
          var y = document.createElement('li');
          y.className += 'cld-year';
          if(i<5){
            y.innerHTML += calendar.Selected.Year;
          }else{
            y.innerHTML += calendar.Selected.Year + 1;
          }
          monthList.appendChild(y);
        }
      }
      monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if(calendar.Options.NavLocation){
      document.getElementById(calendar.Options.NavLocation).innerHTML = "";
      document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    }
    else{element.appendChild(sidebar);}
  }

  var mainSection = document.createElement('div');
  mainSection.className += "cld-main";

  function AddDateTime(){
      var datetime = document.createElement('div');
      datetime.className += "cld-datetime";
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var rwd = document.createElement('div');
        rwd.className += " cld-rwd cld-nav";
        rwd.addEventListener('click', function(){createCalendar(calendar, element, -1);} );
        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        datetime.appendChild(rwd);
      }
      var today = document.createElement('div');
      today.className += ' today';
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      datetime.appendChild(today);
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var fwd = document.createElement('div');
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        datetime.appendChild(fwd);
      }
      if(calendar.Options.DatetimeLocation){
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}
  }

  function AddLabels(){
    var labels = document.createElement('ul');
    labels.className = 'cld-labels';
    var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(var i = 0; i < labelsList.length; i++){
      var label = document.createElement('li');
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }
  function AddDays(){
    // Create Number Element
    function DayNumber(n){
      var number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";
    // Previous Month's Days
    for(var i = 0; i < (calendar.Selected.FirstDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day prevMonth";
      //Disabled Days
      var d = i%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
      day.appendChild(number);

      days.appendChild(day);
    }
    // Current Month's Days
    for(var i = 0; i < calendar.Selected.Days; i++){
      var day = document.createElement('li');
      day.className += "cld-day currMonth";
      //Disabled Days
      var d = (i + calendar.Selected.FirstDay)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }
      var number = DayNumber(i+1);
     
      // Check Date against Event Dates
      
      for(var n = 0; n < calendar.Model.length; n++){
        var evDate = calendar.Model[n].Date;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
        
        if(evDate.getTime() == toDate.getTime()){
         
          number.className += " eventday";
          var eventClass=days.className;
          
          if(document.addEventListener){
            number.addEventListener('click',function(e){
              
              var t=this.innerHTML
              var edate=t.split(/<(.+)/)[0];
              var eventsToday=[];
              for(var n = 0; n < calendar.Model.length; n++){
                
                var evDate = calendar.Model[n].Date;
                var monthyear=document.getElementsByClassName('today')[0].innerHTML
                var getMonth=convertMonthNum(evDate.getMonth());
                var emonth=monthyear.split(/,(.+)/)[0];
                if(evDate.getDate()==edate && getMonth==emonth){
                  
                  var event_day=document.getElementById("specialDay");
                  var divwidth=event_day.offsetWidth;
                  var divheight=document.getElementsByClassName("cld-main")[0].offsetHeight;
                  
                  event_day.style.display="block";
                  //event_day.style.height="block";
                  while (event_day.firstChild) {
                    event_day.removeChild(event_day.lastChild);
                  }
                  event_day.innerHTML="";

                  var event_planned=edate +" "+monthyear;
              
                  var header=document.createElement("button")
                  header.innerHTML+=event_planned;
                  header.style.backgroundColor="lavender";
                  header.style.color="black";
                  header.style.border="1px";
                  header.style.borderColor="black";
                  header.style.border="0";
                  header.style.width=divwidth-32+"px";
                  header.style.fontFamily="Merienda One";
                  header.style.fontsize="16pt";
                  header.style.margin="0 auto";
                  header.style.textAlign="center";
                  
                  event_day.appendChild(header);

                  var closeout=document.createElement("button");
                  closeout.innerHTML += 'x';
                  closeout.style.float="right";
                  closeout.style.height="25px";
                  closeout.style.width="25px";
                  closeout.style.color="black";
                  closeout.style.border="1px";
                  closeout.style.borderColor="black";
                  closeout.style.fontFamily="'Poppins', sans-serif"
                  closeout.style.backgroundColor="thistle";
                  closeout.style.borderRadius="50%";
                  closeout.style.textAlign="center";
                  closeout.style.top="0";
                  closeout.style.right="0";
                  event_day.appendChild(closeout);
                  document.addEventListener('click', function(e) {
                    if(e.target.innerText=='x'){
                      e.preventDefault();
                      event_day.style.display="none";
                      //break;
                    }
                    
                    
                    //this.parentNode.style.display = 'none';
                    
                    }, false);
                  event_day.innerHTML+= "<br />"+"Events Scheduled: ";
                  if (eventsToday.indexOf(calendar.Model[n].Title) > -1){
                    //break;
                  }
                  else{
                    eventsToday.push(calendar.Model[n].Title);
                  }
                  
                  for(var i=0;i<eventsToday.length;i++){
                    
                    var b=document.createElement("button")
                    b.innerHTML+="☆ "+eventsToday[i];

                    b.style.backgroundColor="lavender";
                    b.style.color="black";
                    b.style.border="1px";
                    b.style.borderColor="black";
                    b.style.border="0";
                    b.style.width="100%";
                    b.style.fontFamily="'Poppins', sans-serif";
                    b.style.fontsize="14pt";
                    b.style.textAlign="center";
                    event_day.appendChild(b)
                  }
                  
                  
                   

                  
                
                 
                }
              }
              
        },false);
      }
        
          var title = document.createElement('span');
          
          title.className += "cld-title";
          
          if(typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick){
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML += calendar.Model[n].Title;
            if(calendar.Options.EventClick){
              
              var z = calendar.Model[n].Link;
              if(typeof calendar.Model[n].Link != 'string'){
                  a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  if(calendar.Options.EventTargetWholeDay){
                    day.className += " clickable";
                    day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  }
              }else{
                a.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                if(calendar.Options.EventTargetWholeDay){
                  day.className += " clickable";
                  day.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                }
              }
            }else{
              a.addEventListener('click', calendar.Model[n].Link);
              if(calendar.Options.EventTargetWholeDay){
                day.className += " clickable";
                day.addEventListener('click', calendar.Model[n].Link);
              }
            }
            title.appendChild(a);
          }else{
            title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
            
          }
          number.appendChild(title);
          
        }
        
      }
      day.appendChild(number);
      // If Today..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
      
    }
    // Next Month's Days
    // Always same amount of days in calander
    var extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day nextMonth";
      //Disabled Days
      var d = (i + calendar.Selected.LastDay + 1)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber(i+1);
      day.appendChild(number);

      days.appendChild(day);
    }
    mainSection.appendChild(days);
    
  }
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.NavShow && calendar.Options.NavVertical){
    AddSidebar();
  }
  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddLabels();
  AddDays();
}
function convertMonthNum(num){
  var monthStr;
  if(num==0){
    monthStr="January";
  }
  if(num==1){
    monthStr="February";
  }
  if(num==2){
    monthStr="March";
  }
  if(num==3){
    monthStr="April";
  }
  if(num==4){
    monthStr="May";
  }
  if(num==5){
    monthStr="June";
  }
  if(num==6){
    monthStr="July";
  }
  if(num==7){
    monthStr="August";
  }
  if(num==9){
    monthStr="September";
  }
  if(num==9){
    monthStr="October";
  }
  if(num==10){
    monthStr="November";
  }
  if(num==11){
    monthStr="December";
  }
  return monthStr;

}
function calendar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);
}
var events = [
  {'Date': new Date(2020, 2, 7), 'Title': 'Study at 3:25pm.'},
  {'Date': new Date(2020, 2, 18), 'Title': 'Test at 4pm', 'Link': 'https://google.com'},
  {'Date': new Date(2020, 2, 27), 'Title': 'Review Session1','Link': 'https://google.com'},
  {'Date': new Date(2020, 3, 27), 'Title': 'Review Session2','Link': 'https://google.com'},
  {'Date': new Date(2020, 3, 29), 'Title': 'Review Session3','Link': 'https://google.com'},
  {'Date': new Date(2020, 3, 29), 'Title': 'Test at 5pm','Link': 'https://google.com'}
];
var settings = {};
var element = document.getElementById('calendar');

calendar(element, events, settings);
// document.getElementById('closeButton').addEventListener('click', function(e) {
//   e.preventDefault();
//   this.parentNode.style.display = 'none';
// }, false);
