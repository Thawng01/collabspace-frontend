import { Button } from "../ui/button";

const CustomButton = ({
  label,
  disabled,
  type = "button",
  onClick,
  Icon,
  style,
}: {
  label: string;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
  Icon?: any;
  style?: string;
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        "bg-gradient-to-r from-blue-400 to-purple-600 text-white hover:from-blue-500 hover:to-purple-700" +
        (style ? " " + style : "")
      }
    >
      {Icon && <Icon size={20} />}
      {label}
    </Button>
  );
};

export default CustomButton;
