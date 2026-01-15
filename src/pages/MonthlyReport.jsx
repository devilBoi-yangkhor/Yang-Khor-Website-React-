import React, { useEffect, useState } from 'react';
import { firestoreDb } from '../config/firebase';
import { collection, getDocs, updateDoc, doc, addDoc, where, query } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import * as XLSX from 'xlsx'; // Import SheetJS
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const MonthlyReport = () => {
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date().toLocaleString('default', { month: 'long' })); // Default to current month
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Default to current year
    const [isSubmitting, setIsSubmitting] = useState(false); // For button disable handling

    useEffect(() => {
    const fetchStaff = async () => {
        try {
        const querySnapshot = await getDocs(collection(firestoreDb, 'office_staffs'));
        const staffData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStaffList(staffData);
        setLoading(false);
        } catch (error) {
        console.error("Error fetching staff list: ", error);
        toast.error("Failed to load staff data. Please try again.");
        setLoading(false);
        }
    };
    fetchStaff();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.info("Processing...");

    try {
        // Check if the report for the selected month and year already exists
        const reportQuery = query(
        collection(firestoreDb, 'monthly_reports'),
        where("month", "==", currentMonth),
        where("year", "==", currentYear)
        );

        const existingReport = await getDocs(reportQuery);
        if (!existingReport.empty) {
        toast.warn("Report for the selected month and year already exists.");
        setIsSubmitting(false);
        return;
        }

        // Update earned leaves for staff
        const updatedStaffList = staffList.map(staff => ({
        ...staff,
        staff_earned_leave_accumulated: (parseFloat(staff.staff_earned_leave_accumulated) || 0) + 2.5,
        }));

        await Promise.all(
        updatedStaffList.map(staff =>
            updateDoc(doc(firestoreDb, 'office_staffs', staff.id), {
            staff_earned_leave_accumulated: staff.staff_earned_leave_accumulated.toString(),
            })
        )
        );

        // Save the report
        await addDoc(collection(firestoreDb, 'monthly_reports'), {
        month: currentMonth,
        year: currentYear,
        reportDate: new Date(),
        staffReports: updatedStaffList.map(({ id, ...staff }) => ({
            staffID: id,
            ...staff,
        })),
        });

        toast.success(`Successfully updated earned leaves and saved the report for ${currentMonth} ${currentYear}.`);
    } catch (error) {
        console.error("Error updating staff data: ", error);
        toast.error("Failed to update earned leaves and save the report. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
    };

    const exportToExcel = async () => {
    try {
        const reportQuery = query(
        collection(firestoreDb, 'monthly_reports'),
        where("month", "==", currentMonth),
        where("year", "==", currentYear)
        );

        const reportSnapshot = await getDocs(reportQuery);
        if (reportSnapshot.empty) {
        toast.error("No report found for the selected month and year.");
        return;
        }

        const reportData = reportSnapshot.docs[0].data().staffReports;

        const ws = XLSX.utils.json_to_sheet(reportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Staff Report");
        XLSX.writeFile(wb, `staff_report_${currentMonth}_${currentYear}.xlsx`);

        toast.success("Report exported successfully.");
    } catch (error) {
        console.error("Error exporting report: ", error);
        toast.error("Failed to export the report. Please try again.");
    }
    };

    return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-y-auto">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-300">Monthly Earned Leave Update</h2>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Select Month</label>
                <select
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                >
                    {Array.from({ length: 12 }, (_, i) => {
                    const month = new Date(0, i).toLocaleString('default', { month: 'long' });
                    return (
                        <option key={month} value={month}>
                        {month}
                        </option>
                    );
                    })}
                </select>
                </div>

                <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Select Year</label>
                <input
                    type="number"
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
                </div>
            </div>

            <div className="mt-6 flex space-x-4">
                <button
                type="submit"
                className="w-1/2 h-12 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 text-center shadow-md"
                disabled={isSubmitting}
                >
                {isSubmitting ? "Processing..." : "Add 2.5 Earned Leaves"}
                </button>

                <button
                type="button"
                onClick={exportToExcel}
                className="w-1/2 h-12 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 text-center shadow-md"
                >
                Download Report for Selected Month
                </button>
            </div>
            </form>

            {loading ? (
            <p className="text-center text-gray-500 mt-6">Loading staff data...</p>
            ) : (
            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <thead>
                    <tr>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300 border-b">Staff ID</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300 border-b">Name</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300 border-b">Casual Leave</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700 dark:text-gray-300 border-b">Earned Leave Accumulated</th>
                    </tr>
                </thead>
                <tbody>
                    {staffList.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 border-b dark:border-gray-700">{staff.staff_CID}</td>
                        <td className="py-3 px-4 border-b dark:border-gray-700">{staff.staff_name}</td>
                        <td className="py-3 px-4 border-b dark:border-gray-700">{staff.staff_casual_leave}</td>
                        <td className="py-3 px-4 border-b dark:border-gray-700">{staff.staff_earned_leave_accumulated || 0}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </main>
        </div>
    </div>
    );
};

export default MonthlyReport;
