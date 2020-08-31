// Psuedocode
// Program loads 
    //shows today's date (likely as a p in the header)
    //populates <li> elements within a <ul> for every hour of a normal work day
    //each <li> element should contain a <p> tag with the current hour, a <span> with the description, and a <button> wiht a save icon as text
    //color of backgrounds should be set based on current time (grey for past, red for current, green for future) - check a change function likely
// when a description is clicked
    // <span> should change into a <textArea>
    // focus should be changed to <textArea>
    // text should be editable and remain editable
    // if another text area is selected, previous should ask if the user wants to save the text or not
// when the "save" button is clicked
    // text should be saved to array
    // array should be saved to local storage
    // focus should disappear
    // <textArea> should return to being a <span>
// when the hour changes
    // previous hour should become grey
    // current hour should become red
    // future hours should remain green

    //array to store for localStorage
    var events = [{}];

    //create timeblocks
    var createBlock = function(text, hours){
        //var currentTime = moment().format("H"); //store current hour

        descClass = changeBackground(hours);

        hoursNum = moment().set('hour', hours).format("hA")

        var blockLi = $("<li>")
            .addClass("time-block-list-item row");
        var blockTime = $("<p>")
            .addClass("hour col-1")
            .text(hoursNum);
        var blockDesc = $("<span>")
            .addClass("description col-10 " + descClass)
            .text(text);
        var blockSave = $("<button>")
            .addClass("saveBtn col-1")
            .text("Save");

        blockLi.append(blockTime, blockDesc, blockSave);

        $("#time-block-list").append(blockLi);
    };

    //loads when program is started
    var loadEvents = function() {
        events = JSON.parse(localStorage.getItem("events"));

        //determine how many hours in a day
        var hoursInDay = 9;
        
        //if nothing in localStorage, create a new object to track all events throughout the day
        if (!events){
            events = [{}];
        }

        //assign today's date to the <p> element in the header
        var todaysDate = moment().format("YYYYMMDD");
        var todaysDateV = moment().format('MMMM Do YYYY');
        var todaysDateP = $("#currentDay")
            .text(todaysDateV);
        
        //determine start time to day
        var hours = 8;

        //build time blocks based on number of hours in a day
        for (var i = 0; i <= hoursInDay; i++)
        {   
            var text = '';
            if (events[i] && todaysDate === events[i].date){
                text = events[i].text;
            }
            createBlock(text, hours);
            //hours = moment().set('hour', 9).add(i, 'hour').format("hA");
            hours++;
        }
        
        
    };

    //saves events in local storage
    var saveEvents = function(){
        localStorage.setItem("events", JSON.stringify(events));
    };

    //determines what happens when the "span" element is clicked
    $("#time-block-list").on("click", "span", function(){
        //get the "span" element's text
        var text = $(this)
            .text()
            .trim();
        
        //create <textarea> element to enter text to
        var textInput = $("<textarea>")
            .addClass("form-control col-10")
            .val(text);

        //get the task's position in the list of other li elements
        var index = $(this)
            .closest(".time-block-list-item")
            .index();
        
            //replace <span> with <textarea>
            $(this).replaceWith(textInput);
            textInput.trigger("focus");

         //handle what happens when editing is complete, or another element is selected
        $("#time-block-list").on("click", "button", function(){

            //get the textarea's current value/text
            var text = $(textInput)
                .val()
                .trim();

            //get the date
            var todaysDate = moment().format('YYYYMMDD');

            //store in array
            console.log(events);
            events[index].text = text;
            events[index].date = todaysDate;
            saveEvents();

            var descClass = changeBackground(index + 8);

            //create new <span> element
            var blockDesc = $("<span>")
                .addClass("description col-10 " + descClass)
                .text(text);
            
            //replace <textarea> with <span> element
            $(textInput).replaceWith(blockDesc);

        });
    });

    //determine what color the background of each event time should be
    var changeBackground = function(hours){
        var currentTime = moment().format("H"); //store current hour
        if (hours < currentTime){
            var descClass = "past";
        }
        else if(hours === currentTime){
            var descClass = "present";
        }
        else if(hours > currentTime){
            var descClass = "future"
        }

        return descClass;
    };
    

    //eventHandlers for program to function
    loadEvents(); //loads the list of events and interactive elements