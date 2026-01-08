export interface DinoConfig {
  id: string;
  name: string;
  type: string;
  image: string;
  color: string;
  description: string;
}

export const DINOS: DinoConfig[] = [
  {
    id: "terra",
    name: "Terra",
    type: "Succulent Stegosaurus",
    image: "/dino/terra.png",
    color: "bg-[#ACBD8D]", // Primary Green - Matches Succulent
    description: "Terra is the mascot of Rooting for You! She is a caring, selfless soul who prioritizes her friends. Terra is happiest when in warm, sunny climates.",
  },
  {
    id: "spike",
    name: "Spike",
    type: "Cacti Triceratops",
    image: "/dino/spike.png",
    color: "bg-[#F1CC5D]", // Accent Yellow - Matches Desert/Sun theme
    description: "Spike thrives in arid environments and enjoys taking long naps under the warm, desert sun. He is a hugger! But beware; avoid getting pricked by the cacti on his back!",
  },
  {
    id: "rowan",
    name: "Rowan",
    type: "Oak Tree Apatosaurus",
    image: "/dino/rowan.png",
    color: "bg-[#6E7B57]", // Dark Green - Oak/Forest
    description: "Rowan loves going on nature walks through forest trails. She cares deeply for her peers, and will go out of her way to ensure their well-being. She is happiest outdoors!",
  },
  {
    id: "venus",
    name: "Venus",
    type: "Venus Flytap T.Rex",
    image: "/dino/venus.png",
    color: "bg-[#EB4335]", // Rose Red - Flytrap mouth? or Green. Keeping Red for variety/T-Rex vibe or Green? Original was Green. T-Rex is usually fierce. Let's start with a vibrant green or stick to a complement. Let's use Rose Red for the "Flytrap" danger aspect.
    description: "Venus is a social butterfly. She enjoys hanging out with her friends and getting outside. Unfortunately, some are quick to judge her, but Venus keeps her head held high!",
  },
  {
    id: "lotus",
    name: "Lotus",
    type: "Lotus Flower Plesiosaur",
    image: "/dino/lotus.png",
    color: "bg-[#4285F4]", // Sky Blue - Water theme
    description: "Lotus is rarely seen outside the water. She LOVES swimming, especially on hot, summer days. She is usually found in her pond nearby the forest Rowan roams.",
  },
  {
    id: "chute",
    name: "Chute",
    type: "Lucky Bamboo Velociraptor",
    image: "/dino/chute.png",
    color: "bg-[#34A853]", // Leaf Green - Bamboo
    description: "Chute loves getting outside to play! His favourite way to stay active is going on runs. Chute is very athletic and is always looking for friends to play games with!",
  },
  {
    id: "sunny",
    name: "Sunny",
    type: "Sunflower Ankylosaurus",
    image: "/dino/sunny.png",
    color: "bg-[#FBBC05]", // Gold - Sunflower
    description: "Sunny is happiest when she, as her name suggests, is in the sun. She loves art and makes her own paint with flower petals. She is often found painting in the meadow.",
  },
  {
    id: "cricket",
    name: "Cricket",
    type: "Lily Pad Spinosaurus",
    image: "/dino/cricket.png",
    color: "bg-[#34A853]", // Green - Lily Pad
    description: "Cricket loves to swim. He can usually be found cooling off in the waters nearby the forest Rowan roams with Lotus, his best friend. He is always the life of the party.",
  },
  {
    id: "clay",
    name: "Clay",
    type: "Moss Stygimoloch",
    image: "/dino/clay.png",
    color: "bg-[#6E7B57]", // Dark Green/Moss
    description: "Clay is quiet, and quite shy. He likes to take naps near the river. He enjoys shallow waters or moist environments. He always sees the good in people!",
  },
  {
    id: "ivy",
    name: "Ivy",
    type: "Poison Ivy Dilophosaurus",
    image: "/dino/ivy.png",
    color: "bg-[#ACBD8D]", // Green - Ivy. Maybe purple tint? Sticking to palette.
    description: "Ivy has a bit of an attitude. She is quite irritable from time to time, but once you break through her tough shell, she is the kindest, most warmest friend you’ll meet.",
  },
  {
    id: "breeze",
    name: "Breeze",
    type: "Dandelion Pteranodon",
    image: "/dino/breeze.png",
    color: "bg-[#F1CC5D]", // Yellow - Dandelion
    description: "Breeze loves windy, summer days. She, typically alongside her cousin, Koa, can be found flying above the meadows and valleys. She lets the wind guide her journey.",
  },
  {
    id: "fern",
    name: "Fern",
    type: "Pine Tree Brachiosaurus",
    image: "/dino/fern.png",
    color: "bg-[#251813]", // Dark/Blackish for Pine bark or Dark Green. Let's go Dark Green or Brown.
    description: "Fern is a bit of a goofball! He has a profound sense of humour, and enjoys making his friends laugh. Laughter is the best medicine, after all!",
  },
  {
    id: "petal",
    name: "Petal",
    type: "Orchid Parasaurolophus",
    image: "/dino/petal.png",
    color: "bg-[#EB4335]", // Red/Pink - Orchid
    description: "Petal is Sunny’s best friend! Both of them are quite artistic. Although, Petal is quite clumsy with paint, and usually makes a mess! She’d much rather use coloured pencils.",
  },
  {
    id: "merlin",
    name: "Merlin",
    type: "Sea Weed Mosasaurus",
    image: "/dino/merlin.png",
    color: "bg-[#4285F4]", // Blue/Ocean
    description: "Merlin is a bit of a lone wolf. But, if you mess with one of his friends, he will be the first to confront you. He is very protective, but enjoys his alone time wandering the ocean.",
  },
  {
    id: "wilde",
    name: "Wilde",
    type: "Monstera Carnotaurus",
    image: "/dino/wilde.png",
    color: "bg-[#34A853]", // Leaf Green - Monstera
    description: "Wilde is a good friend of Chute. The pair play games together all the time - usually hide and seek or tag. Wilde uses the leaves on his back to blend in with his hiding places.",
  },
  {
    id: "koa",
    name: "Koa",
    type: "Air Plant Quetzalcoatlus",
    image: "/dino/koa.png",
    color: "bg-[#ACBD8D]", // Light Green - Air Plant
    description: "Koa is Breeze’s cousin! He is a very intelligent, studious dinosaur! Koa loves learning new things and is always on the hunt for new knowledge.",
  },
  {
    id: "vera",
    name: "Vera",
    type: "Aloe Vera Amargasaurus",
    image: "/dino/vera.png",
    color: "bg-[#ACBD8D]", // Aloe Green
    description: "Vera, like Rowan, enjoys nature walks. However, the forest isn’t really her scene! Vera much prefers arid environments. Oftentimes, she will stumble upon a sleeping Spike.",
  },
  {
    id: "indigo",
    name: "Indigo",
    type: "Nerve Plant Baryonyx",
    image: "/dino/indigo.png",
    color: "bg-[#EB4335]", // Nerve plants are often red/pink veined
    description: "Indigo is a friend of everyone! He is very kind and caring, and ensures the safety of others at all times. He enjoys foraging for ingredients to make new meals with.",
  },
];
