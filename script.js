document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

fetch("https://hcb.hackclub.com/entropy/donations")
  .then(res => res.text())
  .then(html => {
    const total = html.match(/stat__value">(.+?)</)[1];
    document.getElementById("donation-total").textContent = total;
  })
  .catch(error => {
    console.error("Error fetching donation data:", error);
  });