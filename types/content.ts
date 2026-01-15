export type SocialLinks = {
  github: string;
  linkedin: string;
  instagram: string;
  medium: string;
  stackblitz: string;
};

export type Project = {
  link: string;
  img: string;
  skills: string[];
  mainHeading: string;
  subtitle: string;
};

export type FeaturedProjects = {
  [key: string]: Project;
};

export type SkillGroup = {
  heading: string;
  skills: string[];
};

export type Skills = {
  language: SkillGroup;
  framework: SkillGroup;
  database: SkillGroup;
  npm: SkillGroup;
  tools: SkillGroup;
};

export type MediumPost = {
  title: string;
  medium: string;
  content: string;
  stackblitz?: string;
};

export type MediumContent = {
  angular?: MediumPost[];
  react?: MediumPost[];
  rxjs?: MediumPost[];
  javascript?: MediumPost[];
};

export type StackblitzItem = {
  title: string;
  description: string;
  url: string;
};

export type StackblitzCollections = {
  angular?: StackblitzItem[];
  react?: StackblitzItem[];
  vue?: StackblitzItem[];
  rxjs?: StackblitzItem[];
  js?: StackblitzItem[];
};
