    //array to store for localStorage
    var events = {};
    for (var i = 0; i < 9; i++)
    {
        events[i] = {};
    }

    //create timeblocks
    var createBlock = function(text, hours){
        //var currentTime = moment().format("H"); //store current hour

        //determine what color the background will be based on current hour
        descClass = changeBackground(hours);

        //takes value hours and formats to include AM/PM
        hoursNum = moment().set('hour', hours).format("hA")

        //create elements that will automatically be added to the page
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
        var saveIcon = $("<i>")
            .addClass("fas fa-save");

        blockSave.append(saveIcon);

        //add elements to "li" element
        blockLi.append(blockTime, blockDesc, blockSave);

        //add elements to page
        $("#time-block-list").append(blockLi);
    };

    //loads when program is started
    var loadEvents = function() {
        //assign today's date to the <p> element in the header
        var todaysDate = moment().format("YYYYMMDD");
        var todaysDateV = moment().format('MMMM Do YYYY');
        var todaysDateP = $("#currentDay")
            .text(todaysDateV);

        events = JSON.parse(localStorage.getItem("events"));

        //determine how many hours in a day
        var hoursInDay = 9;
        
        //if nothing in localStorage, create a new object to track all events throughout the day
        if (!events){
            events = {};
            for (var i = 0; i < 9; i++)
            {
                events[i] = {};
            }
        }

        
        
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
            events[index].text = text;
            events[index].date = todaysDate;
            saveEvents();

            //change background of task based on current hour. 8 is added to index to reflect an accurate time
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
        else if(hours == currentTime){
            var descClass = "present";
        }
        else if(hours > currentTime){
            var descClass = "future"
        }

        return descClass;
    };
    
    loadEvents(); //loads the list of events and interactive elements