import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

function GenericTable({ title, data, columns, isLoading, navigateTo }) {
    return (
        <div>
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full dark:text-slate-300">
                            <TableHeader columns={columns} />
                            <TableBody isLoading={isLoading} data={data} columns={columns} navigateTo={navigateTo} />
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenericTable