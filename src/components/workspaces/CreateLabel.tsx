import { useState, type ChangeEvent } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import ColorPicker from "../projects/ColorPicker";
import { Label } from "../ui/label";
import CustomButton from "../shared/CustomButton";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import type { Workspace } from "../../types";
import useFetch from "../../hooks/useFetch";
import { usePost } from "../../hooks/usePost";

const CreateLabel = () => {
    const [formData, setFormData] = useState({
        color: "",
        name: "",
    });

    const [selectedWorkspace, setSelectedWorkspace] = useState("");

    const { data: workspaces } = useFetch("/workspaces");
    const { mutate: createLabel, isPending, error } = usePost("/labels");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleColorChange = (color: string) => {
        setFormData((prev) => ({ ...prev, color }));
    };

    const handleSubmit = () => {
        createLabel({
            color: formData.color,
            name: formData.name,
            workspaceId: selectedWorkspace,
        });
    };
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <CustomButton label="Create Label" Icon={Plus} />
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] bg-white border-0">
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-2xl">
                            Create New Label
                        </DialogTitle>
                        <DialogDescription className="text-[gray]">
                            Create label to organize your projects more
                            affectively.
                        </DialogDescription>
                    </DialogHeader>
                    {error && (
                        <p className="text-[red]">{error?.response.data}</p>
                    )}
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <input
                                className="focus:outline-0 focus:ring-1 focus:ring-blue-400 border-1 focus:border-0 rounded-md py-2 px-3"
                                id="name-1"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <ColorPicker
                            value={formData.color}
                            onChange={handleColorChange}
                        />

                        <div className="grid gap-3">
                            <Label htmlFor="role">Workspace</Label>
                            <Select
                                value={selectedWorkspace}
                                onValueChange={(value) =>
                                    setSelectedWorkspace(value)
                                }
                            >
                                <SelectTrigger className="w-full border-1 py-3 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400">
                                    <SelectValue placeholder="Select a workspace" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-300">
                                    <SelectGroup>
                                        {workspaces?.map(
                                            (workspace: Workspace) => (
                                                <SelectItem
                                                    key={workspace.id}
                                                    value={workspace.id}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {workspace.name}
                                                    </div>
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        <CustomButton
                            label={isPending ? "Creating..." : "Create"}
                            type="submit"
                            disabled={isPending}
                            onClick={() => handleSubmit()}
                        />
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default CreateLabel;
