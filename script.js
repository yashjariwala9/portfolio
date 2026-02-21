document.addEventListener("DOMContentLoaded", () => {

    fetch("data.json")
        .then(res => res.json())
        .then(data => {

            /* HEADER */
            document.getElementById("profileImage").src = data.profile.image;
            document.getElementById("name").textContent = data.profile.name;
            document.getElementById("tagline").textContent = data.profile.tagline;

            const socialContainer = document.getElementById("socialLinks");

            data.profile.social.forEach(link => {
                const a = document.createElement("a");
                a.href = link.url;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.innerHTML = `<i class="${link.icon}"></i>`;
                socialContainer.appendChild(a);
            });

            /* ABOUT */
            document.getElementById("about").innerHTML =
                marked.parse(data.about);

            /* EXPERIENCE */
            const expContainer = document.getElementById("experience");

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

                content.innerHTML = `
                    <h3>${exp.role}</h3>
                    <h4>${exp.company}</h4>
                    ${marked.parse(exp.description)}
                `;

                row.appendChild(date);
                row.appendChild(divider);
                row.appendChild(content);

                expContainer.appendChild(row);
            });

            /* PROJECTS */
            const projectsContainer = document.getElementById("projects");

            data.projects.forEach(project => {

                const div = document.createElement("div");
                div.className = "project-item";

                div.innerHTML = `
                    <h3>${project.title}</h3>
                    ${marked.parse(project.description)}
                `;

                projectsContainer.appendChild(div);
            });

            /* EDUCATION */

            if (data.education) {
                document.getElementById("education").innerHTML =
                    marked.parse(data.education);
            }

        })
        .catch(err => console.error("Error loading data:", err));

});