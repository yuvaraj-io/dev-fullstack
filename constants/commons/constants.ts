import type {
  SocialLinks,
  FeaturedProjects,
  Project,
  Skills,
  MediumContent,
  StackblitzCollections,
} from "@/types/content";

/* =========================================================
   HELPERS
========================================================= */

const origin = (url: string) => {
  return `https://${url}.yuvaraj.io`;
};

/* =========================================================
   SOCIAL LINKS
========================================================= */

export const socials = {
  github: "https://github.com/yuvaraj-io",
  linkedin: "https://www.linkedin.com/in/yuvaraj-s-32326b176/",
  instagram: "https://www.instagram.com/code.yuvaraj/",
  medium: "https://medium.com/@yuvidev/",
  stackblitz: "https://stackblitz.com/@yuvaraj.io/collections/",
} satisfies SocialLinks;

/* =========================================================
   FEATURED PROJECTS
========================================================= */

export const featured = {
  tred: {
    link: origin("tred"),
    img: "/assets/small-projects/tred.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Tred",
    subtitle:
      "Tred, the attrendance application built on top of javascript localstorage",
  },
  pitchpro: {
    link: origin("pitchpro"),
    img: "/assets/portfolio/pitchpro.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Pitchpro",
    subtitle:
      "A website for startup that does pitch proposals, Help them and connect to appropriate connections",
  },
  yuvidev: {
    link: origin("old"),
    img: "/assets/portfolio/yuvaraj.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Yuvidev",
    subtitle: "Ohh, it's my old website. Just a basic website :)",
  },
} satisfies FeaturedProjects;

/* =========================================================
   PORTFOLIOS
========================================================= */

export const portfolios = [
  {
    link: origin("pitchpro"),
    img: "/assets/portfolio/pitchpro.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Pitchpro",
    subtitle:
      "A website for startup that does pitch proposals, Help them and connect to appropriate connections",
  },
  {
    link: origin("old"),
    img: "/assets/portfolio/yuvaraj.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Yuvidev",
    subtitle: "Ohh, it's my old website. Just a basic website :)",
  },
  {
    link: origin("fotofactory"),
    img: "/assets/portfolio/fotofactory.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Fotofactory",
    subtitle: "Website to my friend, to reach out customers for photoshoots",
  },
  {
    link: origin("ganesha"),
    img: "/assets/portfolio/ganesha.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Ganesh Idols",
    subtitle:
      "Created page UI, to attract customers for my seasonal small business",
  },
  {
    link: origin("guruguide"),
    img: "/assets/portfolio/guruguide.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Guruguide",
    subtitle:
      "To spread knowledge on interviews, built this to get leads from students",
  },
  {
    link: origin("getnewfiber"),
    img: "/assets/portfolio/getnewfiber.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Getnewfiber",
    subtitle: "Lead generation website for local fibernet services",
  },
] satisfies Project[];

/* =========================================================
   SMALL PROJECTS
========================================================= */

export const projects = [
  {
    link: origin("debug"),
    img: "/assets/small-projects/debugger.png",
    skills: ["HTML", "CSS", "JAVASCRIPT"],
    mainHeading: "Debugger",
    subtitle:
      "App that generates a debugger for javascript functions to understand application efficiency",
  },
  {
    link: origin("dice"),
    img: "/assets/small-projects/dice.png",
    skills: ["HTML", "CSS", "JAVASCRIPT"],
    mainHeading: "Dice",
    subtitle: "Mini project to generate random dice number to play",
  },
  {
    link: origin("rem"),
    img: "/assets/small-projects/rem.png",
    skills: ["HTML", "CSS", "JAVASCRIPT"],
    mainHeading: "Rem",
    subtitle: "Todo list app for grouping the list to track",
  },
  {
    link: origin("snake"),
    img: "/assets/small-projects/rem.png",
    skills: ["VUE 3.0", "CSS"],
    mainHeading: "Snake and Ladders",
    subtitle: "Snake and ladder game to play with group",
  },
  {
    link: origin("tred"),
    img: "/assets/small-projects/tred.png",
    skills: ["HTML", "CSS", "JAVASCRIPT", "BOOTSTRAP"],
    mainHeading: "Tred",
    subtitle:
      "Tred, the attrendance application built on top of javascript localstorage",
  },
] satisfies Project[];

/* =========================================================
   SKILLS
========================================================= */

export const skills = {
  language: {
    heading: "Languages",
    skills: ["HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT"],
  },
  framework: {
    heading: "Languages",
    skills: ["ANGULAR", "REACT", "VUE"],
  },
  database: {
    heading: "Database Familiar",
    skills: ["SQL", "POSTGRESQL", "MONGO"],
  },
  npm: {
    heading: "npm packages",
    skills: ["lodash", "chartjs", "express", "axios", "rxjs", "redux"],
  },
  tools: {
    heading: "Tools",
    skills: ["FIGMA", "VSCODE", "GIT"],
  },
} satisfies Skills;

/* =========================================================
   MEDIUM CONTENT
========================================================= */

export const medium = {
  angular: [
    {
      title: "Angular Component 01: Creating Components",
      medium:
        "https://medium.com/@yuvidev/lesson-1-basics-of-components-131dee1dae44",
      content:
        "🔹 What’s a Component? Think of a component as a self-contained module that defines a certain part of your webpage.",
      stackblitz: "https://stackblitz.com/edit/angular-ivy-component1",
    },
  ],
  react: [
    {
      title: "React 01: JSX and Printing Value in JSX",
      medium:
        "https://medium.com/@yuvidev/react-01-jsx-and-printing-value-in-jsx-99c8a4be51f1",
      content:
        "JSX is a syntax extension for JavaScript that allows you to write HTML inside JavaScript.",
      stackblitz: "https://stackblitz.com/edit/react-ne3gqu",
    },
  ],
  rxjs: [
    {
      title: "RXJS Operator 01: Of Operator",
      medium:
        "https://medium.com/@yuvidev/rxjs-operator-01-of-operator-dcdf7690e9f8",
      content:
        "Of operator converts arguments into an observable stream.",
      stackblitz: "https://stackblitz.com/edit/rxjs-operator-of",
    },
  ],
  javascript: [
    {
      title: "Lesson 01: Setting Up your Javascript",
      medium:
        "https://medium.com/@yuvaraj.io/javascript-01-setting-up-your-javascript-136fe7c174cc",
      content:
        "JavaScript is a high-level, dynamic scripting language used to build interactive web applications.",
    },
  ],
} satisfies MediumContent;

/* =========================================================
   STACKBLITZ COLLECTIONS
========================================================= */

export const stackblitz = {
  angular: [
    {
      title: "Angular v17 - features",
      description: "Latest Angular features and updates",
      url: "https://stackblitz.com/@yuvaraj.io/collections/angular-v17-features",
    },
  ],
  react: [
    {
      title: "React",
      description: "React core concepts and hooks",
      url: "https://stackblitz.com/@yuvaraj.io/collections/react",
    },
  ],
  vue: [
    {
      title: "Vue Js",
      description: "Vue.js core concepts",
      url: "https://stackblitz.com/@yuvaraj.io/collections/vue-js",
    },
  ],
  rxjs: [
    {
      title: "RXJS Fundamentals",
      description: "Rxjs fundamentals",
      url: "https://stackblitz.com/@yuvaraj.io/collections/rxjs-fundamentals",
    },
  ],
  js: [
    {
      title: "Javascript Learn",
      description: "Learn Javascript",
      url: "https://stackblitz.com/@yuvaraj.io/collections/javascript-learn",
    },
  ],
} satisfies StackblitzCollections;
