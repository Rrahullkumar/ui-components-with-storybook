// src/components/DataTable/DataTable.tsx
import React, { useState, useMemo } from 'react';

export interface Column<T> {
    key: string;
    title: string;
    dataIndex: keyof T;
    sortable?: boolean;
    render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    loading?: boolean;
    selectable?: boolean;
    onRowSelect?: (selectedRows: T[]) => void;
    className?: string;
}

type SortOrder = 'asc' | 'desc' | null;

const DataTable = <T extends Record<string, any>>({
    data,
    columns,
    loading = false,
    selectable = false,
    onRowSelect,
    className = '',
}: DataTableProps<T>) => {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);

    // Sorting logic
    const sortedData = useMemo(() => {
        if (!sortColumn || !sortOrder) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortColumn, sortOrder]);

    // Handle column header click for sorting
    const handleSort = (column: Column<T>) => {
        if (!column.sortable) return;

        const newSortColumn = column.dataIndex;

        if (sortColumn !== newSortColumn) {
            // Different column clicked
            setSortColumn(newSortColumn);
            setSortOrder('asc');
        } else {
            // Same column clicked - cycle through states
            switch (sortOrder) {
                case 'asc':
                    setSortOrder('desc');
                    break;
                case 'desc':
                    setSortOrder(null);
                    setSortColumn(null);
                    break;
                default:
                    setSortOrder('asc');
                    break;
            }
        }
    };



    // Handle row selection
    const handleRowSelect = (row: T, isSelected: boolean) => {
        let newSelectedRows: T[];

        if (isSelected) {
            newSelectedRows = [...selectedRows, row];
        } else {
            newSelectedRows = selectedRows.filter(selectedRow => selectedRow !== row);
        }

        setSelectedRows(newSelectedRows);
        onRowSelect?.(newSelectedRows);
    };

    // Handle select all
    const handleSelectAll = (isSelected: boolean) => {
        const newSelectedRows = isSelected ? [...sortedData] : [];
        setSelectedRows(newSelectedRows);
        onRowSelect?.(newSelectedRows);
    };

    const isRowSelected = (row: T) => selectedRows.includes(row);
    const isAllSelected = sortedData.length > 0 && selectedRows.length === sortedData.length;
    const isIndeterminate = selectedRows.length > 0 && selectedRows.length < sortedData.length;

    // Loading state
    if (loading) {
        return (
            <div className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                {selectable && <th className="w-12 px-6 py-3"></th>}
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    >
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="animate-pulse">
                                    {selectable && (
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                        </td>
                                    )}
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // Empty state
    if (!data.length) {
        return (
            <div className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                {selectable && <th className="w-12 px-6 py-3"></th>}
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                    >
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="text-center py-12">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No data</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        There are no items to display in this table.
                    </p>
                </div>
            </div>
        );
    }

    // Main table render
    return (
        <div className={`overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" role="table">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr role="row">
                            {selectable && (
                                <th className="w-12 px-6 py-3" role="columnheader">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={isAllSelected}
                                        ref={(el) => {
                                            if (el) el.indeterminate = isIndeterminate;
                                        }}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        aria-label="Select all rows"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${column.sortable ? 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700' : ''
                                        }`}
                                    onClick={() => handleSort(column)}
                                    role="columnheader"
                                    aria-sort={
                                        sortColumn === column.dataIndex
                                            ? sortOrder === 'asc'
                                                ? 'ascending'
                                                : 'descending'
                                            : 'none'
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        {column.title}
                                        {column.sortable && (
                                            <div className="flex flex-col">
                                                <svg
                                                    className={`w-3 h-3 ${sortColumn === column.dataIndex && sortOrder === 'asc'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400'
                                                        }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                                <svg
                                                    className={`w-3 h-3 -mt-1 ${sortColumn === column.dataIndex && sortOrder === 'desc'
                                                        ? 'text-blue-600'
                                                        : 'text-gray-400'
                                                        }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedData.map((row, index) => (
                            <tr
                                key={index}
                                className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${isRowSelected(row) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                    }`}
                                role="row"
                            >
                                {selectable && (
                                    <td className="px-6 py-4" role="gridcell">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={isRowSelected(row)}
                                            onChange={(e) => handleRowSelect(row, e.target.checked)}
                                            aria-label={`Select row ${index + 1}`}
                                        />
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                                        role="gridcell"
                                    >
                                        {column.render
                                            ? column.render(row[column.dataIndex], row, index)
                                            : String(row[column.dataIndex] || '')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table footer with selection info */}
            {selectable && selectedRows.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedRows.length} of {sortedData.length} row(s) selected
                    </p>
                </div>
            )}
        </div>
    );
};

export default DataTable;
