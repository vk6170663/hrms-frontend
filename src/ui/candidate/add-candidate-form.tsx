import { useRef, useState } from 'react';
import InputFloat from '../InputFloat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Candidate } from '../../types/Candidate';
import toast from 'react-hot-toast';
import { addCandidate } from '../../services/apiCandidates';
import Button from '../button';

interface AddCandidateFormProps {
    onClose: () => void;
    isOpen: boolean;
}

const AddCandidateForm = ({ onClose, isOpen }: AddCandidateFormProps) => {
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Candidate>>({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: 'Intern',
        department: '',
        experience: '',
        resume: undefined,
    });
    const [declarationChecked, setDeclarationChecked] = useState(false);

    const addCandidateMutation = useMutation({
        mutationFn: addCandidate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['candidates'] });
            onClose();
            setFormData({ fullName: '', email: '', phoneNumber: '', position: '', department: '', experience: '', resume: undefined });
            if (fileInputRef.current) fileInputRef.current.value = '';
        },
        onError: (error: Error) => {
            console.error('Mutation error:', error.message);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'resume' && files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!declarationChecked) {
            toast.error('Please agree to the declaration');
            return;
        }
        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.department) {
            toast.error('Please fill all required fields');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email || '')) {
            toast.error('Please enter a valid email address');
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined) formDataToSend.append(key, value as string | Blob);
        });

        addCandidateMutation.mutate(formDataToSend);
    };

    const isFormComplete =
        formData.fullName &&
        formData.email &&
        formData.phoneNumber &&
        formData.department &&
        (/^\S+@\S+\.\S+$/.test(formData.email || '')) && formData.resume;

    return (
        <>
            {isOpen && (
                <>
                    <div className="form-overlay" onClick={onClose}></div>
                    <div className="candidate-form-container">
                        <div className="candidate-form-header">
                            <div></div>
                            <span>Add New Candidate</span>
                            <span className="close-form" onClick={onClose}>X</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="candidate-form-body">
                                <InputFloat
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName || ''}
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
                                    label="Position"
                                    name="department"
                                    value={formData.department || ''}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Experience"
                                    name="experience"
                                    type="number"
                                    value={formData.experience || ''}
                                    onChange={handleChange}
                                />
                                <div className="form-input-wrapper">
                                    <input
                                        type="file"
                                        id="resume-input"
                                        name="resume"
                                        accept="application/pdf"
                                        ref={fileInputRef}
                                        onChange={handleChange}
                                        className="hidden-file-input"
                                    />

                                    <div
                                        className={`custom-file-input ${formData.resume ? 'has-file' : ''}`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <label htmlFor="resume-input" className="custom-file-label">
                                            Resume<span>*</span>
                                        </label>

                                        {formData.resume ? (
                                            <div className="file-info">
                                                <span className="file-name">{(formData.resume as File).name}</span>
                                                <span className="remove-file" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFormData((prev) => ({ ...prev, resume: undefined }));
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}>
                                                    ×
                                                </span>
                                            </div>
                                        ) : (
                                            <svg className='upload-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                                <path d="M1.3335 12.1666V13.8333C1.3335 14.2753 1.50909 14.6992 1.82165 15.0118C2.13421 15.3243 2.55814 15.4999 3.00016 15.4999H13.0002C13.4422 15.4999 13.8661 15.3243 14.1787 15.0118C14.4912 14.6992 14.6668 14.2753 14.6668 13.8333V12.1666M3.8335 5.49992L8.00016 1.33325M8.00016 1.33325L12.1668 5.49992M8.00016 1.33325V11.3333" stroke="#4D007D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="form-footer">
                                <input
                                    type="checkbox"
                                    id="declaration"
                                    checked={declarationChecked}
                                    onChange={(e) => setDeclarationChecked(e.target.checked)}
                                    disabled={!isFormComplete}
                                />
                                <label htmlFor="declaration">
                                    I hereby declare that the above information is true to the best of my knowledge and belief
                                </label>
                            </div>

                            <Button
                                type="submit"
                                disabled={!isFormComplete || addCandidateMutation.isPending}
                                containerClass={`${!isFormComplete || addCandidateMutation.isPending ? "form-disabled--btn" : "form-active--btn"} save-btn `}
                            >
                                {addCandidateMutation.isPending ? 'Saving...' : 'Save'}
                            </Button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default AddCandidateForm;