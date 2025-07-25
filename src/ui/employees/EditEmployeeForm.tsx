import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';
import { useState, useEffect, useRef } from 'react';
import InputFloat from '../InputFloat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Employee } from '../../types/Employee';
import { toast } from 'react-hot-toast';
import { updateEmployee } from '../../services/apiEmployees';
import Button from '../button';
import { DayPicker } from 'react-day-picker';
import { formatDate } from '../../utils/dateUtils';
import { format } from 'date-fns';

interface EditEmployeeFormProps {
    onClose: () => void;
    isOpen: boolean;
    employee: Employee;
    onUpdateSuccess: (employeeId: string) => void;
}

const EditEmployeeForm = ({ onClose, isOpen, employee, onUpdateSuccess }: EditEmployeeFormProps) => {
    const queryClient = useQueryClient();
    const calendarRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<Partial<Employee>>({
        name: employee.name || '',
        email: employee.email || '',
        phoneNumber: employee.phoneNumber || '',
        position: employee.position || 'Intern',
        department: employee.department || '',
        joiningDate: employee.joiningDate ? new Date(employee.joiningDate) : undefined, // Ensure Date object
    });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    useEffect(() => {
        setFormData({
            name: employee.name || '',
            email: employee.email || '',
            phoneNumber: employee.phoneNumber || '',
            position: employee.position || 'Intern',
            department: employee.department || '',
            joiningDate: employee.joiningDate ? new Date(employee.joiningDate) : undefined,
        });
    }, [employee]);

    const updateEmployeeMutation = useMutation({
        mutationFn: () => updateEmployee(employee._id, {
            ...formData,
            joiningDate: formData.joiningDate,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            toast.success('Employee updated successfully');
            onUpdateSuccess(employee._id);
            onClose();
        },
        onError: (error: Error) => {
            console.error('Mutation error:', error.message);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name !== 'joiningDate') {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDaySelect = (date: Date | undefined) => {
        setFormData((prev) => ({
            ...prev,
            joiningDate: date,
        }));
        setIsCalendarOpen(false);
    };

    const handleInputClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsCalendarOpen(true);
        console.log('Input clicked, calendar should open');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.department) {
            toast.error('Please fill all required fields');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email || '')) {
            toast.error('Please enter a valid email address');
            return;
        }

        updateEmployeeMutation.mutate();
    };

    const isFormComplete =
        formData.name &&
        formData.email &&
        formData.phoneNumber &&
        formData.department &&
        (/^\S+@\S+\.\S+$/.test(formData.email || ''));

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        };
        if (isCalendarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCalendarOpen]);

    return (
        <>
            {isOpen && (
                <>
                    <div className="form-overlay" onClick={onClose}></div>
                    <div className="candidate-form-container">
                        <div className="candidate-form-header">
                            <div></div>
                            <span>Edit Employee</span>
                            <span className="close-form" onClick={onClose}>X</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="candidate-form-body">
                                <InputFloat
                                    label="Full Name"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber || ''}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Department"
                                    name="department"
                                    value={formData.department || ''}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Position"
                                    name="position"
                                    value={formData.position || ''}
                                    onChange={handleChange}
                                />
                                <div className="daypicker-wrapper" ref={calendarRef} onClick={handleInputClick}>
                                    <InputFloat
                                        label="Joining Date"
                                        name="joiningDate"
                                        value={formData.joiningDate ? formatDate(formData.joiningDate.toISOString()) : ''}
                                        onChange={handleChange}
                                    />
                                    {isCalendarOpen && (
                                        <DayPicker
                                            mode="single"
                                            selected={formData.joiningDate}
                                            onSelect={handleDaySelect}
                                            captionLayout="label"
                                            showOutsideDays
                                            weekStartsOn={0}
                                            modifiersClassNames={{
                                                selected: 'selected-day',
                                                today: 'today-day',
                                            }}
                                            formatters={{
                                                formatCaption: (month, options) =>
                                                    format(month, 'LLLL, yyyy', options?.locale ? { locale: options.locale } : undefined),
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={!isFormComplete || updateEmployeeMutation.isPending}
                                containerClass={`${!isFormComplete || updateEmployeeMutation.isPending ? 'form-disabled--btn' : 'form-active--btn'} save-btn`}
                            >
                                {updateEmployeeMutation.isPending ? 'Saving...' : 'Save'}
                            </Button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default EditEmployeeForm;