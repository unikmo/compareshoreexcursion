import type { Activity, Port } from "./port-data";

export type EditorialImage = {
  src: string;
  alt: string;
  position?: string;
  sourceUrl?: string;
};

const unsplash = (photoId: string, alt: string, position = "center"): EditorialImage => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=84`,
  alt,
  position,
});

const portImages: Record<string, EditorialImage> = {
  "nassau": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Nassau%2C_Bahamas_aerial_view_%28cropped%29.jpg/1400px-Nassau%2C_Bahamas_aerial_view_%28cropped%29.jpg",
    alt: "Destination view of Nassau",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nassau%2C_Bahamas_aerial_view_%28cropped%29.jpg",
  },
  "cozumel": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cozumel_Aerial_View.jpg/1400px-Cozumel_Aerial_View.jpg",
    alt: "Destination view of Cozumel",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cozumel_Aerial_View.jpg",
  },
  "roatan": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Westbay2106.jpg/1400px-Westbay2106.jpg",
    alt: "Destination view of Roatán",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Westbay2106.jpg",
  },
  "costa-maya": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Costa_maya_beach.jpg/1400px-Costa_maya_beach.jpg",
    alt: "Destination view of Costa Maya",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Costa_maya_beach.jpg",
  },
  "san-juan": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/2013_Old_San_Juan_01.JPG/1400px-2013_Old_San_Juan_01.JPG",
    alt: "Destination view of San Juan",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2013_Old_San_Juan_01.JPG",
  },
  "st-thomas": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/View_of_St._Thomas.jpg/1400px-View_of_St._Thomas.jpg",
    alt: "Destination view of St. Thomas",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:View_of_St._Thomas.jpg",
  },
  "st-maarten": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Philipsburg_and_the_Great_Bay%2C_Sint_Maarten%2C_Caribbean.jpg/1400px-Philipsburg_and_the_Great_Bay%2C_Sint_Maarten%2C_Caribbean.jpg",
    alt: "Destination view of St. Maarten",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Philipsburg_and_the_Great_Bay%2C_Sint_Maarten%2C_Caribbean.jpg",
  },
  "grand-cayman": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Grand_cayman.jpg/1400px-Grand_cayman.jpg",
    alt: "Destination view of Grand Cayman",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Grand_cayman.jpg",
  },
  "puerto-plata": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Downtown_Puerto_Plata_Dominican_Republic_Architecture.jpg/1400px-Downtown_Puerto_Plata_Dominican_Republic_Architecture.jpg",
    alt: "Destination view of Puerto Plata",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Puerto_Plata_Dominican_Republic_Architecture.jpg",
  },
  "ocho-rios": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/JM-ocho_rios-hafen-01.jpg/1400px-JM-ocho_rios-hafen-01.jpg",
    alt: "Destination view of Ocho Rios",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:JM-ocho_rios-hafen-01.jpg",
  },
  "bridgetown": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Bridgetown2.jpg/1400px-Bridgetown2.jpg",
    alt: "Destination view of Bridgetown",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bridgetown2.jpg",
  },
  "castries": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/View_of_Castries_Saint_Lucia_Day248bdriveb.jpg/1400px-View_of_Castries_Saint_Lucia_Day248bdriveb.jpg",
    alt: "Destination view of Castries",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:View_of_Castries_Saint_Lucia_Day248bdriveb.jpg",
  },
  "barcelona": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Evening_light_over_Barcelona.jpg/1400px-Evening_light_over_Barcelona.jpg",
    alt: "Destination view of Barcelona",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Evening_light_over_Barcelona.jpg",
  },
  "civitavecchia-rome": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg/1400px-Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg",
    alt: "Destination view of Civitavecchia / Rome",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trevi_Fountain%2C_Rome%2C_Italy_2_-_May_2007.jpg",
  },
  "livorno-florence": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/FirenzeDec092023_01.jpg/1400px-FirenzeDec092023_01.jpg",
    alt: "Destination view of Livorno / Florence",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:FirenzeDec092023_01.jpg",
  },
  "naples": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Napoli_-_Maschio_Angioino_-_202209302342_3.jpg/1400px-Napoli_-_Maschio_Angioino_-_202209302342_3.jpg",
    alt: "Destination view of Naples",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Napoli_-_Maschio_Angioino_-_202209302342_3.jpg",
  },
  "marseille": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Notre-Dame_de_la_Garde_aerial_view_2020.jpeg/1400px-Notre-Dame_de_la_Garde_aerial_view_2020.jpeg",
    alt: "Destination view of Marseille",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Notre-Dame_de_la_Garde_aerial_view_2020.jpeg",
  },
  "palma-de-mallorca": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Kathedrale_von_Palma.jpg/1400px-Kathedrale_von_Palma.jpg",
    alt: "Destination view of Palma de Mallorca",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kathedrale_von_Palma.jpg",
  },
  "athens-piraeus": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Athens_Acropolis_at_Daybreak.jpg/1400px-Athens_Acropolis_at_Daybreak.jpg",
    alt: "Destination view of Athens / Piraeus",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Athens_Acropolis_at_Daybreak.jpg",
  },
  "santorini": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Santorini_Fira3_tango7174.jpg/1400px-Santorini_Fira3_tango7174.jpg",
    alt: "Destination view of Santorini",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Santorini_Fira3_tango7174.jpg",
  },
  "mykonos": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Against_Greek_skies%2C_one_of_the_Mykonos_Island_Windmills%2C_Chora._Cyclades%2C_Agean_Sea%2C_Greece.jpg/1400px-Against_Greek_skies%2C_one_of_the_Mykonos_Island_Windmills%2C_Chora._Cyclades%2C_Agean_Sea%2C_Greece.jpg",
    alt: "Destination view of Mykonos",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Against_Greek_skies%2C_one_of_the_Mykonos_Island_Windmills%2C_Chora._Cyclades%2C_Agean_Sea%2C_Greece.jpg",
  },
  "dubrovnik": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg/1400px-The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg",
    alt: "Destination view of Dubrovnik",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg",
  },
  "split": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Split_080620-133710-IMG_0968x.jpg/1400px-Split_080620-133710-IMG_0968x.jpg",
    alt: "Destination view of Split",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Split_080620-133710-IMG_0968x.jpg",
  },
  "kotor": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/20090719_Crkva_Gospa_od_Zdravlja_Kotor_Bay_Montenegro.jpg/1400px-20090719_Crkva_Gospa_od_Zdravlja_Kotor_Bay_Montenegro.jpg",
    alt: "Destination view of Kotor",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:20090719_Crkva_Gospa_od_Zdravlja_Kotor_Bay_Montenegro.jpg",
  },
  "corfu": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pontikonisi.jpg/1400px-Pontikonisi.jpg",
    alt: "Destination view of Corfu",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pontikonisi.jpg",
  },
  "kusadasi-ephesus": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ephesus_Celsus_Library_Fa%C3%A7ade.jpg/1400px-Ephesus_Celsus_Library_Fa%C3%A7ade.jpg",
    alt: "Destination view of Kuşadası / Ephesus",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ephesus_Celsus_Library_Fa%C3%A7ade.jpg",
  },
  "valletta": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/St_Sebastian_Curtain_%28cropped%29.jpg/1400px-St_Sebastian_Curtain_%28cropped%29.jpg",
    alt: "Destination view of Valletta",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:St_Sebastian_Curtain_%28cropped%29.jpg",
  },
  "messina-taormina": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Aerial_image_of_the_coast_of_Taormina_%28view_from_the_southeast%29.jpg/1400px-Aerial_image_of_the_coast_of_Taormina_%28view_from_the_southeast%29.jpg",
    alt: "Destination view of Messina / Taormina",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Aerial_image_of_the_coast_of_Taormina_%28view_from_the_southeast%29.jpg",
  },
  "juneau": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Queen_Elizabeth_%28ship%2C_2010%29_in_Juneau%2C_Alaska_2024-08-15_%28cropped%29.jpg/1400px-Queen_Elizabeth_%28ship%2C_2010%29_in_Juneau%2C_Alaska_2024-08-15_%28cropped%29.jpg",
    alt: "Destination view of Juneau",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Queen_Elizabeth_%28ship%2C_2010%29_in_Juneau%2C_Alaska_2024-08-15_%28cropped%29.jpg",
  },
  "ketchikan": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Downtown_Ketchikan_-_panoramio.jpg/1400px-Downtown_Ketchikan_-_panoramio.jpg",
    alt: "Destination view of Ketchikan",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Ketchikan_-_panoramio.jpg",
  },
  "skagway": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Skagway_aerial_view.jpg/1400px-Skagway_aerial_view.jpg",
    alt: "Destination view of Skagway",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Skagway_aerial_view.jpg",
  },
  "sitka": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sitka_84_Elev_135.jpg/1400px-Sitka_84_Elev_135.jpg",
    alt: "Destination view of Sitka",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sitka_84_Elev_135.jpg",
  },
  "icy-strait-point": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Aerial_photo_of_Hoonah%2C_Alaska.jpg/1400px-Aerial_photo_of_Hoonah%2C_Alaska.jpg",
    alt: "Destination view of Icy Strait Point",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Aerial_photo_of_Hoonah%2C_Alaska.jpg",
  },
  "cabo-san-lucas": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Collage_Cabo_San_Lucas.jpg/1400px-Collage_Cabo_San_Lucas.jpg",
    alt: "Destination view of Cabo San Lucas",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Collage_Cabo_San_Lucas.jpg",
  },
  "puerto-vallarta": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Collage_Puerto_Vallarta.jpg/1400px-Collage_Puerto_Vallarta.jpg",
    alt: "Destination view of Puerto Vallarta",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Collage_Puerto_Vallarta.jpg",
  },
  "cartagena-colombia": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Museo_Naval_del_Caribe.JPG/1400px-Museo_Naval_del_Caribe.JPG",
    alt: "Destination view of Cartagena",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Museo_Naval_del_Caribe.JPG",
  },
  "copenhagen": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/2018_-_Christiansborg_from_the_Marble_Bridge.jpg/1400px-2018_-_Christiansborg_from_the_Marble_Bridge.jpg",
    alt: "Destination view of Copenhagen",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2018_-_Christiansborg_from_the_Marble_Bridge.jpg",
  },
  "stockholm": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Royal_Dramatic_Theatre_Stockholm.jpg/1400px-Royal_Dramatic_Theatre_Stockholm.jpg",
    alt: "Destination view of Stockholm",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Royal_Dramatic_Theatre_Stockholm.jpg",
  },
  "tallinn": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Raekoja_plats_at_night.jpg/1400px-Raekoja_plats_at_night.jpg",
    alt: "Destination view of Tallinn",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Raekoja_plats_at_night.jpg",
  },
  "bergen": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bergen_panorama_at_night_-_panoramio_%281%29.jpg/1400px-Bergen_panorama_at_night_-_panoramio_%281%29.jpg",
    alt: "Destination view of Bergen",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bergen_panorama_at_night_-_panoramio_%281%29.jpg",
  },
  "geiranger": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/View_to_Geiranger_from_Flydalsjuvet%2C_2013_June.jpg/1400px-View_to_Geiranger_from_Flydalsjuvet%2C_2013_June.jpg",
    alt: "Destination view of Geiranger",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:View_to_Geiranger_from_Flydalsjuvet%2C_2013_June.jpg",
  },
  "reykjavik": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Reykjav%C3%ADk%2C_view_from_Hallgr%C3%ADmskirkja_%282%29.jpg/1400px-Reykjav%C3%ADk%2C_view_from_Hallgr%C3%ADmskirkja_%282%29.jpg",
    alt: "Destination view of Reykjavík",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Reykjav%C3%ADk%2C_view_from_Hallgr%C3%ADmskirkja_%282%29.jpg",
  },
  "belfast": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Custom_House%2C_River_Lagan%2C_Belfast.jpg/1400px-Custom_House%2C_River_Lagan%2C_Belfast.jpg",
    alt: "Destination view of Belfast",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Custom_House%2C_River_Lagan%2C_Belfast.jpg",
  },
  "le-havre-paris": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Panorama_of_Le_Havre%2C_September_2019.jpg/1400px-Panorama_of_Le_Havre%2C_September_2019.jpg",
    alt: "Destination view of Le Havre / Paris",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Panorama_of_Le_Havre%2C_September_2019.jpg",
  },
  "singapore": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Marina_Bay_Singapore-3499.jpg/1400px-Marina_Bay_Singapore-3499.jpg",
    alt: "Destination view of Singapore",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Marina_Bay_Singapore-3499.jpg",
  },
  "tokyo-yokohama": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Minato_Mirai.jpg/1400px-Minato_Mirai.jpg",
    alt: "Destination view of Tokyo / Yokohama",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Minato_Mirai.jpg",
  },
  "kobe-kyoto": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kyoto%2C_Japan_%2849667780482%29.jpg/1400px-Kyoto%2C_Japan_%2849667780482%29.jpg",
    alt: "Destination view of Kobe / Kyoto",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kyoto%2C_Japan_%2849667780482%29.jpg",
  },
  "hong-kong": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hong_Kong_Island_Skyline_2009.jpg/1400px-Hong_Kong_Island_Skyline_2009.jpg",
    alt: "Destination view of Hong Kong",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hong_Kong_Island_Skyline_2009.jpg",
  },
  "phuket": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Phuket_Aerial.jpg/1400px-Phuket_Aerial.jpg",
    alt: "Destination view of Phuket",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Phuket_Aerial.jpg",
  },
  "sydney": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/1400px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
    alt: "Destination view of Sydney",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
  },
  "auckland": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Auckland_skyline_-_May_2024_%282%29.jpg/1400px-Auckland_skyline_-_May_2024_%282%29.jpg",
    alt: "Destination view of Auckland",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Auckland_skyline_-_May_2024_%282%29.jpg",
  },
  "tauranga": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Tauranga_Harbour_and_City.jpg/1400px-Tauranga_Harbour_and_City.jpg",
    alt: "Destination view of Tauranga",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tauranga_Harbour_and_City.jpg",
  },
  "dubai": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Dubai_skyscrapers_at_night_2011.jpg/1400px-Dubai_skyscrapers_at_night_2011.jpg",
    alt: "Destination view of Dubai",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dubai_skyscrapers_at_night_2011.jpg",
  },
  "abu-dhabi": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Abu_dhabi_skylines_2014.jpg/1400px-Abu_dhabi_skylines_2014.jpg",
    alt: "Destination view of Abu Dhabi",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Abu_dhabi_skylines_2014.jpg",
  },
  "muscat": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Al_Alam_Palace.jpg/1400px-Al_Alam_Palace.jpg",
    alt: "Destination view of Muscat",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Al_Alam_Palace.jpg",
  },
  "cape-town": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Camps_bay_%2853460319478%29_%28cropped%29.jpg/1400px-Camps_bay_%2853460319478%29_%28cropped%29.jpg",
    alt: "Destination view of Cape Town",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Camps_bay_%2853460319478%29_%28cropped%29.jpg",
  },
  "port-louis": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Port_Louis_Skyline.JPG/1400px-Port_Louis_Skyline.JPG",
    alt: "Destination view of Port Louis",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Port_Louis_Skyline.JPG",
  },
  "buenos-aires": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Puerto_Madero%2C_Buenos_Aires_%2840689219792%29_%28cropped%29.jpg/1400px-Puerto_Madero%2C_Buenos_Aires_%2840689219792%29_%28cropped%29.jpg",
    alt: "Destination view of Buenos Aires",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Puerto_Madero%2C_Buenos_Aires_%2840689219792%29_%28cropped%29.jpg",
  },
  "rio-de-janeiro": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/1400px-Cidade_Maravilhosa.jpg",
    alt: "Destination view of Rio de Janeiro",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cidade_Maravilhosa.jpg",
  },
  "ushuaia": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ushuaia_aerial_panorama.jpg/1400px-Ushuaia_aerial_panorama.jpg",
    alt: "Destination view of Ushuaia",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ushuaia_aerial_panorama.jpg",
  },
};

const activityImageGroups = [
  {
    terms: ["snorkel", "reef", "beach", "catamaran", "sail", "boat", "island", "lagoon", "water"],
    ids: ["photo-1540202404-a2f29016b523", "photo-1507525428034-b723cf961d3e", "photo-1510414842594-a61c69b5ae57"],
  },
  {
    terms: ["food", "rum", "tasting", "chocolate", "cacao", "cooking", "market", "wine", "brewery"],
    ids: ["photo-1504674900247-0877df9cc836", "photo-1414235077428-338989a2e8c0", "photo-1559339352-11d035aa65de"],
  },
  {
    terms: ["ruin", "history", "heritage", "culture", "museum", "temple", "old town", "art", "architecture"],
    ids: ["photo-1516483638261-f4dbaf036963", "photo-1539037116277-4db20889f2d4", "photo-1552832230-c0197dd311b5"],
  },
  {
    terms: ["rainforest", "waterfall", "mangrove", "cave", "mountain", "glacier", "nature", "wildlife", "sloth", "turtle", "whale"],
    ids: ["photo-1501785888041-af3ef285b470", "photo-1464822759023-fed622ff2c3b", "photo-1469474968028-56623f02e42e"],
  },
  {
    terms: ["driver", "drive", "private", "jeep", "highlights", "viewpoint", "countryside", "route"],
    ids: ["photo-1476514525535-07fb3b4ae5f1", "photo-1500530855697-b586d89ba3ee", "photo-1501785888041-af3ef285b470"],
  },
  {
    terms: ["kayak", "surf", "hike", "zip", "adventure", "bike", "fishing", "paddle"],
    ids: ["photo-1526772662000-3f88f10405ff", "photo-1500530855697-b586d89ba3ee", "photo-1469474968028-56623f02e42e"],
  },
] as const;

export function getPortImage(port: Pick<Port, "slug" | "name" | "region">): EditorialImage {
  return portImages[port.slug] ?? unsplash(
    "photo-1500530855697-b586d89ba3ee",
    `Travel inspiration for a port day in ${port.name}`,
  );
}

export function getActivityImage(
  port: Pick<Port, "slug" | "name" | "region">,
  activity: Activity,
  index: number,
): EditorialImage {
  const text = `${activity.title} ${activity.search}`.toLowerCase();
  const match = activityImageGroups.find((group) => group.terms.some((term) => text.includes(term)));

  if (!match) return getPortImage(port);

  const photoId = match.ids[index % match.ids.length];
  return unsplash(photoId, `Travel inspiration for ${activity.title} in ${port.name}`);
}
