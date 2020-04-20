/*
  Calendar basic structure: Jack Ducasse- open source project;
  The main set up of the this calendar is a part of an open source project but,
  adding the events, goals and some of styling and setting up the calendar is 
  Virtual connection's code
*/
//This function sets up the calendar and the sets up
//The default colors and formats
var Calendar = function(model, options, date){
  // Default Values
  this.Options = {
    Color: "",
    LinkColor: "",
    NavShow: true,
    NavVertical: false,
    NavLocation: "",
    DateTimeShow: true,
    DateTimeFormat: "mmm, yyyy",
    DatetimeLocation: "",
    EventClick: "",
    EventTargetWholeDay: false,
    DisabledDays: [],
    ModelChange: model
  };
  // Overwriting default values
  for(var key in options){
    this.Options[key] = typeof options[key]=="string"?options[key].toLowerCase():options[key];
  }

  model?this.Model=model:this.Model={};
  this.Today = new Date();
  //Handles getting today's day month and year
  this.Selected = this.Today
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  if(date){this.Selected = date}
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();
  //This is the selected days
  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();
  //sets up previous days
  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};
//This function creates a calendar and sets up the headings
function createCalendar(calendar, element, adjuster){
  if(typeof adjuster !== "undefined"){
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = "";
  }else{
    for(var key in calendar.Options){
      typeof calendar.Options[key] != "function" && typeof calendar.Options[key] != "object" && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }
  //array to hold the months
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //sets up the months
  function AddSidebar(){
    var sidebar = document.createElement("div");
    sidebar.className += "cld-sidebar";

    var monthList = document.createElement("ul");
    monthList.className += "cld-monthList";

    for(var i = 0; i < months.length - 3; i++){
      var x = document.createElement("li");
      x.className += "cld-month";
      var n = i - (4 - calendar.Selected.Month);
      // Account for overflowing month values
      if(n<0){n+=12;}
      else if(n>11){n-=12;}
      // Add Appropriate Class
      if(i==0){
        x.className += " cld-rwd cld-nav";
        x.addEventListener("click", function(){
          typeof calendar.Options.ModelChange == "function"?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);});
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      }
      else if(i==months.length - 4){
        x.className += " cld-fwd cld-nav";
        x.addEventListener("click", function(){
          typeof calendar.Options.ModelChange == "function"?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, 1);} );
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      }
      else{
        if(i < 4){x.className += " cld-pre";}
        else if(i > 4){x.className += " cld-post";}
        else{x.className += " cld-curr";}

        //prevent losing var adj value
        (function () {
          var adj = (i-4);
          x.addEventListener("click", function(){
            typeof calendar.Options.ModelChange == "function"?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
            createCalendar(calendar, element, adj);} );
          x.setAttribute("style", "opacity:" + (1 - Math.abs(adj)/4));
          x.innerHTML += months[n].substr(0,3);
        }()); // immediate invocation
        //sets up year
        if(n==0){
          var y = document.createElement("li");
          y.className += "cld-year";
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

  var mainSection = document.createElement("div");
  mainSection.className += "cld-main";
  //This function adds the date and time to the squares on the calendar
  function AddDateTime(){
      var datetime = document.createElement("div");
      datetime.className += "cld-datetime";
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var rwd = document.createElement("div");
        rwd.className += " cld-rwd cld-nav";
        rwd.addEventListener("click", function(){createCalendar(calendar, element, -1);} );
        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        datetime.appendChild(rwd);
      }
      //Styling for the today square
      var today = document.createElement("div");
      today.className += " today";
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      datetime.appendChild(today);
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var fwd = document.createElement("div");
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener("click", function(){createCalendar(calendar, element, 1);} );
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        datetime.appendChild(fwd);
      }
      if(calendar.Options.DatetimeLocation){
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}
  }
  //This function adds the labels for the days of the week
  function AddLabels(){
    var labels = document.createElement("ul");
    labels.className = "cld-labels";
    var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(var i = 0; i < labelsList.length; i++){
      var label = document.createElement("li");
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }
  //this adds the days to the squres
  function AddDays(){
    // Create Number Element
    function DayNumber(n){
      var number = document.createElement("p");
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement("ul");
    days.className += "cld-days";
    // Previous Month"s Days
    for(var i = 0; i < (calendar.Selected.FirstDay); i++){
      var day = document.createElement("li");
      day.className += "cld-day prevMonth";
      //Disabled Days next month's days
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
    // Current Month"s Days
    for(var i = 0; i < calendar.Selected.Days; i++){
      var day = document.createElement("li");
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
      //Here I check if there is an event on that specific day
      for(var n = 0; n < calendar.Model.length; n++){
        var evDate = calendar.Model[n].Date;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
        
        if(evDate.getTime() == toDate.getTime()){
         
          number.className += " eventday";
          var eventClass=days.className;
          //sets up the side panel to list the events
          if(document.addEventListener){
            number.addEventListener("click",function(e){
              
              var t=this.innerHTML
              var edate=t.split(/<(.+)/)[0]; //gets the event date
              var eventsToday=[];
              for(var n = 0; n < calendar.Model.length; n++){
                
                var evDate = calendar.Model[n].Date;
                var monthyear=document.getElementsByClassName("today")[0].innerHTML
                var getMonth=convertMonthNum(evDate.getMonth());
                var emonth=monthyear.split(/,(.+)/)[0];
                if(evDate.getDate()==edate && getMonth==emonth){
                  
                  var event_day=document.getElementById("specialDay");
                  var divwidth=event_day.offsetWidth;
                  var divheight=document.getElementsByClassName("cld-main")[0].offsetHeight;
                  
                  event_day.style.display="block";
                  while (event_day.firstChild) {
                    event_day.removeChild(event_day.lastChild);
                  }
                  event_day.innerHTML="";

                  var event_planned=edate +" "+monthyear;
                  //Styling for the side panel
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
                  //to close out the evnts panel
                  var closeout=document.createElement("button");
                  closeout.innerHTML += "x";
                  closeout.style.float="right";
                  closeout.style.height="25px";
                  closeout.style.width="25px";
                  closeout.style.color="black";
                  closeout.style.border="1px";
                  closeout.style.borderColor="black";
                  closeout.style.fontFamily="'Poppins', sans-serif";
                  closeout.style.backgroundColor="thistle";
                  closeout.style.borderRadius="50%";
                  closeout.style.textAlign="center";
                  closeout.style.top="0";
                  closeout.style.right="0";
                  event_day.appendChild(closeout);
                  document.addEventListener("click", function(e) {
                    if(e.target.innerText=="x"){
                      e.preventDefault();
                      event_day.style.display="none";
                    }
                    }, false);
                  event_day.innerHTML+= "<br />"+"Events Scheduled: ";
                  if (eventsToday.indexOf(calendar.Model[n].Title) > -1){

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
        
          var title = document.createElement("span");
          //This part is to check if an event contains a link
          title.className += "cld-title";
          
          if(typeof calendar.Model[n].Link == "function" || calendar.Options.EventClick){
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.innerHTML += calendar.Model[n].Title;
            if(calendar.Options.EventClick){
              
              var z = calendar.Model[n].Link;
              if(typeof calendar.Model[n].Link != "string"){
                  a.addEventListener("click", calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  if(calendar.Options.EventTargetWholeDay){
                    day.className += " clickable";
                    day.addEventListener("click", calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  }
              }else{
                a.addEventListener("click", calendar.Options.EventClick.bind(null, z) );
                if(calendar.Options.EventTargetWholeDay){
                  day.className += " clickable";
                  day.addEventListener("click", calendar.Options.EventClick.bind(null, z) );
                }
              }
            }else{
              a.addEventListener("click", calendar.Model[n].Link);
              if(calendar.Options.EventTargetWholeDay){
                day.className += " clickable";
                day.addEventListener("click", calendar.Model[n].Link);
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
      //The section below handles the goals
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
        var tGoals=document.getElementById("todayGoals");
        var month=convertMonthNum(calendar.Today.Month)
        tGoals.innerHTML="";
        tGoals.innerHTML+="Goals for Today ~ "+calendar.Today.getDate()+" "+month+" "+calendar.Today.Year;
        var closeout=document.createElement("button");
        closeout.innerHTML += "+";
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
        tGoals.appendChild(closeout);
        var clickedon="";
        var b3=document.createElement("button")
        //adding a goal
        document.addEventListener("click", function(e) {
          if(e.target.innerText=="+"){
            e.preventDefault();
            var addGoal=document.createElement("textarea");
            addGoal.style.width="100%";
            addGoal.style.fontSize="14pt";
            addGoal.style.fontFamily="'Poppins', sans-serif";
            addGoal.style.backgroundColor="lavender";
            tGoals.appendChild(addGoal);
            addGoal.addEventListener("keypress", function (e) {
              if (e.key === "Enter") {
                // code for enter
                var txt=addGoal.value.trim();
                if(txt!=""){
                  
                  todayGoalsList.push(txt);
                  
                  b3.style.backgroundColor="#C3CDE6";
                  b3.style.color="black";
                  b3.style.border="1px";
                  b3.style.borderColor="black";
                  b3.style.border="0";
                  b3.style.width="100%";
                  b3.style.fontFamily="'Poppins', sans-serif";
                  b3.style.fontsize="14pt";
                  b3.style.textAlign="center";
                  b3.innerHTML="☆ "+txt;
                  tGoals.appendChild(b3)
                  addGoal.style.display="none";
                  //to delete a goal
                  if (document.addEventListener) { // IE >= 9; other browsers
                  b3.addEventListener("contextmenu", function(e) {
                    e.preventDefault();
                      showContextMenu();
                      positionMenu(e);
                      clickedon=e.target.innerText;
                      console.log(clickedon)

                  }, false);
                  document.addEventListener("click",function(e){
                  showContextMenu(false);
                  });
                  document.addEventListener("scroll",function(e){
                  showContextMenu(false);
                  });
                  }
                  else { // IE < 9
                      document.attachEvent("oncontextmenu", function() {
                        alert("You've tried to open context menu");
                        window.event.returnValue = false;
                      });
                  }
                  }
                else{
                  alert("Please enter a Goal")
                }
              }
          });
            //break;
          }
        });
        tGoals.innerHTML+="<br />";
        var buttonsNames=[]
        for(var t=0;t<todayGoalsList.length;t++){
         // createGoalsButtons(todayGoalsList,t)
          var b2=document.createElement("button")
          b2.style.backgroundColor="#C3CDE6";
          b2.style.color="black";
          b2.style.border="1px";
          b2.style.borderColor="black";
          b2.style.border="0";
          b2.style.width="100%";
          b2.style.fontFamily="'Poppins', sans-serif";
          b2.style.fontsize="14pt";
          b2.style.textAlign="center";
          b2.innerHTML="☆ "+todayGoalsList[t];
          buttonsNames.push(b2.innerHTML)
          tGoals.appendChild(b2);
          //context menu for delete item
          if (document.addEventListener) { // IE >= 9; other browsers
            b2.addEventListener("contextmenu", function(e) {
               e.preventDefault();
                showContextMenu();
                positionMenu(e);
                clickedon=e.target.innerText
                console.log(clickedon)
            }, false);
            document.addEventListener("click",function(e){
             showContextMenu(false);
            });
            document.addEventListener("scroll",function(e){
             showContextMenu(false);
            });
         }
         else { // IE < 9
            document.attachEvent("oncontextmenu", function() {
               alert("You've tried to open context menu");
               window.event.returnValue = false;
            });
         }
         

        }
        //delete a goal that you have not added but are already there
        var delitem=document.getElementById("thisitem");
        delitem.addEventListener("click", function(e) {
         
          var stripped=clickedon.split(/☆(.+)/)[1];
          stripped=stripped.trim()
          for(var i in todayGoalsList){
            if(todayGoalsList[i]==stripped){
              todayGoalsList.splice(i,1);
                break;
            }
         }
         for(var child=tGoals.firstChild; child!==null; child=child.nextSibling) {
          console.log(child.innerHTML);
          if(child.innerHTML==clickedon){
            child.parentNode.removeChild(child)
          }
      }
        
         if(b2.innerHTML==clickedon){
         b2.parentNode.removeChild(b2)
         }
         if(b3.innerHTML==clickedon){
          b3.parentNode.removeChild(b3)
          }
         
         
          }, false);
        
        
      }
      days.appendChild(day);
      
    }
    // Next Month"s Days
    var extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      var day = document.createElement("li");
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
  //calendar coloring
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
//converts the numbered month to a string
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
//call to create calendar
function calendar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);
}
//Holds the events in a json format
var events = [
  {"Date": new Date(2020, 2, 7), "Title": "Study at 3:25pm."},
  {"Date": new Date(2020, 2, 18), "Title": "Test at 4pm", "Link": "https://google.com"},
  {"Date": new Date(2020, 2, 27), "Title": "Review Session1","Link": "https://google.com"},
  {"Date": new Date(2020, 3, 27), "Title": "Review Session2","Link": "https://google.com"},
  {"Date": new Date(2020, 3, 29), "Title": "Review Session3","Link": "https://google.com"},
  {"Date": new Date(2020, 3, 29), "Title": "Test at 5pm","Link": "https://google.com"},
  {"Date": new Date(2020, 3, 22), "Title": "Office Hours 12-2pm","Link": "https://google.com"},
  {"Date": new Date(2020, 3, 22), "Title": "Study Group at 3pm","Link": "https://google.com"},
  {"Date": new Date(2020, 3, 22), "Title": "Meet SD&D group 4pm","Link": "https://google.com"},
  {"Date": new Date(2020, 3, 22), "Title": "Quiz at 6pm","Link": "https://google.com"},
  
];
var todayGoalsList=["Finish DiffEq Problem Set","Submit Psych Essay","Go to the Gym","Start Algo P-set"];
var settings = {};
var element = document.getElementById("calendar");

calendar(element, events, settings);
//menu for the deleting goals
var cm=document.querySelector(".custom-cm");
function showContextMenu(show=true){
    cm.style.display=show ?"block" :"none";
}
//rightclick delete goal
var clickCoords;
var clickCoordsX;
var clickCoordsY;
var menuState = 0;
var menuWidth;
var menuHeight;
var menuPosition;
var menuPositionX;
var menuPositionY;
//position of context menu for delete
var windowWidth;
var windowHeight;
function getPosition(e) {
    var posx = 0;
    var posy = 0;

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
    y: posy
    }
}
//sets up where the delete menu should be
function positionMenu(e) {
    
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;

    clickCoordsY = clickCoords.y;


    menuWidth = cm.offsetWidth + 4;
    menuHeight = cm.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) {
        cm.style.left = windowWidth - menuWidth + "px";
    } else {
        cm.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) {
        cm.style.top = windowHeight - menuHeight + "px";
    } else {
        cm.style.top = clickCoordsY + "px";

    }

    }
