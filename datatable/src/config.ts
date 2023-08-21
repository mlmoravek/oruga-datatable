import { getDefault } from "./helper";

// here fontawesome icons are used as default icon values
export const sharedDefaultProps = {
  columnEditIcon: {
    type: String,
    default: () => getDefault("datatable.columnEditIcon", "sliders"),
  },
  columnEditLabel: {
    type: String,
    default: () =>
      getDefault("datatable.columnEditLabel", "Column Configuration"),
  },
  columnEditHeader: {
    type: String,
    default: () =>
      getDefault("datatable.columnEditHeader", "Displayed Columns:"),
  },

  actionIcon: {
    type: String,
    default: () => getDefault("datatable.actionIcon", "play"),
  },
  actionPlaceholder: {
    type: String,
    default: () => getDefault("datatable.actionPlaceholder", "Select action"),
  },
  actionLabel: {
    type: String,
    default: () => getDefault("datatable.actionLabel", "Perform action"),
  },

  searchIcon: {
    type: String,
    default: () => getDefault("datatable.searchIcon", "magnifying-glass"),
  },
  searchPlaceholder: {
    type: String,
    default: () => getDefault("datatable.searchPlaceholder", "Search..."),
  },
  searchLabel: {
    type: String,
    default: () => getDefault("datatable.searchLabel", "Search"),
  },

  filterIcon: {
    type: String,
    default: () => getDefault("datatable.filterIcon", "magnifying-glass"),
  },
  filterPlaceholder: {
    type: String,
    default: () => getDefault("datatable.filterPlaceholder", "Filter..."),
  },

  sizes: {
    type: String,
    default: () => getDefault("datatable.sizes", [5, 10, 20, 50, 100]),
  },
  sizesLabel: {
    type: String,
    default: () => getDefault("datatable.sizesLabel", "Entries per page"),
  },

  pageNextLabel: {
    type: String,
    default: () => getDefault("datatable.pageNextLabel", "Next Page"),
  },
  pagePreviousLabel: {
    type: String,
    default: () => getDefault("datatable.pagePreviousLabel", "Previous Page"),
  },
  pageLabel: {
    type: String,
    default: () => getDefault("datatable.pageLabel", "Page"),
  },
  pageCurrentLabel: {
    type: String,
    default: () => getDefault("datatable.pageCurrentLabel", "Current Page"),
  },

  emptyIcon: {
    type: String,
    default: () => getDefault("datatable.emptyIcon", "frown"),
  },
  emptyLabel: {
    type: String,
    default: () =>
      getDefault(
        "datatable.emptyLabel",
        "Unfortunately no information are available...",
      ),
  },
  loadingIcon: {
    type: String,
    default: () => getDefault("datatable.loadingIcon", "spinner"),
  },
};
