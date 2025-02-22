document.addEventListener('DOMContentLoaded', () => {
    const universe = document.querySelector('.universe');
    const planets = document.querySelector('.planets');
    const modal = document.querySelector('.modal');
    let isDragging = false;
    let startX, startY;
    let rotationX = 0, rotationY = 0, rotationZ = 0;

    const planetNames = [
        "微笑星球", "温柔星球", "梦想星球", "勇气星球", 
        "希望星球", "幸福星球", "回忆星球", "阳光星球",
        "思念星球", "心动星球", "浪漫星球", "期待星球"
    ];
    
    function getRandomName() {
        return planetNames[Math.floor(Math.random() * planetNames.length)];
    }

    function createPlanetHTML(imagePath) {
        const planetName = getRandomName(); // 获取随机星球名字
        return `
            <div class="planet">
                <div class="planet-body">
                    <img src="${imagePath}" alt="${planetName}"> <!-- 使用星球名字作为 alt 属性 -->
                </div>
                <!-- 删除星球名字的 div -->
                <!-- <div class="planet-name">${planetName}</div> -->
            </div>
        `;
    }

    function loadImages() {
        const imageFiles = [];
        for (let i = 1; i <= 50; i++) {
            imageFiles.push(`image${i}.jpg`);
        }

        planets.innerHTML = '';
        imageFiles.forEach(fileName => {
            planets.insertAdjacentHTML('beforeend', 
                createPlanetHTML(`images/${fileName}`));
        });

        initPlanets();
    }

    function initPlanets() {
        const planetElements = document.querySelectorAll('.planet');

        planetElements.forEach((planet) => {
            const x = (Math.random() - 0.5) * 140; // 随机 x 坐标，范围为 -70 到 70
            const y = (Math.random() - 0.5) * 140; // 随机 y 坐标，范围为 -70 到 70
            const z = (Math.random() - 0.5) * 100; // 随机 z 坐标，范围为 -50 到 50

            planet.style.transform = `translate3d(${x}vw, ${y}vw, ${z}vw) scale(0.4)`;
        });

        planetElements.forEach(planet => {
            planet.addEventListener('click', (e) => {
                const img = planet.querySelector('img');
                modal.querySelector('img').src = img.src;

                // 从 planetNames 数组中随机获取星球名字
                const randomPlanetName = getRandomName(); 
                modal.querySelector('.modal-description').textContent = randomPlanetName; // 设置为随机星球名字

                modal.style.display = 'block'; // 显示模态框
                e.stopPropagation();
            });
        });

        updateRotation(rotationX, rotationY, rotationZ);
    }

    universe.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        startY = e.pageY;
    });

    universe.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.pageX - startX;
        const deltaY = e.pageY - startY;
        rotationY += deltaX * 0.2; // 更新 Y 轴旋转
        rotationX -= deltaY * 0.2; // 更新 X 轴旋转
        startX = e.pageX;
        startY = e.pageY;

        updateRotation(rotationX, rotationY, rotationZ);
    });

    universe.addEventListener('mouseup', () => isDragging = false);
    universe.addEventListener('mouseleave', () => isDragging = false);

    universe.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
    });

    universe.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].pageX - startX;
        const deltaY = e.touches[0].pageY - startY;
        rotationY += deltaX * 0.2;
        rotationX -= deltaY * 0.2;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;

        updateRotation(rotationX, rotationY, rotationZ);
    });

    universe.addEventListener('touchend', () => isDragging = false);
    modal.addEventListener('click', () => modal.style.display = 'none');

    loadImages();
});

function updateRotation(rotX, rotY, rotZ) {
    const planets = document.querySelector('.planets');
    planets.style.transform = `
        translate(-50%, -50%) 
        translateZ(-100vw)
        rotateY(${rotY}deg)
        rotateX(${rotX}deg)
        rotateZ(${rotZ}deg)
    `;

    document.querySelectorAll('.planet-body').forEach(body => {
        body.style.transform = `rotateY(${-rotY}deg) rotateX(${-rotX}deg) rotateZ(${-rotZ}deg)`;
    });
} 