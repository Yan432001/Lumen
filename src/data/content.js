export const contentData = {
  home: {
    hero: {
      badge: "OBSERVATORY OF THE UNSEEN",
      title: "Where the Mouse Becomes the Lantern",
      subtitle: "Move your cursor across this nocturnal realm. Only that which is touched by your beam awakens from the void.",
      promptText: "✦ Hover & search below to unmask hidden secrets in the gloom"
    },
    featuredArtifacts: [
      {
        id: "candle-scroll",
        category: "Illuminated Manuscripts",
        title: "The Nocturne Codex",
        desc: "Written in bioluminescent ink that only fluoresces under warm luminescence. Chronicling 400 years of lunar astronomy.",
        icon: "📜",
        stats: "Circa 1682 • Celestial Coordinates",
        secret: "Hidden Cipher: [LAT 45.184 • LONG -12.441]"
      },
      {
        id: "astrolabe",
        category: "Stellar Navigation",
        title: "Obsidian Planisphere",
        desc: "A geared mechanical instrument forged from volcanic glass, calculating tides under starless nights.",
        icon: "🧭",
        stats: "12 Concentric Rings • Precision Optics",
        secret: "Hidden Inscription: 'Look toward Polaris when the lantern dims.'"
      },
      {
        id: "prism-core",
        category: "Optics & Spectra",
        title: "Dark Spectrum Prism",
        desc: "Splits invisible infrared and ultraviolet beams into harmonic visual melodies. Reacts strongly to aurora and neon lights.",
        icon: "💎",
        stats: "Refraction Index 2.42 • Pure Crystal",
        secret: "Hidden Wavelength: 589.3 nm Sodium Doublet"
      },
      {
        id: "clockwork-moth",
        category: "Automata",
        title: "The Phototaxis Engine",
        desc: "A delicate brass moth engineered to orient its wings towards whatever luminous ray the observer casts.",
        icon: "🦋",
        stats: "72 Micro-Gears • Spring Tensioned",
        secret: "Hidden Mechanism: 'Follows your cursor into eternity.'"
      }
    ],
    atmosphericQuotes: [
      {
        text: "There is a crack in everything. That's how the light gets in.",
        author: "Leonard Cohen"
      },
      {
        text: "We are all in the gutter, but some of us are looking at the stars.",
        author: "Oscar Wilde"
      },
      {
        text: "Deep into that darkness peering, long I stood there wondering, fearing, doubting...",
        author: "Edgar Allan Poe"
      }
    ]
  },

  entertainment: {
    hero: {
      badge: "CINEMA & SOUND IN THE SHADOWS",
      title: "Nocturnal Arts & Media",
      subtitle: "Classic noir cinema, dark ambient soundscapes, and interactive midnight tales unveiled by your beam."
    },
    sections: [
      {
        id: "cinema",
        title: "Midnight Noir & Atmospheric Cinema",
        items: [
          {
            title: "Blade Runner (1982)",
            genre: "Neo-Noir Sci-Fi",
            year: "1982",
            director: "Ridley Scott",
            mood: "Rain-slicked neon & melancholic synthesizers",
            rating: "9.2/10",
            notes: "Iconic usage of harsh shafts of light penetrating Venetian blinds into dim apartments."
          },
          {
            title: "The Third Man",
            genre: "Film Noir Classic",
            year: "1949",
            director: "Carol Reed",
            mood: "Dutch angles, sewer echoes & zither melodies",
            rating: "8.9/10",
            notes: "Legendary silhouette scene where a flashlight reveals Harry Lime in the doorway."
          },
          {
            title: "Stalker",
            genre: "Philosophical Sci-Fi",
            year: "1979",
            director: "Andrei Tarkovsky",
            mood: "Sepia decaying rooms transitioning to vibrant nature",
            rating: "9.1/10",
            notes: "The Zone where every corner must be approached with caution and focused sight."
          },
          {
            title: "Dark City",
            genre: "Surreal Noir",
            year: "1998",
            director: "Alex Proyas",
            mood: "Clockwork city rearranging under eternal midnight",
            rating: "8.5/10",
            notes: "A world deprived of natural sunlight where memory itself is molded."
          }
        ]
      },
      {
        id: "soundscapes",
        title: "Ambient Frequencies & Night Audio",
        items: [
          {
            title: "Subterranean Resonance",
            genre: "Drone & Dark Ambient",
            duration: "44:12",
            tempo: "42 BPM",
            desc: "Recorded in abandoned slate caverns with binaural hydrophones and bowed cymbals."
          },
          {
            title: "Aurora Borealis Ionospheric Pulse",
            genre: "VLF Space Sound",
            duration: "38:50",
            tempo: "Atmospheric",
            desc: "Natural radio waves emitted by northern lights interacting with Earth's magnetosphere."
          },
          {
            title: "Rain on Fogged Glass",
            genre: "Field Recording",
            duration: "60:00",
            tempo: "White Noise",
            desc: "Gentle rhythmic precipitation falling upon a 19th-century conservatory roof."
          }
        ]
      }
    ]
  },

  knowledge: {
    hero: {
      badge: "OBSERVATORY ARCHIVES",
      title: "The Physics & Philosophy of Darkness",
      subtitle: "Why does the human eye crave the flame? Explore how photons travel, bioluminescence, and deep cosmos."
    },
    articles: [
      {
        id: "bioluminescence",
        category: "Marine Biology",
        title: "Bioluminescence in the Abyssal Plain",
        summary: "Over 75% of deep-sea creatures generate their own cold light using luciferin-luciferase reactions.",
        body: "Below 1,000 meters into the bathypelagic zone, sunlight ceases entirely. In this pressure-laden abyss, organisms illuminate their hunting paths with azure and jade chemical fires. Anglerfish dangle photophore lures, while siphonophores create cascading bioluminescent fireworks to blind predators.",
        keyFact: "Cold chemical light converts nearly 98% of chemical energy into light without heat loss."
      },
      {
        id: "cosmic-dark-ages",
        category: "Astrophysics",
        title: "The Cosmic Dark Ages & First Light",
        summary: "For 380,000 years after the Big Bang, the universe was an opaque fog of neutral hydrogen.",
        body: "Until the first population III hypermassive stars ignited and reionized the surrounding neutral gas, the entire cosmos was submerged in sheer darkness. The James Webb Space Telescope recently peered into this dawn, witnessing the very first photic ripples expanding across primordial space.",
        keyFact: "The oldest detected starlight took over 13.4 billion years to reach human detectors."
      },
      {
        id: "scotopic-vision",
        category: "Neuroscience",
        title: "Scotopic Vision: How the Human Eye Sees in Dimness",
        summary: "Rod photoreceptors contain rhodopsin ('visual purple'), capable of triggering neural spikes from a single photon.",
        body: "While cones govern crisp daytime chromatic acuity, our 120 million retinal rods take over in nocturnal gloom. It takes approximately 20 to 30 minutes for human eyes to achieve complete dark adaptation, during which rod sensitivity increases ten-thousand-fold.",
        keyFact: "Red light (above 650nm) preserves night adaptation because rods are virtually insensitive to deep red wavelengths."
      },
      {
        id: "shadow-casting",
        category: "Optics",
        title: "Umbra, Penumbra & Diffraction",
        summary: "The nature of softness in lighting: how point sources produce razor edges while area lamps produce gentle gradients.",
        body: "When light emanates from a point-like source, shadows cast an absolute umbra with razor sharp cutoffs. As the light emitter expands in radius—like a candle flame or an illuminated diffuser—a gradient penumbra wraps around obstacles, creating the soothing softness customizable in your spotlight panel.",
        keyFact: "Fresnel diffraction causes subtle wave fringes along the edges of all illuminated apertures."
      }
    ]
  }
};
