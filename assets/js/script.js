$(document).ready(function () {
    // Navbar toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll events & scroll spy
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // EmailJS contact form
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");
        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                alert("Form Submitted Successfully");
                $("#contact-form")[0].reset();
            }, function (error) {
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
});

// Favicon and title change on visibility
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio Hiếu";
        $("#favicon").attr("href", "assets/images/avatar.jpg");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// Typed.js effect
if ($('.typing-text').length) {
    new Typed(".typing-text", {
        strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });
}

// Determine paths based on page location
function getPaths() {
    if (window.location.pathname.includes("/projects/")) {
        return { jsonPath: "./projects.json", imgPath: "../assets/images/projects/" };
    } else {
        return { jsonPath: "projects/projects.json", imgPath: "assets/images/projects/" };
    }
}

// Fetch JSON data
async function fetchData(type = "skills") {
    let path = type === "skills" ? "skills.json" : getPaths().jsonPath;
    const response = await fetch(path);
    return await response.json();
}

// Render skills
function showSkills(skills) {
    const container = document.getElementById("skillsContainer");
    if (!container) return;
    container.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill"/>
                <span>${skill.name}</span>
            </div>
        </div>
    `).join("");
}

// Render projects
function showProjects(projects) {
    const container = document.querySelector("#work .box-container");
    if (!container) return;

    const imgPath = getPaths().imgPath;
    container.innerHTML = projects.map(project => `
        <div class="box tilt">
            <img draggable="false" src="${imgPath}${project.image}" alt="${project.name}" />
            <div class="content">
                <div class="tag"><h3>${project.name}</h3></div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    // Vanilla Tilt
    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });

    // ScrollReveal for projects
    ScrollReveal().reveal('.work .box', { interval: 200 });
}

// Load data
fetchData().then(showSkills);
fetchData("projects").then(showProjects);

// Disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) ||
        (e.ctrlKey && e.keyCode === 85)) return false;
};
