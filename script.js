document.addEventListener("DOMContentLoaded", () => {

  // Configure marked: sanitize disabled (we control the data), use GFM
  marked.setOptions({ gfm: true, breaks: true });

  fetch("data.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return res.json();
    })
    .then(data => {

      /* ── HEADER ── */
      const profileImg = document.getElementById("profileImage");
      profileImg.src = data.profile.image;
      profileImg.alt = `Profile photo of ${data.profile.name}`;

      document.getElementById("name").textContent = data.profile.name;
      document.getElementById("tagline").textContent = data.profile.tagline;

      const socialContainer = document.getElementById("socialLinks");
      data.profile.social.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("aria-label", link.url);
        a.innerHTML = `<i class="${link.icon}" aria-hidden="true"></i>`;
        socialContainer.appendChild(a);
      });

      /* ── ABOUT ── */
      const aboutEl = document.getElementById("about");
      if (data.about) {
        aboutEl.innerHTML = marked.parse(data.about);
      }

      /* ── EXPERIENCE ── */
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

          // Build content safely - only description goes through marked
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

      /* ── PROJECTS ── */
      const projectsContainer = document.getElementById("projects");
      if (data.projects && data.projects.length > 0) {
        data.projects.forEach(project => {
          const div = document.createElement("div");
          div.className = "project-item";

          // Title as a link if URL exists, plain text if not
          const titleEl = project.url
            ? `<h3><a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.title}</a></h3>`
            : `<h3>${project.title}</h3>`;

          div.innerHTML = titleEl + marked.parse(project.description);
          projectsContainer.appendChild(div);
        });
      }

      /* ── SKILLS ── */
      const skillsContainer = document.getElementById("skills");
      if (data.skills) {
        const fragment = document.createDocumentFragment();

        if (data.skills.current && data.skills.current.length > 0) {
          const currentGroup = document.createElement("div");
          currentGroup.className = "skills-group";
          currentGroup.innerHTML = `<h3 class="skills-subheading">Current Skills</h3>`;
          const currentList = document.createElement("ul");
          currentList.className = "skills-list";
          data.skills.current.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            currentList.appendChild(li);
          });
          currentGroup.appendChild(currentList);
          fragment.appendChild(currentGroup);
        }

        if (data.skills.learning && data.skills.learning.length > 0) {
          const learningGroup = document.createElement("div");
          learningGroup.className = "skills-group";
          learningGroup.innerHTML = `<h3 class="skills-subheading">Currently Learning</h3>`;
          const learningList = document.createElement("ul");
          learningList.className = "skills-list skills-list--learning";
          data.skills.learning.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            learningList.appendChild(li);
          });
          learningGroup.appendChild(learningList);
          fragment.appendChild(learningGroup);
        }

        skillsContainer.appendChild(fragment);
      }

      /* ── EDUCATION ── */
      const educationEl = document.getElementById("education");
      if (data.education) {
        educationEl.innerHTML = marked.parse(data.education);
      }

    })
    .catch(err => {
      console.error("Failed to load portfolio data:", err);
      document.querySelector(".container").innerHTML =
        `<p class="error-msg">Could not load portfolio content. Please try refreshing the page.</p>`;
    });

});
