/* =========================
   INITIAL SETUP
========================= */
const cars = document.querySelectorAll('.car');
let currentIndex = 0;

cars.forEach(car => {
  car.style.display = "none";
});

/* =========================
   UPDATE INFO CARD
========================= */
function updateInfo(car) {
  if (!car) return;

  document.getElementById('infoTitle').textContent = car.dataset.name;

  document.getElementById('infoRange').textContent = car.dataset.range || "—";
  document.getElementById('infoPrice').textContent = car.dataset.price || "—";

  document.getElementById('infoBattery').textContent = car.dataset.battery || "—";
  document.getElementById('infoCharge').textContent = car.dataset.charge || "—";

  document.getElementById('infoTopSpeed').textContent = car.dataset.topspeed || "—";

  document.getElementById('infoCO2').textContent =
    car.getAttribute('data-co2') || "—";
}

/* =========================
   BRAND FILTER
========================= */
function filterCars(brand) {
  const brandCars = Array.from(cars).filter(car =>
    car.dataset.brand === brand
  );

  cars.forEach(car => car.style.display = "none");
  brandCars.forEach(car => car.style.display = "flex");

  currentIndex = 0;
  updateCarousel(brandCars);
}

document.querySelectorAll('.brand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.brand-btn')
      .forEach(b => b.classList.remove('active-brand'));

    btn.classList.add('active-brand');
    filterCars(btn.dataset.brand);
  });
});

/* =========================
   CAROUSEL
========================= */
function updateCarousel(visibleCars) {
  visibleCars.forEach(car =>
    car.classList.remove('center-car', 'car-left', 'car-right')
  );

  if (visibleCars.length === 0) return;

  const center = currentIndex % visibleCars.length;
  const left = (center - 1 + visibleCars.length) % visibleCars.length;
  const right = (center + 1) % visibleCars.length;

  visibleCars[center].classList.add('center-car');
  visibleCars[left].classList.add('car-left');
  visibleCars[right].classList.add('car-right');

  updateInfo(visibleCars[center]);
}

/* =========================
   NAVIGATION
========================= */
const carsSection = document.querySelector('.cars-section');

const leftBtn = document.createElement('button');
leftBtn.className = 'nav-btn left';
leftBtn.innerHTML = '&#10094;';

const rightBtn = document.createElement('button');
rightBtn.className = 'nav-btn right';
rightBtn.innerHTML = '&#10095;';

carsSection.insertBefore(leftBtn, carsSection.firstChild);
carsSection.appendChild(rightBtn);

leftBtn.addEventListener('click', () => {
  const visibleCars = Array.from(cars).filter(car => car.style.display === "flex");
  currentIndex = (currentIndex - 1 + visibleCars.length) % visibleCars.length;
  updateCarousel(visibleCars);
});

rightBtn.addEventListener('click', () => {
  const visibleCars = Array.from(cars).filter(car => car.style.display === "flex");
  currentIndex = (currentIndex + 1) % visibleCars.length;
  updateCarousel(visibleCars);
});

/* =========================
   HOVER
========================= */
cars.forEach(car => {
  car.addEventListener('mouseenter', () => updateInfo(car));
});

/* =========================
   HELPERS
========================= */
function getNum(value) {
  if (!value || value === "—") return 0;
  return parseFloat(value.replace(/[^\d.]/g, '')) || 0;
}

/* =========================
   COMPARE SYSTEM
========================= */
let compareQueue = [];

document.querySelectorAll('.compare-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const car = btn.closest('.car');

    const data = {
      name: car.dataset.name,
      range: car.dataset.range,
      speed: car.dataset.speed,
      accel: car.dataset.accel,
      charge: car.dataset.charge,
      battery: car.dataset.battery,
      topspeed: car.dataset.topspeed,
      price: car.dataset.price,
      image: car.dataset.image,
      co2: car.dataset.co2,
      ac: car.dataset.ac,
      dc: car.dataset.dc,
      power: car.dataset.power,
      efficiency: car.dataset.efficiency,
      batterytype: car.dataset.batterytype,
      seating: car.dataset.seating,
      energy: car.dataset.energy,
      sustainability: car.dataset.sustainability,
      emissions: car.dataset.emissions

    };

    if (compareQueue.find(c => c.name === data.name)) {
      compareQueue = compareQueue.filter(c => c.name !== data.name);
      btn.textContent = "Compare";
      return;
    }

    if (compareQueue.length >= 2) {
      compareQueue.shift();
      document.querySelectorAll('.compare-btn')
        .forEach(b => b.textContent = "Compare");
    }

    compareQueue.push(data);
    btn.textContent = "✓ Selected";

    if (compareQueue.length === 2) {
      openModal();
    }
  });
});

/* =========================
   OPEN MODAL 
========================= */
function openModal() {
  const [c1, c2] = compareQueue;
  if (!c1 || !c2) return;

  // FIX: SHOW NAMES
  document.getElementById('car1Label').textContent = c1.name;
  document.getElementById('car2Label').textContent = c2.name;

  document.getElementById('compareImg1').src = c1.image;
  document.getElementById('compareImg2').src = c2.image;

  // SHOW ALL DATA
  document.getElementById('range1').textContent = c1.range;
  document.getElementById('range2').textContent = c2.range;

  document.getElementById('speed1').textContent = c1.accel || c1.speed;
  document.getElementById('speed2').textContent = c2.accel || c2.speed;

  document.getElementById('charge1').textContent = c1.charge;
  document.getElementById('charge2').textContent = c2.charge;

  document.getElementById('battery1').textContent = c1.battery;
  document.getElementById('battery2').textContent = c2.battery;

  document.getElementById('top1').textContent = c1.topspeed;
  document.getElementById('top2').textContent = c2.topspeed;

  document.getElementById('price1').textContent = c1.price;
  document.getElementById('price2').textContent = c2.price;


document.getElementById('power1').textContent = c1.power;
document.getElementById('power2').textContent = c2.power;

document.getElementById('eff1').textContent = c1.efficiency;
document.getElementById('eff2').textContent = c2.efficiency;

document.getElementById('bt1').textContent = c1.batterytype;
document.getElementById('bt2').textContent = c2.batterytype;

document.getElementById('seat1').textContent = c1.seating;
document.getElementById('seat2').textContent = c2.seating;

document.getElementById('energy1').textContent = c1.energy;
document.getElementById('energy2').textContent = c2.energy;

document.getElementById('sus1').textContent = c1.sustainability;
document.getElementById('sus2').textContent = c2.sustainability;

document.getElementById('em1').textContent = c1.emissions;
document.getElementById('em2').textContent = c2.emissions;

document.getElementById('co21').textContent = c1.co2;
document.getElementById('co22').textContent = c2.co2;

  // FIXED WINNER LOGIC
  const r1 = getNum(c1.range);
  const r2 = getNum(c2.range);

  const s1 = getNum(c1.accel || c1.speed);
  const s2 = getNum(c2.accel || c2.speed);

  const scoreA = (r1 * 2) - (s1 * 10);
  const scoreB = (r2 * 2) - (s2 * 10);

  document.getElementById('overallWinner').textContent =
    scoreA > scoreB ? "Winner: " + c1.name :
    scoreB > scoreA ? "Winner: " + c2.name :
    "Winner: Tie";

  document.getElementById('compareModal').classList.add('open');
}

/* =========================
   CLOSE MODAL
========================= */
document.getElementById('closeCompare').addEventListener('click', () => {
  document.getElementById('compareModal').classList.remove('open');
  compareQueue = [];

  document.querySelectorAll('.compare-btn')
    .forEach(b => b.textContent = "Compare");
});

/* =========================
   DEFAULT LOAD
========================= */
window.addEventListener("DOMContentLoaded", () => {
  filterCars("BYD");

  document.querySelectorAll(".brand-btn").forEach(b => {
    b.classList.remove("active-brand");
    if (b.dataset.brand === "BYD") {
      b.classList.add("active-brand");
    }
  });
});
