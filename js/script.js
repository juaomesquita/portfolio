window.addEventListener(
  "load",
  (e) => {
    const projectsButton = document.getElementById("projects");
    // const contactButton = document.getElementById('contact')
    const aboutButton = document.getElementById("about");
    const content = document.getElementById("content");
    const container = document.querySelector(".container");
    const aboutSection = document.getElementById("content-section-about");
    const projectsSection = document.getElementById("content-section-projects");
    const projectsArea = document.getElementById("projects-area");
    const namePosition = document.getElementById("name-position");
    // const contactSection = document.getElementById('content-section-contact')
    addNamePosition();
    addProjects();
    addBio();
    // start()
    console.log(projectsButton);
    aboutButton.addEventListener(
      "click",
      (e) => {
        namePosition.style.display = "none";
        // contactSection.style.display = 'none'
        projectsSection.style.display = "none";
        container.style.height = "auto";
        aboutSection.style.display = "block";
        aboutSection.classList.add("fade-in");
        container.style.height = "100%";
      },
      false
    );

    projectsButton.addEventListener(
      "click",
      function clicked(e) {
        aboutSection.style.display = "none";
        namePosition.style.display = "none";
        // contactSection.style.display = 'none'
        projectsSection.style.display = "block";
        projectsSection.classList.add("fade-in");
        container.style.height = "100%";
      },
      false
    );

    function addProjects() {
      ABOUT.pt.projects.forEach((project) => {
        const individualProject = document.createElement("div");
        individualProject.classList.add("project");
        const image = document.createElement("img");
        image.classList.add("project-image");
        image.src = project.img;
        const title = document.createElement("h2");
        title.classList.add("project-title");
        title.innerText = project.name;
        const description = document.createElement("p");
        description.innerText = project.description;
        const link = document.createElement("a");
        link.setAttribute("href", project.link);
        const button = document.createElement("div");
        button.innerText = "see project";
        button.classList.add("button");
        link.appendChild(button);
        const link2 = document.createElement("a");
        link2.setAttribute("target", "_blank");
        if (project.source !== null && project.source !== undefined) {
          link2.setAttribute("href", project.source);
          const button2 = document.createElement("div");
          button2.innerText = "source code";
          button2.classList.add("button");
          link2.appendChild(button2);
        }

        individualProject.appendChild(image);
        individualProject.appendChild(title);
        individualProject.appendChild(description);
        individualProject.appendChild(link);
        individualProject.appendChild(link2);

        projectsArea.appendChild(individualProject);
        projectsSection.appendChild(projectsArea);
      });
    }

    function addBio() {
      const divText = document.getElementById("content-text-about");
      const bio = document.createElement("p");
      bio.innerText = ABOUT.pt.intro;
      divText.appendChild(bio);
      const socialMediaLinks = document.getElementById("social-media-links");
      ABOUT.pt.socials.forEach((social) => {
        const link = document.createElement("a");
        const socialMediaLink = document.createElement("div");
        if (social.name === "Cats") {
          socialMediaLink.classList.add("cats");
        }
        if (social.name === "Contact") {
          socialMediaLink.classList.add("contact");
        } else {
          link.setAttribute("target", "_blank");
        }
        link.appendChild(socialMediaLink);
        socialMediaLink.style.backgroundImage = `url('${social.icon}')`;
        link.setAttribute("href", social.link);
        socialMediaLinks.appendChild(link);
      });
    }

    function addNamePosition() {
      container.appendChild(namePosition);
    }

    function start() {
      aboutButton.click();
    }

    // .children[0].innerText = ABOUT.pt.intro
    //     <div class="project">
    //     <img src="images/euz.JPG" alt="Project img" class="project-image">
    //     <h2 class="project-title">
    //         Project
    //     </h2>
    //     <p class="project-description">
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sit quaerat magnam
    //         consectetur nostrum ipsa magni dolores aperiam repellendus possimus animi accusantium
    //         deleniti, ipsum non?
    //     </p>
    // </div>
  },
  false
);
