const CITY_ADJACENCY = {
    // NCR - Central
    'Manila': ['Navotas', 'Caloocan', 'Quezon City', 'San Juan', 'Mandaluyong', 'Makati', 'Pasay'],
    'Quezon City': ['Caloocan', 'Valenzuela', 'San Juan', 'Manila', 'Mandaluyong', 'Pasig', 'Marikina'],
    'San Juan': ['Manila', 'Quezon City', 'Mandaluyong'],
    'Mandaluyong': ['San Juan', 'Manila', 'Makati', 'Pasig', 'Quezon City'],
    
    // NCR - Camanava Area
    'Caloocan': ['Manila', 'Navotas', 'Malabon', 'Valenzuela', 'Quezon City'],
    'Malabon': ['Navotas', 'Caloocan', 'Valenzuela'],
    'Navotas': ['Manila', 'Malabon', 'Caloocan'],
    'Valenzuela': ['Malabon', 'Caloocan', 'Quezon City'],

    // NCR - Southern Metro
    'Makati': ['Manila', 'Mandaluyong', 'Pasig', 'Pateros', 'Taguig', 'Pasay'],
    'Pasay': ['Manila', 'Makati', 'Taguig', 'Parañaque'],
    'Pasig': ['Mandaluyong', 'Quezon City', 'Marikina', 'Taguig', 'Pateros', 'Makati'],
    'Pateros': ['Makati', 'Pasig', 'Taguig'],
    'Taguig': ['Pateros', 'Makati', 'Pasay', 'Pasig', 'Parañaque', 'Muntinlupa'],
    'Parañaque': ['Pasay', 'Taguig', 'Muntinlupa', 'Las Piñas'],
    'Las Piñas': ['Parañaque', 'Muntinlupa'],
    'Muntinlupa': ['Taguig', 'Parañaque', 'Las Piñas'],

    // NCR - Eastern Metro
    'Marikina': ['Quezon City', 'Pasig'],
};


function getCityDistanceBFS(from, to) {
    if (!from || !to || !CITY_ADJACENCY[from] || !CITY_ADJACENCY[to]) {
        return Infinity;
    }
    if (from === to) return 0;

    const visited = new Set();
    const queue = [[from, 0]];

    visited.add(from);

    while (queue.length > 0) {
        const [current, dist] = queue.shift();
        if (current === to) return dist;

        (CITY_ADJACENCY[current] || []).forEach(next => {
            if (!visited.has(next)) {
                visited.add(next);
                queue.push([next, dist + 1]);
            }
        });
    }
    return Infinity;
}

function parseCityFromAddress(address) {
    if (!address) return null;
    const lowerCaseAddress = address.toLowerCase();

    
    for (const city of Object.keys(CITY_ADJACENCY)) {
        if (lowerCaseAddress.includes(city.toLowerCase())) {
            return city;
        }
    }
    return null;
}

function ProximityPts(distance) {
    if (distance === Infinity) {
        return 0;
    }
    
    const grade = 10 - (distance * 2);
   
    return Math.max(0, grade);
}


module.exports = {
    getCityDistanceBFS,
    parseCityFromAddress,
    ProximityPts, 
    CITY_ADJACENCY
};
