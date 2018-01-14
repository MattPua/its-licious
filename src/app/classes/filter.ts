export class Filter {
  name: string;
  neighbourhoods: string;
  sortBy: string;
  lunch: boolean;
  dinner: boolean;
  preferences: {
    accessible: boolean,
    vegetarian: boolean,
    vegan: boolean,
    local: boolean
  };
  rating: {
    yelp: number
  };
  cuisines: string[];
}
