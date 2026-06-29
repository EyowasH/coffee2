import brandDataJson from './brand-data.json';

export interface BrandInfo {
  name: string;
  fullName: string;
  motto: string;
  description: string;
  heritage: string;
}

export interface RegionInfo {
  id: string;
  name: string;
  region: string;
  quality: string;
  process: string[];
  flavor: string[];
  season: string;
  description: string;
  accentColor: string;
  tagline: string;
}

export interface ServiceInfo {
  title: string;
  description: string;
}

export interface ContactInfo {
  address: {
    building: string;
    floor: string;
    city: string;
    country: string;
  };
  phones: string[];
  email: string;
}

export interface BrandData {
  brand: BrandInfo;
  mission: string;
  regions: RegionInfo[];
  services: ServiceInfo[];
  contact: ContactInfo;
}

export const brandData: BrandData = brandDataJson as BrandData;
