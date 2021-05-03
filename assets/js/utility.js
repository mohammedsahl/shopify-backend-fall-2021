/* eslint-disable */
var pathname = window.location.pathname
const pages = {
  'viewImagesTab': '/images/list',
  'addImagesTab': '/images/upload' ,
  'homeTab' : '/'
}
const navItems = document.getElementsByClassName("nav-item");
for (let navItem of navItems) {
  if (pathname === pages[navItem.id]) navItem.classList.add("active");
  else if (navItem.className.includes('active')) navItem.classList.remove('active');
}

document.getElementById("customFile").addEventListener(
  "change",
  (obj, evt) => {
    const files = document.getElementById("customFile").files;
    const label = document.getElementById("imageUploadField");
    label.innerHTML =
      files.length > 1 ? `${files.length} files uploaded` : `${files[0].name}`;
  },
  false
);

document.getElementById("searchWord").onkeyup = function(ev) {
  this.setAttribute("value", ev.target.value);
}