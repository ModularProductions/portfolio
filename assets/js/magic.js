
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
    $("#projectSet").append(project.addClass("small"));
  }
}

displayProjects();

$("#projectSet").on("click", function() {
  $(".info").show();
  $(".project").removeClass("small");
  $(".portfolio").text("collapse.projects").removeAttr("display");
});

$("").on("click", function() {
  $(".info").hide();
  $(".project").addClass("small");
  $(".portfolio").text("projects").attr("display", "inline");
});

function addFlavor(subject, p1, p1t, p2, p2t, p3, p3t, ap1, ap1t, ap2, ap2t) {
  var flavor1 = $("<span>").addClass(p1t).text(p1);
  var flavor2 = $("<span>").addClass(p2t).text(p2);
  var flavor3 = $("<span>").addClass(p3t).text(p3);
  $(subject).prepend(flavor1, flavor2, flavor3);
  var afterFlavor1 = $("<span>").addClass(ap1t).text(ap1);
  var afterFlavor2 = $("<span>").addClass(ap2t).text(ap2);
  $(subject).append(afterFlavor1, afterFlavor2)
};

addFlavor("h1", "const ", "dec", "me ", "varname", "= ", "punc", ";", "punc");
addFlavor(".arena", "var ", "dec", "does ", "varname", "= ", "punc", ";", "punc");
addFlavor(".portfolio", null, null, null, null, null, null, " =", "punc", " [", "punc");