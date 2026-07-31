const entry = (fr, word, pronunciation = "", category = "Essentiels", variant = "") => ({
  fr: Array.isArray(fr) ? fr : [fr],
  word,
  pronunciation,
  category,
  variant,
});

// Le lexique est volontairement structuré par thèmes pour rester facile à enrichir.
// Les entrées shimaoré ci-dessous viennent du Mini Dictionnaire audio de Parlon-shimaore.
const shimaore = [
  entry(["bonjour", "salut"], "Jeje", "jé-jé", "Salutations", "variante : Gégé · familier"),
  entry(["bonjour respectueux", "bonjour à un aîné", "bonjour a un aine"], "Kwezi", "kwé-zi", "Salutations", "pour saluer un aîné"),
  entry(["bonjour du matin", "bonjour bonsoir", "bonsoir"], "Mahabari", "ma-ha-ba-ri", "Salutations", "salutation générale"),
  entry(["comment ça va", "comment ca va", "comment vas-tu", "comment vas tu", "comment allez-vous", "comment allez vous", "ça va"], "Habari ?", "ha-ba-ri", "Salutations", "variante : Wa fétré ?"),
  entry(["je vais bien", "ça va bien", "bien", "très bien", "tres bien"], "Ndjema", "n-djé-ma", "Salutations", "réponse à Habari"),
  entry(["pas bien"], "Tsi ndzuzuri", "tsi-n-dzou-zou-ri", "Salutations", "état négatif"),
  entry(["réponse à kwezi", "ça va, kwezi"], "Mbona", "m-bona", "Salutations", "réponse respectueuse"),
  entry(["merci", "merci beaucoup"], "Marahaba", "ma-ra-ha-ba", "Politesse", "à retenir"),
  entry(["au revoir"], "Kwaheri", "kwa-hé-ri", "Politesse", "salutation de départ"),
  entry(["à bientôt"], "Ritsohonana", "ri-tso-o-na-na", "Politesse", "on se revoit bientôt"),
  entry(["à demain"], "Mpaka messo", "m-pa-ka-messo", "Politesse", "à retenir"),
  entry(["bienvenue"], "Karibu", "ka-ri-bou", "Politesse", "réponse : Marahaba"),
  entry(["s'il te plaît", "s'il vous plaît", "s il te plait", "svp"], "Tafadhali", "ta-fa-dha-li", "Politesse", "variante : Tafadali"),
  entry(["pardon", "excuse-moi", "excuse moi", "désolé", "desole"], "Samahani", "sa-ma-ha-ni", "Politesse", "pour s'excuser"),
  entry(["je m'appelle", "je m appelle"], "Wami uhirwa…", "wa-mi ou-hi-rwa", "Conversation", "ajoutez votre prénom"),
  entry(["oui"], "Ewa", "é-wa", "Essentiels", "d'accord"),
  entry(["d'accord", "d accord"], "Ewa", "é-wa", "Essentiels", "oui"),
  entry(["non"], "Ahan", "an-han", "Essentiels", "variante : Aha"),
  entry(["un", "une"], "Moja", "mo-ja", "Nombres", "1"),
  entry(["deux"], "Mbili", "m-bi-li", "Nombres", "2"),
  entry(["trois"], "Traru", "tra-rou", "Nombres", "3"),
  entry(["quatre"], "Nne", "n-né", "Nombres", "4"),
  entry(["cinq"], "Tsano", "tsa-no", "Nombres", "5"),
  entry(["six"], "Sita", "si-ta", "Nombres", "6"),
  entry(["sept"], "Saba", "sa-ba", "Nombres", "7"),
  entry(["huit"], "Nane", "na-né", "Nombres", "8"),
  entry(["neuf"], "Chendra", "chin-dra", "Nombres", "9"),
  entry(["dix"], "Kumi", "kou-mi", "Nombres", "10"),
  entry(["parent"], "Wadzade", "oi-dza-dé", "Famille", "un parent"),
  entry(["père", "papa"], "Baba", "ba-ba", "Famille", "la famille"),
  entry(["mère", "maman"], "Mama", "ma-ma", "Famille", "la famille"),
  entry(["sœur", "soeur"], "Mwanagné mtrumama", "moi-nagnahé m-trou-mama", "Famille", "la famille"),
  entry(["frère", "frere"], "Mwanagné mtrubaba", "moi-nagnahé m-trou-baba", "Famille", "la famille"),
  entry(["petit-enfant"], "Mjuhu", "m-jou-hou", "Famille", "la famille"),
  entry(["mari"], "Mtrume", "mtrou-mé", "Famille", "la famille"),
  entry(["épouse", "epouse"], "Mtrumche", "m-troum-ché", "Famille", "la famille"),
  entry(["femme", "fille"], "Mtrumama", "m-troum-mama", "Famille", "la famille"),
  entry(["homme", "garçon", "garcon"], "Mtrumbaba", "m-trou-baba", "Famille", "la famille"),
  entry(["enfant", "un enfant"], "Mwana", "mwa-na", "Famille", "la famille"),
  entry(["adolescent"], "Machababi", "ma-cha-babi", "Famille", "la famille"),
  entry(["grand-père", "grand pere"], "Bacoco", "ba-co-co", "Famille", "la famille"),
  entry(["grand-mère", "grand mere"], "Coco", "co-co", "Famille", "la famille"),
  entry(["belle-sœur", "belle soeur"], "Moimu", "moi-mou", "Famille", "la famille"),
  entry(["beau-frère", "beau frere"], "Valahe", "va-la-hé", "Famille", "la famille"),
  entry(["ami", "amie"], "Mwandzani", "moi-dzan-ni", "Relations", "un ami / une amie"),
  entry(["voisin", "voisine", "voisins"], "Majirani", "ma-dji-ra-ni", "Relations", "le voisinage"),
  entry(["famille"], "Mdjemaza", "mdjé-ma-za", "Famille", "les proches"),
  entry(["mariage"], "Ndrola", "ndro-la", "Famille", "la famille"),
  entry(["mariée", "mariee"], "Bibi harusi", "bi-bi-ha-rou-ssi", "Famille", "la famille"),
  entry(["nourriture", "repas"], "Chahula", "cha-hou-la", "Cuisine", "à table"),
  entry(["eau"], "Maji", "ma-ji", "Cuisine", "à table"),
  entry(["thé", "the"], "Chai", "tcha-i", "Cuisine", "boisson"),
  entry(["viande"], "Chirewu", "chi-ré-ou", "Cuisine", "viande en général"),
  entry(["poisson"], "Fi", "fi", "Cuisine", "à table"),
  entry(["riz"], "Tsohole", "mé-lé", "Cuisine", "riz non cuit"),
  entry(["viande"], "Nyama", "nya-ma", "Cuisine", "à table"),
  entry(["haricots"], "Kundre", "koun-dré", "Cuisine", "à table"),
  entry(["bananes", "banane"], "Trovi", "tro-vii", "Cuisine", "à table"),
  entry(["noix de coco", "coco"], "Nadzi", "na-dzi", "Cuisine", "à table"),
  entry(["fruits", "fruit"], "Marunda", "ma-roun-da", "Cuisine", "à table"),
  entry(["légumes", "legumes", "légume", "legume"], "Mafeliki", "ma-fé-li-ki", "Cuisine", "à table"),
  entry(["sucre"], "Sukari", "sou-ka-ri", "Cuisine", "à table"),
  entry(["sel"], "Shingo", "chin-go", "Cuisine", "à table"),
  entry(["patate douce"], "Batata", "ba-ta-ta", "Cuisine", "à table"),
  entry(["œufs", "oeufs", "œuf", "oeuf"], "Majwahi", "ma-joi-i", "Cuisine", "à table"),
  entry(["pain"], "Mhare / Dipé", "m-ha-ré / di-pé", "Cuisine", "à table"),
  entry(["huile"], "Matra", "ma-tra", "Cuisine", "à table"),
  entry(["marmite"], "Nyungu", "gnoun-gou", "Cuisine", "ustensile"),
  entry(["couteau"], "Sembeya", "sin-be-ya", "Cuisine", "ustensile"),
  entry(["voiture"], "Gari", "ga-ri", "Transport", "se déplacer"),
  entry(["bus"], "Busi", "ba-si", "Transport", "se déplacer"),
  entry(["moto"], "Moto", "mo-to", "Transport", "se déplacer"),
  entry(["vélo", "velo"], "Biskleti", "bissi-klé-ti", "Transport", "se déplacer"),
  entry(["taxi"], "Taksi", "tak-si", "Transport", "se déplacer"),
  entry(["port"], "Bandari", "ban-da-ri", "Transport", "se déplacer"),
  entry(["avion"], "Ndege", "n-dè-gué", "Transport", "se déplacer"),
  entry(["route", "chemin"], "Ndziya", "ndzi-ya", "Transport", "se déplacer"),
  entry(["voyage", "trajet"], "Safari", "sa-fa-ri", "Transport", "se déplacer"),
  entry(["joie"], "Furaha", "fou-ra-ha", "Émotions", "un état"),
  entry(["colère"], "Hasira", "ha-si-ra", "Émotions", "un état"),
  entry(["tristesse"], "Hamu", "ha-mou", "Émotions", "un état"),
  entry(["peur"], "Uria", "hou-ria", "Émotions", "un état"),
  entry(["paix", "calme"], "Amani", "a-ma-ni", "Émotions", "un état"),
  entry(["fatigue"], "Ulemevu", "ou-lé-mouvu", "Émotions", "un état"),
  entry(["angoisse"], "Usongea", "ou-sson-gué-a", "Émotions", "un état"),
  entry(["honte"], "Haya", "ha-ya", "Émotions", "un état"),
  entry(["amour"], "Mahaba", "ma-ha-ba", "Émotions", "un état"),
  entry(["espoir"], "Tumaini", "tou-ma-i-ni", "Émotions", "un état"),
  entry(["paresse"], "Shida", "chi-da", "Émotions", "un état"),
  entry(["être heureux", "etre heureux"], "Ufurahi", "ou-fou-ra-hi", "Émotions", "un état"),
  entry(["maison"], "Nyumba", "n-youm-ba", "Lieux", "le quotidien"),
  entry(["toit en terrasse"], "Bbanara", "ba-na-ra", "Lieux", "la maison"),
  entry(["véranda", "terrasse"], "Bbaraza", "ba-ra-za", "Lieux", "la maison"),
  entry(["étage"], "Dari", "da-ri", "Lieux", "la maison"),
  entry(["cuisine"], "Banga la upishia", "ban-ga-la-ou-pi-chia", "Lieux", "la maison"),
  entry(["école", "ecole"], "Likoli", "li-ko-li", "Lieux", "le quotidien"),
  entry(["marché", "marche"], "Bazari", "ba-za-ri", "Lieux", "le quotidien"),
  entry(["hôpital", "hopital"], "Laptali", "la-pou-ta-li", "Lieux", "le quotidien"),
  entry(["mosquée", "mosquee"], "Mkiri", "m-ki-ri", "Lieux", "le quotidien"),
  entry(["église", "eglise"], "Eglisi", "e-gli-zi", "Lieux", "le quotidien"),
  entry(["mer"], "Bahari", "ba-ha-ri", "Lieux", "Mayotte"),
  entry(["village"], "Dago", "da-go", "Lieux", "Mayotte"),
  entry(["manger"], "Udya", "ou-dya", "Actions", "verbe"),
  entry(["boire"], "Unwa", "ou-noi", "Actions", "verbe"),
  entry(["dormir"], "Ulala", "ou-la-la", "Actions", "verbe"),
  entry(["aller"], "Uwendra", "ou-wen-dra", "Actions", "verbe"),
  entry(["revenir"], "Urudi", "ou-rou-di", "Actions", "verbe"),
  entry(["dire"], "Urongwa", "ou-rong-wa", "Actions", "verbe"),
  entry(["parler"], "Ulagwa", "ou-lag-wa", "Actions", "verbe"),
  entry(["écouter", "ecouter"], "Uvulikia", "ou-vouli-kia", "Actions", "verbe"),
  entry(["écrire", "ecrire"], "Uhangiha", "ou-an-gui-ha", "Actions", "verbe"),
  entry(["lire"], "Usoma", "ou-so-ma", "Actions", "verbe"),
  entry(["cuisiner"], "Upiha", "ou-pi-ha", "Actions", "verbe"),
  entry(["se réveiller", "se reveiller"], "Ulamuha", "ou-la-mou-ha", "Actions", "verbe"),
  entry(["rire"], "Utseha", "ou-tsé-ha", "Actions", "verbe"),
  entry(["pleurer"], "Ulia", "ou-li-a", "Actions", "verbe"),
  entry(["jouer", "danser"], "Uãngadza", "ou-tché-za", "Actions", "verbe"),
  entry(["travailler"], "Ufanya hazi", "ou-fa-nia ha-zi", "Actions", "verbe"),
  entry(["je comprends"], "Nisielewa", "ni-ssi-ou-é-lé-wa", "Pratique", "utile quand on apprend"),
  entry(["je ne comprends pas"], "Tsisi uelewa", "tsi-ssi-ou-é-lé-wa", "Pratique", "utile quand on apprend"),
  entry(["doucement", "plus lentement"], "Pole pole", "po-lé po-lé", "Pratique", "pour demander de ralentir"),
  entry(["vite"], "Haraka", "ha-ra-ka", "Pratique", "indication"),
  entry(["je ne sais pas"], "Tsisijuwa", "tsi-ssi-jou-oi", "Pratique", "utile quand on apprend"),
  entry(["aide-moi", "aide moi"], "Nisaidie", "ni-sa-i-dié", "Pratique", "demander de l'aide"),
  entry(["j'ai faim", "j ai faim"], "Nisiona ndza", "ni-ssi-o-na-ndza", "Pratique", "à table"),
  entry(["c'est cuit", "c est cuit"], "Hivu", "i-hi-vou", "Cuisine", "à table"),
  entry(["c'est froid", "c est froid"], "Ina baridi", "i-na-ba-ri-di", "Cuisine", "à table"),
  entry(["c'est chaud", "c est chaud"], "Ina moro", "i-na-mo-ro", "Cuisine", "à table"),
  entry(["c'est pimenté", "c est pimente"], "Ina putu", "i-na-pou-tou", "Cuisine", "à table"),
  entry(["c'est délicieux", "c est delicieux"], "Isijiva", "i-ssi-ji-va", "Cuisine", "à table"),
];

// Les entrées bretonnes regroupent les phrases utiles et un vocabulaire de base.
const breton = [
  entry(["bonjour", "salut"], "Salud", "sa-lut", "Salutations", "variante : Demat"),
  entry(["bonjour à toi", "bonjour a toi"], "Salud dit", "sa-lut dit", "Salutations", "familier"),
  entry(["bonjour du matin", "bon matin"], "Demat", "dé-mat", "Salutations", "salutation générale"),
  entry(["bienvenue"], "Degemer mat", "dé-gé-mer mat", "Salutations", "accueil"),
  entry(["comment ça va", "comment ca va", "comment vas-tu", "comment vas tu"], "Mat an traoù ganit?", "mat an trao ganit", "Salutations", "familier"),
  entry(["comment allez-vous", "comment allez vous"], "Mat an traoù ganeoc'h?", "mat an trao ganéok", "Salutations", "formel / pluriel"),
  entry(["je vais bien", "ça va bien", "ca va bien"], "Ya, mont a ra mat ganin.", "ya mont a ra mat ganin", "Salutations", "réponse"),
  entry(["très bien", "tres bien"], "Ya, mat-tre.", "ya mat-tré", "Salutations", "réponse"),
  entry(["comment t'appelles-tu", "comment t appelles tu", "quel est ton nom"], "Petra eo da anv?", "pétra éo da an", "Conversation", "demander le prénom"),
  entry(["je m'appelle", "je m appelle"], "... eo ma anv", "é-o ma an", "Conversation", "ajoutez votre prénom"),
  entry(["d'où viens-tu", "d ou viens tu", "d'où venez-vous"], "Eus pelec'h emaout?", "eus pélek émaout", "Conversation", "demander l'origine"),
  entry(["je viens de"], "Deus ... on", "deus on", "Conversation", "complétez avec un lieu"),
  entry(["ravi de vous rencontrer", "ravi de te rencontrer"], "Plijet bras on oc'h ober anaoudegezh ganeoc'h", "pli-yet bras on", "Conversation", "formule de rencontre"),
  entry(["au revoir"], "Kenavo", "ké-na-vo", "Politesse", "à retenir"),
  entry(["à la prochaine", "à une autre fois"], "Ken ar wech all", "ken ar ouéch all", "Politesse", "au revoir"),
  entry(["à demain"], "Ken arc'hoazh", "ken ark-hoaz", "Politesse", "au revoir"),
  entry(["bonne soirée"], "Nozvezh vat", "noz-véz vat", "Politesse", "soir"),
  entry(["bonne nuit"], "Noz vat", "noz vat", "Politesse", "soir"),
  entry(["bonne chance"], "Chañs vat", "chans vat", "Politesse", "encouragement"),
  entry(["bonne santé", "à votre santé"], "Yec'hed mat", "yé-ket mat", "Politesse", "toast"),
  entry(["bonne journée"], "Devezh vat dit", "dé-véz vat dit", "Politesse", "familier"),
  entry(["bon week-end", "bon weekend"], "Un dibenn-sizhun mat deoc'h", "un diben sizoun mat déok", "Politesse", "souhait"),
  entry(["bon appétit", "bon appetit"], "Debrit ervat!", "débrit érv-at", "Politesse", "à table"),
  entry(["bon voyage"], "Beaj vat!", "bé-aj vat", "Politesse", "départ"),
  entry(["merci"], "Trugarez", "tru-ga-réz", "Politesse", "variante courte : Trug"),
  entry(["merci beaucoup"], "Trugarez vras", "tru-ga-réz vras", "Politesse", "remerciement fort"),
  entry(["de rien", "je vous en prie"], "Netra", "né-tra", "Politesse", "réponse à merci"),
  entry(["s'il te plaît", "s'il vous plaît", "s il te plait", "s il vous plait"], "Mar plij", "mar plij", "Politesse", "demande polie"),
  entry(["pardon", "excuse-moi", "excuse moi"], "Digarez", "di-ga-réz", "Politesse", "variante : Eskuzit ac'hanon"),
  entry(["oui"], "Ya", "ya", "Essentiels", "réponse"),
  entry(["non"], "Nann", "nan", "Essentiels", "réponse"),
  entry(["je ne sais pas"], "N'ouzon ket", "nou-zon ket", "Pratique", "utile quand on apprend"),
  entry(["tu comprends", "comprenez-vous"], "Kompren a rez?", "kompren a réz", "Pratique", "familier"),
  entry(["je comprends"], "Kompren a ran", "kompren a ran", "Pratique", "utile quand on apprend"),
  entry(["je ne comprends pas"], "Ne gomprenan ket", "né gom-pré-nan ket", "Pratique", "utile quand on apprend"),
  entry(["parlez plus lentement", "parle plus lentement"], "Komzit gorrekoc'h mar plij", "komzit go-ré-kokh mar plij", "Pratique", "pour apprendre"),
  entry(["répétez s'il vous plaît", "repetez s il vous plait"], "Lavar-se en-dro, mar plij", "la-var sé en-dro", "Pratique", "pour apprendre"),
  entry(["écrivez-le s'il vous plaît", "ecrivez-le s il vous plait"], "Skriv-se, mar plij", "skriv sé mar plij", "Pratique", "pour apprendre"),
  entry(["parlez-vous anglais", "parlez vous anglais"], "Komz a rit saozneg?", "komz a rit saoz-nég", "Pratique", "langues"),
  entry(["parles-tu breton", "parles tu breton"], "Komz a rez brezhoneg?", "komz a réz bre-zo-nék", "Pratique", "langues"),
  entry(["un peu"], "Un tammig hepken", "un ta-mig é-pen", "Pratique", "réponse"),
  entry(["comment dit-on"], "Petra eo ar ger brezhonek evit...?", "pétra éo ar guér", "Pratique", "demander un mot"),
  entry(["combien ça coûte", "combien ca coute"], "Pegement e koust an dra-mañ?", "pé-gé-ment é koust", "Achats", "au marché"),
  entry(["je voudrais"], "Me a garfe...", "mé a garfé", "Achats", "faire une demande"),
  entry(["où sont les toilettes", "où sont les toilettes ?", "ou sont les toilettes"], "Pelec'h emañ ar privezioù?", "pé-lek é-man ar pri-vé-ziou", "Pratique", "lieu utile"),
  entry(["je t'aime", "je t aime", "je vous aime"], "Karout a ran ac'hanout", "ka-rout a ran a-ha-nout", "Relations", "affection"),
  entry(["aide", "au secours"], "Sikour!", "si-kour", "Urgence", "demander de l'aide"),
  entry(["feu", "au feu"], "Tan!", "tan", "Urgence", "urgence"),
  entry(["arrête", "arrêtez", "stop"], "Dihan!", "di-han", "Urgence", "urgence"),
  entry(["bonne fête", "joyeux noël", "joyeux noel"], "Nedeleg laouen", "né-dé-leg la-ou-en", "Fêtes", "Noël"),
  entry(["bonne année", "bonne annee"], "Bloavezh mat", "bloa-véz mat", "Fêtes", "Nouvel an"),
  entry(["joyeux anniversaire"], "Deiz ha bloaz laouen", "déz a bloaz la-ou-en", "Fêtes", "anniversaire"),
  entry(["félicitations", "felicitations"], "Gourc'hemennoù!", "gour-ké-men-no", "Fêtes", "bravo"),
  entry(["un", "une"], "Unan", "u-nan", "Nombres", "1"),
  entry(["deux"], "Daou", "da-ou", "Nombres", "2"),
  entry(["trois"], "Tri", "tri", "Nombres", "3"),
  entry(["quatre"], "Pevar", "pé-var", "Nombres", "4"),
  entry(["cinq"], "Pemp", "pemp", "Nombres", "5"),
  entry(["six"], "C'hwec'h", "houékh", "Nombres", "6"),
  entry(["sept"], "Seizh", "séïz", "Nombres", "7"),
  entry(["huit"], "Eizh", "éïz", "Nombres", "8"),
  entry(["neuf"], "Nav", "nav", "Nombres", "9"),
  entry(["dix"], "Dek", "dek", "Nombres", "10"),
  entry(["père", "pere", "papa"], "Tad", "tad", "Famille", "famille"),
  entry(["mère", "mere", "maman"], "Mamm", "mam", "Famille", "famille"),
  entry(["frère", "frere"], "Breur", "breur", "Famille", "famille"),
  entry(["sœur", "soeur"], "C'hoar", "ho-ar", "Famille", "famille"),
  entry(["fils", "garçon", "garcon"], "Mab", "mab", "Famille", "famille"),
  entry(["fille"], "Merc'h", "merk", "Famille", "famille"),
  entry(["enfant"], "Bugel", "bu-gel", "Famille", "famille"),
  entry(["famille"], "Familh", "fa-mil", "Famille", "famille"),
  entry(["maison"], "Ti", "ti", "Lieux", "quotidien"),
  entry(["école", "ecole"], "Skol", "skol", "Lieux", "quotidien"),
  entry(["ville"], "Kêr", "kér", "Lieux", "quotidien"),
  entry(["mer"], "Mor", "mor", "Nature", "Bretagne"),
  entry(["soleil"], "Heol", "é-ol", "Nature", "météo"),
  entry(["eau"], "Dour", "dour", "Nature", "quotidien"),
  entry(["pain"], "Bara", "ba-ra", "Cuisine", "à table"),
  entry(["viande"], "Kig", "kig", "Cuisine", "à table"),
  entry(["poisson"], "Pesk", "pesk", "Cuisine", "à table"),
  entry(["manger"], "Debriñ", "dé-brin", "Actions", "verbe"),
  entry(["boire"], "Evañ", "é-van", "Actions", "verbe"),
  entry(["aller"], "Mont", "mont", "Actions", "verbe"),
  entry(["venir"], "Dont", "dont", "Actions", "verbe"),
  entry(["dormir"], "Kousket", "kous-ket", "Actions", "verbe"),
  entry(["lire"], "Lenn", "len", "Actions", "verbe"),
  entry(["écrire", "ecrire"], "Skrivañ", "skri-van", "Actions", "verbe"),
  entry(["parler"], "Komz", "komz", "Actions", "verbe"),
  entry(["écouter", "ecouter"], "Selaou", "sé-la-ou", "Actions", "verbe"),
  entry(["voir"], "Gwelet", "gwé-let", "Actions", "verbe"),
  entry(["travailler"], "Labourat", "la-bou-rat", "Actions", "verbe"),
  entry(["chanter"], "Kanañ", "ka-nan", "Actions", "verbe"),
  entry(["danser"], "Dañsal", "dan-sal", "Actions", "verbe"),
  entry(["météo", "meteo", "temps"], "Amzer", "am-zér", "Météo", "le temps"),
  entry(["quel temps fait-il", "quel temps fait il"], "Penaos eo an amzer?", "pé-na-os éo an am-zér", "Météo", "le temps"),
  entry(["il fait beau", "le temps est beau"], "Brav eo an amzer", "brav éo an am-zér", "Météo", "le temps"),
  entry(["il fait chaud"], "Tomm eo", "tom éo", "Météo", "le temps"),
  entry(["il fait froid"], "Yen eo", "yen éo", "Météo", "le temps"),
  entry(["vent"], "Avel", "a-vel", "Météo", "nature"),
  entry(["il y a du vent"], "Avel zo", "a-vel zo", "Météo", "nature"),
  entry(["nuage", "nuages"], "Koumoul", "kou-moul", "Météo", "nature"),
  entry(["pluie"], "Glav", "glav", "Météo", "nature"),
  entry(["il pleut"], "Glav a ra", "glav a ra", "Météo", "nature"),
  entry(["neige"], "Erc'h", "èrkh", "Météo", "nature"),
  entry(["arc-en-ciel"], "Kanevedenn", "ka-né-vé-den", "Météo", "nature"),
  entry(["blanc"], "Gwenn", "gwén", "Couleurs", "couleur"),
  entry(["noir"], "Du", "du", "Couleurs", "couleur"),
  entry(["rouge"], "Ruz", "ruz", "Couleurs", "couleur"),
  entry(["bleu"], "Glas", "glas", "Couleurs", "couleur"),
  entry(["jaune"], "Melen", "mé-len", "Couleurs", "couleur"),
  entry(["vert"], "Gwer", "gwér", "Couleurs", "couleur"),
];

const LANGUAGES = {
  shimaore: {
    label: "Shimaoré", sub: "shimaore", region: "Mayotte", dot: "shimaore", data: shimaore,
    prompt: ["Bonjour", "Merci", "Comment ça va ?", "Je m'appelle Léa"],
    lesson: { title: "Saluer avec<br><em>respect.</em>", text: "À Mayotte, le choix du salut dépend aussi de la personne à qui l’on parle.", oneLabel: "À un aîné", oneWord: "Kwezi", onePron: "/ kwé-zi /", twoLabel: "Entre proches", twoWord: "Jeje", twoPron: "/ jé-jé /", say: "Kwezi. Jeje." },
    quiz: { word: "merci", correct: "Marahaba", options: ["Kwaheri", "Marahaba", "Karibu"] },
  },
  breton: {
    label: "Breton", sub: "brezhoneg", region: "Bretagne", dot: "breton", data: breton,
    prompt: ["Bonjour", "Merci", "Comment ça va ?", "Au revoir"],
    lesson: { title: "Saluer en<br><em>brezhoneg.</em>", text: "Le breton possède plusieurs salutations : choisis une formule simple et lance-toi.", oneLabel: "Formule générale", oneWord: "Salud", onePron: "/ sa-lut /", twoLabel: "Très courant", twoWord: "Demat", twoPron: "/ dé-mat /", say: "Salud. Demat." },
    quiz: { word: "merci", correct: "Trugarez", options: ["Kenavo", "Trugarez", "Degemer mat"] },
  },
};

// Les compléments éditoriaux sont séparés du moteur pour faciliter les ajouts.
if (window.MWONO_CATALOG) {
  Object.entries(window.MWONO_CATALOG).forEach(([language, entries]) => {
    if (LANGUAGES[language]) LANGUAGES[language].data.push(...entries);
  });
}

const state = { language: "shimaore", reverse: false, expanded: false, search: "" };
const $ = (selector) => document.querySelector(selector);
const sourceText = $("#sourceText");
const resultText = $("#resultText");
const pronunciationRow = $("#pronunciationRow");
const pronunciationText = $("#pronunciationText");
const confidence = $("#confidence");
const audioButton = $("#audioButton");
const resultTip = $("#resultTip");
const characterCount = $("#characterCount");

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, " ").replace(/[!?.,;:]/g, " ").replace(/\s+/g, " ").trim();
}

function termsFor(item) {
  return state.reverse ? [normalize(item.word)] : item.fr.map(normalize);
}

function outputFor(item) {
  return state.reverse ? item.fr[0] : item.word;
}

function findMatch(input) {
  const clean = normalize(input);
  if (!clean) return null;
  const data = LANGUAGES[state.language].data;
  const exact = data.find((item) => termsFor(item).includes(clean));
  if (exact) return { item: exact, exact: true, kind: "phrase" };
  const included = data.find((item) => termsFor(item).some((term) => term.length > 3 && (clean.includes(term) || term.includes(clean))));
  if (included) return { item: included, exact: false, kind: "phrase" };
  const tokens = clean.split(" ");
  const matches = [];
  data.forEach((item) => {
    if (termsFor(item).some((term) => term.split(" ").some((word) => word.length > 2 && tokens.includes(word)))) matches.push(item);
  });
  if (matches.length === 1) return { item: matches[0], exact: false, kind: "word" };
  if (matches.length > 1) {
    const output = matches.slice(0, 4).map(outputFor).join(" · ");
    return { item: { word: output, fr: [output], pronunciation: "", category: "Suggestion", variant: "suggestion mot à mot" }, exact: false, kind: "word" };
  }
  return null;
}

function speak(text) {
  if (!window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.language === "breton" ? "br-FR" : "fr-FR";
  utterance.rate = .78;
  window.speechSynthesis.speak(utterance);
}

function translate() {
  const input = sourceText.value.trim();
  characterCount.textContent = `${input.length} / 240`;
  if (!input) {
    resultText.textContent = "Votre traduction apparaîtra ici.";
    resultText.className = "empty-result";
    pronunciationRow.classList.add("hidden");
    audioButton.classList.add("hidden");
    confidence.innerHTML = "<i></i> Prêt à traduire";
    confidence.className = "confidence";
    resultTip.innerHTML = `<span>✦</span> Essayez « ${LANGUAGES[state.language].prompt[0].toLowerCase()} », « merci » ou une phrase courte.`;
    return;
  }
  const match = findMatch(input);
  if (!match) {
    resultText.textContent = "Je continue d’apprendre…";
    resultText.className = "empty-result";
    pronunciationRow.classList.add("hidden");
    audioButton.classList.add("hidden");
    confidence.innerHTML = "<i></i> À enrichir";
    confidence.className = "confidence ready";
    resultTip.innerHTML = "<span>✦</span> Essaie un mot ou une expression courte du lexique.";
    return;
  }
  const item = match.item;
  const output = outputFor(item);
  resultText.textContent = output;
  resultText.className = "";
  if (item.pronunciation) {
    pronunciationText.textContent = `/ ${item.pronunciation} /`;
    pronunciationRow.classList.remove("hidden");
  } else pronunciationRow.classList.add("hidden");
  audioButton.classList.remove("hidden");
  audioButton.dataset.say = output;
  const matchLabel = match.exact ? "Expression connue" : match.kind === "word" ? "Suggestion mot à mot" : "Phrase proche";
  confidence.innerHTML = `<i></i> ${matchLabel}`;
  confidence.className = `confidence ${match.exact ? "found" : "ready"}`;
  resultTip.innerHTML = `<span>✦</span> ${item.category}${item.variant ? ` · ${item.variant}` : ""}.`;
}

function renderCards() {
  const data = LANGUAGES[state.language].data;
  const query = normalize(state.search);
  const filtered = query ? data.filter((item) => normalize([...item.fr, item.word, item.category].join(" ")).includes(query)) : data;
  const items = state.expanded || query ? filtered : filtered.slice(0, 4);
  if (!items.length) {
    $("#wordGrid").innerHTML = '<p class="empty-library">Aucun mot trouvé dans ce lexique pour le moment.</p>';
    return;
  }
  $("#wordGrid").innerHTML = items.map((item) => `
    <article class="word-card">
      <span class="category">${item.category}</span>
      <button class="word-audio" type="button" aria-label="Écouter ${item.word}" data-speak="${item.word}">◖</button>
      <h3>${item.word}</h3>
      <p>${item.fr[0]}</p>
      <span class="variant">${item.variant || "à retenir"}</span>
    </article>`).join("");
  $("#wordGrid").querySelectorAll(".word-audio").forEach((button) => button.addEventListener("click", () => speak(button.dataset.speak)));
}

function renderPrompts() {
  const data = LANGUAGES[state.language];
  const prompts = state.reverse ? data.data.slice(0, 4).map((item) => item.word) : data.prompt;
  $("#quickPromptButtons").innerHTML = prompts.map((prompt) => `<button type="button" data-prompt="${prompt}">${prompt}</button>`).join("");
  $("#quickPromptButtons").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { sourceText.value = button.dataset.prompt; translate(); sourceText.focus(); }));
}

function renderLesson() {
  const lesson = LANGUAGES[state.language].lesson;
  $("#lessonTitle").innerHTML = lesson.title;
  $("#lessonText").textContent = lesson.text;
  $("#lessonOneLabel").textContent = lesson.oneLabel;
  $("#lessonOneWord").textContent = lesson.oneWord;
  $("#lessonOnePron").textContent = lesson.onePron;
  $("#lessonTwoLabel").textContent = lesson.twoLabel;
  $("#lessonTwoWord").textContent = lesson.twoWord;
  $("#lessonTwoPron").textContent = lesson.twoPron;
}

function renderQuiz() {
  const language = LANGUAGES[state.language];
  $("#quizQuestion").innerHTML = `Comment dit-on <strong>« ${language.quiz.word} »</strong> en ${language.label.toLowerCase()} ?`;
  $("#quizOptions").innerHTML = language.quiz.options.map((option) => `<button type="button" data-answer="${option === language.quiz.correct}">${option}</button>`).join("");
  $("#quizFeedback").textContent = "";
}

function updateLanguageUI() {
  const language = LANGUAGES[state.language];
  const source = state.reverse ? language : { label: "Français", sub: "français", dot: "french" };
  const target = state.reverse ? { label: "Français", sub: "français", dot: "french" } : language;
  $("#sourceLanguage").textContent = source.label;
  $("#sourceLanguageSub").textContent = source.sub;
  $("#sourceDot").className = `lang-dot ${source.dot}`;
  $("#targetLanguage").textContent = target.label;
  $("#targetLanguageSub").textContent = target.sub;
  $("#targetDot").className = `lang-dot ${target.dot}`;
  $("#inputLabel").textContent = state.reverse ? `Votre phrase en ${language.label}` : "Votre phrase";
  sourceText.placeholder = state.reverse ? `Écrivez en ${language.label.toLowerCase()}…` : "Écrivez un mot ou une phrase…";
  $("#languageEyebrow").textContent = `${language.label} · ${language.region}`;
  $("#essentialsLabel").textContent = state.expanded ? `${language.data.length} entrées` : "Les essentiels";
  $("#lexiconSearch").placeholder = `Chercher en ${language.label.toLowerCase()} ou en français…`;
  renderPrompts();
  renderCards();
  renderLesson();
  renderQuiz();
  translate();
}

$("#sourceText").addEventListener("input", translate);
$("#clearButton").addEventListener("click", () => { sourceText.value = ""; translate(); sourceText.focus(); });
$("#audioButton").addEventListener("click", () => speak($("#audioButton").dataset.say));
$("#lexiconSearch").addEventListener("input", (event) => { state.search = event.target.value; renderCards(); });
$("#lessonAudioButton").addEventListener("click", () => speak(LANGUAGES[state.language].lesson.say));
$("#swapButton").addEventListener("click", () => { state.reverse = !state.reverse; updateLanguageUI(); });
$("#targetTrigger").addEventListener("click", () => { const choice = $("#targetChoice"); const open = choice.classList.toggle("open"); $("#targetTrigger").setAttribute("aria-expanded", String(open)); });
document.addEventListener("click", (event) => { if (!$("#targetChoice").contains(event.target)) { $("#targetChoice").classList.remove("open"); $("#targetTrigger").setAttribute("aria-expanded", "false"); } });
document.querySelectorAll("#languageMenu [data-language]").forEach((button) => button.addEventListener("click", () => { state.language = button.dataset.language; state.expanded = false; state.search = ""; $("#lexiconSearch").value = ""; $("#targetChoice").classList.remove("open"); $("#showAllButton").innerHTML = 'Voir tout <span>↗</span>'; updateLanguageUI(); }));
$("#showAllButton").addEventListener("click", (event) => { state.expanded = !state.expanded; event.currentTarget.innerHTML = state.expanded ? 'Réduire <span>↙</span>' : 'Voir tout <span>↗</span>'; updateLanguageUI(); });
$("#quizOptions").addEventListener("click", (event) => { const button = event.target.closest("button"); if (!button) return; $("#quizOptions").querySelectorAll("button").forEach((item) => item.classList.remove("correct", "wrong")); const correct = button.dataset.answer === "true"; button.classList.add(correct ? "correct" : "wrong"); $("#quizFeedback").textContent = correct ? `Exact — ${LANGUAGES[state.language].quiz.correct} ! ✦` : `Pas tout à fait. La bonne réponse est ${LANGUAGES[state.language].quiz.correct}.`; });
$("#streakButton").addEventListener("click", () => { const count = $("#streakCount"); count.textContent = Number(count.textContent) + 1; $("#streakButton").title = "Bravo, votre série continue !"; });

updateLanguageUI();
