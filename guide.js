// CREATE MAP
const map = L.map('map').setView([14.5823, 121.0333], 11);

// MAP TILES
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);

// LOCATIONS
const locations = [

    // BGC TAGUIG
    {
        name:"BGC High Street",
        type:"hotspot",
        lat:14.5518,
        lng:121.0514,
        info:"Major EV hotspot in Taguig"
    },
    {
        name:"SM Aura EV Charger",
        type:"station",
        lat:14.5478,
        lng:121.0544,
        info:"Public EV charging station"
    },

    // MAKATI
    {
        name:"Makati CBD",
        type:"hotspot",
        lat:14.5547,
        lng:121.0244,
        info:"Business district with growing EV users"
    },
    {
        name:"BYD Makati",
        type:"dealership",
        lat:14.5612,
        lng:121.0185,
        info:"Official BYD EV showroom"
    },

    // QUEZON CITY
    {
        name:"Quezon City Circle",
        type:"hotspot",
        lat:14.6507,
        lng:121.0494,
        info:"Popular EV activity area"
    },
    {
        name:"Ayala Malls Vertis North",
        type:"station",
        lat:14.6521,
        lng:121.0361,
        info:"Integrated EV charging hub"
    },

    // ORTIGAS
    {
        name:"Ortigas Center",
        type:"hotspot",
        lat:14.5865,
        lng:121.0611,
        info:"Commercial EV hotspot"
    },
    {
        name:"Estancia EV Charging Area",
        type:"station",
        lat:14.5764,
        lng:121.0635,
        info:"Modern EV charging station"
    },

    // PASIG
    {
        name:"Pasig EV Hub",
        type:"station",
        lat:14.5764,
        lng:121.0851,
        info:"Public EV charging access"
    },

    // PASAY
    {
        name:"SM Mall of Asia Charger",
        type:"station",
        lat:14.5350,
        lng:120.9822,
        info:"Fast EV charging station"
    },
    {
        name:"Nissan Manila Bay",
        type:"dealership",
        lat:14.5370,
        lng:120.9890,
        info:"Nissan EV dealership"
    },

    // ALABANG
    {
        name:"Alabang Town Center",
        type:"hotspot",
        lat:14.4235,
        lng:121.0298,
        info:"Southern Metro EV hotspot"
    },
    {
        name:"Filinvest Alabang Charger",
        type:"station",
        lat:14.4186,
        lng:121.0387,
        info:"EV charging available"
    }
];

// STORE MARKERS
let markers = [];

// RENDER MARKERS
function renderMarkers(filter){

    // REMOVE OLD MARKERS
    markers.forEach(marker=>{
        map.removeLayer(marker);
    });

    markers = [];

    // ADD NEW MARKERS
    locations.forEach(loc=>{

        if(loc.type === filter){

            let color;

            if(loc.type === "station"){
                color = "green";
            }
            else if(loc.type === "hotspot"){
                color = "orange";
            }
            else{
                color = "blue";
            }

            // CREATE MARKER
            const marker = L.circleMarker([loc.lat, loc.lng],{
                radius:10,
                fillColor:color,
                color:"#fff",
                weight:2,
                fillOpacity:0.9
            }).addTo(map);

         marker.bindPopup(`
  <div style="font-family:Poppins; min-width:180px;">
    <h3 style="margin-bottom:5px;">${loc.name}</h3>

    <p><b>Type:</b> ${loc.type.toUpperCase()}</p>

    <p><b>Info:</b> ${loc.info}</p>
  </div>
`);

            // SAVE MARKER
            markers.push(marker);
        }
    });
}

// FILTER BUTTONS
function filterMap(type, button){

    renderMarkers(type);

    // ACTIVE BUTTON
    document.querySelectorAll('.filter-btn').forEach(btn=>{
        btn.classList.remove('active-btn');
    });

    button.classList.add('active-btn');
}

// DEFAULT LOAD
renderMarkers('station');

const tips = [
  "Avoid leaving battery at 100% under heat to preserve battery health.",
  "Use overnight charging for convenience",
  "Use regenerative braking to extend range.",
  "Support clean energy goals like SDG 7: Affordable and Clean Energy",
  "Lower energy use = lower emissions",
  "Solar charging setups can lower electricity costs",
  "Share charging spaces fairly with other EV users",
  "Plan routes with charging stations for long trips", 
  "Regular maintenance keeps your EV efficient and safe",
  "EVs can save money on fuel and maintenance over time"
];

let tipIndex = 0;
function showTip() {
  const tipEl = document.getElementById("tipText");

  tipEl.style.opacity = 0;

  setTimeout(() => {
    tipEl.textContent = tips[tipIndex];
    tipEl.style.opacity = 1;

    tipIndex = (tipIndex + 1) % tips.length;
  }, 500);
}

// show first tip immediately
showTip();

// change every 5 seconds
setInterval(showTip, 5000);