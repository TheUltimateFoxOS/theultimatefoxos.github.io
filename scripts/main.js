if (window.location.hostname != "theultimatefoxos.dev") {
  var nextpage = "https://theultimatefoxos.dev" + window.location.pathname + window.location.search;
  window.location.replace(nextpage);
}

function nav_bar_expand() {
  var main_bar = document.getElementById("fox-bar");
  if (main_bar.className == "fox-bar") {
    main_bar.className = "fox-bar responsive";
  } else {
    main_bar.className = "fox-bar";
  }
}

function add_nav_bar() {
  $("#includedContent").load("/navbar.html"); 
}