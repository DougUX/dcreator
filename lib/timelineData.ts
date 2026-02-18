export type TimelineStep = {
  id: string;
  number: string;
  title: string;
  caption: string;
  description: string[];
};

export const whyMeTimelineSteps: TimelineStep[] = [
  {
    id: "strategy-vision",
    number: "01",
    title: "Strategy & Vision",
    caption: "We define the future before we design it.",
    description: [
      "Every engagement begins with direction: business goals, constraints, and opportunity.",
      "I translate ambiguity into a clear path, so design decisions stay intentional.",
      "The result is a vision that guides the craft — not the other way around."
    ]
  },
  {
    id: "concept-sketching",
    number: "02",
    title: "Concept Sketching",
    caption: "Ideas begin with the hand.",
    description: [
      "I sketch to explore form, composition, and hierarchy without friction.",
      "This stage surfaces options quickly — before we commit to pixels or production.",
      "It’s where taste, proportion, and restraint are established."
    ]
  },
  {
    id: "prototyping",
    number: "03",
    title: "Digital & Physical Prototyping",
    caption: "Precision through iteration.",
    description: [
      "We prototype to remove risk — validating flow, feel, and feasibility early.",
      "From interface behaviour to physical tolerance, iteration sharpens the outcome.",
      "Every pass reduces noise and increases confidence."
    ]
  },
  {
    id: "crafting-product",
    number: "04",
    title: "Crafting the Product",
    caption: "Designed with soul. Built with intention.",
    description: [
      "I refine the details that signal value: alignment, tension, material logic, and rhythm.",
      "Craft is where luxury lives — in decisions most people don’t notice, but feel.",
      "The product becomes coherent, inevitable, and premium."
    ]
  },
  {
    id: "brand-positioning",
    number: "05",
    title: "Brand & Positioning Strategy",
    caption: "A product without story is silent.",
    description: [
      "I define the narrative and positioning that makes the product instantly understood.",
      "From tone-of-voice to visual language, the system stays consistent across touchpoints.",
      "Clarity creates trust — and trust creates demand."
    ]
  },
  {
    id: "editorial-photoshoot",
    number: "06",
    title: "Editorial Photoshoot",
    caption: "Presentation defines perception.",
    description: [
      "Premium work needs premium presentation — controlled light, composition, and mood.",
      "Editorial direction turns product details into a story people want to own.",
      "It’s the difference between showing features and creating desire."
    ]
  },
  {
    id: "web-app-ai",
    number: "07",
    title: "Website / App & AI Integration",
    caption: "Where creativity meets AI.",
    description: [
      "I bring the system to life across web and app — performance, polish, and interaction.",
      "AI integration is designed as behaviour: purposeful, human, and brand-aligned.",
      "The final experience feels intelligent — not gimmicky."
    ]
  }
];
