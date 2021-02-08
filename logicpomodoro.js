var inter;
var pause = false;
var myNodelist = document.getElementsByClassName("li");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        console.log(div);
        var elem = document.getElementById(div.id);
        elem.parentNode.removeChild(elem);
    }
}

var list = document.querySelector('.myUL');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function newElement() {
    var li = document.createElement("li");
    var lastid = document.getElementById("myUL").lastChild;
    var c = lastid.id == undefined ? 0 : lastid.id;
    li.id = c * 1 + 1;
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    li.classList.toggle("li");
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
    var cantpom = document.getElementById("pom").value;
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    var numpom = document.createElement("span");
    var txtnumpom = document.createTextNode("0/" + cantpom);
    numpom.appendChild(txtnumpom);
    numpom.className = "count";
    li.appendChild(numpom);
    span.appendChild(txt);
    li.appendChild(span);
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            console.log(close[i]);
            var div = this.parentElement;
            var elem = document.getElementById(div.id);
            elem.parentNode.removeChild(elem);
        }
    }
}

function clickmodal() {
    document.getElementById("bttimer").innerText = "Start";
    var valpomodoro = document.getElementById("valPomodoro").value;
    var valShortBreak = document.getElementById("valShortBreak").value;
    var valLongBreak = document.getElementById("valLongBreak").value;
    if (valpomodoro < 0 || valShortBreak < 0 || valLongBreak < 0) {
        var ele = document.getElementById("alertform");
        ele.innerHTML = '<div class="alert alert-danger" role="alert">Tiempo especificado no valido</div>';
        setTimeout(() => {
            ele.innerHTML = "";
        }, 3000);

    } else {
        document.getElementById("timer-pomodoro").innerText = valpomodoro < 10 ? "0" + valpomodoro + " : 00" : valpomodoro + " : 00";
        document.getElementById("timer-shortbreak").innerText = valShortBreak < 10 ? "0" + valShortBreak + " : 00" : valShortBreak + " : 00";
        document.getElementById("timer-longbreak").innerText = valLongBreak < 10 ? "0" + valLongBreak + " : 00" : valLongBreak + " : 00";
        jQuery('#exampleModal').modal('hide');
    }
}

function timer() {
    var element;
    var stopOrStart;
    if (document.querySelector('#pills-home').classList.contains("active")) {

        element = "timer-pomodoro";
        var valpomodoro = document.getElementById("valPomodoro").value;
        stopOrStart = valpomodoro < 10 ? "0" + valpomodoro + " : 00" : valpomodoro + " : 00";
    } else if (document.querySelector('#pills-profile').classList.contains("active")) {


        element = "timer-shortbreak";
        var valShortBreak = document.getElementById("valShortBreak").value;
        stopOrStart = valShortBreak < 10 ? "0" + valShortBreak + " : 00" : valShortBreak + " : 00";
    } else if (document.querySelector('#pills-contact').classList.contains("active")) {


        element = "timer-longbreak";
        var valLongBreak = document.getElementById("valLongBreak").value;
        stopOrStart = valLongBreak < 10 ? "0" + valLongBreak + " : 00" : valLongBreak + " : 00";
    }
    var times = document.getElementById(element).innerHTML.split(" : ");
    var minute = times[0];
    var sec = times[1];
    console.log(minute + sec * 1);
    var prinm;
    var prins;
    var total = times[0] + times[1] * 1;
    console.log(total);
    var lis = document.getElementsByClassName("li");
    stopOrStart = stopOrStart.split(" : ");
    console.log(total != stopOrStart[0] + stopOrStart[1] * 1);
    if (total != stopOrStart[0] + stopOrStart[1] * 1 && pause == false) {
        clearInterval(inter);
        pause = true;
        document.getElementById("bttimer").innerText = "Start";
    } else {
        document.getElementById("bttimer").innerText = "Pause";
        pause = false;
        if (lis.length == 0 && element == "timer-pomodoro") {
            var ele = document.getElementById("alert");
            ele.innerHTML = '<div class="alert alert-danger" role="alert"> Debes añadir una tarea para empezar</div>';
            setTimeout(() => {
                ele.innerHTML = "";
            }, 3000);
        } else {
            if (element == "timer-pomodoro") {
                var item = document.createElement('span');
                item.innerHTML = '<div class="spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>';
                lis[0].insertBefore(item, lis[0].lastChild);
            }
            var times = document.getElementById(element).innerHTML.split(" : ");
            var minute = times[0];
            var sec = times[1];
            console.log(minute + sec);
            var prinm;
            var prins;
            inter = setInterval(function() {




                if (sec == 00) {
                    minute--;
                    sec = 60;
                    if (minute == 00) {}
                }
                sec--;
                prinm = minute < 10 && ("" + minute).length < 2 ? "0" + minute : minute;
                prins = sec < 10 && ("" + sec).length < 2 ? "0" + sec : sec;
                document.getElementById(element).innerHTML = prinm + " : " + prins;

                if (minute == 00 && sec == 00) {
                    clearInterval(inter);
                    window.speechSynthesis.speak(new SpeechSynthesisUtterance('El tiempo ha finalizado'));
                    clickmodal();
                    if (element == "timer-pomodoro") {

                        console.log(lis[0].childNodes);
                        var count = lis[0].childNodes[1].innerText.split("/");
                        console.log(count[0]);
                        console.log(count[1]);
                        lis[0].removeChild(lis[0].childNodes[1]);
                        document.querySelector('#pills-home').classList.remove("active");
                        document.querySelector('#pills-home').classList.remove("show");
                        document.querySelector('#pills-home-tab').classList.remove("active");
                        document.querySelector('#pills-profile-tab').classList.toggle("active");
                        document.querySelector('#pills-profile').classList.toggle("active");
                        document.querySelector('#pills-profile').classList.toggle("show");
                        if (count[0] == count[1]) {
                            lis[0].classList.toggle('checked');
                        } else {
                            lis[0].childNodes[1].innerHTML = count[0] * 1 + 1 + "/" + count[1];
                            lis[0].childNodes[1].classList.toggle("count");
                            var count = lis[0].childNodes[1].innerText.split("/");
                            if (count[0] == count[1]) {
                                lis[0].classList.toggle('checked');
                            }

                        }
                    }
                }

            }, 1000);

        }
    }
}