const url_endpoint = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

window.onload = getJqueryAjax;

function getXHR() {
    let XHR = new XMLHttpRequest();

    XHR.onreadystatechange = () => {
        if (XHR.status == 200 && XHR.readyState == 4) {
            let data = JSON.parse(XHR.responseText)[0];
            $("#quote").text(data);
        }
    }

    XHR.open("GET", url_endpoint);
    XHR.send();
}


function getFetch() {
    function handleError(request) {
        if(!request.ok) {
            throw Error(request.status);
        }
        return request
    }

    fetch(url_endpoint)
        .then(handleError)
        .then((request) => {
            return request.json();
        })
        .then((data)=> {
            $("#quote").text(data[0]);
        })
        .catch((err)=> {
            console.log("Error: " + err);
        });
}

function getJqueryAjax() {
    $.ajax({
        method: "get",
        url: url_endpoint,
        dataType: "json"
    })
    .done((data) => {
        $("#quote").text(data[0]);
    })
    .fail((err)=> {
        console.log("Something went wrong: " + err);
    })
}

function getAxios() {
    axios.get(url_endpoint)
        .then((res) => {
            $("#quote").text(res.data[0]);
        })
        .catch((err)=> {
            console.log("something went wrong: " + err);
        })
}

$("#xhr").on("click", getXHR);

$("#fetch").on("click", getFetch);

$("#jquery").on("click", getJqueryAjax);

$("#axios").on("click", getAxios);