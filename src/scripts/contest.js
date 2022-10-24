const questions = [
    "Given the number of sides of a shape, determine what shape it is. Assume that the sides and interior angles of the shape are all equal to each other.",
    "Given an array of sorted integers, find the smallest index that a given value appears. If value is not found in the array, return -1 (Must be done in logN time)",
    "Given a string, output the number of non-repeating characters (must be solved in O(N) time)",
    "Given a list of integers, repeatedly output the sum of all integers within a given interval (must be solved in O(N) time)",
    "Given prerequisites for travelling to certain cities, see if it is possible for every city to be visited.",
    "Several intervals in the range [0,300] are given. Find where the most intervals overlap. If there are several numbers in the interval, output the smallest."
]

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function onStart() {
    const elem = document.getElementById('start');
    elem.remove();
    const elem2 = document.getElementById('luck');
    elem2.style.textAlign = "center"
    elem2.innerHTML = "Scroll down...<br>|<br>|<br>V"



    for (let i = 0; i < 6; i++) {
        let node = document.createElement("p", tagName = "p" + i + "Text");
        node.innerText = questions[i];
        node.id = "p" + i + "Text"
        document.body.appendChild(node)

        let input = document.createElement("input", tagName = "p" + i + "Lang");
        input.placeholder = "Language"
        input.setAttribute("type", "text");
        input.id = "p" + i + "Lang"
        document.body.appendChild(input);


        $("#" + "p" + i + "Lang").on(
            "change paste input", function() {
                $.get("https://grader.stogacs.club/getLanguages", function(data, status) {
                    var result = [];

                    for (var j in data) {
                        result.push(data[j]);
                    }

                    if (result.includes($("#" + "p" + i + "Lang").val())) {
                        input.style.color = "#00BB1F";
                    } else {
                        input.style.color = "#C41717";
                    }
                });
            });

        let submitText = document.createElement("p", tagname="p"+i+"SubmitText");
        submitText.innerHTML = "Code Submit:";
        submitText.id = "p"+i+"SubmitText";
        document.body.appendChild(submitText);

        let submit = document.createElement("input", tagName="p"+i+"Upload")
        submit.setAttribute("type", "file")
        submit.id = "p" + i + "Upload"
        submit.className = "fileSubmit"
        document.body.appendChild(submit)

        let sbDiv = document.createElement("div");
        
        let submitButton = document.createElement("button", tagName="p"+i+"Submit");
        submitButton.innerHTML = "Submit Code for Problem #" + (i+1)
        submitButton.id = "p"+i+"Submit"
        submitButton.className = "submitButton"

        let results = document.createElement("p", tagname="p"+i+"results")
        results.innerHTML = "Test case results will show up here!"
        results.id = "p" + i +"results"
        results.className = "caseResults"
        sbDiv.appendChild(results)

        submitButton.onclick = function() {
            let reader = new FileReader();
            
            reader.readAsText(document.getElementById("p" + i + "Upload").files[0]);
            reader.onload = function(e) {
            let code = reader.result;

            let lang = $("#" + "p" + i + "Lang").val()

            document.getElementById("p" + i +"results").innerHTML = "Testing..."


            $.ajax({
                url:"https://grader.stogacs.club/submit",
                type:"POST",
                data:{"lang":lang, "code":code, "problem":i+1},
                headers:{},
                dataType:"json",
                success: function(data) {
                    let resultText = "Test cases:"
                    for (var j in data) {
                        if (data[j]) {
                            resultText = resultText + "✅"
                        } else {
                            resultText = resultText + "❌"
                        }
                    }
                    document.getElementById("p" + i +"results").innerHTML = resultText
                }
            }
            )
            }     
        }
        
        sbDiv.appendChild(submitButton)
        



        document.body.appendChild(sbDiv)

    }
}

function onSubmit() {
    
}

