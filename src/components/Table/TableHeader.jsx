import React from 'react'

function TableHeader({ columns }) {
    return (
        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
            <tr>
                {columns.map((column) => (
                    <th key={column.key} className="p-2">
                        <div className="font-semibold text-center">{column.header}</div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader