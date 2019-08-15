  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDzHhWDE-Mklls_8PxrQDoyX3yhLq7_Nx0",
    authDomain: "train-hw-ed871.firebaseapp.com",
    databaseURL: "https://train-hw-ed871.firebaseio.com",
    projectId: "train-hw-ed871",
    storageBucket: "",
    messagingSenderId: "327443284521",
    appId: "1:327443284521:web:36f911153e22c42b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//A variable to reference the database.
var database = firebase.database();

$("#coreSubmit").on("click",function(event){
  event.preventDefault();

  var rfmcsDestination = $("#destinationText").val().trim();
  var rfmcsName = $("#nameText").val().trim();
  var rfmcsStart = $("#firstCarriageText").val().trim();
  var rfmcsFrequency = $("#minutesText").val().trim();

var newCarriage = {
    destinaton: rfmcsDestination ,
    name: rfmcsName, 
    start: rfmcsStart, 
    frequency: rfmcsFrequency, 
}

$("#destinationText").val("")
$("#nameText").val("")
$("#firstCarriageText").val("")
$("#minutesText").val("")

if (rfmcsDestination == "" || rfmcsName == "" || rfmcsStart < 100 || rfmcsFrequency == "" ){
    console.log("Did Not Push")
}
else {
    console.log("Pushes")
database.ref().push(newCarriage)
}
})

database.ref().on("child_added",function(childSnapshot){

    var destinaton = childSnapshot.val().destinaton
    var name = childSnapshot.val().name
    var start = childSnapshot.val().start
    var frequency = childSnapshot.val().frequency

    var firstRunTime = moment(start, "hh:mm").subtract(1, "years")

    var difference = moment().diff(moment(firstRunTime), "minutes")

    var remainder = difference % frequency

    var minutesUntillNext = frequency - remainder

    var nextTrain = moment().add(minutesUntillNext, "minutes")

    
    var newCarriage = $("<tr>").append(
        $("<td>").text(destinaton),
        $("<td>").text(name),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(minutesUntillNext),
    )

    $("#coreTable > tbody").append(newCarriage)

})  
