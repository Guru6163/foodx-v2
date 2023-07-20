import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getMenuItemsByRestauarantId } from '../../api/api'

function MenuItemsTable({ id, change }) {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        getMenuItemsByRestauarantId(id).then(res => setMenuItems(res.data)).catch(err => console.log(err))
    }, [change])
    return (
        <div className="card">
            <DataTable value={menuItems} showGridlines tableStyle={{ minWidth: '100vh' }}>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="price" header="Price"></Column>
            </DataTable>
        </div>

    )
}

export default MenuItemsTable