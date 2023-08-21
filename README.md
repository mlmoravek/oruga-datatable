# Oruga Datatable Component

This package contains a configurable table component, an extension of the [oruga table](https://oruga.io/components/Table.html) component.

[Orgua](https://oruga.io/) is a Vue 3 component framework that doesn't come with a CSS library. However, specific CSS libraries can be added and modified without changing the component framework and implementation by configuration.


***

# Getting started


## Peer Dependencies
To use the DataTable component, your project should have *vue: ^3.2.x* and *@oruga-ui/oruga-next: ^0.6.x* packages installed.


## Technolgies
The package is created with Vue 3 + TypeScript + Vite
The components use the Vue 3 `<script setup>` SFCs symtax.


## Install

```
npm i oruga-datatable
```

## Build & Dev

Install dependencies:

```
npm install
```

Build the DataTable component package:
```
npm run build
```

Create and run development server for the example package:
```
npm run dev
```


## Demo

This repository contains a demonstration project to preview the DatatTable component and its functionality. 
It comes with additional libraries such as the CSS framework bulma and Fontawesome Icons.

It can be startet by the following commands:
```
npm install
npm run demo
```
The *demo*  script will build the DataTable component package, and start a development server for the example project. 


***


# Documentation


## Usage
The easiest way to use the DataTable component is to register it globally by adding the DataTable plugin. 
It is possible to pass some configuration to the plugin to override the labels and icons. 
The config object is defined as follows:

``` 
// Config
{
    columnEditIcon: string;
    columnEditLabel: string;
    columnEditHeader: string;
    actionIcon: string;
    actionPlaceholder: string;
    actionLabel: string;
    searchIcon: string;
    searchPlaceholder: string;
    searchLabel: string;
    filterIcon: string;
    filterPlaceholder: string;

    sizes: number[];
    sizesLabel: string;

    pageNextLabel: string;
    pagePreviousLabel: string;
    pageLabel: string;
    pageCurrentLabel: string;

    emptyIcon: string;
    emptyLabel: string;

    loadingIcon: string;
}
``` 

```
import DatatablePlugin from "oruga-datatable";

const config = {...};

createApp(App)
  .use(DatatablePlugin, config)
  ...

```

However, if you don't want to register the plugin, but want to use the DataTable component, you will need to set the global configuration yourself, as the underlying component will need it:

```
import { provideConfig } from "oruga-datatable";

const config = { ... };
provideConfig(config);
```

Now you need to import the DataTable component into the file where you want to use it:

```
import { DataTable } from "oruga-datatable";

<DataTable .../>
```


## Component 

The DataTable component needs two properties. First, the header columns must be defined by the `header` property. 

``` 
// Header
{
    /** Define the object property key */
    field: string;
    /** Define the column label */
    label: string;
    /** Enable column sortability */
    sortable?: boolean;
    /** Enable an additional search bar below the column header */
    searchable?: boolean;
    /** Define whether the column is optional or not - default false */
    optional?: boolean;
    /** Provide a display function to edit the output */
    display?: (value: any, row: any) => string;
    // all other props from oruga o-table-column component are also possible
    [key: string]: any;
}
```

Then the data can be provided synchronously by the `data` property (Header[]) or asynchronously by the `load` property (LoadFunction). 
If no data property is given, the load function will be called each time the data should be updated. The LoadFunction must return an object with the properties `rows` (array of items to display) and `total` (total number of items). The `total` property is needed for pagination.

```
// LoadFunction
(
    /** current page (0-x) */
    page: number,
    /** page size */
    size: number,
    /** sort by column name */
    sort: string,
    /** is sort ascending (true = "asc") */
    ascending: boolean,
    /** search value string if searchable is enabled */
    search: string,
    /** filter entries if filter are enabled */
    filters: Record<string, string>,
) => Promise<{ rows: any[]; total: number; }>;

```



### Props Definition

The following props can be passed to the component and all props from the original oruga table are also possible.   

| Prop Name            | Type                                        | Default  | Description                                                                                              |
|----------------------|---------------------------------------------|----------|----------------------------------------------------------------------------------------------------------|
| header               | Header[]                                    |          | Defines the columns with this header property. If not given the inline b-table-column variation is used. |
| load                 | LoadFunction                                |          | If no data prop is set, this load function is called every time the data should be updated.              |
| data                 | any[]                                       |          | An alternativ to the async load function, a sync data object can be set.                                 |
| searchable           | boolean                                     | false    | Dis/Enable the searchbar                                                                                 |
| checkable            | boolean                                     | false    | Dis/Enable a checkbox for every row                                                                      |
| paginated            | boolean                                     | false    | Dis/Enable the paginations bar                                                                           |
| detailed             | boolean                                     | false    | Dis/Enable the detail slot                                                                               |
| clickable            | boolean                                     | false    | Adds class 'is-clickable' to any row                                                                     |
| configurable         | boolean                                     | false    | Dis/Enable config options                                                                                |
| customColumns        | boolean                                     | false    | Dis/Enable custom columns instead of o-table-columns                                                     |
| actions              | Action[]                                    |          | Actions for checked rows                                                                                 |
| defaultPage          | number                                      | 0        |                                                                                                          |
| defaultSize          | number                                      | 10       |                                                                                                          |
| defaultSort          | string                                      | id       |                                                                                                          |
| defaultSortDirection | ["asc", "desc"]                             | asc      |                                                                                                          |
| loading              | boolean                                     | false    | Override loading state                                                                                   |
| showDetailIcon       | boolean                                     | true     | Override for show-detail-icon from oruga table. If false the click event will trigger open detail        |
| checkedRows          | TableRow[]                                  | []       | Checked table rows                                                                                       |
| rowClass             | (row: TableRow, index: number) =&gt; string |          | Add a class to a row based on the return valeue                                                          |
| rowKey               | string                                      | id       | Define the unique primary key field for the row element                                                  |  


### Slots Definition

The following slots are provided by the component. 

| Slot Name  | Props                       | Description                                             |
|------------|-----------------------------|---------------------------------------------------------|
| actions    | { actions: Action[] }       | Override the action section.                            |
| nav-left   | {}                          | Area left of actions section.                           |
| nav        | {}                          | Area right of actions section.                          |
| nav-right  | {}                          | Area right of search section.                           |
| config     | {}                          | Override the column configuration section.              |
| search     | {}                          | Override the search section.                            |
| size       | {}                          | Override the size section.                              |
| pagination | {}                          | Override the pagination section.                        |
| default    | {}                          | Override oruga table inner default slot.                |
| before     | {}                          | Area before columns, if customColumns is enabeled.      |
| after      | {}                          | Area after columns, if customColumns is enabeled.       |
| detail     | { row: any, index: number } | Detail area of a row. Is shown if detailed is enabeled. |
| footer     | {}                          | Override the footer section.                            |
| empty      | {}                          | Override the empty section.                             |
| loading    | {}                          | Override the loading section.                           |


### Events Definition

The following events are emitted by the component and all events which came from the original oruga table are also possible.


| Event Name       | Props                                        | Description                                                          |
|------------------|----------------------------------------------|----------------------------------------------------------------------|
| rowClick         | { row: TableRow }                            | Is emitted when an row is clicked                                    |
| update:checkedRows | { rows: TableRow[] }                       |  Is two-way binding update hook for checkedRows prop                 |
| visibilityChange | { columns: { [column: string]: boolean } }   | Is emitted when the visibilty for a row change                       |
| search           | { value: string }                            | Is emitted when the search is triggered                              |
| filter           | { filter: Record&lt;string, string&gt; }     | Is emitted when the filter is changed                                |
| sort             | { value: { key: string; dir: string } }      | Is emitted when the sort is changed                                  |
| page             | { value: { current: number; size: number } } | Is emitted when the page is changed                                  |


***

## Additional instructions

The DataTable component comes with many features. This section explains some more complex examples.


### Before / After Slot

An `before` or `after` slot can be passed to the component. 
To make these slots available, the `customColumns` property must be set to true.
Within these slots, additional columns can be defined that are not defined in the `header` property before. 
To define additional columns, the `o-table-column` component (which comes from Oruga) must be used. This component has a default slot that comes with the `row` property and contains the object of the row formatted by the component. The original object, which is provided by the `data` property or the `load function`, is accessible through `row._value`.

``` 
<DataTable
    :header="tableHeader"
    :load="loadData"
    customColumns>
    
    <template #after>
        <o-table-column v-slot="{ row }">
            <a @click="() => onEvent('Edit', row)" >
                Edit
            </a>
        </o-table-column>
    </template>
</DataTable>

``` 

### Actions 
Actions can be passed to the component to perform a function on multiple selected rows.
An Action is defined by a displayed `title` and a function `f`. 

```
// Action
{
    /** action title shown in dropdown */
    title: string;
    /** function to be called if the action is fired, with all selected rows as property */
    f: (rows: any[]) => Promise<void>;
}
```
Actions are most useful when the checkable feature is enabled and different or all rows can be checked. An action can now be performed on all selected rows.

``` 
<DataTable
    :header="tableHeader"
    :load="loadData"
    :actions="[{ 
        title: "Delete", 
        f: (rows) => rows.forEach(row => delete(row)) 
    }]"
    checkable />
``` 

### Filter
The oruga table provides internal search functionality. 
This functionality can be enabled by adding `searchable` to the `header` definition object. This adds a searchbar below each column header. 
Since the DataTable provides its own global searchbar at the top of the table, this functionality is wrapped and provided as an additional filter for each column. 
To enable this feature, the `customColumns` property must also be enabled.

If the synconus `data` property is used, the filter is applied by the table itself. 
However, if asynchronous data is requested, the filter for each column is passed to the load function as a property and the `backendFiltering` property is set by the oruga table internally.

In addition, a `filter` event is fired each time the filter is changed.

``` 
<DataTable
    :header="[{
        field: 'name',
        label: 'Name',
        searchable: true,
    }]"
    :load="loadData" 
    customColumns
    @filter="(filter) => doSomething(filters)" />
``` 


### Manually Reload
In addition to the props, slots and events, the DataTable component provides one function `loadContent(): void` that can be called to trigger a reload of the data. Most commonly this can be used to manually refetch asynchronous data and reload the table when data is changed outside the component. Internally it calls the given `load` function and reformats the data.

``` 
const table = ref();

// reload the table data
const reload = (): void => {
  table.value?.loadContent();
};

<DataTable
    ref="table"
    :header="tableHeader"
    :load="loadData" 
     />
``` 
