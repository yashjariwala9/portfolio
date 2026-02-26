document.addEventListener("DOMContentLoaded", () => {

  marked.setOptions({ gfm: true, breaks: true });

  /* HEADER */
  const profileImg = document.getElementById("profileImage");
  profileImg.src = data.profile.image;
  profileImg.alt = `Profile photo of ${data.profile.name}`;

  document.getElementById("name").textContent = data.profile.name;
  document.getElementById("tagline").textContent = data.profile.tagline;

  // Populate sticky bar name
  document.getElementById("stickyName").textContent = data.profile.name;

  // Build social links (header + sticky bar)
  const socialContainer = document.getElementById("socialLinks");
  const stickySocial = document.getElementById("stickySocial");

  data.profile.social.forEach(link => {
    [socialContainer, stickySocial].forEach(container => {
      const a = document.createElement("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", link.url);
      a.innerHTML = `<i class="${link.icon}" aria-hidden="true"></i>`;
      container.appendChild(a);
    });
  });

  // Sticky bar on scroll
  const stickyBar = document.getElementById("stickyBar");
  const header = document.querySelector(".header");

  const observer = new IntersectionObserver(
    ([entry]) => {
      stickyBar.classList.toggle("visible", !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  observer.observe(header);

  /* ABOUT */
  const aboutEl = document.getElementById("about");
  if (data.about) {
    aboutEl.innerHTML = marked.parse(data.about);
  }

  /* EXPERIENCE */
  const expContainer = document.getElementById("experience");
  if (data.experience && data.experience.length > 0) {
    data.experience.forEach(exp => {
      const row = document.createElement("div");
      row.className = "exp-row";

      const date = document.createElement("div");
      date.className = "exp-date";
      date.textContent = exp.date;

      const divider = document.createElement("div");
      divider.className = "exp-divider";
      const dot = document.createElement("div");
      dot.className = "exp-dot";
      divider.appendChild(dot);

      const content = document.createElement("div");
      content.className = "exp-content";

      const heading = document.createElement("h3");
      heading.textContent = exp.role;

      const subheading = document.createElement("h4");
      subheading.textContent = exp.company;

      const desc = document.createElement("div");
      desc.className = "exp-description";
      desc.innerHTML = marked.parse(exp.description);

      content.appendChild(heading);
      content.appendChild(subheading);
      content.appendChild(desc);

      row.appendChild(date);
      row.appendChild(divider);
      row.appendChild(content);
      expContainer.appendChild(row);
    });
  }

  /* PROJECTS */
  const projectsContainer = document.getElementById("projects");
  if (data.projects && data.projects.length > 0) {
    data.projects.forEach(project => {
      const div = document.createElement("div");
      div.className = "project-item";

      const titleEl = project.url
        ? `<h3><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.title}</a></h3>`
        : `<h3>${project.title}</h3>`;

      div.innerHTML = titleEl + marked.parse(project.description);
      projectsContainer.appendChild(div);
    });
  }

  /* EDUCATION */
  const educationEl = document.getElementById("education");
  if (data.education) {
    educationEl.innerHTML = marked.parse(data.education);
  }

});
