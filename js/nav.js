document.addEventListener("DOMContentLoaded", function() {

  //footer
   let footer = document.createElement('div');
    footer.innerHTML = `

    <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Thank You For Visit!</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Social Media</h5>
                <ul>
                  <li><span class="material-icons text-white">place</span> Bandung</i>
                  <li><span class="material-icons text-white">email</span> Usepgnwan@gmail.com</i>
                  <li><span class="material-icons text-white">local_phone </span> 083820765775</i>
             
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright container-fluid">
            <div class="container">
            © 2020 Copyright Usepgnwan
           
            </div>
    </div>`;
  document.getElementById('footer').appendChild(footer);
  // Activate sidebar nav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();
 
  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status != 200) return;
 
        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

          // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(function(elm) {
          elm.addEventListener("click", function(event) {
            // Tutup sidenav
            let sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();
   
            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });


      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }



  //load page content
// Load page content


let page = window.location.hash.substr(1);
if (page === "") page = "home";
loadPage(page);

function loadPage(page) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      let content = document.querySelector("#body-content");
      if (this.status === 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status === 404) {
        content.innerHTML = `<h2 style="text-align: center;">Halaman tidak ditemukan.</h2>`;
      } else {
        content.innerHTML = `<h2 style="text-align: center;">Ups.. halaman tidak dapat diakses.</h2>`;
      }
    }
  };
  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}



});

