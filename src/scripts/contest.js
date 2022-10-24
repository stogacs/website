const questions = [
    'Given the number of sides of a shape, determine what shape it is (Triangle, square, pentagon, hexagon, heptagon, octagon, etc). Assume that the sides and interior angles of the shape are all equal to each other.<br><br><br>Input will consist of one integer, the number of sides N, in the range 3 <= N <= 10<br><br><br>Sample input: 9 Sample output: Nonagan',
    'Given an array of N (1 <= N <= 100000) sorted integers (each sorted integer is in range from [1,1000] inclusive), find the smallest index that a given value, T, appears. If the value is not found in the array, return -1.<br>You must write an O(Log N) solution for this. The officers will check your solution to make sure it runs in O(Log N). Any solution that runs in O(N) or higher will be disregarded.<br><br><br>The first line of input contains N and T (T is an integer, not necessarily positive). For each 1 <= i <= N, the ith line after the first contains the element at index i-1 of the array.<br><br><br>Sample input:      Sample output:<br><br><br>6 1                0<br>1<br>1<br>3<br>4<br>5<br>6',
    'Given a string of size N (1 <= N <= 100000) that contains only characters in the english alphabet (all lower cased), find the number of non-repeating characters (a character is non-repeating if it is only found once in the string). Your solution must be in O(N). The officers will check your solution to make sure it runs in O(N). Any solution that runs in O(N^2) or higher will be disregarded.<br><br><br><br><br>The first line of input contains the string.<br><br><br>Sample Input:  Sample output:<br><br><br>Hello          3',
    'Given an array of integers (not sorted) of size N (1 <= N <= 100000), you are given K intervals (1 <= K <= 100000), each containing two distinct numbers, A and B (A < B), that are in the range of [0,N-1] inclusive.<br>Find the sum of all numbers within each interval (including the endpoints) and print them out to the console. Write a solution that runs in O(N) time.<br><br><br>The first line of input contains N and K. For each 1 <= i <= N, the ith line after the first contains the element at index i-1 of the array. The next K lines after that each contain A and B.<br><br><br>Sample input:    Sample output:<br><br><br>3 1              6 (From index 0 to index 2, including the endpoints index 0 and index 2, so 1 + 2 + 3)<br>1<br>2<br>3<br>0 2',
    'At a school, you are given K (1 <= K <= 7) prerequisities, where each prerequisite contains two integers representing classes, A and B (A =/ B, 0 <= A,B <= 7). A prerequisite [A,B] means that in order to take class B, you first must take class A. One class may have multiple classes that need to have been taken beforehand.<br>Given all the K prerequisites, is it possible for you to take all the classes listed in the prequisites? Return either "False" or "True" as your answer.<br><br><br>The first line of input contains K. The next K lines each contain a prerequisite, A and B.<br><br><br>Sample input:         Sample output:<br><br><br>3                     True (in order to take course 2, 3, and 4, one must take course 1. Course 1 has no prerequisites, so when one takes course 1, they can then take all 3 other courses)<br>1 2<br>1 3<br>1 4<br><br><br>Sample input:         Sample output:<br><br><br>2                     False (It is impossible to take course 1 because you need to have tave taken course 2, which requires course 1 to be taken)<br><br><br>1 2<br>2 1',
    'In a 1-Dimensional array of size 301, you are given K intervals (1 <= K <= 100000) of two integers, A and B (0 <= A,B <= 300, A < B).<br>Each interval covers from index A to index B-1 inclusive. For example, the interval [0,3] covers the indices 0, 1, and 2 of the 1-dimensional array, but NOT index 3.<br>Find the most amount of intervals that will overlap (meaning they occupy the same index in the array). You must write a solution in O(N) time. The officers will check your solution to make sure it runs in O(N). Any solution that runs in O(N^2) or higher will be disregarded.<br><br><br>Sample input:         Sample output:<br><br><br>2                     2 (Both intervals overlap at index 155, 156, and 157)<br>58 281<br>155 157<br>'
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

