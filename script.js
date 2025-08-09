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

async function fetchDonations() {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent('https://hcb.hackclub.com/entropy/donations')}`
    );
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');

    // Look for the specific section containing the "Total Raised" or similar label
    const totalLabel = Array.from(doc.querySelectorAll('h2, h3, p, span, div'))
      .find(el => /total/i.test(el.textContent) && /\$/.test(el.textContent));

    if (totalLabel) {
      const match = totalLabel.textContent.match(/\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/);
      if (match) {
        document.getElementById('donation-total').textContent = match[0];
        return;
      }
    }

    document.getElementById('donation-total').textContent = 'Error loading';
  } catch (error) {
    console.error('Error fetching donations:', error);
    document.getElementById('donation-total').textContent = 'Error';
  }
}

fetchDonations();
setInterval(fetchDonations, 1000);
