// set the number of thumbnails displayed in collapsed view
var thumbnailLimit = 7;

// build tag/filter elements and return as unordered list
function styleTags(tags, type) {
  if (type === "projectType") {
    var tagType;
    switch (tags) {
      case "game" : tagType = "gameTag"; break;
      case "interface" : tagType = "interfaceTag"; break;
      case "utility" : tagType = "utilityTag"; break;
      case "app" : tagType = "appTag"; break;
    }
    var tag = $("<p>").text(tags).addClass(tagType).addClass("projectType").addClass("tag");
    return tag;
  } else {
    var tagList = $("<ul>").addClass("tagList");  
    tags.forEach(function(tag) {
      var tagType;
      switch (tag) {
        default : tagType = "basicTag"; break;
        case "JS" : 
        case "Node" : tagType = "logicTag"; break;
        case "CSS" : 
        case "jQuery" : tagType = "presentationTag"; break;
        case "API" : tagType = "frameworkTag"; break;
        case "collaboration" : tagType = "collabTag"; break;
        case "Express" : 
        case "MySQL" : 
        case "Handlebars" :
        case "Sequelize" : tagType = "serverTag"; break;
      }
      if (type === "tag") {
        $("<li>").text(tag).addClass(tagType+" tag").appendTo(tagList);
      } else if (type === "filter") {
        $("<li>").text(tag).addClass(tagType+" filter").appendTo(tagList);
      }
    })
    return tagList;
  }
}

function displayProjects() {
  for (var i = 0; i < projects.length; i++) {
    var me = projects[i];
    var project = $("<div>").attr("value", i);
    var image = $("<img>").attr("src", me.image).attr("alt", me.name);
    // display thumbnails in section header
    if (i <= thumbnailLimit) {
      var thumbnail = $("<div>").attr("value", i);
      var thumbImage = $("<img>").attr("src", me.image);
      thumbnail.append(thumbImage);
      if (i < projects.length -1 &&  i !== thumbnailLimit) {
        thumbnail.append($("<p>").text(","));
      }
      $("#thumbSet").append(thumbnail.addClass("thumbnail"));
    };
    // display project cards
    var imageUrl = "../"+me.image;
    var imageArea = $("<div>").css("background-image", "url('"+me.image+"')").addClass("imageArea");
    imageArea.append(styleTags(me.type, "projectType"));
    var info = $("<div class='info'>");
    var name = $("<h3>").text(me.name).addClass("projectName");
    var desc = $("<p>").text(me.desc).addClass("projectDesc");
    var linkList = $("<ul>").addClass("projectLinks");
    if (me.webLink) {
      linkList.append($("<li>").append($("<a>").text("Web link").attr("href", me.webLink).attr("target", "_blank").addClass("link")));
    }
    if (me.gitLink) {
      linkList.append($("<li>").append($("<a>").text("Git repository").attr("href", me.gitLink).attr("target", "_blank").addClass("link")));
    };
    info.append(name, desc, styleTags(me.tags, "tag"));
    project.append(imageArea, info, linkList);
    $("#projectsDisplay").append(project.addClass("project"));
  }
}

displayProjects();

// create list of filters from projects array
var filterSet = [];
function displayFilterButtons() {
  for (var i = 0; i < projects.length; i++) {
    var me = projects[i];
    me.tags.forEach(function(value) {
        if (!filterSet.includes(value)) {
          filterSet.push(value)
      }
    });
  }
  $("#filterSet").append(styleTags(filterSet, "filter"))
}

displayFilterButtons();

// filter functionality
var visibleTags = filterSet.slice();
var invisibleTags = [];

function filterProjects() {
  for (var i = 0; i < projects.length; i++) {
    var visible = false;
    projects[i].tags.forEach(function(ele) {
      if (visibleTags.includes(ele)) {
        visible = true;
      }
    }) 
    if (!visible) {
      $(`.project[value*="${i}`).hide();
    } else {
      $(`.project[value*="${i}`).show();
    }
  }
}

filterProjects();

$(document).on("click", ".filter", function() {
  if (visibleTags.includes($(this).text())) {
    invisibleTags.push($(this).text());
    var tagIndex = visibleTags.findIndex(tag => tag === $(this).text());
    visibleTags.splice(tagIndex, 1);
    $(this).addClass("dim");
  } else {
    visibleTags.push($(this).text());
    var tagIndex = invisibleTags.findIndex(tag => tag === $(this).text());
    invisibleTags.splice(tagIndex, 1);
    $(this).removeClass("dim");
  }
  filterProjects();
});

function viewProjects() {
  $(".filterArea").toggleClass("hidden");
  $(".thumbnails").toggleClass("hidden");
  $("#projectsDisplay").slideToggle("medium", function() {
    if ($(this).is(':visible'))
    $(this).css('display','flex');
  });
};

$(document).on("click", ".projectsToggle, .viewButtons", function() {
  viewProjects();
  $(".viewAll, .viewNone").toggleClass("dim");
});
$(document).on("click", ".thumbnail", viewProjects);

// takes in paired arguments to construct a <span> for first index, which is classed by the second index
function addFlavor(parts) {
  var flavor = $("<div>").addClass("flavor");
  for (var i = 0; i < parts.length; i++) {
    var bit = $("<span>").text(parts[i]);
    i++;
    bit.addClass(parts[i]);
    flavor.append(bit);
  }
  return flavor
}

$("#arena").prepend(addFlavor(["var ", "dec", "does ", "varname", "= ", "punc"])).append(addFlavor([";", "punc"]));
$("#projectsTitleWithFlavor").append(addFlavor([" =", "punc", " [ ", "punc"]));

var iAm = ["web developer.", "visual artist.", "sound engineer.", "stage tech."];
var iLike = ["design.", "build.", "customize.", "rewire.", "remix.", "repurpose."]
setInterval(function() {
  $("span.iAm").fadeOut(800, function() {
    iAm.push(iAm.shift());
    $("span.iAm").text(iAm[0]);
    $("span.iAm").fadeIn();
  });
}, 3000);

setInterval(function() { 
  $("span.iLike").fadeOut(400, function() {
    iLike.push(iLike.shift());
    $("span.iLike").text(iLike[0]);
    $("span.iLike").fadeIn();
  })
}, 2000);

// add "I use [JavaScript, CSS, jQuery...]"

