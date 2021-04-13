/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {AriaLabelingProps, AsyncLoadable, CollectionChildren, DOMProps, MultipleSelection, SectionProps, Sortable, StyleProps} from '@react-types/shared';
import {GridCollection, GridNode} from '@react-types/grid';
import {Key, ReactElement, ReactNode} from 'react';

export interface TableProps<T> extends MultipleSelection, Sortable {
  children: ReactElement<TableHeaderProps<T> | TableBodyProps<T> | SectionProps<T> | RowProps<T>>[],
  disabledKeys?: Iterable<Key>
}

export interface SpectrumTableProps<T> extends TableProps<T>, DOMProps, AriaLabelingProps, StyleProps {
  density?: 'compact' | 'regular' | 'spacious',
  overflowMode?: 'wrap' | 'truncate',
  isQuiet?: boolean,
  renderEmptyState?: () => JSX.Element
}

export interface TableHeaderProps<T> {
  columns?: T[],
  children: ColumnElement<T> | ColumnElement<T>[] | ColumnRenderer<T>
}

type ColumnElement<T> = ReactElement<ColumnProps<T>>;
type ColumnRenderer<T> = (item: T) => ColumnElement<T>;
export interface ColumnProps<T> {
  title?: ReactNode,
  children: ReactNode | ColumnElement<T> | ColumnElement<T>[],
  childColumns?: T[],
  'aria-label'?: string,
  width?: number | string,
  minWidth?: number | string,
  maxWidth?: number | string,
  defaultWidth?: number | string
}

// TODO: how to support these in CollectionBuilder...
export interface SpectrumColumnProps<T> extends ColumnProps<T> {
  align?: 'start' | 'center' | 'end',
  allowsResizing?: boolean,
  allowsReordering?: boolean,
  allowsSorting?: boolean,
  isSticky?: boolean, // shouldStick??
  isRowHeader?: boolean,
  showDivider?: boolean,
  hideHeader?: boolean
}

export interface TableBodyProps<T> extends AsyncLoadable {
  children: CollectionChildren<T>,
  items?: Iterable<T>
}

export interface RowProps<T> {
  // treeble case?
  childItems?: Iterable<T>,
  hasChildItems?: boolean,
  children: CellElement | CellElement[] | CellRenderer,
  textValue?: string, // ???
  'aria-label'?: string // ???
}

export interface CellProps {
  children: ReactNode,
  textValue?: string,
  'aria-label'?: string
}

export type CellElement = ReactElement<CellProps>;
export type CellRenderer = (columnKey: Key) => CellElement;

// TODO: perhaps defined `rows`, etc here so that we can table specific definitions
export interface TableCollection<T> extends GridCollection<T> {
  // TODO perhaps elaborate on this? maybe not clear enought, essentially returns the table header rows (e.g. in a tiered headers table, will return the nodes containing the top tier column, next tier, etc)
  /** A list of header row nodes in the table. */
  headerRows: GridNode<T>[],
  /** A list of column nodes in the table. */
  columns: GridNode<T>[],
  // TODO perhaps elaborate here, link to rowheader docs? https://www.digitala11y.com/rowheader-role/?
  /** A set of column keys that serve as the row header. */
  rowHeaderColumnKeys: Set<Key>,
  /** The node that makes up the body of the table. */
  body: GridNode<T>
}
