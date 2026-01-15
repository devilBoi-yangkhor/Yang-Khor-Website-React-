import React, { useEffect, useState, useRef } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestoreDb as db } from '../config/firebase';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

const DispatchHistory = () => {
    const [documents, setDocuments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        dispatchNumber: '',
        uploadDate: '',
        details: ''
    });
    const [alert, setAlert] = useState({ message: '', type: '' });
    const tableRef = useRef();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'yangkhorDispatchFile'));
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })).sort((a, b) => {
                    // Extracting the last part of the dispatch number after '/'
                    const dispatchNumberA = parseInt(a.dispatchNumber.split('/').pop(), 10);
                    const dispatchNumberB = parseInt(b.dispatchNumber.split('/').pop(), 10);
                    return dispatchNumberB - dispatchNumberA;
                });
                setDocuments(data);
            } catch (error) {
                triggerAlert('Error fetching documents', 'error');
            }
        };
    
        fetchDocuments();
    }, []); 

    const triggerAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 3000);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'yangkhorDispatchFile', id));
            setDocuments(documents.filter(doc => doc.id !== id));
            triggerAlert('✅ Document successfully deleted!', 'success');
        } catch (error) {
            triggerAlert('❌ Error deleting document!', 'error');
        }
    };

    const handleEdit = (doc) => {
        setEditId(doc.id);
        setEditFormData({
            dispatchNumber: doc.dispatchNumber,
            uploadDate: doc.uploadDate,
            details: doc.details
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleUpdate = async () => {
        if (!editId) return;
        try {
            const docRef = doc(db, 'yangkhorDispatchFile', editId);
            await updateDoc(docRef, { ...editFormData });
            setDocuments(documents.map(doc => doc.id === editId ? { ...doc, ...editFormData } : doc));
            setEditId(null);
            triggerAlert('✅ Document successfully updated!', 'success');
        } catch (error) {
            triggerAlert('❌ Error updating document!', 'error');
        }
    };

    const Alert = ({ message, type }) => {
        if (!message) return null;
        return (
            <div className={`p-4 mb-4 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} transition-all duration-300`}>
                {message}
            </div>
        );
    };

    const downloadPDF = async () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const canvas = await html2canvas(tableRef.current);
        const tableRows = Array.from(tableRef.current.querySelectorAll('tbody tr'));
    
        const filteredData = tableRows.map(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            return [
                cells[0]?.innerText,  // Dispatch Number
                cells[1]?.innerText,  // Upload Date
                cells[2]?.innerText,  // Details
            ];
        });
    
        // Creating a table with only filtered data
        doc.text('Dispatch History', 20, 20);
        doc.autoTable({
            head: [['Dispatch Number', 'Upload Date', 'Details']],
            body: filteredData,
            startY: 40
        });
    
        doc.save('dispatch-history.pdf');
    };
    

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
    <Sidebar />
    <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-4">
            {alert.message && <Alert message={alert.message} type={alert.type} />}

            <h2 className="text-3xl font-bold mb-6">🗃️ Dispatch History</h2>
            <button
                className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
                onClick={downloadPDF}
            >
                📥 Download as PDF
            </button>

            <div ref={tableRef} className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <th className="py-3 px-6 border-b">Dispatch Number</th>
                            <th className="py-3 px-6 border-b">Upload Date</th>
                            <th className="py-3 px-6 border-b">Details</th>
                            <th className="py-3 px-6 border-b">File</th>
                            <th className="py-3 px-6 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-3 px-6 border-b">
                                    {editId === doc.id ? (
                                        <input
                                            name="dispatchNumber"
                                            value={editFormData.dispatchNumber}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded w-full bg-transparent dark:bg-gray-600 dark:text-white"
                                        />
                                    ) : (
                                        doc.dispatchNumber
                                    )}
                                </td>
                                <td className="py-3 px-6 border-b">
                                    {editId === doc.id ? (
                                        <input
                                            name="uploadDate"
                                            type="date"
                                            value={editFormData.uploadDate}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded w-full bg-transparent dark:bg-gray-600 dark:text-white"
                                        />
                                    ) : (
                                        new Date(doc.uploadDate).toLocaleDateString()
                                    )}
                                </td>
                                <td className="py-3 px-6 border-b">
                                    {editId === doc.id ? (
                                        <input
                                            name="details"
                                            value={editFormData.details}
                                            onChange={handleInputChange}
                                            className="border p-2 rounded w-full bg-transparent dark:bg-gray-600 dark:text-white"
                                        />
                                    ) : (
                                        doc.details
                                    )}
                                </td>
                                <td className="py-3 px-6 border-b">
                                    {doc.file ? (
                                        <a href={doc.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            View Document
                                        </a>
                                    ) : (
                                        'No File'
                                    )}
                                </td>
                                <td className="py-3 px-6 border-b flex gap-2">
                                    {editId === doc.id ? (
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-500 text-white px-3 py-1 rounded shadow hover:bg-green-600"
                                        >
                                            💾 Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(doc)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600"
                                        >
                                            ✏️ Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(doc.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                                    >
                                        🗑️ Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</div>

    );
};

export default DispatchHistory;
