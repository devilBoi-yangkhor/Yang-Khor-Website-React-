import React, { useEffect, useState } from 'react';
import { firestoreDb } from '../config/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import * as XLSX from 'xlsx'; // Import SheetJS
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const StaffList = () => {
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [editForm, setEditForm] = useState({
        staff_CID: '',
        staff_name: '',
        staff_email_id: '',
        staff_contact: '',
        staff_designation: '',
        staff_gender: '',
        staff_annual_leave: '',
        staff_annual_leave_accumulated: '',
        staff_casual_leave: '',
        staff_earned_leave_accumulated: '',
        staff_medical_leave: '',
        staff_paternity_leave: '',
        staff_preparatory_leave: '',
        staff_maternity_leave: '',
        service_confirmation_date: ''
    }); 
    const [alert, setAlert] = useState({ message: '', type: '' }); // State for custom alert

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestoreDb, 'office_staffs'));
                const staffData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStaffList(staffData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching staff list: ", error);
                setLoading(false);
                setAlert({ message: 'Failed to load staff data. Please try again.', type: 'error' });
            }
        };
        fetchStaff();
    }, []);

    const handleEditClick = (staff) => {
        setSelectedStaff(staff);
        setEditForm({
            staff_CID: staff.staff_CID,
            staff_name: staff.staff_name,
            staff_email_id: staff.staff_email_id,
            staff_contact: staff.staff_contact,
            staff_designation: staff.staff_designation,
            staff_gender: staff.staff_gender,
            staff_annual_leave: staff.staff_annual_leave,
            staff_annual_leave_accumulated: staff.staff_annual_leave_accumulated || '',
            staff_casual_leave: staff.staff_casual_leave,
            staff_earned_leave_accumulated: staff.staff_earned_leave_accumulated || '',
            staff_medical_leave: staff.staff_medical_leave || '',
            staff_paternity_leave: staff.staff_paternity_leave || '',
            staff_preparatory_leave: staff.staff_preparatory_leave || '',
            staff_maternity_leave: staff.staff_maternity_leave || '',
            service_confirmation_date: staff.service_confirmation_date || ''
        });
    };   

    const handleDeleteClick = async (id) => {
        try {
            await deleteDoc(doc(firestoreDb, 'office_staffs', id));
            setStaffList(staffList.filter(staff => staff.id !== id));
            setAlert({ message: 'Staff member deleted successfully.', type: 'success' });
        } catch (error) {
            console.error("Error deleting staff member: ", error);
            setAlert({ message: 'Failed to delete staff member. Please try again.', type: 'error' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleUpdateClick = async () => {
        try {
            const staffDocRef = doc(firestoreDb, 'office_staffs', selectedStaff.id);
            await updateDoc(staffDocRef, editForm);
            setStaffList(staffList.map(staff => staff.id === selectedStaff.id ? { ...staff, ...editForm } : staff));
            setAlert({ message: 'Staff member updated successfully.', type: 'success' });
            setSelectedStaff(null);
        } catch (error) {
            console.error("Error updating staff member: ", error);
            setAlert({ message: 'Failed to update staff member. Please try again.', type: 'error' });
        }
    };    

    const handleDownloadReport = () => {
        if (!selectedStaff) return;
    
        // Get the current month name
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    
        // Prepare data for the selected staff in the required format
        const data = [
            {
                Name: selectedStaff.staff_name,
                "Service Confirmation Date": selectedStaff.service_confirmation_date || 'N/A',
                "Current Month": currentMonth, // Include current month dynamically
                "Casual Leave (10)": 10, // Example fixed value; adjust if needed
                "Casual Leave Applicable": (10 - (parseFloat(selectedStaff.staff_casual_leave) || 0)).toFixed(2),
                "Casual Leave Availed": selectedStaff.staff_casual_leave || 0.0,
                "Earned/Annual Leave (30)": 30, // Example fixed value; adjust if needed
                "Earned Leave Applicable": (30 - (parseFloat(selectedStaff.staff_annual_leave) || 0)).toFixed(2),
                "Earned Leave Accumulated": selectedStaff.staff_annual_leave || 0.0,
                "Maternity/Paternity Leave": selectedStaff.maternity_paternity_leave || 'N/A',
                "Maternity Applicable": selectedStaff.maternity_applicable || 'N/A',
                "Maternity Availed": selectedStaff.maternity_availed || 0.0,
            }
        ];        
    
        // Create a worksheet with the formatted data
        const worksheet = XLSX.utils.json_to_sheet(data);
    
        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, `${selectedStaff.staff_name}_Report`);
    
        // Write the workbook and download as an Excel file
        XLSX.writeFile(workbook, `${selectedStaff.staff_name}_${currentMonth}_Leave_Report.xlsx`);
    };       

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    {alert.message && (
                        <div className={`p-4 mb-4 ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded`}>
                            {alert.message}
                        </div>
                    )}
                    <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Office Staff List</h2>
                    {loading ? (
                        <p className="text-center text-gray-500">Loading staff data...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Staff ID</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Name</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Email</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Contact</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Designation</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Gender</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Annual Leave Accumulated</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Casual Leave</th>
                                        <th className="py-2 px-2 border-b text-left font-semibold text-gray-600 dark:text-gray-300 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffList.map((staff) => (
                                        <tr key={staff.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_CID}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_name}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_email_id}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_contact}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_designation}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_gender}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_annual_leave}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">{staff.staff_casual_leave}</td>
                                            <td className="py-2 px-2 border-b dark:border-gray-700 text-sm">
                                                <button onClick={() => handleEditClick(staff)} className="text-blue-500 mr-2 text-xs">Edit</button>
                                                <button onClick={() => handleDeleteClick(staff.id)} className="text-red-500 text-xs">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {selectedStaff && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl relative overflow-auto" style={{ maxHeight: '80vh' }}>
                                <h3 className="text-2xl font-bold mb-4">Edit Staff Details</h3>
                                <form className="grid grid-cols-2 gap-4 overflow-x-auto">
                                {Object.keys(editForm).map((key) => (
                                    <div key={key} className="mb-4">
                                        <label className="block mb-2 text-gray-700">
                                            {key.replace(/_/g, ' ').toUpperCase()}
                                        </label>
                                        <input
                                            type="text"
                                            name={key}
                                            value={editForm[key]}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded w-full"
                                        />
                                    </div>
                                ))}

                                    <div className="col-span-2 flex justify-end space-x-2">
                                        <button type="button" onClick={handleUpdateClick} className="bg-blue-500 text-white px-4 py-2 rounded">
                                            Update
                                        </button>
                                        <button type="button" onClick={() => setSelectedStaff(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                <button
                                    onClick={handleDownloadReport}
                                    className="bg-green-600 text-white px-4 py-2 rounded right-4"
                                >
                                    Download Report
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default StaffList;
