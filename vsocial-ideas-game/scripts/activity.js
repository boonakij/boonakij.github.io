//ToDo
//Autosave answers?
//Finish Button
  //Green outline
  //Correcting / locking answers
  //Fixing new answers. Next and submit answers


$( document ).ready(function() {
  let correct_answers = ["211111113311", "211111111111", "332332232111", "111111111111", "332232233321", "111111111111"];
  let submit = false;
  var maxClips = 6;
  var currentClip = 1;
  let answers = new Array();
  var titles = ["Scenario 1 - Clip 1", "Scenario 1 - Clip 2",
                "Scenario 2 - Clip 1", "Scenario 2 - Clip 2",
                "Scenario 3 - Clip 1", "Scenario 3 - Clip 2"]

  function clearAnswers() {
    $("input").prop('checked', false);
  }

  function allAnswered() {
    var allAnswered = true;
    $("form").each(function() {
        if ($(this).serialize() == "") {
          allAnswered = false;
        }
    });
    var arr = [];
    $('input[type="radio"]:checked').each(function(){
       arr.push($(this).val());
    });
    $(".debug").html(arr);
    return allAnswered;
  }

  $(".clear-button").click(function() {
    clearAnswers();
  });

  $(".next-button").click(function() {
    if (currentClip < maxClips) {
      currentClip += 1;
      $(".previous-clip-number").html(currentClip - 1);
      $(".clip-number").html(currentClip);
      $(".clip-name").html(titles[currentClip - 1]);
      $(".next-clip-number").html(currentClip + 1);
      $(".back-button").show();
      clearAnswers();
      $(".next-button").hide();

      answers[currentClip-2] = ($(document.getElementsByClassName('debug')).html());

      if(typeof answers[currentClip-1] != "undefined"){
        for(i = 0; i < document.getElementsByClassName("radio-group").length; i++){
          document.getElementById("q" + (i+1).toString() + "-option-" + answers[currentClip-1][i].toString()).click()
        }
      }

      if (currentClip == maxClips && allAnswered()) {
        $(".submit-button").show();
        $(".next-button").hide();
      }
    }

    if(submit){
      UpdateAnswers(CheckAnswers(currentClip-1, answers));
    }
  });

  $(".back-button").click(function() {
    if (currentClip > 1) {
      currentClip -= 1;
      $(".previous-clip-number").html(currentClip - 1);
      $(".clip-number").html(currentClip);
      $(".clip-name").html(titles[currentClip - 1]);
      $(".next-clip-number").html(currentClip + 1);
      if (currentClip == 1) {
        $(".back-button").hide();
      }
      if(submit && currentClip != maxClips){
        $(".next-button").show();
      }

      for(i = 0; i < document.getElementsByClassName("radio-group").length; i++){
        document.getElementById("q" + (i+1).toString() + "-option-" + answers[currentClip-1][i].toString()).click()
      }
      $(".submit-button").hide();
    }

    if(submit){UpdateAnswers(CheckAnswers(currentClip-1, answers), currentClip-1);}
});

  $('input').on('change', function() {
    if (allAnswered()) {
      if (currentClip < maxClips) {
        $(".next-button").show();
      }
      else {
        $(".submit-button").show();
      }
    }
  });

  $(".submit-button").click(function(){
    submit = true;
    answers[currentClip-1] = ($(document.getElementsByClassName('debug')).html());
    UpdateAnswers(CheckAnswers(currentClip-1, answers), currentClip-1);
  });

  let CheckAnswers = function(index){
    let results = "";
    for(let i = 0; i < correct_answers[index].length; i++){
      if(correct_answers[index][i] == answers[index][i]){results += "1";}
      else{results += "0";}
    }
    return results;
  };

  let UpdateAnswers = function(results, index){
    for(let i = 0; i < document.getElementsByClassName("checkmark").length; i++){$(document.getElementsByClassName("checkmark")[i]).hide()}
    for(let i = 0; i < document.getElementsByClassName("cross").length; i++){$(document.getElementsByClassName("cross")[i]).hide()}
    for(let i = 0; i < results.length; i++){
      if(results[i] == 1){
        $(document.getElementsByClassName("checkmark")[i]).show();
        //document.getElementById("q" + (i+1).toString() + "-option-" + answers[index][i].toString()).foo();
      }
      else{
        $(document.getElementsByClassName("cross")[i]).show();
        //document.getElementById("q" + (i+1).toString() + "-option-" + answers[index][i].toString()).foowrong();
        //document.getElementById("q" + (i+1).toString() + "-option-" + correct_answers[index][i].toString()).foo()
      }
    }
  };

});
