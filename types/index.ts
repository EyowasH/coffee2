export interface OriginData {
  id: string;
  name: string;
  region: string;
  altitude: string;
  process: string[];
  flavor: string[];
  scaScore: string;
  season: string;
  description: string;
  accentColor: string;
  tagline: string;
}

export interface JourneyStage {
  step: number;
  icon: string;
  title: string;
  subtitle: string;
  detail: string;
}

export interface TestimonialData {
  quote: string;
  author: string;
  company: string;
  country: string;
}

export interface MetricData {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
}
