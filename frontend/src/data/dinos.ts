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
    id: "venus",
    name: "Venus",
    type: "Brachiosaurus",
    image: "/dino/venus.png",
    color: "bg-[#ACBD8D]", // Primary Green
    description: "A gentle giant who loves high leaves and calm vibes.",
  },
  {
    id: "spike",
    name: "Spike",
    type: "Stegosaurus",
    image: "/dino/spike.png",
    color: "bg-[#F1CC5D]", // Accent Yellow
    description: "Spiky on the outside, soft on the inside.",
  },
  {
    id: "terra",
    name: "Terra",
    type: "T-Rex",
    image: "/dino/terra.png",
    color: "bg-[#EB4335]", // Rose Red
    description: "Small arms, big heart. Ready for adventure.",
  },
  {
    id: "breeze",
    name: "Breeze",
    type: "Pterodactyl",
    image: "/dino/breeze.png",
    color: "bg-[#4285F4]", // Sky Blue
    description: "Always soaring above the clouds keeping a watchful eye.",
  },
  {
    id: "sunny",
    name: "Sunny",
    type: "Ankylosaurus",
    image: "/dino/sunny.png",
    color: "bg-[#FBBC05]", // Gold
    description: "A bright ray of sunshine on even the gloomiest days.",
  },
  {
    id: "fern",
    name: "Fern",
    type: "Parasaurolophus",
    image: "/dino/fern.png",
    color: "bg-[#34A853]", // Leaf Green
    description: "Loves hiding in the foliage and playing hide and seek.",
  },
  // Add others as needed with specific types/colors
  { id: "chute", name: "Chute", type: "Dinosaur", image: "/dino/chute.png", color: "bg-gray-400", description: "Ready to slide into your heart." },
  { id: "clay", name: "Clay", type: "Dinosaur", image: "/dino/clay.png", color: "bg-[#D9D9D9]", description: "Solid and dependable." },
  { id: "cricket", name: "Cricket", type: "Dinosaur", image: "/dino/cricket.png", color: "bg-[#ACBD8D]", description: "Chirpy and full of energy." },
  { id: "indigo", name: "Indigo", type: "Dinosaur", image: "/dino/indigo.png", color: "bg-[#4285F4]", description: "Deep thinking and mysterious." },
  { id: "ivy", name: "Ivy", type: "Dinosaur", image: "/dino/ivy.png", color: "bg-[#34A853]", description: "Grows on you quickly." },
  { id: "koa", name: "Koa", type: "Dinosaur", image: "/dino/koa.png", color: "bg-[#6E7B57]", description: "Strong like a tree." },
  { id: "lotus", name: "Lotus", type: "Dinosaur", image: "/dino/lotus.png", color: "bg-[#F1CC5D]", description: "Finds peace in any pond." },
  { id: "merlin", name: "Merlin", type: "Dinosaur", image: "/dino/merlin.png", color: "bg-[#979797]", description: "A magical companion." },
  { id: "petal", name: "Petal", type: "Dinosaur", image: "/dino/petal.png", color: "bg-[#EB4335]", description: "Soft and sweet." },
  { id: "rowan", name: "Rowan", type: "Dinosaur", image: "/dino/rowan.png", color: "bg-[#EB4335]", description: "Fiery spirit." },
  { id: "vera", name: "Vera", type: "Dinosaur", image: "/dino/vera.png", color: "bg-[#ACBD8D]", description: "Truthful and loyal." },
  { id: "wilde", name: "Wilde", type: "Dinosaur", image: "/dino/wilde.png", color: "bg-[#6E7B57]", description: "Born to be wild." },
];
