// Simple JavaScript for Digital Incorporated Foundation
document.addEventListener("DOMContentLoaded", function() {

  // === 1. INTERACTIVE ELEMENTS: TABS (About.html) ===
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      // Add active to clicked
      this.classList.add("active");
      let tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // === 1. INTERACTIVE ELEMENTS: ACCORDION (Services.html) ===
  const accHeaders = document.querySelectorAll(".accordion-header");
  accHeaders.forEach(header => {
    header.addEventListener("click", function() {
      let content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        // Close all
        document.querySelectorAll(".accordion-content").forEach(c => c.style.display = "none");
        content.style.display = "block";
      }
    });
  });

  // === 1. INTERACTIVE ELEMENTS: MODAL (Home.html) ===
  let modal = document.getElementById("infoModal");
  let openBtn = document.getElementById("moreInfoBtn");
  if (modal && openBtn) {
    openBtn.onclick = () => modal.classList.add("show");
    modal.querySelector(".close").onclick = () => modal.classList.remove("show");
    window.onclick = (e) => { if (e.target == modal) modal.classList.remove("show"); }
  }

  // === 2. INTERACTIVE MAPS with LEAFLET (Contact.html) ===
  let mapDiv = document.getElementById("map");
  if (mapDiv) {
    let map = L.map('map').setView([-25.9618, 28.2343], 13); // Clayville coords
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([-25.9618, 28.2343]).addTo(map)
      .bindPopup("<b>Digital Incorporated Foundation</b><br>98 Major Rd, Clayville").openPopup();
  }

  // === 3. ANIMATIONS AND TRANSITIONS ===
  // Fade in on scroll using simple JS
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });
  document.querySelectorAll(".services, .stop, .phara").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

  // === 4. ADVANCED DOM MANIPULATION + 2.2 DYNAMIC CONTENT ===
  // Data loaded dynamically with JS, not hardcoded in HTML
  const servicesData = [
    { title: "Bridging Public Sector & 4IR", desc: "Bridge gap between public sector and 4IR.", cat: "4IR" },
    { title: "Digitizing Government", desc: "Digitize institutions using taxpayer money.", cat: "Gov" },
    { title: "Digital Classrooms", desc: "Provide tablets and digital boards.", cat: "Education" }
  ];

  let container = document.getElementById("servicesContainer");
  function displayServices(list) {
    if (!container) return;
    container.innerHTML = ""; // Clear
    list.forEach(item => {
      // Create elements with JS - Advanced DOM
      let div = document.createElement("div");
      div.className = "stop";
      div.innerHTML = `<h3>${item.title}</h3><p>${item.desc}</p><small>Category: ${item.cat}</small>`;
      container.appendChild(div);
    });
  }
  displayServices(servicesData);

  // === 5. GALLERY WITH LIGHTBOX ===
  const galleryImages = [
    { src: "img/images.png", caption: "Digital Lab" },
    { src: "img/readyelements-answer-3509503_1920.jpg", caption: "Learner Tablets" },
    { src: "img/thedigitalartist-contact-us-1186524_1920.png", caption: "Contact Us" }
  ];
  let gallery = document.getElementById("gallery");
  let lightbox = document.getElementById("lightbox");
  let lightboxImg = document.getElementById("lightboxImg");
  let lightboxCaption = document.getElementById("lightboxCaption");

  if (gallery) {
    galleryImages.forEach(imgData => {
      let img = document.createElement("img");
      img.src = imgData.src;
      img.alt = imgData.caption;
      img.className = "gallery-img";
      // When clicked, show lightbox
      img.addEventListener("click", function() {
        lightboxImg.src = this.src;
        lightboxCaption.textContent = imgData.caption;
        lightbox.classList.add("show");
      });
      gallery.appendChild(img);
    });
  }
  if (lightbox) {
    lightbox.querySelector(".lightbox-close").onclick = () => lightbox.classList.remove("show");
    lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.classList.remove("show"); }
  }

  // === 2.2 SEARCH FUNCTIONALITY (Filter services) ===
  let searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", function() {
      let term = this.value.toLowerCase();
      let filtered = servicesData.filter(s => 
        s.title.toLowerCase().includes(term) || 
        s.desc.toLowerCase().includes(term)
      );
      displayServices(filtered);
    });
  }

});

  // === 4.1 FORM VALIDATION & SUBMISSION ===

  // Enquiry Form - Cost & Availability Response
  let enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Stop real submit for demo

      // Simple validation
      let type = document.getElementById("enquiryType").value;
      let responseDiv = document.getElementById("enquiryResponse");
      
      let cost = "";
      let availability = "";

      if (type === "services") { cost = "R15,000 - R50,000"; availability = "Available in 2 weeks"; }
      else if (type === "products") { cost = "Tablets: R2,500 each"; availability = "In stock"; }
      else if (type === "volunteer") { cost = "Free - Volunteer"; availability = "Immediate"; }
      else if (type === "sponsor") { cost = "Sponsor from R5,000"; availability = "Open"; }

      // Show response related to cost/availability - As per brief
      responseDiv.style.display = "block";
      responseDiv.innerHTML = `<h3>Thank you for your enquiry!</h3>
        <p><b>Enquiry Type:</b> ${type}</p>
        <p><b>Estimated Cost:</b> ${cost}</p>
        <p><b>Availability:</b> ${availability}</p>
        <p>We will email you full details at ${this.email.value}</p>`;
      
      // For actual email submission, you can use: this.submit();
      alert("Enquiry processed! Check cost & availability below.");
    });
  }

  // Contact Form - Compile into Email
  let contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      let name = this.fullname.value;
      let email = this.email.value;
      let msgType = this.messageType.value;
      let subject = this.subject.value;
      let fullMsg = this.fullMessage.value;

      // Compile into email format - As per brief
      let compiledEmail = `To: contact@digitalincorporated.co.za
Subject: ${subject} - ${msgType}
From: ${name} <${email}>

Message Type: ${msgType}
Full Message:
${fullMsg}

Sent from Digital Incorporated Foundation Contact Form`;

      let responseDiv = document.getElementById("contactResponse");
      responseDiv.style.display = "block";
      responseDiv.innerHTML = `<h3>Email Compiled Successfully!</h3>
        <pre style="white-space:pre-wrap; text-align:left;">${compiledEmail}</pre>
        <p>Click Send Email button again to open your email app, or this data will be sent to recipient stated in code: contact@digitalincorporated.co.za</p>`;


      let mailtoLink = `mailto:contact@digitalincorporated.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compiledEmail)}`;
      window.location.href = mailtoLink;
      
      alert("Contact form validated! Email compiled and ready to send.");
    });
  }

    

  function showError(input, message) {
    // Remove old error if exists
    let oldError = input.parentElement.querySelector(".error-msg");
    if (oldError) oldError.remove();
    
    let error = document.createElement("span");
    error.className = "error-msg";
    error.style.color = "red";
    error.style.fontSize = "12px";
    error.style.display = "block";
    error.textContent = message;
    input.parentElement.appendChild(error);
    input.style.border = "2px solid red";
  }

  function clearError(input) {
    let error = input.parentElement.querySelector(".error-msg");
    if (error) error.remove();
    input.style.border = "1px solid #ccc";
  }

  function isValidEmail(email) {

    return email.includes("@") && email.includes(".");
  }

  
  let enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Client-side validation before submission
      let isValid = true;

      
      this.querySelectorAll("input, select, textarea").forEach(el => clearError(el));

      
      let firstName = this.querySelector("input[name='firstname']");
      if (firstName.value.trim().length < 2) {
        showError(firstName, "First name must be at least 2 letters");
        isValid = false;
      }

      
      let email = this.querySelector("input[name='email']");
      if (!isValidEmail(email.value)) {
        showError(email, "Please enter a valid email with @ and .");
        isValid = false;
      }

    
      let phone = this.querySelector("input[name='phone']");
      if (phone.value.trim().length < 10) {
        showError(phone, "Phone must be at least 10 digits");
        isValid = false;
      }

    
      let enquiryType = document.getElementById("enquiryType");
      if (enquiryType.value === "") {
        showError(enquiryType, "Please select enquiry type");
        isValid = false;
      }

    
      if (!isValid) {
        alert("Please fix errors in red before submitting.");
        return;
      }

      
    
      let formData = new FormData(this);
      let data = {};
      formData.forEach((value, key) => data[key] = value);

      
      let responseDiv = document.getElementById("enquiryResponse");
      responseDiv.style.display = "block";
      responseDiv.innerHTML = "<p>Submitting via AJAX... Please wait...</p>";

    
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
      .then(response => response.json())
      .then(result => {
        // Cost & Availability Logic
        let cost = typeCost(enquiryType.value);
        responseDiv.innerHTML = `<h3>Success! Form submitted via AJAX</h3>
          <p><b>Cost:</b> ${cost.cost}</p>
          <p><b>Availability:</b> ${cost.avail}</p>
          <p>We will contact you at ${data.email}</p>
          <p><i>Server response ID: ${result.id} (AJAX worked)</i></p>`;
        enquiryForm.reset();
      })
      .catch(error => {
        responseDiv.innerHTML = `<p style="color:red;">Error submitting: ${error.message}</p>`;
      });

      function typeCost(type) {
        if (type === "services") return { cost: "R15,000 - R50,000", avail: "Available in 2 weeks" };
        if (type === "products") return { cost: "Tablets R2,500 each", avail: "In stock" };
        if (type === "volunteer") return { cost: "Free", avail: "Immediate" };
        if (type === "sponsor") return { cost: "From R5,000", avail: "Open" };
        return { cost: "Contact us", avail: "TBD" };
      }
    });
  }

  
  let contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      let isValid = true;
      this.querySelectorAll("input, select, textarea").forEach(el => clearError(el));

      let fullName = this.querySelector("input[name='fullname']");
      if (fullName.value.trim().length < 3) {
        showError(fullName, "Full name must be at least 3 letters");
        isValid = false;
      }

      let email = this.querySelector("input[name='email']");
      if (!isValidEmail(email.value)) {
        showError(email, "Enter valid email");
        isValid = false;
      }

      let subject = this.querySelector("input[name='subject']");
      if (subject.value.trim().length < 5) {
        showError(subject, "Subject must be 5+ letters");
        isValid = false;
      }

      let fullMessage = this.querySelector("textarea[name='fullMessage']");
      if (fullMessage.value.trim().length < 20) {
        showError(fullMessage, "Message must be at least 20 characters");
        isValid = false;
      }

      if (!isValid) {
        alert("Please fix errors before sending email.");
        return;
      }

      // AJAX Submission for Contact - Compile into email
      let responseDiv = document.getElementById("contactResponse");
      responseDiv.style.display = "block";
      responseDiv.innerHTML = "<p>Compiling email and sending via AJAX...</p>";

      let compiledData = {
        to: "contact@digitalincorporated.co.za",
        from: this.email.value,
        subject: this.subject.value,
        body: `Type: ${this.messageType.value}\nMessage: ${fullMessage.value}`
      };

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(compiledData),
        headers: { "Content-type": "application/json" }
      })
      .then(res => res.json())
      .then(result => {
        responseDiv.innerHTML = `<h3>Email compiled and sent via AJAX!</h3>
          <pre style="white-space:pre-wrap; text-align:left; background:white; padding:10px;">To: ${compiledData.to}\nSubject: ${compiledData.subject}\n${compiledData.body}</pre>
          <p>AJAX ID: ${result.id} - No page reload!</p>`;
        contactForm.reset();
      });
    });
  }