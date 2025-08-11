fetch('data/packages.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Packages:", data);

        const section = document.querySelector("section.gallery");

        data.forEach(pkg => {
            const card = document.createElement("div");
            card.className = "card";
            section.appendChild(card);

            card.innerHTML = `
                <div class = "iconAndHeading">
                    <img class = "icon" src="${pkg.icon}">
                    <h2>${pkg.name}</h2>
                </div>
                <p>${pkg.description}</p>
                <a href = "${pkg.link}">View</a>
            `;
        });
    })
    .catch(error => console.error('Fetch error:', error));


    // Dark mode toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("manual-dark");
        if (document.documentElement.classList.contains("manual-dark")) {
            document.documentElement.style.setProperty("--bg-color", "#0f0f1a");
            document.documentElement.style.setProperty("--text-color", "#f5f5f5");
            document.documentElement.style.setProperty(
                "--card-bg",
                "rgba(255,255,255,0.05)"
            );
            themeToggle.textContent = "🌙";
        } else {
            document.documentElement.style.setProperty("--bg-color", "#f5f5f5");
            document.documentElement.style.setProperty("--text-color", "#222");
            document.documentElement.style.setProperty(
                "--card-bg",
                "rgba(255,255,255,0.7)"
            );
            themeToggle.textContent = "☀️";
        }
    });

    // Shooting stars background
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2,
    }));

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        stars.forEach((s) => {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
            s.x -= s.speed;
            s.y += s.speed * 0.5;
            if (s.x < 0 || s.y > canvas.height) {
                s.x = Math.random() * canvas.width;
                s.y = 0;
            }
        });
        requestAnimationFrame(drawStars);
    }
    drawStars();