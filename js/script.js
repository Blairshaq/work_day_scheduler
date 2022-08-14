
//this function is called when Any time block div is clicked
function showEventInput(i){
    
    $('#eventdiv'+i+'').show()
    $('#event'+i+'').show() //text area is shown
    $('#event'+i+'').focus()
    $('#timeblock'+i+'').hide() //timeblock div is hidden

    //getting all the events persisted in local storage
    var allevents = JSON.parse(window.localStorage.getItem('allevents'))

    //populating textarea with previously saved value if any exists
    $('#event'+i+'').val(allevents[i].value)
}

//this function is called when any save button is clicked
function saveEvent(i){
    
    var eventValue = $('#event'+i+'').val() //getting value from current text area 
    
    //getting all the events persisted in local storage
    var allevents = JSON.parse(window.localStorage.getItem('allevents'))

    //setting event value to relevant time block in local storage
    allevents[i].value = eventValue

    //persisting event value in local storage and stringfying it
    window.localStorage.setItem('allevents', JSON.stringify(allevents))

    //again getting allevents from local storage to get recently saved event
    allevents = JSON.parse(window.localStorage.getItem('allevents'))

    //populating all the time block divs with event values against each hour
    for (var i = 0; i < 9; i++) {
        $("#timeblock"+i+"").text(allevents[i].value)
        $('#eventdiv' + i + '').hide()
        $('#event' + i + '').hide()
        $('#timeblock' + i + '').show()
    }

    
} //end function

$('document').ready(() => {
    
    var currentDate = new Date() //current date
    var formatedDayMonth = moment(currentDate).format("dddd , MMMM Do")    //formatting complete day name and date 
    $('#currentDay').text(formatedDayMonth) // setting to screen

    /* an array of objects that contain time, its title for printing and class, which shall be changed 
    if present or future and defualt class is past */
    var timeblocks = [
        {
            time: 9,
            timeTitle: "9AM",
            class: "past"
        },
        {
            time: 10,
            timeTitle: "10AM",
            class: "past"
        },
        {
            time: 11,
            timeTitle: "11AM",
            class: "past"
        },
        {
            time: 12,
            timeTitle: "12PM",
            class: "past"
        },
        {
            time: 13,
            timeTitle: "1PM",
            class: "past"
        },
        {
            time: 14,
            timeTitle: "2PM",
            class: "past"
        },
        {
            time: 15,
            timeTitle: "3PM",
            class: "past"
        },
        {
            time: 16,
            timeTitle: "4PM",
            class: "past"
        },
        {
            time: 17,
            timeTitle: "5PM",
            class: "past"
        },

    ]

    //getting current hour to determin which time blocks are past, present or future from current time
    var currentHour = moment().hours()

    for(var i = 0; i< timeblocks.length; i++){
        if(timeblocks[i].time == currentHour){
            //if time is present then change class to present of each timeblock object
            timeblocks[i].class = "present"
        } else if(timeblocks[i].time > currentHour){
            //if time is future then change class to future of each timeblock object
            timeblocks[i].class = "future"
        }
    }

    /* Creating the ui with divs that contain time title, empty timeblock divs, hidden text area
    which shows up on every click and button to save the event value
    */
    for(var i = 0; i< timeblocks.length; i++){
        $('#timeblocks').append(
            '<div id="' + i +'" class="row">'+
            '<div class="col-md-2 hour time-block">'+timeblocks[i].timeTitle+'</div>'+
                '<div id="timeblock'+i+'" class="row col-md-8 '+timeblocks[i].class+'" onclick="showEventInput('+i+')"></div>'+

            '<div id="eventdiv'+i+'" class="row col-md-8 '+timeblocks[i].class+'" ><textarea class="textarea" id="event'+i+'" rows="4" cols="50" ></textarea></div>'+
                '<div class="col-md-2"><button onclick="saveEvent('+i+')" class="btn  saveBtn"><i class="fas fa-save"></i></button></div>'+
            '</div>'
        )
    } //end for loop

    //hiding the event divs and text areas which are then shown on every click
    for(var i = 0; i< timeblocks.length; i++){
        $('#eventdiv'+i+'').hide()
    }

    //creating an empty array
    let allEvents = []  

    //creating initial event objects that shall contain the event value
    for (var i = 0; i < 9; i++) {
        let newEvent = {
            timeid: i,
            value: ""
        }
        allEvents.push(newEvent)
    }

if(!window.localStorage.getItem('allevents')){
    //on first time page load all the empty events shall be created in local storage if not already existed
    window.localStorage.setItem('allevents', JSON.stringify(allEvents))
}else{
    //On page refresh all the previous saved or empty events shall be got from local storage
   var allevents = JSON.parse(window.localStorage.getItem('allevents'))

   //then shall be printed in appropriate time block div
   //So on each page refresh no data shall be lost
    for (var i = 0; i < 9; i++) {
        $("#timeblock"+i+"").text(allevents[i].value)
    }
}

    


})