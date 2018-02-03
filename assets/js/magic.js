
function displayProjects() {
  for (var i = 0; i < projects.length; i++) {
    var me = projects[i];
    var project = $("<div class='project'>").attr("value", i);
    var image = $("<img>").attr("src", me.image).attr("alt", me.name);
    var info = $("<div class='info'>");
    var titleBar = $("<div>").addClass("titleBar");
    var type = $("<p>").text(me.type).addClass("projectType");
    var name = $("<p>").text(me.name).addClass("projectName");
    titleBar.append(type, name);
    var desc = $("<p>").text(me.desc).addClass("projectDesc");
    info.append(titleBar, desc);
    var linkList = $("<ul>").addClass("projectLinks");
    if (me.webLink) {
      linkList.append($("<li>").append($("<a>").text("Web link").attr("href", me.webLink).addClass("link")));
    }
    if (me.gitLink) {
      linkList.append($("<li>").append($("<a>").text("Git repository").attr("href", me.gitLink).attr("target", "_blank").addClass("link")));
    };
    var flagList = $("<ul>");
    me.flags.forEach(function(flag) {
      var flagType;
      switch (flag) {
        default : 
        case "JS" : flagType = "logic"; break;
        case "Node" : flagType = "logic"; break;
        case "CSS" : flagType = "presentation"; break;
        case "jQuery" : flagType = "presentation"; break;
        case "API" : flagType = "framework"; break;
      }
      $("<li>").text(flag).addClass(flagType+" flag").appendTo(flagList);
    });
    info.append(flagList, linkList);
    if (me.collab) {
      $("<li>").text("collaboration").addClass("collab").appendTo(flagList);
    }
    project.append(image, info);
    console.log(project);
    $("#cardContainer").append(project.addClass("small"));
  }
}

displayProjects();

$(document).on("click", "#projectsTitleDiv", function() {
  if ($(".projectsTitle").text() === "collapse.projects()") {
    $(".projectsTitle").text("expand.projects()");
    $(".info").toggle();
    $(".project").addClass("small");
  } else {
    $(".projectsTitle").text("collapse.projects()")
    $(".info").toggle();
    $(".project").removeClass("small");
  }
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

$("h1").prepend(addFlavor(["const ", "dec", "me ", "varname", "= ", "punc"])).append(addFlavor([";", "punc"]));
$("#arena").prepend(addFlavor(["var ", "dec", "does ", "varname", "= ", "punc"])).append(addFlavor([";", "punc"]));
$("#projectsTitleDiv").append(addFlavor([" =", "punc", " [ ", "punc"]));