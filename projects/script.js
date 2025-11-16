$(document).ready(function () {
    // Navbar toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
});

// Favicon & title change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Hiếu";
        $("#favicon").attr("href", "../assets/images/avatar.jpg");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "../assets/images/favhand.png");
    }
});

// Fetch projects JSON
function getProjects() {
    return fetch("projects.json").then(res => res.json());
}

function showProjects(projects) {
    const container = $(".work .box-container");
    container.html("");

    projects.forEach(project => {
        container.append(`
        <div class="grid-item ${project.category}">
            <div class="box tilt" style="width:380px; margin:1rem">
                <img draggable="false" src="../assets/images/projects/${project.image}.PNG" alt="${project.name}" />
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
        </div>
        `);
    });

    // Isotope filter
    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

// Load projects
getProjects().then(showProjects);
