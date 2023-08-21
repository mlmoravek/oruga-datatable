import type { Header, LoadResponse } from "oruga-datatable";
import { ref } from "vue";

export const onEvent = (event: string, data?: any): void => {
  let str = "On " + event;
  if (data) str += ": " + JSON.stringify(data);
  alert(str);
};

/** load table data */
export const loadData = (
  page: number,
  size: number,
  sort: string,
  ascending: boolean,
  search: string,
  filters: Record<string, string>,
): Promise<LoadResponse> => {
  // Make a request to an api using the given parameter
  let url = "https://api.punkapi.com/v2/beers?";
  if (page || page == 0) url += `page=${page + 1}&`;
  if (size) url += `per_page=${size}&`;
  if (search) url += `beer_name=${search}&`;

  if (filters && filters["ingredients.malt.0.name"])
    url += `malt=${filters["ingredients.malt.0.name"]}&`;
  if (filters && filters["ingredients.hops.0.name"])
    url += `hops=${filters["ingredients.hops.0.name"]}&`;
  if (filters?.food_pairing) url += `food=${filters.food_pairing}&`;
  if (filters?.name) url += `beer_name=${filters.name}&`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => ({ total: 200, rows: data }))
    .catch((error) => {
      console.log("Error loading data...");
      throw error;
    });
};
