
var thumbnailLimit = 7;

function displayProjects() {
  for (var i = 0; i < projects.length; i++) {
    var me = projects[i];
    var project = $("<div>").attr("value", i);
    var image = $("<img>").attr("src", me.image).attr("alt", me.name);
    if (i <= thumbnailLimit) {
      var thumbnail = $("<div>").attr("value", i);
      var thumbImage = $("<img>").attr("src", me.image);
      thumbnail.append(thumbImage);
      if (i < projects.length -1 &&  i !== thumbnailLimit) {
        thumbnail.append($("<p>").text(","));
      }
      $("#thumbSet").append(thumbnail.addClass("thumbnail"));
    };
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
    var tagList = $("<ul>");
    me.tags.forEach(function(tag) {
      var tagType;
      switch (tag) {
        default :  tagType = "basicTag"; break;
        case "JS" : tagType = "logic"; break;
        case "Node" : tagType = "logic"; break;
        case "MySQL" : tagType = "server"; break;
        case "CSS" : tagType = "presentation"; break;
        case "jQuery" : tagType = "presentation"; break;
        case "API" : tagType = "framework"; break;
        case "collaboration" : tagType = "collab"; break;
      }
      $("<li>").text(tag).addClass(tagType+" tag").appendTo(tagList);
    });
    info.append(tagList, linkList);
    project.append(image, info);
    $("#projectsDisplay").append(project.addClass("project"));
  }
}

displayProjects();

function displayFilters() {
  var filterSet = [];
  for (var i = 0; i < projects.length; i++) {
    var me = projects[i];
    me.tags.forEach(function(value) {
        if (!filterSet.includes(value)) {
          filterSet.push(value)
      }
    });
  }
  filterSet.forEach(function(tag) {
    var tagType;
    switch (tag) {
      default :  tagType = "basicTag"; break;
      case "JS" : tagType = "logic"; break;
      case "Node" : tagType = "logic"; break;
      case "MySQL" : tagType = "server"; break;
      case "CSS" : tagType = "presentation"; break;
      case "jQuery" : tagType = "presentation"; break;
      case "API" : tagType = "framework"; break;
      case "collaboration" : tagType = "collab"; break;
    }
    $("<li>").text(tag).addClass(tagType+" filter").appendTo($("#filterSet"));
  });
}

displayFilters();

$(document).on("click", ".filter", function() {
  if($(this).hasClass("dim")) {

  }
  $(this).toggleClass("dim");
  $(".tag:contains('"+$(this).text()+"')").parent().parent().parent().toggle();
  console.log(this);
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

$("#name").hover(function() {
  $("#network").toggleClass("inline");
  $("#network").toggleClass("hidden"); 
  $("#name .pre").toggleClass("inline"); 
  $("#name .pre").toggleClass("hidden");
});

function addFlavor(parts, whut) {
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
