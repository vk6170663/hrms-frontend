import 'react-day-picker/dist/style.css';
import '../../styles/calendar.css';
import { useState, useEffect, useRef } from 'react';
import InputFloat from '../InputFloat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Employee } from '../../types/Employee';
import { toast } from 'react-hot-toast';
import { addLeave } from '../../services/apiLeave';
import Button from '../button';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { useAuthStore } from '../../store/auth';

interface AddLeaveFormProps {
    onClose: () => void;
    isOpen: boolean;
    employees: Employee[];
    onAddSuccess: () => void;
}

const AddLeaveForm = ({ onClose, isOpen, employees, onAddSuccess }: AddLeaveFormProps) => {
    const [employeeSelected, setEmployeeSelected] = useState(false);
    const queryClient = useQueryClient();
    const calendarRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        employeeId: '',
        date: '',
        reason: '',
        department: '',
        document: null as File | null,
    });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);


    const { user } = useAuthStore();
    useEffect(() => {
        const initialEmployeeId = user?.id || (employees.length > 0 ? employees[0]._id : '');
        const selectedEmployee = employees.find(emp => emp._id === initialEmployeeId);
        setFormData((prev) => ({
            ...prev,
            employeeId: initialEmployeeId,
            department: selectedEmployee?.department || '',
        }));
    }, [user, employees]);

    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = employees.filter(emp =>
                emp.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            console.log('Filtered employees:', filtered);
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees([]);
        }
    }, [searchQuery, employees]);

    const addLeaveMutation = useMutation({
        mutationFn: () => addLeave(formData.employeeId, formData.date, formData.document!, formData.reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['leaves'] });
            toast.success('Leave added successfully');
            onAddSuccess();
            onClose();
            setFormData({
                employeeId: '',
                date: '',
                reason: '',
                department: '',
                document: null,
            });
            setSearchQuery('');
            setFilteredEmployees([]);
            if (fileInputRef.current) fileInputRef.current.value = '';
        },
        onError: (error: Error) => {
            console.error('Mutation error:', error.message);
            toast.error(error.message || 'Error adding leave');
        },
    });

    useEffect(() => {
        if (!employeeSelected && searchQuery.trim()) {
            const filtered = employees.filter(emp =>
                emp.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees([]);
        }
    }, [searchQuery, employees, employeeSelected]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement & { files?: FileList; };

        if (name === 'document' && files) {
            setFormData((prev) => ({ ...prev, document: files[0] }));
        } else if (name === 'searchQuery') {
            setSearchQuery(value);
            setEmployeeSelected(false); // Allow filtering again
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleDaySelect = (date: Date | undefined) => {
        setFormData((prev) => ({
            ...prev,
            date: date ? format(date, 'yyyy-MM-dd') : '',
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

        if (!formData.employeeId || !formData.date || !formData.document) {
            toast.error('Please fill all required fields');
            return;
        }

        addLeaveMutation.mutate();
    };

    const isFormComplete = formData.employeeId && formData.date && formData.document;

    const handleEmployeeSelect = (employee: Employee) => {
        setFormData((prev) => ({
            ...prev,
            employeeId: employee._id,
            department: employee.department || '',
        }));
        setSearchQuery(employee.name);
        setFilteredEmployees([]);
        setEmployeeSelected(true);
    };

    const handleClearSelection = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFormData((prev) => ({
            ...prev,
            employeeId: '',
            department: '',
        }));
        setSearchQuery('');
        setFilteredEmployees([]);
    };

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
                            <span>Add Leave</span>
                            <span className="close-form" onClick={onClose}>X</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="candidate-form-body">
                                <div className="leave-form-input-wrapper">
                                    <InputFloat
                                        label="Name"
                                        name="searchQuery"
                                        value={searchQuery}
                                        onChange={handleChange}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    {searchQuery && (
                                        <span className="leave-remove-field" onClick={handleClearSelection}>×</span>
                                    )}
                                    {filteredEmployees.length > 0 && (
                                        <div className="leave-dropdown-menu">
                                            {filteredEmployees.map((emp) => {
                                                console.log(emp);
                                                console.log(filteredEmployees);

                                                return <div
                                                    key={emp._id}
                                                    className="leave-dropdown-item"
                                                    onClick={() => handleEmployeeSelect(emp)}
                                                >
                                                    {emp.name}
                                                </div>;
                                            })}
                                        </div>
                                    )}
                                </div>
                                <InputFloat
                                    label="Designation"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                                <div className="daypicker-wrapper" ref={calendarRef} onClick={handleInputClick}>
                                    <InputFloat
                                        label="Leave Date"
                                        name="date"
                                        value={formData.date || ''}
                                        onChange={handleChange}
                                    />
                                    {isCalendarOpen && (
                                        <DayPicker
                                            mode="single"
                                            selected={formData.date ? new Date(formData.date) : undefined}
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
                                <div className="form-input-wrapper">
                                    <input
                                        type="file"
                                        id="doc-input"
                                        name="document"
                                        accept="application/pdf"
                                        ref={fileInputRef}
                                        onChange={handleChange}
                                        className="hidden-file-input"
                                    />
                                    <div
                                        className={`custom-file-input ${formData.document ? 'has-file' : ''}`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <label htmlFor="doc-input" className="custom-file-label">
                                            Document<span>*</span>
                                        </label>
                                        {formData.document ? (
                                            <div className="file-info">
                                                <span className="file-name">{formData.document.name}</span>
                                                <span
                                                    className="remove-file"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormData((prev) => ({ ...prev, document: null }));
                                                        if (fileInputRef.current) fileInputRef.current.value = '';
                                                    }}
                                                >
                                                    ×
                                                </span>
                                            </div>
                                        ) : (
                                            <svg
                                                className="upload-icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                            >
                                                <path
                                                    d="M1.3335 12.1666V13.8333C1.3335 14.2753 1.50909 14.6992 1.82165 15.0118C2.13421 15.3243 2.55814 15.4999 3.00016 15.4999H13.0002C13.4422 15.4999 13.8661 15.3243 14.1787 15.0118C14.4912 14.6992 14.6668 14.2753 14.6668 13.8333V12.1666M3.8335 5.49992L8.00016 1.33325M8.00016 1.33325L12.1668 5.49992M8.00016 1.33325V11.3333"
                                                    stroke="#4D007D"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <InputFloat
                                    label="Reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={!isFormComplete || addLeaveMutation.isPending}
                                containerClass={`${!isFormComplete || addLeaveMutation.isPending ? 'form-disabled--btn' : 'form-active--btn'} save-btn`}
                            >
                                {addLeaveMutation.isPending ? 'Adding...' : 'Add Leave'}
                            </Button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default AddLeaveForm;