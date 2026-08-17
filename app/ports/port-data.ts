export type Activity = {
  title: string;
  note: string;
  search: string;
};

export type ActivitySet = readonly [Activity, Activity, Activity];

export type Port = {
  slug: string;
  name: string;
  searchName: string;
  region: string;
  country: string;
  heroLine: string;
  portNote: string;
  topActivities: ActivitySet;
  nicheActivities: ActivitySet;
};

const activity = (title: string, note: string, search = title): Activity => ({ title, note, search });

const port = (
  slug: string,
  name: string,
  searchName: string,
  region: string,
  country: string,
  heroLine: string,
  portNote: string,
  topActivities: ActivitySet,
  nicheActivities: ActivitySet,
): Port => ({ slug, name, searchName, region, country, heroLine, portNote, topActivities, nicheActivities });

export const ports: Port[] = [
  // Caribbean & Bahamas
  port(
    "nassau", "Nassau", "Nassau Bahamas", "Caribbean & Bahamas", "The Bahamas",
    "Choose one strong island experience instead of another crowded port-day checklist.",
    "Most independent pickups are outside the terminal or at an agreed downtown point—check the listing before booking.",
    [
      activity("Private Nassau & Paradise Island drive", "A flexible three-hour introduction for history, viewpoints and local stops."),
      activity("Rose Island snorkeling & turtles", "A boat day built around clear water, reef time and marine life."),
      activity("Nassau food & rum tasting walk", "Downtown flavours, local stories and a port-friendly walking format."),
    ],
    [
      activity("Clifton Heritage Park snorkel", "Combine underwater sculpture, beach time and Bahamian history."),
      activity("Private fishing charter", "A quieter alternative for small parties who want time on the water."),
      activity("Junkanoo culture workshop", "Go beyond the beach with music, costume craft and local tradition."),
    ],
  ),
  port(
    "cozumel", "Cozumel", "Cozumel Mexico", "Caribbean & Bahamas", "Mexico",
    "Cozumel rewards a focused reef, beach or private-island day—not a generic highlights tour.",
    "Cozumel has several cruise piers. Confirm which pier your ship uses and whether pickup is inside or outside it.",
    [
      activity("Palancar & Colombia Reef snorkel", "Target Cozumel's signature southern reefs rather than a vague snorkel stop."),
      activity("Private island driver for the day", "Build your own route around beaches, viewpoints, food and ruins."),
      activity("Catamaran sail to El Cielo", "Shallow turquoise water, starfish and an easy Caribbean boat day."),
    ],
    [
      activity("Punta Sur eco-park by Jeep", "Lighthouse views, lagoons and the quieter southern end of the island."),
      activity("Cozumel taco & market crawl", "A compact local-food route away from the cruise-pier chains."),
      activity("Chocolate workshop with Mayan flavours", "A hands-on indoor option that works well for mixed-age groups."),
    ],
  ),
  port(
    "roatan", "Roatán", "Roatan Honduras", "Caribbean & Bahamas", "Honduras",
    "Pair one memorable wildlife or reef experience with a private island route.",
    "Mahogany Bay and Coxen Hole have different independent pickup arrangements; read the operator instructions carefully.",
    [
      activity("Sloth sanctuary & island highlights", "Combine Roatán's best-known wildlife encounter with a private scenic drive."),
      activity("West Bay reef snorkel & beach", "Use the island's clearest reef access for a focused beach-and-water day."),
      activity("Custom private driver tour", "Choose viewpoints, local food, villages and beach time at your own pace."),
    ],
    [
      activity("Garifuna culture in Punta Gorda", "Meet the island's living cultural heritage through food, music and community."),
      activity("Mangrove tunnel boat trip", "Explore Roatán's less-visited eastern waterways and fishing communities."),
      activity("Roatán rum, chocolate & brewery trail", "A low-intensity tasting route that stays flexible around ship time."),
    ],
  ),
  port(
    "costa-maya", "Costa Maya", "Costa Maya Mexico", "Caribbean & Bahamas", "Mexico",
    "Use the port call for either serious Maya history or a deliberately slow Caribbean day.",
    "The cruise complex is separate from Mahahual village; independent operators normally specify an outside-port meeting point.",
    [
      activity("Chacchoben Maya ruins", "The strongest archaeological day within practical reach of Costa Maya."),
      activity("Bacalar Lagoon boat experience", "See the Lagoon of Seven Colors when the port schedule allows the longer drive."),
      activity("Mahahual beach escape", "A simple beach-club day close enough to keep the return low-stress."),
    ],
    [
      activity("Maya family cooking experience", "Learn regional techniques and eat with a local host rather than rushing between sights."),
      activity("Costa Maya fly-fishing", "A specialist option for anglers seeking flats and lagoon water."),
      activity("Dzibanché ruins private route", "A longer, quieter archaeological alternative to Chacchoben."),
    ],
  ),
  port(
    "san-juan", "San Juan", "San Juan Puerto Rico", "Caribbean & Bahamas", "Puerto Rico",
    "Old San Juan is walkable from the pier; use an excursion for what lies beyond it.",
    "Ships can dock in Old San Juan or at Pan American Pier, so verify the meeting point before assuming you can walk.",
    [
      activity("El Yunque rainforest & waterfalls", "Leave the city for Puerto Rico's signature rainforest landscape."),
      activity("Old San Juan food walk", "Use local dishes to unlock the history behind the colourful streets."),
      activity("Bioluminescent bay evening kayak", "A rare natural experience for ships staying late or overnight."),
    ],
    [
      activity("Afro-Puerto Rican Loíza experience", "Explore bomba, food and cultural history east of the capital."),
      activity("Rum distillery tasting route", "Compare Puerto Rico's rum traditions beyond a single bar stop."),
      activity("Private street-art tour in Santurce", "A contemporary counterpoint to the forts and colonial old town."),
    ],
  ),
  port(
    "st-thomas", "St. Thomas", "St Thomas US Virgin Islands", "Caribbean & Bahamas", "U.S. Virgin Islands",
    "The best independent days combine one viewpoint, one beach and enough time to enjoy both.",
    "Confirm whether your ship docks at Havensight, Crown Bay or anchors; pickup logistics differ.",
    [
      activity("Magens Bay & island viewpoints", "Link the island's classic beach with Mountain Top and harbour panoramas."),
      activity("St. John beach & snorkel escape", "Use a boat transfer to reach the national-park beaches of neighbouring St. John."),
      activity("Private catamaran sail", "A flexible small-party route for snorkeling, coves and an uncrowded deck."),
    ],
    [
      activity("Historic Charlotte Amalie walk", "Climb the 99 Steps and unpack the port's Danish-Caribbean history."),
      activity("Coral World & Coki Beach", "A compact family pairing of marine life and easy beach access."),
      activity("Water Island e-bike loop", "See a quieter harbour island with beaches and Second World War history."),
    ],
  ),
  port(
    "st-maarten", "St. Maarten", "St Maarten", "Caribbean & Bahamas", "Sint Maarten",
    "Choose between the island's two cultures, its dramatic airport beach and its open water.",
    "Most ships dock at Philipsburg's cruise facility; independent meeting points may be beyond the secure port area.",
    [
      activity("Dutch & French island highlights", "Compare Philipsburg, Marigot, viewpoints and beaches in one private loop."),
      activity("Maho Beach plane-spotting", "Time the famous runway view without sacrificing a comfortable return buffer."),
      activity("Tintamarre catamaran & snorkel", "Sail to clear water and possible turtle sightings off the French side."),
    ],
    [
      activity("Grand Case food crawl", "Taste the island's French-Caribbean side in its strongest dining village."),
      activity("Loterie Farm treetop adventure", "A forested alternative to the beach with zip-lines and hillside pools."),
      activity("Rhino Rider lagoon boats", "Drive a small inflatable boat through lagoon and coastal water."),
    ],
  ),
  port(
    "grand-cayman", "Grand Cayman", "Grand Cayman", "Caribbean & Bahamas", "Cayman Islands",
    "Grand Cayman's standout experiences are on the water, but its quieter east side is the better surprise.",
    "George Town is normally a tender port. Build tender time into any independent meeting arrangement.",
    [
      activity("Stingray City & reef snorkel", "Combine the shallow sandbar encounter with a genuine reef stop."),
      activity("Seven Mile Beach day", "Keep the day simple with one of the Caribbean's most accessible beaches."),
      activity("Private Cayman island drive", "Cover the Turtle Centre, Hell, viewpoints and your preferred beach stop."),
    ],
    [
      activity("Bioluminescent Bay kayak", "A night-only natural spectacle suited to late departures and overnights."),
      activity("East End caves & blowholes", "Escape the busiest western corridor for limestone caves and rugged coast."),
      activity("Cayman food & rum route", "Taste local staples and distilling history away from the beach clubs."),
    ],
  ),
  port(
    "puerto-plata", "Puerto Plata", "Puerto Plata Dominican Republic", "Caribbean & Bahamas", "Dominican Republic",
    "Puerto Plata works best when you choose either waterfalls, mountain views or the city's cultural core.",
    "Amber Cove and Taino Bay are different terminals; verify your ship and the operator's pickup instructions.",
    [
      activity("27 Waterfalls of Damajagua", "Swim, slide and jump through the region's most distinctive adventure route."),
      activity("Mount Isabel & Puerto Plata city", "Pair cable-car views with rum, amber and Victorian streets."),
      activity("Private beach & countryside drive", "Set the pace around coast, villages and a beach that suits your group."),
    ],
    [
      activity("Dominican cacao farm visit", "See how cacao is grown and processed before a local tasting."),
      activity("Cabarete surf or kite lesson", "Use the north coast's wind and waves for an active port day."),
      activity("Baseball culture experience", "Explore the sport's outsized role in Dominican life with a local guide."),
    ],
  ),
  port(
    "ocho-rios", "Ocho Rios", "Ocho Rios Jamaica", "Caribbean & Bahamas", "Jamaica",
    "Trade the standard bus loop for one water adventure and one taste of Jamaica.",
    "Ocho Rios has multiple berths and occasional tendering. Check the operator's named terminal meeting point.",
    [
      activity("Dunn's River Falls climb", "Take on Jamaica's best-known cascade with transport timed for cruise calls."),
      activity("Blue Hole swim & waterfalls", "Choose a more natural river-and-jungle alternative to the main attraction."),
      activity("Bamboo rafting on the White River", "A slower river experience with scenery and local storytelling."),
    ],
    [
      activity("Nine Mile Bob Marley journey", "Travel inland to the musician's birthplace and cultural roots."),
      activity("Jamaican cooking in the hills", "Make jerk flavours and market ingredients the centre of the day."),
      activity("Konoko Falls & garden walk", "A calmer botanical and waterfall option close to town."),
    ],
  ),
  port(
    "bridgetown", "Bridgetown", "Barbados", "Caribbean & Bahamas", "Barbados",
    "Barbados offers a real choice between turtles, Atlantic scenery and a serious food culture.",
    "The cruise terminal sits west of central Bridgetown; confirm whether pickup is at the terminal gate or inside the facility.",
    [
      activity("Carlisle Bay turtles & shipwrecks", "Snorkel with turtles over accessible wrecks close to the cruise port."),
      activity("Barbados island highlights", "Link Bathsheba, St. John's Parish Church and contrasting coasts."),
      activity("Mount Gay rum & Bajan food", "Build the day around the island's rum history and strongest local flavours."),
    ],
    [
      activity("Hunte's Gardens & Harrison's Cave", "Pair tropical garden design with the island's limestone interior."),
      activity("East Coast e-bike ride", "Experience the wilder Atlantic side at a pace that still allows stops."),
      activity("Oistins fish-market experience", "A food-first option best suited to ships with a later departure."),
    ],
  ),
  port(
    "castries", "Castries", "St Lucia", "Caribbean & Bahamas", "Saint Lucia",
    "Saint Lucia's signature port day is the journey to the Pitons—by road, boat or both.",
    "Castries and Pointe Seraphine are close but distinct docking areas; follow the listing's exact pickup point.",
    [
      activity("Pitons, Soufrière & mud baths", "Cover the island's defining peaks, volcanic landscape and west-coast scenery."),
      activity("Coastal speedboat to the Pitons", "Avoid much of the winding road and see Saint Lucia from the water."),
      activity("Rainforest aerial tram", "A gentler way to experience the island's interior canopy and birdlife."),
    ],
    [
      activity("Castries market & Creole food walk", "Keep close to port while exploring everyday Saint Lucian flavours."),
      activity("Bean-to-bar cacao experience", "Follow Saint Lucia's cacao story in a small plantation setting."),
      activity("Private Tet Paul nature trail", "Get one of the best Piton views without committing to the Gros Piton climb."),
    ],
  ),

  // Mediterranean & Adriatic
  port(
    "barcelona", "Barcelona", "Barcelona Spain", "Mediterranean & Adriatic", "Spain",
    "Use your port day for Gaudí, the old city or Montserrat—not a rushed combination of all three.",
    "Most cruise berths require the port shuttle or arranged transport before independent sightseeing begins.",
    [
      activity("Sagrada Família & Gaudí highlights", "Prioritise timed entry and two or three defining works instead of a drive-by tour."),
      activity("Gothic Quarter food walk", "Combine compact old-city sightseeing with Catalan markets and tastings."),
      activity("Private Barcelona highlights drive", "A flexible half-day route with port pickup and stops chosen for your party."),
    ],
    [
      activity("Montserrat monastery escape", "Leave the city for serrated mountains and Catalonia's spiritual landmark."),
      activity("Modernist architecture beyond Gaudí", "Explore the work of Domènech i Montaner and the wider Catalan movement."),
      activity("Barcelona vermouth workshop", "A short, local ritual that fits around independent city exploration."),
    ],
  ),
  port(
    "civitavecchia-rome", "Civitavecchia / Rome", "Civitavecchia Rome", "Mediterranean & Adriatic", "Italy",
    "The transfer is the constraint: choose one disciplined Rome route and protect the return.",
    "Rome is roughly 70–80 km from the port. Confirm port pickup, entrance times and the planned return before booking.",
    [
      activity("Private Rome-in-a-day driver", "Use door-to-door transport to connect the city's major districts efficiently."),
      activity("Colosseum, Forum & ancient Rome", "Build the day around timed archaeological entry and a focused historic route."),
      activity("Vatican Museums & St. Peter's", "Prioritise the Vatican with pre-arranged entry and realistic transfer time."),
    ],
    [
      activity("Cerveteri Etruscan tombs", "A major UNESCO site much closer to port than central Rome."),
      activity("Tarquinia old town & necropolis", "Choose Etruscan history and a slower local day without the Rome transfer."),
      activity("Civitavecchia market cooking class", "Stay near port for regional food, market ingredients and hands-on cooking."),
    ],
  ),
  port(
    "livorno-florence", "Livorno / Florence", "Livorno Florence Pisa", "Mediterranean & Adriatic", "Italy",
    "Florence, Pisa and Tuscany compete for one port day; the best choice is usually one, not all.",
    "Livorno's industrial port requires a shuttle or authorized pickup. Florence is a long transfer, so entrance times matter.",
    [
      activity("Private Florence highlights from Livorno", "Focus on Florence's historic core with transport aligned to the ship."),
      activity("Pisa & Lucca day trip", "Pair the Leaning Tower with a calmer walled Tuscan city."),
      activity("Bolgheri wine-country route", "Choose coastal Tuscany, cellar visits and villages over a long city transfer."),
    ],
    [
      activity("Livorno canals & market food walk", "Discover the port city's Venetian quarter and strong seafood tradition."),
      activity("Carrara marble quarries by 4x4", "See the dramatic working landscape behind Renaissance sculpture."),
      activity("Puccini lake & villa route", "A quieter cultural day around Torre del Lago and the composer's world."),
    ],
  ),
  port(
    "naples", "Naples", "Naples Italy", "Mediterranean & Adriatic", "Italy",
    "Naples offers four world-class directions; choose Pompeii, the Amalfi Coast, Capri or the city itself.",
    "The city centre is walkable from the cruise terminal, but Pompeii, Capri and the Amalfi Coast need separate logistics.",
    [
      activity("Pompeii with an archaeologist", "Use expert context to make a short visit to the vast site genuinely worthwhile."),
      activity("Amalfi Coast private drive", "Prioritise one or two coastal towns and avoid an overpacked return journey."),
      activity("Capri private boat day", "See caves, coves and the island from the water rather than queuing for road transport."),
    ],
    [
      activity("Naples street-food walk", "Stay close to port for pizza, sfogliatella and the city's energetic historic lanes."),
      activity("Herculaneum & Vesuvius", "Choose better-preserved Roman interiors and the volcanic landscape behind them."),
      activity("Campi Flegrei volcanic route", "Explore Solfatara country, Baiae and submerged Roman history west of Naples."),
    ],
  ),
  port(
    "marseille", "Marseille", "Marseille France", "Mediterranean & Adriatic", "France",
    "Marseille is strongest when you choose between the Calanques, Provence or the city's own character.",
    "Cruise berths can be several kilometres from the Old Port; verify shuttle and independent pickup arrangements.",
    [
      activity("Calanques coastal boat trip", "See Marseille's limestone coves from the water in a port-friendly format."),
      activity("Aix-en-Provence & countryside", "Pair elegant streets and markets with a manageable inland transfer."),
      activity("Marseille food & old-port walk", "Use bouillabaisse, panisse and immigrant food culture to understand the city."),
    ],
    [
      activity("Cassis wine & fishing village", "Combine coastal vineyards with a smaller harbour beneath the cliffs."),
      activity("Le Corbusier architecture tour", "Explore Marseille's modernist landmark and post-war design story."),
      activity("Soap-making workshop", "Make Marseille's historic craft the centre of a short hands-on experience."),
    ],
  ),
  port(
    "palma-de-mallorca", "Palma de Mallorca", "Palma de Mallorca", "Mediterranean & Adriatic", "Spain",
    "Mallorca offers far more than a beach transfer: mountains, stone villages and serious food are within reach.",
    "Palma's cruise terminals are spread along the harbour; account for the shuttle before setting a meeting point.",
    [
      activity("Palma old town & cathedral", "A focused walk through La Seu, courtyards and the historic centre."),
      activity("Sóller vintage train & mountain villages", "Cross the Tramuntana landscape by historic rail and local road."),
      activity("Private Mallorca island drive", "Choose viewpoints, villages and one beach without following a coach timetable."),
    ],
    [
      activity("Mallorcan market cooking class", "Turn island produce and family recipes into a hands-on port day."),
      activity("Sea-cave kayak adventure", "Explore limestone coves and caves from the water with a local guide."),
      activity("Tramuntana olive-oil tasting", "Visit a mountain estate and learn how Mallorca's historic groves are worked."),
    ],
  ),
  port(
    "athens-piraeus", "Athens / Piraeus", "Athens Piraeus", "Mediterranean & Adriatic", "Greece",
    "Athens works when the Acropolis is timed first and the rest of the route remains flexible.",
    "Piraeus has multiple cruise terminals. Confirm the terminal and pickup before planning the journey into Athens.",
    [
      activity("Acropolis & ancient Athens", "Secure timed entry and connect the major classical sites with expert context."),
      activity("Private Athens highlights drive", "Cover viewpoints, the Acropolis district and modern civic landmarks efficiently."),
      activity("Athens food-market walk", "Use the central market, meze and neighbourhood stops to see beyond the ruins."),
    ],
    [
      activity("Cape Sounion & Temple of Poseidon", "Follow the Athenian Riviera to a cliff-top temple outside the city."),
      activity("Piraeus neighbourhood food tour", "Stay closer to the ship while exploring a real port-city food culture."),
      activity("Ancient pottery workshop", "Make Greek craft and archaeological techniques a hands-on experience."),
    ],
  ),
  port(
    "santorini", "Santorini", "Santorini Greece", "Mediterranean & Adriatic", "Greece",
    "Beat the island's bottlenecks by choosing one route built around views, villages or wine.",
    "Most cruise visitors tender and use the cable car, boats or steep paths. Allow substantial time for the return queue.",
    [
      activity("Private Oia, Firostefani & island views", "Connect the essential caldera viewpoints with private transport."),
      activity("Santorini winery & volcanic wine tasting", "Understand the island through assyrtiko, basket vines and volcanic soil."),
      activity("Caldera sailing & hot springs", "See the cliffs from below with swim stops and a less crowded perspective."),
    ],
    [
      activity("Akrotiri prehistoric city", "Explore the preserved Bronze Age settlement before a quieter south-island stop."),
      activity("Traditional villages photography route", "Trade Oia-only crowds for Pyrgos, Megalochori and carefully chosen light."),
      activity("Santorini farm & tomato workshop", "Discover the island's distinctive produce and agricultural history."),
    ],
  ),
  port(
    "mykonos", "Mykonos", "Mykonos Greece", "Mediterranean & Adriatic", "Greece",
    "Mykonos is more rewarding when the old town is paired with Delos, a beach or the rural interior.",
    "Ships may dock at Tourlos or tender to the old port. Verify which arrival applies before choosing transport.",
    [
      activity("Delos archaeological island", "Visit one of Greece's most important ancient sanctuaries by boat from Mykonos."),
      activity("Mykonos old town & island highlights", "Combine the lanes, windmills and a few inland viewpoints without overpacking."),
      activity("South-coast beach cruise", "Reach coves and beach areas from the water instead of fighting road traffic."),
    ],
    [
      activity("Mykonian farm lunch", "Meet the island's rural side through cheese, produce and family cooking."),
      activity("Armenistis lighthouse e-bike ride", "Use a quieter northern route for open views and active exploration."),
      activity("Private mosaic workshop", "Create a Greek-inspired piece during a compact, weather-proof session."),
    ],
  ),
  port(
    "dubrovnik", "Dubrovnik", "Dubrovnik Croatia", "Mediterranean & Adriatic", "Croatia",
    "The strongest Dubrovnik day pairs the old city with one elevated or coastal perspective.",
    "Most ships berth at Gruž, while some tender near the old town. Traffic and terminal location change the practical itinerary.",
    [
      activity("Old town & city walls with a local", "Understand Dubrovnik's history before walking its defining fortifications."),
      activity("Mount Srđ panorama & old town", "Combine the classic elevated view with a focused historic-city visit."),
      activity("Private Dubrovnik & Cavtat route", "Pair the walled city with a calmer coastal town and scenic drive."),
    ],
    [
      activity("Elafiti Islands speedboat", "Use a private boat for caves, coves and villages beyond the city crowds."),
      activity("Konavle wine & village lunch", "Explore Dubrovnik's rural hinterland through family wineries and food."),
      activity("Sea-kayak beneath the walls", "See the fortifications from water level on an active compact route."),
    ],
  ),
  port(
    "split", "Split", "Split Croatia", "Mediterranean & Adriatic", "Croatia",
    "Split gives you a Roman palace at the pier and waterfalls, islands or food beyond it.",
    "Many ships dock or tender close to the old city; longer trips need a firm return plan around regional traffic.",
    [
      activity("Diocletian's Palace with a historian", "Turn the living Roman complex into more than a quick old-town walk."),
      activity("Krka waterfalls & Šibenik", "Pair nature with a historic Adriatic city on a full but coherent route."),
      activity("Blue Lagoon speedboat", "Use a small boat for clear-water swim stops and nearby island villages."),
    ],
    [
      activity("Klis Fortress & Salona", "Explore the strategic fortress and the Roman capital just outside Split."),
      activity("Split market cooking class", "Shop the green market, then prepare Dalmatian dishes with a local host."),
      activity("Cetina River canyoning", "Choose a high-energy inland adventure for a longer port call."),
    ],
  ),
  port(
    "kotor", "Kotor", "Kotor Montenegro", "Mediterranean & Adriatic", "Montenegro",
    "Kotor Bay is the attraction: see it from the old town, a mountain road or the water.",
    "Tendering and summer traffic can consume time. Prioritise a compact bay route over distant checklists.",
    [
      activity("Kotor, Perast & Our Lady of the Rocks", "Connect the bay's two key towns with its small church island."),
      activity("Kotor cable car & panoramic road", "Gain height quickly for the bay's most dramatic views."),
      activity("Blue Cave private speedboat", "Explore coastal caves, submarine tunnels and bay scenery from the water."),
    ],
    [
      activity("Njeguši village food route", "Climb into the mountains for smoked ham, cheese and Montenegrin tradition."),
      activity("Kotor fortress dawn climb", "Use an early call for cooler temperatures and an uncrowded San Giovanni ascent."),
      activity("Bay of Kotor oyster tasting", "Visit small producers working in the sheltered waters near Perast."),
    ],
  ),
  port(
    "corfu", "Corfu", "Corfu Greece", "Mediterranean & Adriatic", "Greece",
    "Corfu combines a Venetian old town with green hills and some of Greece's most attractive coves.",
    "The cruise terminal is outside the old town. Confirm whether transport starts at the terminal or beyond the port gate.",
    [
      activity("Paleokastritsa & Corfu highlights", "Pair the west coast's coves with viewpoints and old-town time."),
      activity("Private Corfu beach & village drive", "Choose a coast, one mountain village and a pace that fits your party."),
      activity("Corfu old town food walk", "Taste kumquat, sofrito and island products in the UNESCO-listed centre."),
    ],
    [
      activity("Corfu olive grove experience", "Walk ancient groves and learn how local oil shapes island life."),
      activity("Governor's olive mill tasting", "Take a deeper specialist look at award-winning Corfiot olive oil."),
      activity("Sea-kayak around Paleokastritsa", "Reach small caves and beaches from water level."),
    ],
  ),
  port(
    "kusadasi-ephesus", "Kuşadası / Ephesus", "Kusadasi Ephesus Turkey", "Mediterranean & Adriatic", "Türkiye",
    "Ephesus is the reason to leave the port; the key decision is how deeply to explore it.",
    "Kuşadası's terminal is central, but timed entries and summer heat make an early private departure valuable.",
    [
      activity("Ephesus & Terrace Houses private tour", "See the ancient city's most impressive domestic interiors with expert context."),
      activity("Ephesus, Mary's House & Basilica", "Connect the archaeological site with the region's major Christian landmarks."),
      activity("Ephesus express half-day", "Prioritise the core ruins and return with time for Kuşadası."),
    ],
    [
      activity("Şirince village & fruit wine", "Add a hill village and local tasting without repeating the standard coast route."),
      activity("Turkish cooking in a village home", "Prepare regional dishes and spend time with a local family."),
      activity("Priene, Miletus & Didyma", "Choose three quieter classical sites for an archaeology-heavy full day."),
    ],
  ),
  port(
    "valletta", "Valletta", "Malta Valletta", "Mediterranean & Adriatic", "Malta",
    "Malta fits extraordinary density into one port day: choose Valletta, Mdina or the prehistoric coast.",
    "Valletta's cruise waterfront lies below the city; lifts and arranged pickup simplify the steep start.",
    [
      activity("Valletta, Mdina & Malta highlights", "Connect the fortified capital with the silent medieval city inland."),
      activity("Three Cities & harbour boat", "Explore Malta's maritime history across the Grand Harbour."),
      activity("Blue Grotto & Marsaxlokk", "Pair sea caves with the colourful fishing harbour in the south."),
    ],
    [
      activity("Prehistoric temples of Malta", "Visit structures older than the pyramids with specialist interpretation."),
      activity("Maltese food & pastizzi walk", "Use the island's layered cuisine to move through Valletta's history."),
      activity("Vintage-car tour of Mdina", "See central Malta in a distinctive small-vehicle format."),
    ],
  ),
  port(
    "messina-taormina", "Messina / Taormina", "Messina Taormina Sicily", "Mediterranean & Adriatic", "Italy",
    "From Messina, choose Taormina's theatre, Etna's volcanic landscape or Sicily's quieter north-east villages.",
    "Taormina and Etna require road travel. Check traffic assumptions and do not combine too many distant stops.",
    [
      activity("Taormina & Greek Theatre", "Pair sea-and-Etna views with Sicily's most celebrated ancient theatre."),
      activity("Mount Etna crater & tasting", "Explore the volcanic landscape with a winery or local-produce stop."),
      activity("Private Godfather villages route", "Visit Savoca and Forza d'Agrò with context beyond the film locations."),
    ],
    [
      activity("Messina street-food walk", "Stay near port for arancini, focaccia and granita rooted in the city."),
      activity("Alcantara Gorge adventure", "See basalt canyons and river landscapes on Etna's northern side."),
      activity("Sicilian ceramics workshop", "Create a compact hands-on experience around the island's decorative tradition."),
    ],
  ),

  // Alaska & Pacific Americas
  port(
    "juneau", "Juneau", "Juneau Alaska", "Alaska & Pacific Americas", "United States",
    "Juneau's best independent days connect glacier, wildlife or wilderness without wasting the call in transit.",
    "There are several downtown berths and an outlying dock. Confirm pickup and keep weather-related alternatives in mind.",
    [
      activity("Mendenhall Glacier & Nugget Falls", "Combine glacier viewpoints with the accessible waterfall trail."),
      activity("Whale watching in Auke Bay", "Target humpback feeding grounds with a small-boat operator."),
      activity("Private Juneau scenic road trip", "Shape a compact route around coast, forest, viewpoints and local stops."),
    ],
    [
      activity("Taku Glacier floatplane landing", "Trade the road network for a rare aerial view of the Juneau Icefield."),
      activity("Alaskan food & craft-beer walk", "Stay downtown for salmon, local producers and frontier stories."),
      activity("Gold Creek salmon bake & history", "Pair regional food with a short look at Juneau's mining past."),
    ],
  ),
  port(
    "ketchikan", "Ketchikan", "Ketchikan Alaska", "Alaska & Pacific Americas", "United States",
    "Ketchikan is about rainforest, Native culture and waterways—not a generic Alaska coach loop.",
    "Ward Cove is well outside downtown, while other berths are central. Your ship's dock materially changes the day.",
    [
      activity("Misty Fjords floatplane or boat", "See Ketchikan's most dramatic wilderness beyond the road system."),
      activity("Totem Bight & Native culture", "Explore Tlingit, Haida and Tsimshian art with real historical context."),
      activity("Rainforest & wildlife walk", "Look for eagles, salmon and old-growth forest close to town."),
    ],
    [
      activity("Bering Sea crab fishermen experience", "Meet working-vessel stories and marine wildlife from the water."),
      activity("Ketchikan fishing charter", "Use the salmon capital for a small-party angling trip."),
      activity("Creek Street photography walk", "Go beyond the postcard with local history and carefully timed light."),
    ],
  ),
  port(
    "skagway", "Skagway", "Skagway Alaska", "Alaska & Pacific Americas", "United States",
    "Skagway's defining choice is the Klondike route by rail, road, trail or a combination.",
    "Rockslides and berth assignments can affect walking routes from the ship; follow current port and operator instructions.",
    [
      activity("White Pass railway journey", "Climb the historic gold-rush route through mountain scenery."),
      activity("Yukon private road trip", "Cross White Pass for lakes, desert landscape and flexible photo stops."),
      activity("Klondike history & town walk", "Stay local and unpack the boomtown's extraordinary gold-rush story."),
    ],
    [
      activity("Laughton Glacier wilderness hike", "Combine rail access with a guided backcountry glacier approach."),
      activity("Chilkoot Trail day hike", "Walk a section of the route stampeders used toward the Klondike."),
      activity("Skagway glassblowing workshop", "Choose a compact hands-on craft session rooted in a local studio."),
    ],
  ),
  port(
    "sitka", "Sitka", "Sitka Alaska", "Alaska & Pacific Americas", "United States",
    "Sitka offers Alaska's strongest blend of wildlife, Tlingit culture and Russian history.",
    "Most ships use the terminal outside town with shuttle service; independent tours may collect there or downtown.",
    [
      activity("Sea otter & wildlife quest", "Search Sitka Sound for otters, whales, sea lions and coastal birdlife."),
      activity("Fortress of the Bear & raptor centre", "Pair two respected wildlife facilities with local interpretation."),
      activity("Tlingit & Russian Sitka highlights", "Connect the national historical park, cathedral and cultural story."),
    ],
    [
      activity("Volcanic coast kayak", "Paddle sheltered water beneath forest and dormant Mount Edgecumbe."),
      activity("Sitka Sound science experience", "Explore local marine ecology with a research-led perspective."),
      activity("Private island photography route", "Use a local guide to find quieter landscapes and wildlife viewpoints."),
    ],
  ),
  port(
    "icy-strait-point", "Icy Strait Point", "Icy Strait Point Hoonah Alaska", "Alaska & Pacific Americas", "United States",
    "Icy Strait Point is one of Alaska's best calls for whales, bears and small-community access.",
    "Tours may start at the cruise development or in nearby Hoonah. Confirm walking, shuttle and meeting instructions.",
    [
      activity("Hoonah whale-watching boat", "Look for humpbacks in the nutrient-rich waters around Point Adolphus."),
      activity("Chichagof Island bear search", "Travel forest roads with a local guide for possible coastal-brown-bear sightings."),
      activity("Hoonah Tlingit cultural tour", "Learn community history and living culture beyond the cruise complex."),
    ],
    [
      activity("Remote stream fishing", "Fish a quieter waterway with equipment and local access arranged."),
      activity("ATV forest expedition", "Use old logging roads to reach viewpoints and rainforest interior."),
      activity("Alaskan home-cooking experience", "Meet a local host for regional food and Hoonah stories."),
    ],
  ),
  port(
    "cabo-san-lucas", "Cabo San Lucas", "Cabo San Lucas Mexico", "Alaska & Pacific Americas", "Mexico",
    "Cabo's natural icons sit at the meeting of desert, Pacific swell and the Sea of Cortez.",
    "Cabo is normally a tender port. Factor tender queues into any boat or overland departure.",
    [
      activity("Land's End & Arch boat trip", "See Cabo's defining rock formations, sea-lion colony and beaches from the water."),
      activity("Whale watching in season", "Target humpback activity with a smaller boat and naturalist guide."),
      activity("Desert ATV & canyon ride", "Trade the marina for Baja's dry riverbeds, hills and Pacific views."),
    ],
    [
      activity("Todos Santos art & food route", "Visit the Pacific-side town for galleries, history and regional cooking."),
      activity("Sea of Cortez snorkel escape", "Leave the busy bay for clearer water and marine life toward Chileno or Santa Maria."),
      activity("Baja taco & mezcal walk", "Stay close to port while tasting local seafood and agave spirits."),
    ],
  ),
  port(
    "puerto-vallarta", "Puerto Vallarta", "Puerto Vallarta Mexico", "Alaska & Pacific Americas", "Mexico",
    "Puerto Vallarta lets you choose between jungle, old-town food and Banderas Bay wildlife.",
    "The cruise terminal is north of the historic centre. Account for city traffic when arranging independent pickup.",
    [
      activity("Marietas Islands boat & snorkel", "Explore protected island water, caves and birdlife in Banderas Bay."),
      activity("Sierra Madre zip-line adventure", "Head into jungle terrain for a high-energy half-day."),
      activity("Old Vallarta taco walk", "Use street food to explore the historic centre and local neighbourhoods."),
    ],
    [
      activity("San Sebastián del Oeste", "Climb into the mountains for a preserved mining town and cooler air."),
      activity("Botanical garden & coastal drive", "Combine tropical plants with the quieter south-coast road."),
      activity("Private surf lesson in Sayulita", "Use a longer call for a focused lesson in the Riviera Nayarit."),
    ],
  ),
  port(
    "cartagena-colombia", "Cartagena", "Cartagena Colombia", "Alaska & Pacific Americas", "Colombia",
    "Cartagena is best understood through its walls, Afro-Caribbean heritage and extraordinary food.",
    "The cruise terminal is not in the old city. Use arranged transport and keep midday heat in the plan.",
    [
      activity("Walled city & Getsemaní with a local", "Connect colonial history, street art and neighbourhood life on foot."),
      activity("Cartagena food & market tour", "Taste coastal Colombian cooking from Bazurto or the historic centre."),
      activity("Rosario Islands boat escape", "Leave the city for Caribbean water when the ship's schedule supports it."),
    ],
    [
      activity("Palenque culture & music", "Visit the first free African town in the Americas with community-led context."),
      activity("Private rum & chocolate tasting", "Compare Colombian cacao and Caribbean-style rum in a compact session."),
      activity("Street-art workshop in Getsemaní", "Turn the neighbourhood's visual culture into a hands-on experience."),
    ],
  ),

  // Northern Europe
  port(
    "copenhagen", "Copenhagen", "Copenhagen Denmark", "Northern Europe", "Denmark",
    "Copenhagen is compact enough for design, food and royal history in one disciplined route.",
    "Cruise ships use several terminals, including distant Oceankaj. Confirm transport before planning a walking start.",
    [
      activity("Copenhagen private bicycle tour", "See canals, neighbourhoods and major landmarks in the city's natural mode of transport."),
      activity("Royal Copenhagen & canal cruise", "Pair palaces and old harbour streets with a water-level view."),
      activity("Nordic food & market walk", "Use Torvehallerne and specialist stops to explore modern Danish food."),
    ],
    [
      activity("Danish architecture & urban design", "Understand how harbour planning and contemporary buildings shape the city."),
      activity("Louisiana Museum private transfer", "Use a longer call for world-class modern art on the Øresund coast."),
      activity("Copenhagen pastry workshop", "Make laminated Danish baking the focus of a small indoor experience."),
    ],
  ),
  port(
    "stockholm", "Stockholm", "Stockholm Sweden", "Northern Europe", "Sweden",
    "Stockholm's islands reward a clear choice between royal history, maritime museums and the archipelago.",
    "Ships may berth in central Stockholm, Frihamnen or Nynäshamn. Nynäshamn requires a substantial transfer.",
    [
      activity("Vasa Museum & old town", "Combine the preserved warship with a focused walk through Gamla Stan."),
      activity("Stockholm archipelago boat trip", "Experience the landscape that defines the capital beyond its central islands."),
      activity("Private Stockholm highlights drive", "Connect viewpoints, palace districts and Djurgården efficiently."),
    ],
    [
      activity("Swedish fika & food walk", "Use coffee culture, markets and local staples to explore the city."),
      activity("Viking history in Sigtuna", "Travel to Sweden's oldest town for runestones and early royal history."),
      activity("Stockholm subway art tour", "Turn the metro's rock-cut stations into a distinctive design experience."),
    ],
  ),
  port(
    "tallinn", "Tallinn", "Tallinn Estonia", "Northern Europe", "Estonia",
    "Tallinn's old town is close to port; the best tour adds context or takes you beyond its medieval core.",
    "The old town is walkable from many berths, but cobbles and slopes matter for mobility and timing.",
    [
      activity("Tallinn medieval old town with a historian", "Go beyond façades into Hanseatic trade, guilds and Estonian identity."),
      activity("Soviet Tallinn & coastal history", "Explore the television tower, Pirita and sites shaped by occupation."),
      activity("Estonian food & market walk", "Taste rye, smoked fish and modern Baltic cooking close to the port."),
    ],
    [
      activity("Bog walk in Lahemaa National Park", "Leave the city for raised bogs, forest and manor landscapes."),
      activity("Tallinn craft-beer tasting", "Meet Estonia's inventive brewing scene in a compact afternoon route."),
      activity("Kalamaja wooden-house photography walk", "Explore creative districts and architecture outside the old walls."),
    ],
  ),
  port(
    "bergen", "Bergen", "Bergen Norway", "Northern Europe", "Norway",
    "Bergen works best when its historic waterfront is paired with a mountain or fjord perspective.",
    "Most berths are near the centre, but weather changes quickly; favour operators with a clear fallback.",
    [
      activity("Bryggen, fish market & Fløibanen", "Connect Hanseatic history with a fast mountain viewpoint."),
      activity("Hardangerfjord scenic route", "Use a long call for waterfalls, orchards and fjord landscapes east of Bergen."),
      activity("Private Bergen food walk", "Taste seafood and regional products while learning the port's trading story."),
    ],
    [
      activity("Øygarden coastal kayak", "Paddle the exposed island landscape west of the city."),
      activity("Edvard Grieg's Troldhaugen", "Visit the composer's lakeside home with musical context."),
      activity("Bergen street-art walk", "Discover the contemporary city beyond Bryggen's postcard image."),
    ],
  ),
  port(
    "geiranger", "Geiranger", "Geiranger Norway", "Northern Europe", "Norway",
    "Geiranger's port day is about gaining scale: from the water, a mountain road or a high viewpoint.",
    "Tendering and narrow roads can slow the day. Avoid stacking distant viewpoints without enough return margin.",
    [
      activity("Geirangerfjord RIB safari", "Get close to waterfalls and abandoned farms from a fast open boat."),
      activity("Dalsnibba & Eagle Road viewpoints", "Climb from sea level to the fjord's defining panoramic overlooks."),
      activity("Waterfall hike above Geiranger", "Use the valley's trails for an active perspective on farms and cascades."),
    ],
    [
      activity("Fjord farm visit", "Meet the human story of working steep land above the water."),
      activity("Geiranger e-bike climb", "Use electric assistance to reach higher viewpoints without a coach."),
      activity("Kayak beneath Seven Sisters", "Paddle the fjord at water level when conditions allow."),
    ],
  ),
  port(
    "reykjavik", "Reykjavík", "Reykjavik Iceland", "Northern Europe", "Iceland",
    "Reykjavík is the launch point; choose one Icelandic landscape route rather than racing across the map.",
    "Skarfabakki is outside the centre, while smaller ships may dock closer. Weather and daylight affect every route.",
    [
      activity("Golden Circle small-group route", "Connect Þingvellir, Geysir and Gullfoss in one coherent loop."),
      activity("South Coast waterfalls & black sand", "Use a long call for Seljalandsfoss, Skógafoss and Reynisfjara."),
      activity("Reykjanes volcanic peninsula", "Choose lava fields, geothermal areas and cliffs closer to the port."),
    ],
    [
      activity("Geothermal bread & food experience", "Explore Icelandic cooking through heat, rye bread and local ingredients."),
      activity("Puffin RIB from the old harbour", "Take a compact seasonal wildlife trip close to the city."),
      activity("Reykjavík design & architecture walk", "See Nordic modernism, public art and the city's evolving waterfront."),
    ],
  ),
  port(
    "belfast", "Belfast", "Belfast Northern Ireland", "Northern Europe", "United Kingdom",
    "Belfast offers two different days: the Antrim Coast or the city's layered industrial and political story.",
    "Cruise berths are outside the centre. The Giant's Causeway route is long, so departure discipline matters.",
    [
      activity("Giant's Causeway & Antrim Coast", "See basalt columns, cliffs and selected coastal landmarks."),
      activity("Belfast political history tour", "Understand murals, neighbourhoods and the peace process with a local guide."),
      activity("Titanic Belfast & shipyard story", "Explore the city's maritime engineering history beside the original slipways."),
    ],
    [
      activity("Game of Thrones coastal locations", "Use the series as a route into Northern Ireland's real landscapes."),
      activity("Belfast food & whiskey walk", "Taste the city's contemporary revival through markets and independent venues."),
      activity("Gobbins cliff-path adventure", "Take a dramatic coastal walkway when schedule and conditions align."),
    ],
  ),
  port(
    "le-havre-paris", "Le Havre / Paris", "Le Havre Paris Normandy", "Northern Europe", "France",
    "Paris is possible but distant; Normandy often delivers a better port day with less road time.",
    "Paris is roughly two and a half hours each way in normal conditions. Treat the return as the central constraint.",
    [
      activity("Paris private highlights from Le Havre", "Use direct transport and a tightly prioritised capital-city route."),
      activity("Honfleur & Étretat coast", "Choose harbour charm and dramatic chalk cliffs much closer to the ship."),
      activity("Normandy D-Day beaches", "Build a historically focused full day around selected landing sites."),
    ],
    [
      activity("Le Havre modernist architecture", "Explore Auguste Perret's UNESCO-listed reconstruction close to port."),
      activity("Pays d'Auge cider & cheese route", "Visit rural producers for Normandy's defining flavours."),
      activity("Monet's Giverny gardens", "Use a long call for the artist's home and carefully designed landscape."),
    ],
  ),

  // Asia-Pacific
  port(
    "singapore", "Singapore", "Singapore", "Asia-Pacific", "Singapore",
    "Singapore's port day can move cleanly from food to gardens to neighbourhood culture without a long transfer.",
    "Ships use Marina Bay or the Singapore Cruise Centre. Confirm the terminal before choosing the first stop.",
    [
      activity("Hawker-centre food journey", "Use specialist stalls and local context to taste Singapore beyond a generic food court."),
      activity("Gardens by the Bay & Marina Bay", "Combine landmark gardens with the city's most distinctive modern skyline."),
      activity("Private multicultural neighbourhood tour", "Connect Chinatown, Little India and Kampong Glam through living culture."),
    ],
    [
      activity("Pulau Ubin cycling escape", "See mangroves and village landscapes far removed from the city centre."),
      activity("Peranakan culture & cooking", "Explore a hybrid heritage through architecture, objects and food."),
      activity("Singapore architecture after dark", "Use a late call to see the civic district and illuminated waterfront."),
    ],
  ),
  port(
    "tokyo-yokohama", "Tokyo / Yokohama", "Yokohama Tokyo Japan", "Asia-Pacific", "Japan",
    "A Tokyo port day needs ruthless focus: one district cluster, one food theme or one private overview.",
    "Most cruise calls use Yokohama, with a substantial journey into Tokyo. Verify berth, train or vehicle logistics.",
    [
      activity("Private Tokyo highlights from Yokohama", "Connect selected districts with transport designed around the cruise call."),
      activity("Tsukiji outer market food tour", "Use seafood, knives and specialist stalls to explore Tokyo's food culture."),
      activity("Kamakura temples & Great Buddha", "Choose a historic coastal city closer to Yokohama than central Tokyo."),
    ],
    [
      activity("Yokohama ramen museum & waterfront", "Stay closer to the ship for food history and harbour architecture."),
      activity("Tokyo backstreet photography walk", "Focus on one neighbourhood with a local photographer."),
      activity("Private tea ceremony", "Experience Japanese hospitality and ritual in a compact indoor session."),
    ],
  ),
  port(
    "kobe-kyoto", "Kobe / Kyoto", "Kobe Kyoto Japan", "Asia-Pacific", "Japan",
    "Kyoto is the headline, but Kobe, Himeji and sake country can make a more coherent port day.",
    "Kyoto requires a longer road or rail transfer from Kobe. Limit temple stops and leave a conservative return margin.",
    [
      activity("Private Kyoto temples from Kobe", "Prioritise two or three meaningful sites instead of a city-wide checklist."),
      activity("Himeji Castle & Koko-en", "See Japan's finest surviving castle with its adjacent landscape garden."),
      activity("Nada sake breweries", "Explore one of Japan's most important brewing districts close to the port."),
    ],
    [
      activity("Kobe beef & market tasting", "Make the port city's defining food story the centre of the day."),
      activity("Arima Onsen private escape", "Visit one of Japan's oldest hot-spring towns beyond the city."),
      activity("Akashi bridge & fishing-town route", "Combine engineering scale with a smaller coastal community."),
    ],
  ),
  port(
    "hong-kong", "Hong Kong", "Hong Kong", "Asia-Pacific", "Hong Kong",
    "Hong Kong rewards contrast: harbour skyline, mountain trails, temples and neighbourhood food all sit close together.",
    "Cruise ships may use Kai Tak or Ocean Terminal. The starting point significantly changes transfer time.",
    [
      activity("Victoria Peak & harbour highlights", "Combine the skyline's best viewpoint with Star Ferry and selected districts."),
      activity("Hong Kong dim sum & market walk", "Use family-run food stops to navigate neighbourhood history."),
      activity("Lantau Buddha & fishing village", "Leave the urban core for Ngong Ping and Tai O's stilt-house landscape."),
    ],
    [
      activity("Dragon's Back guided hike", "See Hong Kong's green coastline on a manageable ridge route."),
      activity("Neon & night photography walk", "Use a late departure to capture dense streets and changing visual culture."),
      activity("Traditional junk harbour sail", "View the city from Victoria Harbour in a compact, distinctive format."),
    ],
  ),
  port(
    "phuket", "Phuket", "Phuket Thailand", "Asia-Pacific", "Thailand",
    "Phuket's best port days choose one water landscape or one cultural route—not every famous bay.",
    "Ships may dock at different coasts or tender. Confirm the actual port before assessing travel time.",
    [
      activity("Phang Nga Bay sea-cave canoe", "Move through limestone karsts and hidden lagoons by boat and canoe."),
      activity("Phi Phi Islands speedboat", "Use a full call for iconic bays, snorkeling and open-water scenery."),
      activity("Phuket old town & southern viewpoints", "Pair Sino-Portuguese streets with temples and coastal panoramas."),
    ],
    [
      activity("Thai cooking with market visit", "Turn local herbs, curry pastes and produce into a hands-on experience."),
      activity("Ethical elephant sanctuary", "Choose observation-led care and avoid venues offering riding or performances."),
      activity("Private longtail boat to Coral Island", "Take a simpler small-party beach route closer to Phuket."),
    ],
  ),
  port(
    "sydney", "Sydney", "Sydney Australia", "Asia-Pacific", "Australia",
    "Sydney's harbour is the excursion; beaches, neighbourhoods and coastal walks deepen it.",
    "Berths range from Circular Quay to White Bay and occasional offshore terminals. Check access before planning.",
    [
      activity("Sydney Opera House & harbour walk", "Pair architectural access with the harbour's essential viewpoints."),
      activity("Bondi to Coogee coastal route", "Use beaches, cliffs and ocean pools for an active half-day."),
      activity("Private Sydney highlights drive", "Connect harbour lookouts, eastern beaches and neighbourhoods efficiently."),
    ],
    [
      activity("Aboriginal harbour heritage walk", "See central Sydney through Gadigal knowledge and continuing culture."),
      activity("Manly kayak & hidden beaches", "Cross the harbour for a small-watercraft perspective on the north shore."),
      activity("Sydney craft-beer & inner-west food", "Explore neighbourhood producers beyond the main visitor circuit."),
    ],
  ),
  port(
    "auckland", "Auckland", "Auckland New Zealand", "Asia-Pacific", "New Zealand",
    "Auckland is a city of volcanoes and islands; one of those landscapes should anchor the day.",
    "Most cruise berths are central, making ferries and downtown tours unusually practical for independent visitors.",
    [
      activity("Waiheke Island wine day", "Use the harbour ferry for vineyards, coastal views and a relaxed island pace."),
      activity("Auckland volcanoes & city viewpoints", "Connect Mount Eden, the waterfront and selected neighbourhoods."),
      activity("West Coast rainforest & black-sand beach", "Cross the isthmus for Waitākere forest and wild Tasman coast."),
    ],
    [
      activity("Māori culture & Auckland museum", "Build a respectful introduction around taonga, performance and local history."),
      activity("Rangitoto volcanic hike", "Climb Auckland's youngest volcano after a short ferry ride."),
      activity("Auckland food-lane walk", "Taste Pacific and Asian influences across the central city."),
    ],
  ),
  port(
    "tauranga", "Tauranga", "Tauranga Rotorua New Zealand", "Asia-Pacific", "New Zealand",
    "From Tauranga, choose Rotorua's geothermal culture, Hobbiton or the Bay of Plenty coast.",
    "Ships berth at Mount Maunganui. Rotorua and Hobbiton are longer inland drives requiring disciplined timing.",
    [
      activity("Rotorua geothermal & Māori experience", "Combine geysers, volcanic terrain and living cultural interpretation."),
      activity("Hobbiton movie set from Tauranga", "Use a timed visit to the Waikato film location with cruise-aligned transport."),
      activity("Mount Maunganui & Bay of Plenty", "Stay local for beaches, viewpoints and a lighter port day."),
    ],
    [
      activity("Waimarino kayak glowworm canyon", "Paddle through calm water toward a distinctive hidden glowworm setting."),
      activity("Kiwifruit orchard experience", "See the crop that shaped the Bay of Plenty's modern economy."),
      activity("Private local food & craft route", "Meet small producers without committing to the longer inland transfer."),
    ],
  ),

  // Africa, Middle East & South America
  port(
    "dubai", "Dubai", "Dubai UAE", "Africa, Middle East & South America", "United Arab Emirates",
    "Dubai works best when one modern icon is balanced with desert, old-city or food culture.",
    "Cruise ships use terminals across Port Rashid and Dubai Harbour. Verify the terminal before arranging transport.",
    [
      activity("Old Dubai, souks & creek abra", "Explore the trading city beneath the skyline through markets and water crossings."),
      activity("Desert safari & dune drive", "Leave the city for dunes, sunset and Bedouin-influenced hospitality."),
      activity("Private modern Dubai highlights", "Connect the Burj district, Palm and skyline viewpoints with a private vehicle."),
    ],
    [
      activity("Emirati food & heritage walk", "Use family dishes and restored neighbourhoods to explore local identity."),
      activity("Dubai architecture photography route", "Focus on the city's engineered forms with carefully chosen viewpoints."),
      activity("Mangrove kayak at Jaddaf", "Find a quieter water-and-wildlife experience within the metropolis."),
    ],
  ),
  port(
    "abu-dhabi", "Abu Dhabi", "Abu Dhabi UAE", "Africa, Middle East & South America", "United Arab Emirates",
    "Abu Dhabi's strongest day combines one landmark of scale with culture or the natural coastline.",
    "Cruise terminals are on Zayed Port; city attractions are spread out, so private transport adds real value.",
    [
      activity("Grand Mosque & city highlights", "Pair Sheikh Zayed Grand Mosque with a tightly selected city route."),
      activity("Louvre Abu Dhabi & cultural district", "Use architecture and art to understand the emirate's global ambitions."),
      activity("Mangrove kayak experience", "Explore the city's protected tidal forest at water level."),
    ],
    [
      activity("Falcon hospital visit", "See a distinctive part of Emirati heritage and modern animal care."),
      activity("Qasr Al Watan palace tour", "Explore state rooms, craftsmanship and the country's governing story."),
      activity("Emirati cooking experience", "Learn local flavours in a smaller, human-scale setting."),
    ],
  ),
  port(
    "muscat", "Muscat", "Muscat Oman", "Africa, Middle East & South America", "Oman",
    "Muscat's appeal lies in its restrained cityscape, mountains and clear Gulf of Oman water.",
    "The port sits at Mutrah, but many natural attractions require a longer drive. Match the route to the port-call length.",
    [
      activity("Muscat mosque, Mutrah & old city", "Connect Oman's grand mosque, souq and coastal royal quarter."),
      activity("Wadi Shab & Bimmah Sinkhole", "Use a long call for canyon hiking, freshwater pools and coastal geology."),
      activity("Dolphin watching & coastal snorkel", "See marine life and the rugged shoreline from a small boat."),
    ],
    [
      activity("Omani food & souq walk", "Taste shuwa, halwa and regional spices around Mutrah."),
      activity("Nakhal Fort & hot springs", "Travel inland for a mountain-backed fort and oasis landscape."),
      activity("Private frankincense workshop", "Explore the resin's trade history and contemporary Omani use."),
    ],
  ),
  port(
    "cape-town", "Cape Town", "Cape Town South Africa", "Africa, Middle East & South America", "South Africa",
    "Cape Town forces a good choice between mountain, peninsula, wine country and the city's own history.",
    "The cruise terminal is close to the V&A Waterfront, but peninsula and wine routes need a full-day plan.",
    [
      activity("Table Mountain & city highlights", "Start with the cableway when weather allows, then keep the city route focused."),
      activity("Cape Peninsula private drive", "Follow Chapman's Peak toward Cape Point and the penguins at Boulders."),
      activity("Stellenbosch wine-country day", "Choose a small number of estates and a historic town walk."),
    ],
    [
      activity("Bo-Kaap cooking experience", "Explore Cape Malay history through spices, family recipes and neighbourhood context."),
      activity("Township jazz & cultural route", "Meet local musicians and community stories through a responsible operator."),
      activity("Kelp-forest snorkel", "Enter the cold Atlantic ecosystem with a specialist guide and suitable equipment."),
    ],
  ),
  port(
    "port-louis", "Port Louis", "Mauritius Port Louis", "Africa, Middle East & South America", "Mauritius",
    "Mauritius offers volcanic scenery, lagoons and layered food culture within one island call.",
    "Port Louis traffic can be slow. Keep long cross-island routes disciplined and confirm terminal pickup.",
    [
      activity("South Mauritius volcanic landscapes", "Connect Chamarel, coloured earth, waterfalls and selected viewpoints."),
      activity("Private lagoon catamaran", "Use the island's sheltered water for snorkeling and a relaxed boat day."),
      activity("Port Louis market & street-food walk", "Explore Mauritian identity through Creole, Indian, Chinese and French flavours."),
    ],
    [
      activity("Tea route & colonial estates", "Travel through plantations and the island's agricultural history."),
      activity("Black River e-bike adventure", "Use forest roads and coastal scenery for an active small-group day."),
      activity("Sega music & dance workshop", "Meet Mauritius's Creole performance tradition in a participatory format."),
    ],
  ),
  port(
    "buenos-aires", "Buenos Aires", "Buenos Aires Argentina", "Africa, Middle East & South America", "Argentina",
    "Buenos Aires is best approached through neighbourhood character, food and live cultural tradition.",
    "Cruise transfers can be affected by terminal operations and city traffic; confirm the meeting point and return plan.",
    [
      activity("Private Buenos Aires neighbourhood tour", "Connect Plaza de Mayo, La Boca, Recoleta and selected local districts."),
      activity("Argentine food & market experience", "Use empanadas, beef, wine and immigrant influences to understand the city."),
      activity("Tango show or private lesson", "Experience the city's defining dance as performance or participation."),
    ],
    [
      activity("Street art in Palermo & Colegiales", "Explore contemporary Buenos Aires through large-scale murals and local studios."),
      activity("Mate culture workshop", "Learn the social ritual, preparation and etiquette around Argentina's national drink."),
      activity("Tigre Delta private boat", "Leave the centre for waterways, islands and river communities north of the city."),
    ],
  ),
  port(
    "rio-de-janeiro", "Rio de Janeiro", "Rio de Janeiro Brazil", "Africa, Middle East & South America", "Brazil",
    "Rio's scale demands a clear route: mountain icons, neighbourhood culture or coast—not every landmark.",
    "The cruise terminal is central, but traffic and attraction queues can be unpredictable. Timed access matters.",
    [
      activity("Christ the Redeemer & Sugarloaf", "Link Rio's two defining viewpoints with pre-arranged transport and timing."),
      activity("Santa Teresa & historic Rio", "Explore hillside streets, art and the city's layered urban history."),
      activity("Private beaches & viewpoints drive", "Connect selected coast stops without committing to a large-group bus."),
    ],
    [
      activity("Samba history & percussion workshop", "Experience Rio's musical culture through participation and local context."),
      activity("Tijuca Forest hike", "Enter one of the world's largest urban forests for waterfalls and views."),
      activity("Brazilian market & cooking class", "Turn tropical produce and regional techniques into a hands-on meal."),
    ],
  ),
  port(
    "ushuaia", "Ushuaia", "Ushuaia Argentina", "Africa, Middle East & South America", "Argentina",
    "At the end of the world, choose between the Beagle Channel, Tierra del Fuego or one serious outdoor route.",
    "Weather changes quickly and many ships have expedition schedules. Confirm return time directly with the operator.",
    [
      activity("Beagle Channel wildlife cruise", "See sea lions, seabirds and lighthouse scenery from the water."),
      activity("Tierra del Fuego National Park", "Explore subantarctic forest, bays and the end of the Pan-American Highway."),
      activity("Escondido & Fagnano lakes", "Cross mountain passes into the dramatic interior beyond Ushuaia."),
    ],
    [
      activity("Martial Glacier guided hike", "Gain an elevated view over Ushuaia and the Beagle Channel."),
      activity("Fuegian food & king-crab tasting", "Build a compact day around local seafood and regional history."),
      activity("Off-road Andes lakes expedition", "Use 4x4 tracks for a more adventurous route into the lake country."),
    ],
  ),
];

export const regions = Array.from(new Set(ports.map((item) => item.region)));

export function getPort(slug: string) {
  return ports.find((item) => item.slug === slug);
}

export function getRegionTone(region: string) {
  return regions.indexOf(region) % 6;
}

export function getViatorSearchUrl(portItem: Port, item: Activity) {
  const query = `${portItem.searchName} ${item.search} shore excursion`;
  return `https://www.viator.com/searchResults/all?text=${encodeURIComponent(query)}`;
}
