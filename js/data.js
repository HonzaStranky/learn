// ============================================
// DATA MODULE - All vocabulary and lesson data
// ============================================

const DATA = {
    czech: [
        {q: 'praha', a: 'Praha', h: 'Město:'},
        {q: 'vltava', a: 'Vltava', h: 'Řeka:'},
        {q: 'brno', a: 'Brno', h: 'Město:'},
        {q: 'ostrava', a: 'Ostrava', h: 'Město:'},
        {q: 'morava', a: 'Morava', h: 'Řeka:'},
        {q: 'labe', a: 'Labe', h: 'Řeka:'},
        {q: 'plzeň', a: 'Plzeň', h: 'Město:'},
        {q: 'olomouc', a: 'Olomouc', h: 'Město:'},
        {q: 'české budějovice', a: 'České Budějovice', h: 'Město:'},
        {q: 'karlovy vary', a: 'Karlovy Vary', h: 'Město:'}
    ],
    en: {
        // 4. TŘÍDA
        colors: [{q:'Červená',a:'red'},{q:'Modrá',a:'blue'},{q:'Zelená',a:'green'},{q:'Žlutá',a:'yellow'},{q:'Černá',a:'black'},{q:'Bílá',a:'white'},{q:'Hnědá',a:'brown'},{q:'Růžová',a:'pink'},{q:'Oranžová',a:'orange'},{q:'Fialová',a:'purple'},{q:'Šedá',a:'grey'},{q:'Zlatá',a:'gold'},{q:'Stříbrná',a:'silver'},{q:'Světlá',a:'light'},{q:'Tmavá',a:'dark'}],
        numbers: [{q:'Jedna',a:'one'},{q:'Dva',a:'two'},{q:'Tři',a:'three'},{q:'Čtyři',a:'four'},{q:'Pět',a:'five'},{q:'Šest',a:'six'},{q:'Sedm',a:'seven'},{q:'Osm',a:'eight'},{q:'Devět',a:'nine'},{q:'Deset',a:'ten'},{q:'Jedenáct',a:'eleven'},{q:'Dvanáct',a:'twelve'},{q:'Třináct',a:'thirteen'},{q:'Čtrnáct',a:'fourteen'},{q:'Patnáct',a:'fifteen'}],
        family: [{q:'Matka',a:'mother'},{q:'Otec',a:'father'},{q:'Sestra',a:'sister'},{q:'Bratr',a:'brother'},{q:'Babička',a:'grandmother'},{q:'Dědeček',a:'grandfather'},{q:'Syn',a:'son'},{q:'Dcera',a:'daughter'},{q:'Teta',a:'aunt'},{q:'Strýc',a:'uncle'},{q:'Sestřenice/Bratranec',a:'cousin'},{q:'Miminko',a:'baby'},{q:'Rodiče',a:'parents'},{q:'Manželka',a:'wife'},{q:'Manžel',a:'husband'}],
        greetings: [{q:'Ahoj (při setkání)',a:'hello'},{q:'Ahoj (při loučení)',a:'bye'},{q:'Dobré ráno',a:'good morning'},{q:'Dobrou noc',a:'good night'},{q:'Prosím',a:'please'},{q:'Děkuji',a:'thank you'},{q:'Promiň',a:'sorry'},{q:'Jak se máš?',a:'how are you'},{q:'Měj se hezky',a:'have a nice day'},{q:'Nashledanou',a:'goodbye'},{q:'Vítejte',a:'welcome'},{q:'Těší mě',a:'nice to meet you'},{q:'Ano',a:'yes'},{q:'Ne',a:'no'},{q:'Pojď dál',a:'come in'}],
        school: [{q:'Škola',a:'school'},{q:'Tužka',a:'pencil'},{q:'Pero',a:'pen'},{q:'Kniha',a:'book'},{q:'Sešit',a:'notebook'},{q:'Guma',a:'eraser'},{q:'Pravítko',a:'ruler'},{q:'Učitel',a:'teacher'},{q:'Žák',a:'student'},{q:'Tabule',a:'board'},{q:'Třída',a:'classroom'},{q:'Lavice',a:'desk'},{q:'Batoh',a:'backpack'},{q:'Papír',a:'paper'},{q:'Ořezávátko',a:'sharpener'}],

        // 5. TŘÍDA
        house: [{q:'Dům',a:'house'},{q:'Pokoj',a:'room'},{q:'Kuchyně',a:'kitchen'},{q:'Koupelna',a:'bathroom'},{q:'Ložnice',a:'bedroom'},{q:'Zahrada',a:'garden'},{q:'Okno',a:'window'},{q:'Dveře',a:'door'},{q:'Střecha',a:'roof'},{q:'Zeď',a:'wall'},{q:'Podlaha',a:'floor'},{q:'Obývací pokoj',a:'living room'},{q:'Garáž',a:'garage'},{q:'Schody',a:'stairs'},{q:'Půda',a:'attic'}],
        clothes: [{q:'Tričko',a:'t-shirt'},{q:'Kalhoty',a:'trousers'},{q:'Boty',a:'shoes'},{q:'Bunda',a:'jacket'},{q:'Čepice',a:'cap'},{q:'Ponožky',a:'socks'},{q:'Šaty',a:'dress'},{q:'Sukně',a:'skirt'},{q:'Svetr',a:'sweater'},{q:'Košile',a:'shirt'},{q:'Klobouk',a:'hat'},{q:'Rukavice',a:'gloves'},{q:'Brýle',a:'glasses'},{q:'Pásek',a:'belt'},{q:'Mikina',a:'hoodie'}],
        hobbies: [{q:'Hra',a:'game'},{q:'Sport',a:'sport'},{q:'Čtení',a:'reading'},{q:'Psaní',a:'writing'},{q:'Kreslení',a:'drawing'},{q:'Zpěv',a:'singing'},{q:'Tanec',a:'dancing'},{q:'Plavání',a:'swimming'},{q:'Běh',a:'running'},{q:'Fotbal',a:'football'},{q:'Kino',a:'cinema'},{q:'Hudba',a:'music'},{q:'Vaření',a:'cooking'},{q:'Cestování',a:'travelling'},{q:'Spaní',a:'sleeping'}],
        days: [{q:'Pondělí',a:'monday'},{q:'Úterý',a:'tuesday'},{q:'Středa',a:'wednesday'},{q:'Čtvrtek',a:'thursday'},{q:'Pátek',a:'friday'},{q:'Sobota',a:'saturday'},{q:'Neděle',a:'sunday'},{q:'Týden',a:'week'},{q:'Víkend',a:'weekend'},{q:'Dnes',a:'today'},{q:'Zítra',a:'tomorrow'},{q:'Včera',a:'yesterday'},{q:'Ráno',a:'morning'},{q:'Odpoledne',a:'afternoon'},{q:'Večer',a:'evening'}],
        weather: [{q:'Slunečno',a:'sunny'},{q:'Deštivo',a:'rainy'},{q:'Zataženo',a:'cloudy'},{q:'Sníh',a:'snow'},{q:'Vítr',a:'wind'},{q:'Bouřka',a:'storm'},{q:'Horko',a:'hot'},{q:'Zima',a:'cold'},{q:'Mlha',a:'fog'},{q:'Léto',a:'summer'},{q:'Zima (období)',a:'winter'},{q:'Jaro',a:'spring'},{q:'Podzim',a:'autumn'},{q:'Duhá',a:'rainbow'},{q:'Obloha',a:'sky'}],

        // 6. TŘÍDA
        city: [{q:'Město',a:'city'},{q:'Ulice',a:'street'},{q:'Obchod',a:'shop'},{q:'Park',a:'park'},{q:'Most',a:'bridge'},{q:'Banka',a:'bank'},{q:'Kino',a:'cinema'},{q:'Muzeum',a:'museum'},{q:'Náměstí',a:'square'},{q:'Nemocnice',a:'hospital'},{q:'Kostel',a:'church'},{q:'Škola',a:'school'},{q:'Restaurace',a:'restaurant'},{q:'Zastávka',a:'bus stop'},{q:'Letiště',a:'airport'}],
        food: [{q:'Jablko',a:'apple'},{q:'Chleba',a:'bread'},{q:'Mléko',a:'milk'},{q:'Sýr',a:'cheese'},{q:'Maso',a:'meat'},{q:'Zelenina',a:'vegetables'},{q:'Ovoce',a:'fruit'},{q:'Voda',a:'water'},{q:'Vejce',a:'egg'},{q:'Máslo',a:'butter'},{q:'Cukr',a:'sugar'},{q:'Sůl',a:'salt'},{q:'Rýže',a:'rice'},{q:'Polévka',a:'soup'},{q:'Džus',a:'juice'}],
        transport: [{q:'Auto',a:'car'},{q:'Autobus',a:'bus'},{q:'Vlak',a:'train'},{q:'Kolo',a:'bike'},{q:'Letadlo',a:'plane'},{q:'Loď',a:'ship'},{q:'Metro',a:'subway'},{q:'Motorka',a:'motorbike'},{q:'Řidič',a:'driver'},{q:'Cesta',a:'road'},{q:'Letět',a:'fly'},{q:'Jet',a:'go'},{q:'Vrtulník',a:'helicopter'},{q:'Kamion',a:'truck'},{q:'Taxi',a:'taxi'}],
        nature: [{q:'Strom',a:'tree'},{q:'Květina',a:'flower'},{q:'Tráva',a:'grass'},{q:'Les',a:'forest'},{q:'Hora',a:'mountain'},{q:'Řeka',a:'river'},{q:'Moře',a:'sea'},{q:'Oceán',a:'ocean'},{q:'Slunce',a:'sun'},{q:'Měsíc',a:'moon'},{q:'Hvězda',a:'star'},{q:'Země',a:'earth'},{q:'Ostrov',a:'island'},{q:'Jezero',a:'lake'},{q:'Pláž',a:'beach'}],
        body: [{q:'Hlava',a:'head'},{q:'Ruka',a:'hand'},{q:'Noha',a:'leg'},{q:'Oko',a:'eye'},{q:'Ucho',a:'ear'},{q:'Nos',a:'nose'},{q:'Ústa',a:'mouth'},{q:'Záda',a:'back'},{q:'Břicho',a:'stomach'},{q:'Prst',a:'finger'},{q:'Krk',a:'neck'},{q:'Rameno',a:'shoulder'},{q:'Vlasy',a:'hair'},{q:'Zub',a:'tooth'},{q:'Koleno',a:'knee'}],

        // 7. TŘÍDA
        sports: [{q:'Hokej',a:'hockey'},{q:'Tenis',a:'tennis'},{q:'Plavání',a:'swimming'},{q:'Lyžování',a:'skiing'},{q:'Běh',a:'running'},{q:'Volejbal',a:'volleyball'},{q:'Basketbal',a:'basketball'},{q:'Cvičení',a:'exercise'},{q:'Tým',a:'team'},{q:'Míč',a:'ball'},{q:'Hráč',a:'player'},{q:'Vyhrát',a:'win'},{q:'Prohrát',a:'lose'},{q:'Zápas',a:'match'},{q:'Branka',a:'goal'}],
        jobs: [{q:'Doktor',a:'doctor'},{q:'Policista',a:'policeman'},{q:'Hasič',a:'firefighter'},{q:'Kuchař',a:'cook'},{q:'Řidič',a:'driver'},{q:'Prodavač',a:'shop assistant'},{q:'Zpěvák',a:'singer'},{q:'Herec',a:'actor'},{q:'Programátor',a:'programmer'},{q:'Sestra (v nem.)',a:'nurse'},{q:'Stavitel',a:'builder'},{q:'Zemědělec',a:'farmer'},{q:'Úředník',a:'clerk'},{q:'Letuška',a:'flight attendant'},{q:'Číšník',a:'waiter'}],
        opposites: [{q:'Velký (v)',a:'big'},{q:'Malý (m)',a:'small'},{q:'Rychlý (r)',a:'fast'},{q:'Pomalý (p)',a:'slow'},{q:'Drahý (d)',a:'expensive'},{q:'Levný (l)',a:'cheap'},{q:'Teplý (t)',a:'hot'},{q:'Studený (s)',a:'cold'},{q:'Šťastný (š)',a:'happy'},{q:'Smutný (s)',a:'sad'},{q:'Mladý (m)',a:'young'},{q:'Starý (s)',a:'old'},{q:'Bohatý (b)',a:'rich'},{q:'Chudý (c)',a:'poor'},{q:'Krásný (k)',a:'beautiful'}],
        pastBe: [{q:'Já jsem byl',a:'i was'},{q:'Ty jsi byl',a:'you were'},{q:'On byl',a:'he was'},{q:'Ona byla',a:'she was'},{q:'Ono bylo',a:'it was'},{q:'My jsme byli',a:'we were'},{q:'Vy jste byli',a:'you were'},{q:'Oni byli',a:'they were'},{q:'Nebyl jsem',a:'i was not'},{q:'Nebyli jsme',a:'we were not'},{q:'Byl jsi?',a:'were you'},{q:'Byl on?',a:'was he'},{q:'Včera',a:'yesterday'},{q:'Minulý týden',a:'last week'},{q:'Před dvěma dny',a:'two days ago'}],
        prepositions: [{q:'V',a:'in'},{q:'Na',a:'on'},{q:'Pod',a:'under'},{q:'Vedle',a:'next to'},{q:'Za',a:'behind'},{q:'Před',a:'in front of'},{q:'Mezi',a:'between'},{q:'Nad',a:'above'},{q:'U',a:'at'},{q:'Do',a:'into'},{q:'Z',a:'from'},{q:'S',a:'with'},{q:'Bez',a:'without'},{q:'O (čem)',a:'about'},{q:'Pro',a:'for'}],

        // 8. TŘÍDA
        travel: [{q:'Cestovní pas',a:'passport'},{q:'Vízum',a:'visa'},{q:'Kufr',a:'suitcase'},{q:'Mapa',a:'map'},{q:'Průvodce',a:'guide'},{q:'Dovolená',a:'holiday'},{q:'Letenka',a:'ticket'},{q:'Ubytování',a:'accommodation'},{q:'Hotel',a:'hotel'},{q:'Pláž',a:'beach'},{q:'Památka',a:'monument'},{q:'Zahraničí',a:'abroad'},{q:'Cesta (výlet)',a:'trip'},{q:'Batoh',a:'backpack'},{q:'Rezervace',a:'reservation'}],
        shopping: [{q:'Peníze',a:'money'},{q:'Cena',a:'price'},{q:'Sleva',a:'discount'},{q:'Účtenka',a:'receipt'},{q:'Karta',a:'card'},{q:'Hotovost',a:'cash'},{q:'Zákazník',a:'customer'},{q:'Nákupní košík',a:'shopping basket'},{q:'Trh',a:'market'},{q:'Zkusit si (oblečení)',a:'try on'},{q:'Velikost',a:'size'},{q:'Taška',a:'bag'},{q:'Stát (peníze)',a:'cost'},{q:'Koupit',a:'buy'},{q:'Prodat',a:'sell'}],
        kitchen: [{q:'Nůž',a:'knife'},{q:'Vidlička',a:'fork'},{q:'Lžíce',a:'spoon'},{q:'Talíř',a:'plate'},{q:'Hrnek',a:'mug'},{q:'Sklenice',a:'glass'},{q:'Pánev',a:'pan'},{q:'Hrnec',a:'pot'},{q:'Trouba',a:'oven'},{q:'Lednice',a:'fridge'},{q:'Mrazák',a:'freezer'},{q:'Myčka',a:'dishwasher'},{q:'Varná konvice',a:'kettle'},{q:'Mísa',a:'bowl'},{q:'Utěrka',a:'tea towel'}],
        animals: [{q:'Lev',a:'lion'},{q:'Tygr',a:'tiger'},{q:'Slon',a:'elephant'},{q:'Žirafa',a:'giraffe'},{q:'Zebra',a:'zebra'},{q:'Opička',a:'monkey'},{q:'Vlk',a:'wolf'},{q:'Medvěd',a:'bear'},{q:'Liška',a:'fox'},{q:'Zajíc',a:'hare'},{q:'Pták',a:'bird'},{q:'Ryba',a:'fish'},{q:'Kůň',a:'horse'},{q:'Kráva',a:'cow'},{q:'Prase',a:'pig'}],
        presentCont: [{q:'Já právě píšu',a:'i am writing'},{q:'Ty právě jíš',a:'you are eating'},{q:'On právě běží',a:'he is running'},{q:'Ona právě spí',a:'she is sleeping'},{q:'My právě hrajeme',a:'we are playing'},{q:'Oni právě sledují',a:'they are watching'},{q:'Já právě nejdu',a:'i am not going'},{q:'Co právě děláš?',a:'what are you doing'},{q:'Ona právě čte',a:'she is reading'},{q:'Počkej',a:'wait'},{q:'Poslouchej',a:'listen'},{q:'Dívej se',a:'look'},{q:'Nyní',a:'now'},{q:'Právě teď',a:'at the moment'},{q:'Dnes',a:'today'}],

        // 9. TŘÍDA
        irregular: [{q:'Být (be)',a:'was been'},{q:'Jít (go)',a:'went gone'},{q:'Vidět (see)',a:'saw seen'},{q:'Jíst (eat)',a:'ate eaten'},{q:'Pít (drink)',a:'drank drunk'},{q:'Dělat (do)',a:'did done'},{q:'Mít (have)',a:'had had'},{q:'Psát (write)',a:'wrote written'},{q:'Číst (read)',a:'read read'},{q:'Mluvit (speak)',a:'spoke spoken'},{q:'Vzít (take)',a:'took taken'},{q:'Dát (give)',a:'gave given'},{q:'Koupit (buy)',a:'bought bought'},{q:'Spát (sleep)',a:'slept slept'},{q:'Běžet (run)',a:'ran run'}],
        tech: [{q:'Počítač',a:'computer'},{q:'Notebook',a:'laptop'},{q:'Klávesnice',a:'keyboard'},{q:'Myš',a:'mouse'},{q:'Obrazovka',a:'screen'},{q:'Internet',a:'internet'},{q:'Heslo',a:'password'},{q:'Uložit',a:'save'},{q:'Smazat',a:'delete'},{q:'Stáhnout',a:'download'},{q:'Nahrát (upload)',a:'upload'},{q:'Software',a:'software'},{q:'Aplikace',a:'application'},{q:'Nabíječka',a:'charger'},{q:'Sluchátka',a:'headphones'}],
        eco: [{q:'Životní prostředí',a:'environment'},{q:'Znečištění',a:'pollution'},{q:'Recyklace',a:'recycling'},{q:'Plast',a:'plastic'},{q:'Odpadky',a:'rubbish'},{q:'Energie',a:'energy'},{q:'Sluneční energie',a:'solar energy'},{q:'Globální oteplování',a:'global warming'},{q:'Chránit',a:'protect'},{q:'Šetřit',a:'save'},{q:'Příroda',a:'nature'},{q:'Les',a:'forest'},{q:'Vzduch',a:'air'},{q:'Voda',a:'water'},{q:'Zvířata',a:'animals'}],
        feelings: [{q:'Šťastný',a:'happy'},{q:'Smutný',a:'sad'},{q:'Naštvaný',a:'angry'},{q:'Unavený',a:'tired'},{q:'Vyděšený',a:'scared'},{q:'Překvapený',a:'surprised'},{q:'Nudící se',a:'bored'},{q:'Nadšený',a:'excited'},{q:'Nervózní',a:'nervous'},{q:'Hrdý',a:'proud'},{q:'Osamělý',a:'lonely'},{q:'Zmatený',a:'confused'},{q:'Nemocný',a:'sick'},{q:'Hladový',a:'hungry'},{q:'Žíznivý',a:'thirsty'}],
        phrasal: [{q:'Vstát',a:'get up'},{q:'Posadit se',a:'sit down'},{q:'Vstát (ze židle)',a:'stand up'},{q:'Vrátit se',a:'come back'},{q:'Pokračovat',a:'go on'},{q:'Vydat se (hledat)',a:'look for'},{q:'Vypnout',a:'turn off'},{q:'Zapnout',a:'turn on'},{q:'Vzdát se',a:'give up'},{q:'Vyplnit',a:'fill in'},{q:'Sundat si',a:'take off'},{q:'Obléknout si',a:'put on'},{q:'Zjistit',a:'find out'},{q:'Vyrůstat',a:'grow up'},{q:'Dávat pozor na',a:'look after'}]
    }
};

// Topic name mapping for display
const TOPIC_NAMES = {
    colors: '🎨 Barvy', numbers: '🔢 Čísla', family: '👨‍👩‍👧‍👦 Rodina',
    greetings: '👋 Pozdravy', school: '🏫 Škola', house: '🏠 Dům',
    clothes: '👕 Oblečení', hobbies: '⚽ Koníčky', days: '📅 Dny',
    weather: '🌤️ Počasí', city: '🏙️ Město', food: '🍎 Jídlo',
    transport: '🚗 Doprava', nature: '🌳 Příroda', body: '🦵 Tělo',
    sports: '⚽ Sporty', jobs: '👷 Povolání', opposites: '↔️ Protiklady',
    pastBe: '📝 Minulý čas', prepositions: '📍 Předložky', travel: '✈️ Cestování',
    shopping: '🛒 Nakupování', kitchen: '🍳 Kuchyně', animals: '🦁 Zvířata',
    presentCont: '📝 Přít. průběh.', irregular: '📚 Nepravidelná sl.', tech: '💻 Technologie',
    eco: '🌍 Ekologie', feelings: '😊 Pocity', phrasal: '📝 Frázová slovesa'
};

// Grade to topics mapping
const GRADE_TOPICS = {
    '4': ['colors', 'numbers', 'family', 'greetings', 'school'],
    '5': ['house', 'clothes', 'hobbies', 'days', 'weather'],
    '6': ['city', 'food', 'transport', 'nature', 'body'],
    '7': ['sports', 'jobs', 'opposites', 'pastBe', 'prepositions'],
    '8': ['travel', 'shopping', 'kitchen', 'animals', 'presentCont'],
    '9': ['irregular', 'tech', 'eco', 'feelings', 'phrasal']
};
