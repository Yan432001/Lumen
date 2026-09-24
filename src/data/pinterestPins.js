// Curated Pinterest Pins: Images, Stories, and Books with nocturnal atmospheric art
export const INITIAL_PINS = [
  // ==================== IMAGE PINS ====================
  {
    id: "pin-img-1",
    type: "image",
    category: "Nocturnal Photography",
    title: "Rainlit Cobalt Alley in Old Kyoto",
    aspectRatio: "3:4",
    author: {
      name: "Ren Takahashi",
      handle: "@rentakahashi",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      initials: "RT",
      bio: "Cinematic night street photographer based between Kyoto and Berlin."
    },
    likes: 1420,
    savedCount: 684,
    tags: ["Kyoto", "Rain", "Night Photography", "Street Noir", "Reflections"],
    description: "Captured during an autumn midnight downpour in Gion. Wet stone pavement reflects incandescent paper lanterns and deep indigo shadows.",
    details: {
      camera: "Leica M11 Monochrom / 50mm Summilux",
      shutter: "1/45s at f/1.4",
      iso: "800",
      location: "Gion District, Kyoto, Japan",
      palette: ["#0a0e1a", "#1e293b", "#f59e0b", "#0284c7", "#38bdf8"]
    },
    visualStyle: {
      gradient: "linear-gradient(180deg, #070a12 0%, #0f172a 45%, #1e1b4b 100%)",
      accent: "#38bdf8",
      symbol: "🏮"
    },
    comments: [
      { id: "c1", user: "Elena Rostova", time: "2 hours ago", text: "The reflections on the cobblestone are breathtaking." },
      { id: "c2", user: "Marcus Vane", time: "5 hours ago", text: "The tonal contrast between amber lanterns and cool indigo rain is pure magic." }
    ]
  },
  {
    id: "pin-img-2",
    type: "image",
    category: "Cosmic Arcana",
    title: "The Pillars of Obsidian Nebula",
    aspectRatio: "1:1",
    author: {
      name: "Dr. Cassian Vance",
      handle: "@cassian_vance",
      avatar: "",
      initials: "CV",
      bio: "Astrophysicist and deep-sky astrophotographer at Mauna Kea."
    },
    likes: 2180,
    savedCount: 942,
    tags: ["Cosmos", "Deep Sky", "Astronomy", "Nebula", "Gold Dust"],
    description: "Narrowband composite of interstellar gas clouds 6,500 light-years away in the constellation Serpens. Star-forming pillars sculptured by stellar radiation.",
    details: {
      camera: "PlaneWave CDK24 / FLI Kepler KL4040",
      shutter: "48h Cumulative Exposure",
      iso: "Hydrogen-Alpha / OIII / SII filters",
      location: "Mauna Kea Observatory, Hawaii",
      palette: ["#050508", "#1c1917", "#d97706", "#f59e0b", "#fef3c7"]
    },
    visualStyle: {
      gradient: "radial-gradient(circle at 40% 40%, #451a03 0%, #1e1b4b 50%, #030712 100%)",
      accent: "#f59e0b",
      symbol: "✨"
    },
    comments: [
      { id: "c3", user: "Nova Lyra", time: "1 day ago", text: "Looks like powdered gold sprinkled across velvet space." }
    ]
  },
  {
    id: "pin-img-3",
    type: "image",
    category: "Dark Architecture",
    title: "Gothic Cloister Vaults at Solstice",
    aspectRatio: "4:3",
    author: {
      name: "Sybilla Moreau",
      handle: "@sybilla_arch",
      avatar: "",
      initials: "SM",
      bio: "Architectural historian documenting 12th-century ribbed stone vaults."
    },
    likes: 890,
    savedCount: 420,
    tags: ["Architecture", "Gothic", "Symmetry", "Monochrome", "Sacred Geometry"],
    description: "Intersecting pointed arches and delicate tracery in the cloister of Mont-Saint-Michel during the winter solstice twilight.",
    details: {
      camera: "Hasselblad 907X / 28mm f/4",
      shutter: "2.5s at f/11",
      iso: "100",
      location: "Normandy, France",
      palette: ["#09090b", "#18181b", "#27272a", "#a1a1aa", "#f4f4f5"]
    },
    visualStyle: {
      gradient: "linear-gradient(135deg, #111827 0%, #1f2937 60%, #030712 100%)",
      accent: "#cbd5e1",
      symbol: "🏛️"
    },
    comments: [
      { id: "c4", user: "Dante Alighieri", time: "3 days ago", text: "The discipline of Gothic geometric acoustics in one frame." }
    ]
  },
  {
    id: "pin-img-4",
    type: "image",
    category: "Cyberpunk Noir",
    title: "Midnight Datastream over Neo-Hong Kong",
    aspectRatio: "9:16",
    author: {
      name: "Kaelen Drake",
      handle: "@kaelen_noir",
      avatar: "",
      initials: "KD",
      bio: "Digital concept illustrator crafting retro-futurist urban dystopias."
    },
    likes: 3105,
    savedCount: 1430,
    tags: ["Cyberpunk", "Neo-Noir", "Hologram", "Rain", "Vertical"],
    description: "Multilevel skyways suspended between 80-story residential monoliths. Neon Kanji advertisements flicker through dense oceanic fog.",
    details: {
      camera: "Digital Matte Painting / Blender 4.2 & Photoshop",
      shutter: "Raytraced Volumetric Render",
      iso: "ACES Color Space",
      location: "Sector 07 Causeway, Neo-Kowloon",
      palette: ["#020617", "#0f172a", "#e11d48", "#06b6d4", "#f43f5e"]
    },
    visualStyle: {
      gradient: "linear-gradient(180deg, #020617 0%, #1e1b4b 40%, #4c0519 80%, #020617 100%)",
      accent: "#f43f5e",
      symbol: "⚡"
    },
    comments: [
      { id: "c5", user: "Morpheus_9", time: "6 hours ago", text: "Pure Blade Runner aesthetic done with high taste." }
    ]
  },
  {
    id: "pin-img-5",
    type: "image",
    category: "Fine Art & Oil",
    title: "Chiaroscuro Study of the Alchemist's Study",
    aspectRatio: "3:4",
    author: {
      name: "Adelaide van Rijn",
      handle: "@adelaide_art",
      avatar: "",
      initials: "AR",
      bio: "Classical oil painter using Rembrandt-style glazing and lead tin yellow."
    },
    likes: 1780,
    savedCount: 812,
    tags: ["Chiaroscuro", "Oil Painting", "Baroque", "Candlelight", "Still Life"],
    description: "Oil on Belgian linen. Dramatic single candle illumination casting elongated shadows across brass astrolabes, mortar, pestle, and botanical manuscripts.",
    details: {
      camera: "Oil on Linen / 75cm x 100cm",
      shutter: "Glazed over 6 months",
      iso: "Natural pigments & linseed medium",
      location: "Amsterdam Studio",
      palette: ["#0d0705", "#1c1008", "#78350f", "#b45309", "#fde68a"]
    },
    visualStyle: {
      gradient: "radial-gradient(circle at 60% 35%, #451a03 0%, #1c1008 45%, #080402 100%)",
      accent: "#fde68a",
      symbol: "🕯️"
    },
    comments: [
      { id: "c6", user: "Julian Croft", time: "1 day ago", text: "The warmth of that candlelight edge is mesmerizing." }
    ]
  },
  {
    id: "pin-img-6",
    type: "image",
    category: "Nocturnal Photography",
    title: "The Lighthouse at Cape Disappointment",
    aspectRatio: "4:3",
    author: {
      name: "Isela Thorne",
      handle: "@isela_sea",
      avatar: "",
      initials: "IT",
      bio: "Maritime documentary photographer exploring remote Pacific lighthouses."
    },
    likes: 1250,
    savedCount: 530,
    tags: ["Ocean", "Lighthouse", "Storm", "Long Exposure", "Pacific"],
    description: "Thirty-second exposure of breaking Pacific swells against the volcanic basalt cliff face, pierced by the rotating Fresnel lens beam at 3 AM.",
    details: {
      camera: "Sony A7R V / FE 24-70mm GM II",
      shutter: "30s at f/8",
      iso: "400",
      location: "Cape Disappointment, Washington",
      palette: ["#030712", "#0f172a", "#1e3a8a", "#38bdf8", "#f0f9ff"]
    },
    visualStyle: {
      gradient: "linear-gradient(160deg, #020617 0%, #0c4a6e 65%, #030712 100%)",
      accent: "#38bdf8",
      symbol: "🌊"
    },
    comments: [
      { id: "c7", user: "Captain Finch", time: "18 hours ago", text: "The solitude and power of that beam over dark water." }
    ]
  },

  // ==================== STORY PINS ("READ STORY") ====================
  {
    id: "pin-story-1",
    type: "story",
    category: "Gothic Mystery",
    title: "The Watchmaker of Midnight Bell",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    author: {
      name: "Arthur Pendelton",
      handle: "@pendelton_tales",
      avatar: "",
      initials: "AP",
      bio: "Author of Victorian eerie fiction and gaslamp horror."
    },
    likes: 2450,
    savedCount: 1180,
    tags: ["Gothic", "Mystery", "Short Story", "Clocks", "Victorian"],
    excerpt: "The clocktower on St. Jude’s Hill had not rung for seven decades, yet every full moon, its pendulum swayed three inches to the left without making a sound...",
    quote: "“Time is not a stream that flows onward; it is an obsidian mirror waiting for a candle to turn around.”",
    themeColor: "#f59e0b",
    visualStyle: {
      gradient: "linear-gradient(135deg, #1c1917 0%, #292524 50%, #0c0a09 100%)",
      accent: "#f59e0b",
      symbol: "🕰️"
    },
    fullStory: `Chapter I: The Silent Pendulum

The clocktower atop St. Jude’s hill was built from granite hauled from the drowned quarries of Blackwater Firth. For seventy years its brass pendulum hung motionless in the bell-chamber, stiffened by salt winds and neglect.

Until the night Julian Cross climbed the wooden spiral stair with an iron wrench and a paraffin lantern.

Julian had been summoned by an unsigned wax-sealed parchment slipped beneath his workshop door in the lower lanes. The message contained only five words: "The third tooth is broken."

As he stepped into the vaulted mechanical loft, the lantern's glow flickered across forty feet of gear trains: iron escapements, counterweights suspended on hemp ropes as thick as a sailor's forearm, and interlocking wheels scored with astrological engravings.

At the center stood old Master Corvo, the guild clockmaker whom the parish council had buried in the frozen loam of November twelve winters ago.

Chapter II: Corvo's Escapement

Corvo did not turn around immediately. He was bent over the primary escapement wheel, his fingers—slender and stained with whale oil—adjusting the pallet jewels with a steel stylus.

"You took your time, Julian," the old man murmured, his voice dry as parchment rustling in a cellar draft.

"They said you perished of the marsh fever," Julian whispered, lifting his lantern. The golden light caught the curve of Corvo’s wool coat, throwing an immense shadow against the granite belfry wall.

"They said what they needed to say to sleep with their shutters unlatched," Corvo replied softly. He pointed with his oil-blackened thumb toward the central arbor. "Listen."

Julian held his breath.

Beneath the wind whipping through the louvered boards of the bell tower came a rhythm—not the heavy clang of iron on bronze, but a rhythmic, subsonic pulse, like the heartbeat of a sleeping leviathan buried beneath the town.

"Every hour that St. Jude’s strikes in the mortal realm," said Corvo, "steals sixty heartbeats from the people below. Seventy years ago, I took the escapement pin and swallowed it to stop their dying."

"Then why summon me tonight?" Julian asked, his pulse hammering against his temples.

Chapter III: The Hourglass Reversed

Corvo finally turned. His eyes were not decayed or empty, but bright as newly polished brass clockwork, reflecting Julian’s flame with piercing clarity.

"Because tonight the sea has risen to the foundation stones," Corvo said, offering the young apprentice an antique bronze key cut in the likeness of an ouroboros. "The pendulum must be released, Julian. Not to ring the hour forward, but to turn the parish clock three minutes backwards—just enough for the fishing boats to turn around before the squall breaks the reef."

Julian looked at the key. The lantern between them seemed to flare with sudden warmth. Outside, through the narrow arrow-slits, the dark Atlantic roared against the headland, while below in the dark cottages, hundreds slept, unaware of the hands moving in the dark.`,
    comments: [
      { id: "s1", user: "Clara Bell", time: "4 hours ago", text: "The atmosphere! 'Time is not a stream that flows onward' gave me literal goosebumps." },
      { id: "s2", user: "Oliver Thorne", time: "1 day ago", text: "Masterful short story. Perfect reading for a stormy midnight." }
    ]
  },
  {
    id: "pin-story-2",
    type: "story",
    category: "Nocturnal Sci-Fi",
    title: "Signals from the Event Horizon",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80",
    author: {
      name: "Sariha Chen",
      handle: "@sariha_chen",
      avatar: "",
      initials: "SC",
      bio: "Nebula Award-nominated author of quiet speculative fiction."
    },
    likes: 3120,
    savedCount: 1690,
    tags: ["Sci-Fi", "Cosmic", "Deep Space", "Story", "Philosophical"],
    excerpt: "We were stationed on Sub-Station 9 at the gravitational lip of Cygnus X-1. We thought the incoming telemetry was background cosmic noise until the frequency began spelling our childhood addresses...",
    quote: "“The universe does not whisper because it is timid; it whispers because its lungs are light-years across.”",
    themeColor: "#38bdf8",
    visualStyle: {
      gradient: "linear-gradient(145deg, #030712 0%, #0c4a6e 50%, #020617 100%)",
      accent: "#38bdf8",
      symbol: "📡"
    },
    fullStory: `Part I: The Baseline Echo

Sub-Station 9 was tethered by a pair of superconductive carbon-nanotube lines precisely twelve kilometers outside the Schwarzschild radius of Cygnus X-1.

From the observation cupola, the singularity did not resemble a whirlpool. It was a perfect spherical absence—a bead of sheer non-existence rimmed by an accretion ring that burned hotter than ten million suns.

My shift was graveyard, which meant little in the vacuum of space, save that the station dimmed its fluorescent corridors to a gentle indigo, and Dr. Morales brewed chicory coffee in the galley.

At 03:14:02 UTC, the high-gain dish on the dorsal mast recorded a pulse.

Part II: The Modulation

It was not synchrotron radiation. Synchrotron radiation is jagged, chaotic, spread over thousands of gigahertz like static on a wet road.

This signal occupied a razor-thin band at exactly 1420.405 MHz—the hydrogen line.

When Morales fed the Fourier transform through our linguistic decryption lattice, the printer began clacking in the stillness. A single line emerged:

74 MAPLE STREET, NORTHAMPTON. THE HYDRANGEAS ARE BLUE THIS YEAR.

Morales dropped his ceramic mug. It shattered against the deck plates, the dark coffee pooling in the zero-gravity drainage grooves.

"That's my mother's home," he whispered. "She planted those hydrangeas thirty years after I launched on the interstellar relay."

Part III: Gravitational Memory

We pointed the optical telescope into the accretion disc.

Nothing can escape the event horizon—except Hawking radiation, which physicists had long believed was thermally randomized. But as we watched the shimmering photon sphere, we realized the truth that humanity had spent centuries guessing in vain:

Black holes do not destroy information. They compress it into infinite layers. Every radio wave ever transmitted from Earth, every television broadcast, every mother's lullaby whispered into the evening sky since the dawn of radio was caught in the gravity well, circulating forever like grooves in an immortal vinyl record.

The universe was not silent. It was storing everything we had ever loved, waiting for someone to listen.`,
    comments: [
      { id: "s3", user: "Julian K.", time: "2 hours ago", text: "The revelation in Part III brought tears to my eyes. Beautifully written." }
    ]
  },
  {
    id: "pin-story-3",
    type: "story",
    category: "Dark Folklore",
    title: "The Weaver in the Black Alder Wood",
    readTime: "5 min read",
    author: {
      name: "Maeve O'Callaghan",
      handle: "@maeve_folklore",
      avatar: "",
      initials: "MO",
      bio: "Folklorist and oral storyteller documenting Baltic and Celtic legends."
    },
    likes: 1890,
    savedCount: 870,
    tags: ["Folklore", "Fable", "Mythology", "Forest", "Dark Fantasy"],
    excerpt: "Do not bring iron into the alder grove after sundown. The woman who sits at the ash loom weaves cloaks from the memories you forgot you lost...",
    quote: "“The thread you cut today was the name of the girl who held your hand in the hayloft forty springs ago.”",
    themeColor: "#10b981",
    visualStyle: {
      gradient: "linear-gradient(135deg, #064e3b 0%, #022c22 60%, #020617 100%)",
      accent: "#34d399",
      symbol: "🌿"
    },
    fullStory: `The villagers of Keld always warned their children: if your pocket is heavy with lead, your path through the alder wood is safe. But if your heart is heavy with a grievance, leave the road before the first barn owl calls.

Kellan was twenty-three when he ignored the elder's advice. His brother had taken the coastal farm, leaving Kellan with only a horse and his father's silver whistle.

He walked deep into the alder wood as twilight bled into velvet.

In the hollow where the black stream divided, a cottage stood—its walls woven not from timber, but from dried hazel wands tied with nettle cord. Inside, a rush-light flickered through the unglazed window.

A woman sat at a high vertical loom. Her hair was the color of river fog, and her fingers moved with the speed of water spiders across the warp.

"Sit, Kellan of Keld," she said without glancing over her shoulder.

"How do you know my name?" he asked, gripping his staff.

"Your name is the first three rows of this shawl," she said, tapping the silver-grey fabric stretched across the frame. "I took it when you threw the stone at the church bell when you were seven."

Kellan took a step back. "Give it back."

"A weaver never unravels," she smiled, turning. Her eyes were deep as well-water reflecting an empty winter sky. "I do not steal memories to spite men. I weave them because if humans carried every sorrow they ever felt, their skeletons would snap under the weight before they saw thirty summers."

She snipped a crimson thread with bone shears.

"Now go home, Kellan. Go back to your brother's table. You will find you no longer care who inherited the sheep-pen."

And when Kellan walked out beneath the cold stars, the bitterness that had choked his throat for seven months was gone—clean, quiet, like fresh snow over a turned grave.`,
    comments: [
      { id: "s4", user: "Gweneth", time: "12 hours ago", text: "This reads like an ancient fairy tale discovered in an old trunk. Exquisite." }
    ]
  },
  {
    id: "pin-story-4",
    type: "story",
    category: "Nocturnal Microfiction",
    title: "The City That Slept in the Fog",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    author: {
      name: "Iliya Vance",
      handle: "@iliyavance",
      avatar: "",
      initials: "IV",
      bio: "Poet and microfiction creator exploring urban twilight."
    },
    likes: 1540,
    savedCount: 710,
    tags: ["Microfiction", "Poetry", "Atmosphere", "Night", "Urban"],
    excerpt: "At 2:00 AM, the bridges across the river vanish not because of the mist, but because the two halves of the city decide to pretend the other was only a dream...",
    quote: "“Every city has an alternate twin that only wakes when the street lamps flicker yellow.”",
    themeColor: "#a855f7",
    visualStyle: {
      gradient: "linear-gradient(135deg, #3b0764 0%, #1e1b4b 60%, #030712 100%)",
      accent: "#c084fc",
      symbol: "🌫️"
    },
    fullStory: `At 2:00 AM, the bridges across the river vanish.

Not because the mist is thick—though it rolls off the estuary like cooled steam from an iron cauldron—but because the two halves of the city decide, by unspoken agreement, to pretend the other was only a rumor told to frighten children.

If you stand on the south embankment, looking northward, the spire of the Cathedral of St. Ambrose is no longer there. In its place is an open sea of dark reed-beds, where herons hunt silver minnows beneath a moon that does not belong to our calendar.

If you cross before midnight, you are a citizen of the republic of paper mills and copper tram lines.

If you cross after midnight, you belong to the Republic of Salt.

In the Republic of Salt, currency is paid in secrets told to stray cats. The street vendors sell tea steeped from chrysanthemum petals gathered during solar eclipses. And when you fall asleep in an attic room listening to the river, you wake up remembering the name you had before you were born.

I have lived on the north bank for six months now.

My family on the south side still sends postcards to an address that no longer exists in their postmaster's ledger.

I keep them in a wooden cigar box. Sometimes, on nights when the lantern burns low, I take them out and read the handwriting of people who believe I am dead, and smile because I have never felt so completely awake.`,
    comments: [
      { id: "s5", user: "Nicoletta", time: "1 day ago", text: "Reminds me of Italo Calvino's Invisible Cities. Pure poetry." }
    ]
  },

  // ==================== BOOK PINS ("READ BOOK") ====================
  {
    id: "pin-book-1",
    type: "book",
    category: "Gothic Literature",
    title: "The Grimoire of Somnolence",
    author: {
      name: "Lord Valerian de Mornay",
      handle: "@valerian_archive",
      avatar: "",
      initials: "VM",
      bio: "18th-century occultist, naturalist, and fellow of the Royal Botanical Society."
    },
    pagesCount: "128 Pages",
    year: "Published 1742",
    likes: 3890,
    savedCount: 2150,
    tags: ["Book", "Grimoire", "Classics", "Dark Academia", "Manuscript"],
    summary: "A legendary treatise on dream navigation, nocturnal plants, and lunar acoustics. Translated from the original parchment discovered in the vaults of the Bodleian Library.",
    quote: "“Sleep is the sea upon which the soul casts its net. What you pull up in the dawn depends upon the weight of your sinkers.”",
    themeColor: "#eab308",
    visualStyle: {
      gradient: "radial-gradient(circle at 50% 30%, #713f12 0%, #292524 50%, #0c0a09 100%)",
      accent: "#facc15",
      symbol: "📖"
    },
    chapters: [
      {
        id: "ch-1",
        number: "I",
        title: "Of the Nocturnal Flora & Black Poppies",
        pageNumber: 1,
        content: `CHAPTER I: OF THE NOCTURNAL FLORA & BLACK POPPIES

He who desires to understand the architecture of the dreaming mind must first learn the quiet temper of those blossoms that bloom only when the sun has sunk beneath the Western horizon.

For as the sunflower turneth her face toward the fierce brilliance of Phoebus, so doth the Black Poppy (Papaver Somniferum Nigrum) open her velvety corolla to the chilled beam of Diana.

Gather these petals on the third night following the new moon, when the dew has settled upon the moss like fine pulverized diamond. Dry them not upon hot iron, nor under the furnace draft of the baker's kiln, but upon bleached linen spread in a dark pantry where no ray of noon may penetrate.

When steeped in rainwater that hath fallen during thunder, the infusion yieldeth a syrup of dark amber hue. A single silver spoon taken before retiring causeth the spirit to loose its anchor from the corporeal clay, allowing it to wander the labyrinth of memory without fear of the minotaur.`
      },
      {
        id: "ch-2",
        number: "II",
        title: "The Seven Spheres of Unconscious Navigation",
        pageNumber: 24,
        content: `CHAPTER II: THE SEVEN SPHERES OF UNCONSCIOUS NAVIGATION

Know, gentle scholar, that the realm of slumber is divided into seven concentric spheres, even as the Ptolemaic heavens are enclosed by crystal orbits.

The First Sphere is that of the Sieve (Cribrum), wherein the trivial flotsam of the waking day—the unpaid coin, the barking dog, the broken platter—is sifted through the meshes of the cerebellum. Here the dreamer is plagued by foolish anxieties.

The Second Sphere is that of Mirror Water (Speculum Aquae). Here you shall perceive your own countenance reflected in bronze shields, but altered in age and apparel, showing what you might have become had your father sailed for Venice instead of London.

Pass through this sphere without lingering, for many a philosopher hath starved in his bed, enchanted by the beauty of his own unrealized self.

The Third Sphere is that of the Great Library (Bibliotheca Nocturna), where every book that was burned in the fire of Alexandria hath its pages preserved in smoke and ash, legible only to those whose eyelids remain shut while the mind keeps vigil.`
      },
      {
        id: "ch-3",
        number: "III",
        title: "Acoustics of the Starless Vault",
        pageNumber: 58,
        content: `CHAPTER III: ACOUSTICS OF THE STARLESS VAULT

When all lanterns are extinguished in the city, and the last coach has rumbled over the cobbles of St. Paul's, sit in silence near an open chimney flue.

The air that descendeth the brick chimney carries harmonic resonances from the upper stratosphere. If you tune a viol of five gut strings to the natural frequency of the wind, the strings shall begin to vibrate of their own accord without human hand touching the bow.

This is the music of the celestial sphere: not loud, but insistent as the breathing of a mother beside a sick cradle. Write these chords in red ink upon vellum; they possess the virtue of soothing madness and turning away the specters of remorse.`
      },
      {
        id: "ch-4",
        number: "IV",
        title: "The Seal of Safe Return",
        pageNumber: 96,
        content: `CHAPTER IV: THE SEAL OF SAFE RETURN

Lest the soul wander too far into the Seventh Sphere and forget the path backward to the beating pulse, let the student draw upon his breast the Tetragram of the Dawn:

Three interlocking triangles traced with the ash of dried rosemary and holy water.

For memory is a frail tether in the vast ocean of midnight. As the sailor looks to the North Star to steer his barque safely into Bristol harbor, so the dreamer must anchor his thoughts upon a beloved face, a familiar psalm, or the simple ticking of an English grandfather clock upon the stair.`
      }
    ],
    comments: [
      { id: "b1", user: "Genevieve Grey", time: "2 days ago", text: "This translation is glorious. The description of the Third Sphere gave me chills." },
      { id: "b2", user: "Prof. Sterling", time: "3 days ago", text: "An indispensable volume for lovers of antique esoterica and dark academia." }
    ]
  },
  {
    id: "pin-book-2",
    type: "book",
    category: "Philosophical Treatise",
    title: "Meditations on the Obsidian Mirror",
    author: {
      name: "Helena Blackwood",
      handle: "@blackwood_lore",
      avatar: "",
      initials: "HB",
      bio: "Philosopher of metaphysics and phenomenology of darkness."
    },
    pagesCount: "94 Pages",
    year: "Published 1912",
    likes: 2710,
    savedCount: 1340,
    tags: ["Philosophy", "Meditations", "Book", "Classics", "Reflection"],
    summary: "Twelve essays probing the paradox of sight in the absence of sunlight. Explores how darkness sharpens the inner eye and reveals truths hidden by daylight.",
    quote: "“Light shows us the surface of the world; darkness compels us to measure its depth.”",
    themeColor: "#818cf8",
    visualStyle: {
      gradient: "linear-gradient(145deg, #1e1b4b 0%, #0f172a 60%, #020617 100%)",
      accent: "#818cf8",
      symbol: "🪞"
    },
    chapters: [
      {
        id: "ch-1",
        number: "I",
        title: "On the Illusion of Illumination",
        pageNumber: 1,
        content: `CHAPTER I: ON THE ILLUSION OF ILLUMINATION

We live under the perpetual delusion that to see is to understand.

The noon sun is a tyrant. It floods the marketplace with indiscriminate radiation, obliterating shadows, flattening contours, and demanding that we attend only to that which can be counted, weighed, and bought. In the glare of daylight, the universe appears finished, static, and obvious.

Yet observe what happens when the twilight settles.

The horizon dissolves. The mountains that stood like rigid geometric walls soften into blue silhouettes. The sky, which by day seemed a mere dome of painted blue, pulls back its curtain to reveal ten billion furnace worlds tumbling through an abyss so vast that human thought cannot touch its rim without trembling.

It is darkness, not light, that reveals the true scale of our cosmos.`
      },
      {
        id: "ch-2",
        number: "II",
        title: "The Architecture of Silence",
        pageNumber: 32,
        content: `CHAPTER II: THE ARCHITECTURE OF SILENCE

In the dark room, the ear becomes a sculptor.

The soft ticking of the mantle clock expands until it fills the corner with rhythmic cedar walls. The rain against the glass becomes a textured drapery shielding the recluse from the clamor of politics and commerce.

In silence, thoughts do not march in linear troops like soldiers on parade. They drift like pollen upon calm water, aligning themselves into unexpected constellations. Every great idea that has altered the destiny of nations was conceived not in the parliament under gas lamps, but in the quiet hour before dawn when the candle was guttering in its brass saucer.`
      }
    ],
    comments: [
      { id: "b3", user: "Julian M.", time: "1 day ago", text: "Every paragraph is pure gold. 'Light shows the surface, darkness measures depth' should be engraved on every library door." }
    ]
  },
  {
    id: "pin-book-3",
    type: "book",
    category: "Nocturnal Poetry",
    title: "Songs for the Cold Constellations",
    author: {
      name: "Lyra Sterling",
      handle: "@lyrasterling",
      avatar: "",
      initials: "LS",
      bio: "Poet laureate of nocturnal verse and northern lights."
    },
    pagesCount: "64 Pages",
    year: "Published 1928",
    likes: 1980,
    savedCount: 990,
    tags: ["Poetry", "Book", "Verse", "Stars", "Night"],
    summary: "A celebrated anthology of 36 nocturnal poems dedicated to the winter night, boreal forests, and the loneliest lighthouses of the North Atlantic.",
    quote: "“The snow does not fall to hide the earth, but to give the stars a mirror to see their own pale faces.”",
    themeColor: "#ec4899",
    visualStyle: {
      gradient: "linear-gradient(135deg, #500724 0%, #1e1b4b 60%, #030712 100%)",
      accent: "#f472b6",
      symbol: "📜"
    },
    chapters: [
      {
        id: "ch-1",
        number: "I",
        title: "Canto of the Northern Basalt",
        pageNumber: 1,
        content: `CANTO I: THE BASALT CLIFF

Where the tide breaks upon the stone,
And winter leaves the birch alone,
A single lamp in window stands,
To warm a sailor's frozen hands.

No bell is rung, no name is said,
The living sleep beside the dead,
While overhead the Great Bear turns,
And high above the frost-fire burns.

O tell me, daughter of the snow,
Where do the vanished swallows go?
They roost inside the mountain's core,
Until the sea forgets the shore.`
      },
      {
        id: "ch-2",
        number: "II",
        title: "Sonnet to the Aurora",
        pageNumber: 18,
        content: `CANTO II: SONNET TO THE AURORA

Across the velvet crown of northern skies,
A ribbon made of emerald serpent flame,
Unfolds before the wanderer's weeping eyes,
In whispers that no mortal tongue can name.

The lichen glows, the glacier turns to glass,
The quiet wolves look upward from the pine,
To watch the pale celestial dancers pass,
In choreography of laws divine.

We are but dust that caught a passing ray,
A brief spark struck between two endless nights,
Yet in this frozen dusk we dare to stay,
And claim kinship with these immortal lights.`
      }
    ],
    comments: [
      { id: "b4", user: "Morwenna", time: "5 hours ago", text: "The Aurora sonnet is breathtakingly lyrical." }
    ]
  },
  {
    id: "pin-book-4",
    type: "book",
    category: "Arcane Sciences",
    title: "Tides of the Invisible Spectrum",
    author: {
      name: "Dr. Alistair Sterling",
      handle: "@alistair_optics",
      avatar: "",
      initials: "AS",
      bio: "Pioneer in prism optics, phosphorescence, and electromagnetic phenomena."
    },
    pagesCount: "160 Pages",
    year: "Published 1888",
    likes: 1640,
    savedCount: 750,
    tags: ["Optics", "Science", "Book", "Spectra", "Physics"],
    summary: "Experimental notes on invisible radiation, luminescence in rare minerals, and the behavior of light passing through obsidian prisms.",
    quote: "“The eye is tuned to but a single octave of the grand orchestral symphony that light performs in the void.”",
    themeColor: "#06b6d4",
    visualStyle: {
      gradient: "linear-gradient(145deg, #083344 0%, #164e63 50%, #030712 100%)",
      accent: "#22d3ee",
      symbol: "🔮"
    },
    chapters: [
      {
        id: "ch-1",
        number: "I",
        title: "Refraction through Volcanic Glass",
        pageNumber: 1,
        content: `CHAPTER I: REFRACTION THROUGH VOLCANIC GLASS

When a beam of collimated white light is passed through an equilateral prism cut from obsidian gathered at the caldera of Mount Hekla, an anomaly presenteth itself to the careful observer.

Whereas crown glass and flint glass disperse the ray into the standard spectrum—red, orange, yellow, green, cyan, blue, violet—the obsidian prism filtereth out the visible wavelengths almost entirely, transmitting only the long thermal waves and a strange, cold phosphorescence in the near ultraviolet.

If a plate coated with barium platinocyanide be placed in the path of this emergent dark ray, the screen gloweth with an intense eerie viridian illumination, as if responding to a ghost.`
      }
    ],
    comments: [
      { id: "b5", user: "Kelvin", time: "2 days ago", text: "Fascinating historical science blend." }
    ]
  },
  {
    id: "pin-img-7",
    type: "image",
    category: "Nocturnal Wildlife",
    title: "Barn Owl Gliding over Moonlit Reeds",
    aspectRatio: "3:4",
    author: {
      name: "Soren Lindqvist",
      handle: "@soren_wild",
      avatar: "",
      initials: "SL",
      bio: "Wildlife photographer specializing in nocturnal raptors in Scandinavian bogs."
    },
    likes: 2890,
    savedCount: 1320,
    tags: ["Wildlife", "Owl", "Moonlight", "Nature", "Flight"],
    description: "Silent flight captured with infrared flash at 1/8000s. Feathers engineered by evolution to dampen sound completely in midnight hunting.",
    details: {
      camera: "Nikon Z9 / 400mm f/2.8 TC VR S",
      shutter: "1/8000s at f/2.8",
      iso: "3200 (IR sync)",
      location: "Uppland, Sweden",
      palette: ["#020617", "#0f172a", "#334155", "#cbd5e1", "#f8fafc"]
    },
    visualStyle: {
      gradient: "linear-gradient(170deg, #090d16 0%, #1e293b 60%, #020617 100%)",
      accent: "#e2e8f0",
      symbol: "🦉"
    },
    comments: [
      { id: "w1", user: "Rowan", time: "3 hours ago", text: "The feather detail in the moonlight is unmatched." }
    ]
  },
  {
    id: "pin-img-8",
    type: "image",
    category: "Dark Cinema",
    title: "The Solitary Traveler on the 3:10 Tram",
    aspectRatio: "16:9",
    author: {
      name: "Mia Lindemann",
      handle: "@mia_cinema",
      avatar: "",
      initials: "ML",
      bio: "Cinematographer and colorist. Anamorphic 2.39:1 night stills."
    },
    likes: 1940,
    savedCount: 880,
    tags: ["Cinema", "Anamorphic", "Tram", "Midnight", "Grain"],
    description: "Anamorphic 35mm frame. Warm tungsten interior lamps reflecting against misty night windows as the electric tram navigates the harbor bridge.",
    details: {
      camera: "Arri Alexa Mini LF / Cooke Anamorphic /i 40mm",
      shutter: "180-degree shutter at T2.3",
      iso: "1280",
      location: "Prague Harbor Line",
      palette: ["#080a0f", "#172554", "#d97706", "#f59e0b", "#fed7aa"]
    },
    visualStyle: {
      gradient: "linear-gradient(90deg, #020617 0%, #1e293b 50%, #451a03 100%)",
      accent: "#f59e0b",
      symbol: "🚊"
    },
    comments: [
      { id: "c8", user: "Theo Vance", time: "6 hours ago", text: "Looks like a still from a Denis Villeneuve film." }
    ]
  }
];

export const INITIAL_BOARDS = [
  {
    id: "board-all",
    name: "Quick Saves",
    description: "All your pinned nocturnal inspirations in one private sanctuary",
    coverColor: "#3b82f6",
    pinIds: ["pin-img-1", "pin-story-1", "pin-book-1"]
  },
  {
    id: "board-photos",
    name: "Nocturnal Photography",
    description: "Rain-drenched streets, deep cosmos, and Gothic archways",
    coverColor: "#0ea5e9",
    pinIds: ["pin-img-1", "pin-img-2", "pin-img-3", "pin-img-6"]
  },
  {
    id: "board-stories",
    name: "Midnight Stories",
    description: "Curated tales to read by candlelight and quiet hours",
    coverColor: "#f59e0b",
    pinIds: ["pin-story-1", "pin-story-2", "pin-story-3", "pin-story-4"]
  },
  {
    id: "board-books",
    name: "Ancient Grimoires & Books",
    description: "Rare treatises, poetry anthologies, and philosophy manuscripts",
    coverColor: "#eab308",
    pinIds: ["pin-book-1", "pin-book-2", "pin-book-3", "pin-book-4"]
  }
];
