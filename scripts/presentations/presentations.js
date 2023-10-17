const link = "https://presentations-api.frankanator433.repl.co/"

$.get(link + "getNextDays", (dateData, status) => {
    var flex = document.getElementById("upc-flex");
    for (i in dateData) {
        var item = document.createElement("span");
        item.className = "pres-item";
        flex.appendChild(item);

        var banner = document.createElement("section");
        banner.className = "col-ban";
        item.appendChild(banner);
        var title = document.createElement("h1");
        title.innerHTML = dateData[i];
        banner.appendChild(title);

        var desc = document.createElement("p");
        desc.className = "pres-desc"
        desc.id = "desc-"+dateData[i]
        item.appendChild(desc);
        $.ajax({
            type: "GET",
            url: link + "requestDayInfo",
            data: {
                day:dateData[i]
            },
            async: false,
            success: function(meetingData) {
                console.log(meetingData);
                desc.innerHTML = `
<u>Time Slot 1:</u>
<br>
Topic: `+ meetingData[0][0] + `
<br><br>
Presenters: `+meetingData[0][1]+`
<br><br>
<u>Time Slot 2:</u>
<br>
Topic: `+meetingData[1][0] + `
<br><br>
Presenters: `+ meetingData[1][1]
               ;
            }
        });

    }
});