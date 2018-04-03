// set the number of thumbnails displayed in collapsed view
var thumbnailLimit = 7;

// build tag/filter elements and return as unordered list
function styleTags(tags, type) {
  var tagList = $("<ul>").addClass("tagList");  
  tags.forEach(function(tag) {
    var tagType;
    switch (tag) {
      default :  tagType = "basicTag"; break;
      case "JS" : 
      case "Node" : tagType = "logic"; break;
      case "CSS" : 
      case "jQuery" : tagType = "presentation"; break;
      case "API" : tagType = "framework"; break;
      case "collaboration" : tagType = "collab"; break;
      case "Express" : 
      case "MySQL" : 
      case "Handlebars" :
      case "Sequelize" : tagType = "server";
      break;
    }
    if (type === "tag") {
      $("<li>").text(tag).addClass(tagType+" tag").appendTo(tagList);
    } else if (type === "filter") {
      $("<li>").text(tag).addClass(tagType+" filter").appendTo(tagList);
    }
  })
  return tagList;
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
    var info = $("<div class='info'>");
    var titleBar = $("<div>").addClass("titleBar");
    var type = $("<p>").text(me.type).addClass("projectType tag");
    var name = $("<p>").text(me.name).addClass("projectName");
    titleBar.append(type, name);
    var desc = $("<p>").text(me.desc).addClass("projectDesc");
    info.append(titleBar, desc);
    var linkList = $("<ul>").addClass("projectLinks");
    if (me.webLink) {
      linkList.append($("<li>").append($("<a>").text("Web link").attr("href", me.webLink).attr("target", "_blank").addClass("link")));
    }
    if (me.gitLink) {
      linkList.append($("<li>").append($("<a>").text("Git repository").attr("href", me.gitLink).attr("target", "_blank").addClass("link")));
    };
    info.append(styleTags(me.tags, "tag"), linkList);
    project.append(image, info);
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
  $(".filterAll").removeClass("dim");
  $(".filterNone").removeClass("dim");
  if (visibleTags.length === 0) {
    $(".filterAll").addClass("dim");
  }
  if (invisibleTags.length === 0) {
    $(".filterNone").addClass("dim");
  }
}

filterProjects();

$(document).on("click", ".filterAll", function() {
  invisibleTags = filterSet.slice();
  visibleTags = [];
  $(".filter").addClass("dim");
  filterProjects();
});

$(document).on("click", ".filterNone", function() {
  visibleTags = filterSet.slice();
  invisibleTags = [];
  $(".filter").removeClass("dim");
  filterProjects();
});

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
  if ($(".projectsToggle").text() === "collapse.projects") {
    $(".projectsToggle").text("expand.projects");
  } else {
    $(".projectsToggle").text("collapse.projects")
  }
  $(".filterArea").toggleClass("hidden");
  $(".filterArea").toggleClass("inline");
  $(".thumbnails").toggleClass("inline");
  $(".thumbnails").toggleClass("hidden");
  $("#projectsDisplay").slideToggle();
};

$(document).on("click", ".projectsToggle", viewProjects);
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
