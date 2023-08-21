export interface Header {
  /** Define the object property key */
  field: string;
  /** Define the column label */
  label: string;
  /** Enable column sortability */
  sortable?: boolean;
  /** Enable an additional searchbar below the column header */
  searchable?: boolean;
  /** Define whether the column is optional or not - default false */
  optional?: boolean;
  /** Provide a display function to edit the output */
  display?: (value: any, row: any) => string;
  // all props from oruga table column are also possible
  [key: string]: any;
  // https://oruga.io/components/Table.html#props
}

export interface Action {
  /** action title shown in dropdown */
  title: string;
  /** function to be called if the action is fired, with all selected rows as property */
  f: (rows: TableRow[]) => Promise<void>;
}

export interface LoadResponse {
  rows: any[];
  total: number;
}

export type LoadFunction = (
  page: number,
  size: number,
  sort: string,
  ascending: boolean,
  search: string,
  filters: Record<string, string>,
) => Promise<LoadResponse>;

export interface TableRow<T = object> {
  _value: T;
  id: string | number;
  [key: string]: any;
}
