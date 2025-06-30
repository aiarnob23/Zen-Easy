import type { TSserviceTitle } from "./serviceTitleType";

export type TNewService = {
  serviceTitle: TSserviceTitle;
  contactNumber: string;
  workArea: {
    city : string;
    postalCode: string;
  }
  description: string;
  priceRange: {
    min: number;
    max: number;
  };
  dayOfWeek : string[];
  availableTimes : ['day' | 'night' | 'always'];

};
