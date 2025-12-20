import { useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import CustomButton from "../../components/shared/CustomButton";
import { useUpdate } from "../../hooks/useUpdate";
import useFetch from "../../hooks/useFetch";

interface FormData {
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ProfileSetting = () => {
    const [activeTab, setActiveTab] = useState<"profile" | "security">(
        "profile"
    );

    const [errors, setErrors] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState("");
    const { userId } = useParams();
    const { data: user } = useFetch("/users/me");

    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useUpdate(
        `/users/update/${userId}`,
        () => {
            queryClient.invalidateQueries({ queryKey: ["/users/me"] });
        }
    );
    const {
        mutate: updatePassword,
        isPending: updating,
        error: passwordError,
    } = useUpdate(`/users/password/${userId}`, (data) => {
        setSuccessMessage(data);
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            name: "",
            email: "",
        });
    });

    const [formData, setFormData] = useState<FormData>({
        name: user?.name || "",
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validatePasswordForm = (): boolean => {
        const newErrors: any = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Current password is required";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword =
                "Password must be at least 8 characters long";
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name && !formData.email) return;

        mutate({
            name: formData.name || user.name,
            email: formData.email || user.email,
        });
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccessMessage("");

        if (!validatePasswordForm()) return;

        updatePassword({
            password: formData.currentPassword,
            newPassword: formData.newPassword,
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Profile Settings
            </h1>

            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 text-sm">{successMessage}</p>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">
                        {error?.response.data}
                    </p>
                </div>
            )}
            {passwordError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm">
                        {passwordError?.response.data}
                    </p>
                </div>
            )}

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "profile"
                                ? "border-blue-400 text-blue-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Profile Information
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            activeTab === "security"
                                ? "border-blue-500 text-blue-400"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Security
                    </button>
                </nav>
            </div>

            {activeTab === "profile" && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                errors.name
                                    ? "border-red-300"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                errors.email
                                    ? "border-red-300"
                                    : "border-gray-300"
                            }`}
                        />
                    </div>

                    <div className="flex justify-end">
                        <CustomButton
                            label={isPending ? "Updating..." : "Update Profile"}
                            disabled={isPending}
                            type="submit"
                        />
                    </div>
                </form>
            )}

            {activeTab === "security" && (
                <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                        <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                errors.currentPassword
                                    ? "border-red-300"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.currentPassword && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.currentPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                errors.newPassword
                                    ? "border-red-300"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.newPassword && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.newPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                                errors.confirmPassword
                                    ? "border-red-300"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <CustomButton
                            type="submit"
                            disabled={updating}
                            label={
                                updating
                                    ? "Changing Password..."
                                    : "Change Password"
                            }
                        />
                    </div>
                </form>
            )}
        </div>
    );
};

export default ProfileSetting;
