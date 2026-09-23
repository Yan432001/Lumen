export const defaultSpotlightSettings = {
  preset: "flashlight",

  shape: "circle",

  colorMode: "fixed",
  color: "#FFFFFF",
  colors: [],

  colorCycle: {
    enabled: false,
    speed: 5,
    direction: "forward"
  },

  radius: 350,
  softness: 70,

  darkness: 92,
  intensity: 85,
  opacity: 100,

  glow: {
    enabled: false,
    intensity: 50,
    radius: 40
  },

  animation: {
    type: "none",
    speed: 50,
    intensity: 50
  },

  follow: {
    speed: 75,
    smoothing: true
  },

  trail: {
    enabled: false,
    length: 5,
    opacity: 30,
    blur: 10
  },

  clickEffect: {
    type: "none",
    duration: 400,
    intensity: 50
  },

  idle: {
    behavior: "keep",
    timeout: 5000,
    wanderSpeed: 20,
    wanderRadius: 150
  },

  ambientLight: 5,

  mobile: {
    behavior: "touch",
    radius: 250
  },

  reducedMotion: false
};

export const spotlightPresets = {
  flashlight: {
    ...defaultSpotlightSettings,
    preset: "flashlight",
    shape: "circle",
    colorMode: "fixed",
    color: "#FFFFFF",
    colors: [],
    colorCycle: {
      enabled: false,
      speed: 5,
      direction: "forward"
    },
    radius: 350,
    softness: 70,
    darkness: 92,
    intensity: 85,
    opacity: 100,
    glow: {
      enabled: false,
      intensity: 50,
      radius: 40
    },
    animation: {
      type: "none",
      speed: 50,
      intensity: 50
    },
    follow: {
      speed: 75,
      smoothing: true
    },
    trail: {
      enabled: false,
      length: 5,
      opacity: 30,
      blur: 10
    },
    clickEffect: {
      type: "none",
      duration: 400,
      intensity: 50
    },
    idle: {
      behavior: "keep",
      timeout: 5000,
      wanderSpeed: 20,
      wanderRadius: 150
    },
    ambientLight: 5,
    mobile: {
      behavior: "touch",
      radius: 250
    },
    reducedMotion: false
  },

  candle: {
    ...defaultSpotlightSettings,
    preset: "candle",
    shape: "circle",
    colorMode: "fixed",
    color: "#FFB347",
    colors: [],
    colorCycle: {
      enabled: false,
      speed: 5,
      direction: "forward"
    },
    radius: 280,
    softness: 80,
    darkness: 94,
    intensity: 90,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 60,
      radius: 70
    },
    animation: {
      type: "candle",
      speed: 55,
      intensity: 65
    },
    follow: {
      speed: 65,
      smoothing: true
    },
    trail: {
      enabled: false,
      length: 4,
      opacity: 20,
      blur: 8
    },
    clickEffect: {
      type: "ripple",
      duration: 500,
      intensity: 40
    },
    idle: {
      behavior: "wander",
      timeout: 4000,
      wanderSpeed: 15,
      wanderRadius: 80
    },
    ambientLight: 4,
    mobile: {
      behavior: "touch",
      radius: 220
    },
    reducedMotion: false
  },

  lamp: {
    ...defaultSpotlightSettings,
    preset: "lamp",
    shape: "circle",
    colorMode: "fixed",
    color: "#FFE8B5",
    colors: [],
    colorCycle: {
      enabled: false,
      speed: 5,
      direction: "forward"
    },
    radius: 420,
    softness: 85,
    darkness: 90,
    intensity: 80,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 40,
      radius: 50
    },
    animation: {
      type: "breathing",
      speed: 20,
      intensity: 20
    },
    follow: {
      speed: 80,
      smoothing: true
    },
    trail: {
      enabled: false,
      length: 5,
      opacity: 30,
      blur: 10
    },
    clickEffect: {
      type: "glow-ring",
      duration: 600,
      intensity: 45
    },
    idle: {
      behavior: "keep",
      timeout: 5000,
      wanderSpeed: 20,
      wanderRadius: 150
    },
    ambientLight: 6,
    mobile: {
      behavior: "touch",
      radius: 280
    },
    reducedMotion: false
  },

  moonlight: {
    ...defaultSpotlightSettings,
    preset: "moonlight",
    shape: "circle",
    colorMode: "fixed",
    color: "#B8D8FF",
    colors: [],
    colorCycle: {
      enabled: false,
      speed: 5,
      direction: "forward"
    },
    radius: 380,
    softness: 85,
    darkness: 93,
    intensity: 75,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 45,
      radius: 60
    },
    animation: {
      type: "none",
      speed: 30,
      intensity: 25
    },
    follow: {
      speed: 70,
      smoothing: true
    },
    trail: {
      enabled: false,
      length: 5,
      opacity: 25,
      blur: 12
    },
    clickEffect: {
      type: "ripple",
      duration: 700,
      intensity: 35
    },
    idle: {
      behavior: "dim",
      timeout: 6000,
      wanderSpeed: 10,
      wanderRadius: 100
    },
    ambientLight: 7,
    mobile: {
      behavior: "touch",
      radius: 260
    },
    reducedMotion: false
  },

  neon: {
    ...defaultSpotlightSettings,
    preset: "neon",
    shape: "circle",
    colorMode: "cycle",
    color: "#00FFFF",
    colors: [
      "#00FFFF",
      "#FF00FF"
    ],
    colorCycle: {
      enabled: true,
      speed: 40,
      direction: "forward"
    },
    radius: 320,
    softness: 60,
    darkness: 94,
    intensity: 95,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 80,
      radius: 65
    },
    animation: {
      type: "neon",
      speed: 60,
      intensity: 60
    },
    follow: {
      speed: 85,
      smoothing: true
    },
    trail: {
      enabled: true,
      length: 6,
      opacity: 35,
      blur: 8
    },
    clickEffect: {
      type: "burst",
      duration: 350,
      intensity: 70
    },
    idle: {
      behavior: "keep",
      timeout: 4000,
      wanderSpeed: 25,
      wanderRadius: 140
    },
    ambientLight: 4,
    mobile: {
      behavior: "touch",
      radius: 240
    },
    reducedMotion: false
  },

  rainbow: {
    ...defaultSpotlightSettings,
    preset: "rainbow",
    shape: "circle",
    colorMode: "cycle",
    color: "#FF0000",
    colors: [
      "#FF0000",
      "#FFFF00",
      "#00FF00",
      "#00FFFF",
      "#0000FF",
      "#FF00FF"
    ],
    colorCycle: {
      enabled: true,
      speed: 50,
      direction: "forward"
    },
    radius: 360,
    softness: 75,
    darkness: 91,
    intensity: 90,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 65,
      radius: 55
    },
    animation: {
      type: "pulse",
      speed: 45,
      intensity: 35
    },
    follow: {
      speed: 80,
      smoothing: true
    },
    trail: {
      enabled: true,
      length: 8,
      opacity: 40,
      blur: 10
    },
    clickEffect: {
      type: "star-burst",
      duration: 500,
      intensity: 60
    },
    idle: {
      behavior: "wander",
      timeout: 4500,
      wanderSpeed: 20,
      wanderRadius: 130
    },
    ambientLight: 5,
    mobile: {
      behavior: "touch",
      radius: 250
    },
    reducedMotion: false
  },

  aurora: {
    ...defaultSpotlightSettings,
    preset: "aurora",
    shape: "ellipse",
    colorMode: "cycle",
    color: "#00FFA3",
    colors: [
      "#00FFA3",
      "#00E1FF",
      "#7B2CBF",
      "#FF007F"
    ],
    colorCycle: {
      enabled: true,
      speed: 30,
      direction: "forward"
    },
    radius: 400,
    softness: 90,
    darkness: 92,
    intensity: 85,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 70,
      radius: 80
    },
    animation: {
      type: "breathing",
      speed: 40,
      intensity: 50
    },
    follow: {
      speed: 60,
      smoothing: true
    },
    trail: {
      enabled: true,
      length: 5,
      opacity: 30,
      blur: 15
    },
    clickEffect: {
      type: "glow-ring",
      duration: 650,
      intensity: 50
    },
    idle: {
      behavior: "wander",
      timeout: 5000,
      wanderSpeed: 18,
      wanderRadius: 160
    },
    ambientLight: 6,
    mobile: {
      behavior: "touch",
      radius: 270
    },
    reducedMotion: false
  },

  fire: {
    ...defaultSpotlightSettings,
    preset: "fire",
    shape: "circle",
    colorMode: "cycle",
    color: "#FF4500",
    colors: [
      "#FF4500",
      "#FF8C00",
      "#FFD700",
      "#B22222"
    ],
    colorCycle: {
      enabled: true,
      speed: 65,
      direction: "forward"
    },
    radius: 310,
    softness: 70,
    darkness: 94,
    intensity: 92,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 75,
      radius: 65
    },
    animation: {
      type: "flicker",
      speed: 70,
      intensity: 70
    },
    follow: {
      speed: 75,
      smoothing: true
    },
    trail: {
      enabled: true,
      length: 4,
      opacity: 30,
      blur: 8
    },
    clickEffect: {
      type: "burst",
      duration: 350,
      intensity: 75
    },
    idle: {
      behavior: "wander",
      timeout: 3500,
      wanderSpeed: 22,
      wanderRadius: 100
    },
    ambientLight: 4,
    mobile: {
      behavior: "touch",
      radius: 230
    },
    reducedMotion: false
  },

  horror: {
    ...defaultSpotlightSettings,
    preset: "horror",
    shape: "circle",
    colorMode: "fixed",
    color: "#8B0000",
    colors: [],
    colorCycle: {
      enabled: false,
      speed: 5,
      direction: "forward"
    },
    radius: 220,
    softness: 50,
    darkness: 97,
    intensity: 90,
    opacity: 100,
    glow: {
      enabled: true,
      intensity: 55,
      radius: 35
    },
    animation: {
      type: "flicker",
      speed: 85,
      intensity: 85
    },
    follow: {
      speed: 90,
      smoothing: false
    },
    trail: {
      enabled: false,
      length: 3,
      opacity: 20,
      blur: 6
    },
    clickEffect: {
      type: "flash",
      duration: 250,
      intensity: 85
    },
    idle: {
      behavior: "dim",
      timeout: 2500,
      wanderSpeed: 10,
      wanderRadius: 70
    },
    ambientLight: 1,
    mobile: {
      behavior: "touch",
      radius: 180
    },
    reducedMotion: false
  }
};
