import { useState } from "react";

type CheckboxProps = {
  label: string;
};

export default function CustomCheckbox({ label }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="hidden peer"
      />
      <div
        className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-300 
          ${
            checked
              ? "bg-red-500 border-red-500 scale-110 text-white"
              : "border-gray-400"
          }`}
      >
        {checked && "✓"}
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
