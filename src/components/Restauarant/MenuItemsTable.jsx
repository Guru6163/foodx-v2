import React, { useState, useEffect } from 'react';
import { deleteMenuById } from '../../api/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { getMenuItemsByRestauarantId } from '../../api/api';

function MenuItemsTable({ id, change, setChange }) {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <button
                    onClick={() => confirmDelete(rowData)}
                    className="bg-red-600 px-5 py-2 text-white w-full"
                >
                    Delete
                </button>
            </div>
        );
    };

    const confirmDelete = (rowData) => {
        setSelectedItem(rowData);

        setShowConfirmDialog(true);

    };

    const deleteMenuItem = () => {
        
        deleteMenuById(selectedItem._id).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
        setShowConfirmDialog(false);
    };

    useEffect(() => {
        getMenuItemsByRestauarantId(id)
            .then((res) => setMenuItems(res.data))
            .catch((err) => console.log(err));
    }, [change]);

    return (
        <div className="card">
            <DataTable value={menuItems} showGridlines tableStyle={{ minWidth: '100vh' }}>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="price" header="Price"></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>

            <Dialog
                visible={showConfirmDialog}
                onHide={() => setShowConfirmDialog(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '30vw' }}
                header="Delete Item"
                footer={
                    <div>
                        <button className="bg-blue-600 px-6 py-2 cursor-pointer text-white" onClick={() => setShowConfirmDialog(false)}>
                            Cancel
                        </button>
                        <button className="bg-red-600 px-6 py-2 cursor-pointer text-white" onClick={deleteMenuItem}>
                            Delete
                        </button>
                    </div>
                }
            >
                <h5 className='font-bold'>Confirm Delete</h5>
                {selectedItem && (
                    <p>
                        Are you sure you want to delete the menu item "{selectedItem.name}"?
                    </p>
                )}
            </Dialog>
        </div>
    );
}

export default MenuItemsTable;
