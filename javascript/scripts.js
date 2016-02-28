$(function() {

  var pointsLeft = parseInt($('#sp_counter').text());

  var skillTreeModel = {
    strength: {
      topLevel: 1,
      addedPoints: 0,
      skills: {
        madness: 0,
        turboSwings: 0,
        volcanoSlash: 0,
        swiftness: 0,
        throatCutting: 0,
        upperCut: 0
      }
    },
    agility: {
      topLevel: 1,
      addedPoints: 0,
      skills: {
        thousandDaggers: 0,
        parade: 0,
        backstab: 0,
        magicStab: 0,
        meditation: 0,
        death: 0
      }
    },
    magic: {
      topLevel: 1,
      addedPoints: 0,
      skills: {
        supersonicElectronic: 0,
        electricVengeance: 0,
        cursedLightning: 0,
        lightningBolt: 0,
        supernova: 0,
        star: 0
      }
    }
  }

  $('.skill').on('click', function(e){
    var path = $(this).parent().parent().attr('id');
    var skill = $(this).attr('data-skill');
    var skillLevel = $(this).attr('data-skill-level');

    if(levelOk(path, skillLevel, pointsLeft)){
      if(skillTreeModel[path].skills[skill] >= 3 || pointsLeft  === 0){
        return;
      }else{
        skillTreeModel[path].skills[skill] += 1;
        skillTreeModel[path].addedPoints += 1;
        pointsLeft -= 1;
        $('#sp_counter').text(pointsLeft);
        $(this).find('.skill_count span').text(skillTreeModel[path].skills[skill]);
        $('#' + path).find('.stats').text(skillTreeModel[path].addedPoints);
      }
    }
  });

  function levelOk(path, skillLevel, pointsLeft){
    var topLevel = skillTreeModel[path].topLevel;

    if(parseInt(skillLevel) < skillTreeModel[path].topLevel){
      return true;
    }else if(parseInt(skillLevel) === skillTreeModel[path].topLevel && pointsLeft > 0){
      skillTreeModel[path].topLevel += 1;
      $('#' + path + ' .' + skillTreeModel[path].topLevel + '_tier').children().addClass('unlocked');
      return true;
    }else{
      return false;
    }
  }


  $('#reset').on('click', function (){
    $('.skill').removeClass('unlocked');
    pointsLeft = 30;
    $('#sp_counter').text(pointsLeft);

    for (var key1 in skillTreeModel) {
      if (skillTreeModel.hasOwnProperty(key1)) {
        var object1 = skillTreeModel[key1];
        var skillsObj = skillTreeModel[key1].skills;
        object1.addedPoints = 0;
        object1.topLevel = 1;
        $('.stats').text(object1.addedPoints);

          for (var key2 in skillsObj){
            if (skillsObj.hasOwnProperty(key2)){
            skillsObj[key2] = 0;
            $('.skill_count span').text(skillsObj[key2]);
            }
          }
        }
      }
  });
});
