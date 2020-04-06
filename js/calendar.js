function createCalendar(e,t,a){function n(){var a=document.createElement("div");a.className+="cld-sidebar";var n=document.createElement("ul");n.className+="cld-monthList";for(var l=0;l<s.length-3;l++){var i=document.createElement("li");i.className+="cld-month";var d=l-(4-e.Selected.Month);if(0>d?d+=12:d>11&&(d-=12),0==l)i.className+=" cld-rwd cld-nav",i.addEventListener("click",function(){"function"==typeof e.Options.ModelChange?e.Model=e.Options.ModelChange():e.Model=e.Options.ModelChange,createCalendar(e,t,-1)}),i.innerHTML+='<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';else if(l==s.length-4)i.className+=" cld-fwd cld-nav",i.addEventListener("click",function(){"function"==typeof e.Options.ModelChange?e.Model=e.Options.ModelChange():e.Model=e.Options.ModelChange,createCalendar(e,t,1)}),i.innerHTML+='<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';else if(4>l?i.className+=" cld-pre":l>4?i.className+=" cld-post":i.className+=" cld-curr",function(){var a=l-4;i.addEventListener("click",function(){"function"==typeof e.Options.ModelChange?e.Model=e.Options.ModelChange():e.Model=e.Options.ModelChange,createCalendar(e,t,a)}),i.setAttribute("style","opacity:"+(1-Math.abs(a)/4)),i.innerHTML+=s[d].substr(0,3)}(),0==d){var o=document.createElement("li");o.className+="cld-year",5>l?o.innerHTML+=e.Selected.Year:o.innerHTML+=e.Selected.Year+1,n.appendChild(o)}n.appendChild(i)}a.appendChild(n),e.Options.NavLocation?(document.getElementById(e.Options.NavLocation).innerHTML="",document.getElementById(e.Options.NavLocation).appendChild(a)):t.appendChild(a)}function l(){var a=document.createElement("div");if(a.className+="cld-datetime",e.Options.NavShow&&!e.Options.NavVertical){var n=document.createElement("div");n.className+=" cld-rwd cld-nav",n.addEventListener("click",function(){createCalendar(e,t,-1)}),n.innerHTML='<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>',a.appendChild(n)}var l=document.createElement("div");if(l.className+=" today",l.innerHTML=s[e.Selected.Month]+", "+e.Selected.Year,a.appendChild(l),e.Options.NavShow&&!e.Options.NavVertical){var i=document.createElement("div");i.className+=" cld-fwd cld-nav",i.addEventListener("click",function(){createCalendar(e,t,1)}),i.innerHTML='<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>',a.appendChild(i)}e.Options.DatetimeLocation?(document.getElementById(e.Options.DatetimeLocation).innerHTML="",document.getElementById(e.Options.DatetimeLocation).appendChild(a)):r.appendChild(a)}function i(){var e=document.createElement("ul");e.className="cld-labels";for(var t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=0;a<t.length;a++){var n=document.createElement("li");n.className+="cld-label",n.innerHTML=t[a],e.appendChild(n)}r.appendChild(e)}function d(){function t(e){var t=document.createElement("p");return t.className+="cld-number",t.innerHTML+=e,t}var a=document.createElement("ul");a.className+="cld-days";for(var n=0;n<e.Selected.FirstDay;n++){var l=document.createElement("li");l.className+="cld-day prevMonth";for(var i=n%7,d=0;d<e.Options.DisabledDays.length;d++)i==e.Options.DisabledDays[d]&&(l.className+=" disableDay");var o=t(e.Prev.Days-e.Selected.FirstDay+(n+1));l.appendChild(o),a.appendChild(l)}for(var n=0;n<e.Selected.Days;n++){var l=document.createElement("li");l.className+="cld-day currMonth";for(var i=(n+e.Selected.FirstDay)%7,d=0;d<e.Options.DisabledDays.length;d++)i==e.Options.DisabledDays[d]&&(l.className+=" disableDay");for(var o=t(n+1),c=0;c<e.Model.length;c++){var s=e.Model[c].Date,p=new Date(e.Selected.Year,e.Selected.Month,n+1);if(s.getTime()==p.getTime()){o.className+=" eventday";var h=document.createElement("span");if(h.className+="cld-title","function"==typeof e.Model[c].Link||e.Options.EventClick){var v=document.createElement("a");if(v.setAttribute("href","#"),v.innerHTML+=e.Model[c].Title,e.Options.EventClick){var m=e.Model[c].Link;"string"!=typeof e.Model[c].Link?(v.addEventListener("click",e.Options.EventClick.bind.apply(e.Options.EventClick,[null].concat(m))),e.Options.EventTargetWholeDay&&(l.className+=" clickable",l.addEventListener("click",e.Options.EventClick.bind.apply(e.Options.EventClick,[null].concat(m))))):(v.addEventListener("click",e.Options.EventClick.bind(null,m)),e.Options.EventTargetWholeDay&&(l.className+=" clickable",l.addEventListener("click",e.Options.EventClick.bind(null,m))))}else v.addEventListener("click",e.Model[c].Link),e.Options.EventTargetWholeDay&&(l.className+=" clickable",l.addEventListener("click",e.Model[c].Link));h.appendChild(v)}else h.innerHTML+='<a href="'+e.Model[c].Link+'">'+e.Model[c].Title+"</a>";o.appendChild(h)}}l.appendChild(o),n+1==e.Today.getDate()&&e.Selected.Month==e.Today.Month&&e.Selected.Year==e.Today.Year&&(l.className+=" today"),a.appendChild(l)}var y=13;a.children.length>35?y=6:a.children.length<29&&(y=20);for(var n=0;n<y-e.Selected.LastDay;n++){var l=document.createElement("li");l.className+="cld-day nextMonth";for(var i=(n+e.Selected.LastDay+1)%7,d=0;d<e.Options.DisabledDays.length;d++)i==e.Options.DisabledDays[d]&&(l.className+=" disableDay");var o=t(n+1);l.appendChild(o),a.appendChild(l)}r.appendChild(a)}if("undefined"!=typeof a){var o=new Date(e.Selected.Year,e.Selected.Month+a,1);e=new Calendar(e.Model,e.Options,o),t.innerHTML=""}else for(var c in e.Options)"function"!=typeof e.Options[c]&&"object"!=typeof e.Options[c]&&e.Options[c]?t.className+=" "+c+"-"+e.Options[c]:0;var s=["January","February","March","April","May","June","July","August","September","October","November","December"],r=document.createElement("div");r.className+="cld-main",e.Options.Color&&(r.innerHTML+="<style>.cld-main{color:"+e.Options.Color+";}</style>"),e.Options.LinkColor&&(r.innerHTML+="<style>.cld-title a{color:"+e.Options.LinkColor+";}</style>"),t.appendChild(r),e.Options.NavShow&&e.Options.NavVertical&&n(),e.Options.DateTimeShow&&l(),i(),d()}function caleandar(e,t,a){var n=new Calendar(t,a);createCalendar(n,e)}var Calendar=function(e,t,a){this.Options={Color:"",LinkColor:"",NavShow:!0,NavVertical:!1,NavLocation:"",DateTimeShow:!0,DateTimeFormat:"mmm, yyyy",DatetimeLocation:"",EventClick:"",EventTargetWholeDay:!1,DisabledDays:[],ModelChange:e};for(var n in t)this.Options[n]="string"==typeof t[n]?t[n].toLowerCase():t[n];e?this.Model=e:this.Model={},this.Today=new Date,this.Selected=this.Today,this.Today.Month=this.Today.getMonth(),this.Today.Year=this.Today.getFullYear(),a&&(this.Selected=a),this.Selected.Month=this.Selected.getMonth(),this.Selected.Year=this.Selected.getFullYear(),this.Selected.Days=new Date(this.Selected.Year,this.Selected.Month+1,0).getDate(),this.Selected.FirstDay=new Date(this.Selected.Year,this.Selected.Month,1).getDay(),this.Selected.LastDay=new Date(this.Selected.Year,this.Selected.Month+1,0).getDay(),this.Prev=new Date(this.Selected.Year,this.Selected.Month-1,1),0==this.Selected.Month&&(this.Prev=new Date(this.Selected.Year-1,11,1)),this.Prev.Days=new Date(this.Prev.getFullYear(),this.Prev.getMonth()+1,0).getDate()};
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

function caleandar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);
}
var events = [
  {'Date': new Date(2020, 2, 7), 'Title': 'Study at 3:25pm.'},
  {'Date': new Date(2020, 2, 18), 'Title': 'Test at 4pm', 'Link': 'https://google.com'},
  {'Date': new Date(2020, 2, 27), 'Title': 'Review Session'},
  {'Date': new Date(2020, 3, 27), 'Title': 'Review Session'},
];
var settings = {};
var element = document.getElementById('caleandar');

caleandar(element, events, settings);
