import React, { useState } from 'react';
import { firestoreDb } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardClip, faIdCard, faPhone, faBriefcase, faEnvelope, faVenusMars, faUser, faUmbrella, faPersonPregnant, faNotesMedical, faTruck, faHandsHoldingChild, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const AddStaff = () => {
    const [staff, setStaff] = useState({
        employee_id: '',
        staff_CID: '',
        staff_annual_leave: '',
        staff_casual_leave: '',
        staff_contact: '',
        staff_designation: '',
        staff_email_id: '',
        staff_gender: '',
        staff_maternity_leave: '',
        staff_medical_leave: '',
        staff_name: '',
        staff_paternity_leave: '',
        staff_preparatory_leave: '',
    });

    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaff({ ...staff, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';
        if (!value) {
            error = `${name.replace('_', ' ')} is required.`;
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        Object.keys(staff).forEach(key => {
            if (!staff[key]) {
                newErrors[key] = `${key.replace('_', ' ')} is required.`;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            await addDoc(collection(firestoreDb, 'office_staffs'), staff);
            setAlert({ message: 'Staff added successfully!', type: 'success' });
            setIsSubmitting(false);

            setStaff({
                employee_id : '',
                staff_CID: '',
                staff_annual_leave: '',
                staff_casual_leave: '',
                staff_contact: '',
                staff_designation: '',
                staff_email_id: '',
                staff_gender: '',
                staff_maternity_leave: '',
                staff_medical_leave: '',
                staff_name: '',
                staff_paternity_leave: '',
                staff_preparatory_leave: '',
            });
        } catch (error) {
            console.error('Error adding staff: ', error);
            setAlert({ message: 'Error adding staff.', type: 'error' });
            setIsSubmitting(false);
        }
    };

    const handleAlertClose = () => {
        setAlert({ message: '', type: '' });
        if (alert.type === 'success') {
            window.location.reload();
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 flex items-center dark:text-gray-300">
                        Add Staff
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField name="employee_id" value={staff.employee_id} placeholder="Employee ID" icon={faIdCardClip} handleChange={handleChange} error={errors.employee_id} />
                        <InputField name="staff_CID" value={staff.staff_CID} placeholder="Staff CID" icon={faIdCard} handleChange={handleChange} error={errors.staff_CID} />
                        <InputField name="staff_contact" value={staff.staff_contact} placeholder="Staff Contact" icon={faPhone} handleChange={handleChange} error={errors.staff_contact} />
                        <InputField name="staff_designation" value={staff.staff_designation} placeholder="Staff Designation" icon={faBriefcase} handleChange={handleChange} error={errors.staff_designation} />
                        <InputField name="staff_email_id" value={staff.staff_email_id} placeholder="Staff Email ID" icon={faEnvelope} handleChange={handleChange} error={errors.staff_email_id} />
                        <InputField name="staff_gender" value={staff.staff_gender} placeholder="Staff Gender" icon={faVenusMars} handleChange={handleChange} error={errors.staff_gender} />
                        <InputField name="staff_name" value={staff.staff_name} placeholder="Staff Name" icon={faUser} handleChange={handleChange} error={errors.staff_name} />
                        <InputField name="staff_annual_leave" value={staff.staff_annual_leave} placeholder="Annual Leave" icon={faCalendarCheck} handleChange={handleChange} error={errors.staff_annual_leave} />
                        <InputField name="staff_casual_leave" value={staff.staff_casual_leave} placeholder="Casual Leave" icon={faUmbrella} handleChange={handleChange} error={errors.staff_casual_leave} />
                        <InputField name="staff_maternity_leave" value={staff.staff_maternity_leave} placeholder="Maternity Leave" icon={faPersonPregnant} handleChange={handleChange} error={errors.staff_maternity_leave} />
                        <InputField name="staff_medical_leave" value={staff.staff_medical_leave} placeholder="Medical Leave" icon={faNotesMedical} handleChange={handleChange} error={errors.staff_medical_leave} />
                        <InputField name="staff_paternity_leave" value={staff.staff_paternity_leave} placeholder="Paternity Leave" icon={faHandsHoldingChild} handleChange={handleChange} error={errors.staff_paternity_leave} />
                        <InputField name="staff_preparatory_leave" value={staff.staff_preparatory_leave} placeholder="Preparatory Leave" icon={faTruck} handleChange={handleChange} error={errors.staff_preparatory_leave} />

                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Add Staff'}
                        </button>
                    </form>

                    {alert.message && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className={`p-6 rounded-lg text-center ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                <p>{alert.message}</p>
                                <button
                                    onClick={handleAlertClose}
                                    className="mt-4 bg-blue-500 text-white py-1 px-3 rounded"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

const InputField = ({ name, value, placeholder, icon, handleChange, error }) => (
    <div className="border p-2 rounded w-full">
        <div className="flex items-center">
            {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-gray-500" />}
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full outline-none ${error ? 'border-red-500' : ''}`}
            />
        </div>
        {error && <p className="mt-2 text-pink-600">{error}</p>}
    </div>
);

export default AddStaff;
