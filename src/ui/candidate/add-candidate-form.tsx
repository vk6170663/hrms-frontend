import { useRef, useState } from "react";
import InputFloat from "../InputFloat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Candidate } from "../../types/Candidate";
import api from "../../utils/api";
import toast from "react-hot-toast";

interface AddCandidateFormProps {
    onClose: () => void;
    isOpen: boolean;
}

const AddCandidateForm = ({ onClose, isOpen }: AddCandidateFormProps) => {
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Candidate>>({
        fullName: "",
        email: "",
        phoneNumber: "",
        position: "Intern",
        department: "",
        experience: "",
        resume: undefined,
    });
    const [declarationChecked, setDeclarationChecked] = useState(false);

    const addCandidateMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await api.post("/candidates", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["candidates"] });
            toast.success("Candidate added successfully");
            onClose();
            setFormData({ fullName: "", email: "", phoneNumber: "", position: "", department: "", experience: "", resume: undefined });
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        onError: (error: Error) => {
            toast.error(`Failed to add candidate: ${error.message}`);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "resume" && files && files[0]) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!declarationChecked) {
            toast.error("Please agree to the declaration");
            return;
        }
        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.department) {
            toast.error("Please fill all required fields");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email || "")) {
            toast.error("Please enter a valid email address");
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined) formDataToSend.append(key, value as string | Blob);
        });

        addCandidateMutation.mutate(formDataToSend);
    };

    // Disable button and checkbox if form is incomplete
    const isFormComplete =
        formData.fullName &&
        formData.email &&
        formData.phoneNumber &&
        formData.department &&
        (/^\S+@\S+\.\S+$/.test(formData.email || ""));

    return (
        <>
            {isOpen && (
                <>
                    <div className="form-overlay" onClick={onClose}></div>
                    <div className="candidate-form-container">
                        <div className="candidate-form-header">
                            <div></div>
                            <span>Add New Candidate</span>
                            <span className="close-form" onClick={onClose}>
                                X
                            </span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="candidate-form-body">
                                <InputFloat
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName || ""}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber || ""}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Position"
                                    name="department"
                                    value={formData.department || ""}
                                    onChange={handleChange}
                                />
                                <InputFloat
                                    label="Experience"
                                    name="experience"
                                    type="number"
                                    value={formData.experience || ""}
                                    onChange={handleChange}
                                />
                                <div className="form-input-wrapper">
                                    <input
                                        type="file"
                                        name="resume"
                                        ref={fileInputRef}
                                        onChange={handleChange}
                                        accept="application/pdf"
                                        className="form-input"
                                        id="resume-input"
                                    />
                                    <label htmlFor="resume-input" className="candidate-form-label">
                                        Resume
                                    </label>
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

                            <button
                                type="submit"
                                className="save-btn"
                                disabled={!isFormComplete || addCandidateMutation.isPending}
                            >
                                {addCandidateMutation.isPending ? "Saving..." : "Save"}
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default AddCandidateForm;