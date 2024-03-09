import React from "react";

const Input = (props) => {
  return (
    <div>
      {props?.label ? (
        <label className="inline-block text-sm font-medium dark:text-white mb-1">
          {props.label}
        </label>
      ):null}

      <input
        className="py-2 placeholder:font-sans px-4 pe-12 block w-full border border-gray-600 shadow-sm text-base rounded-lg focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        {...props}
      />
    </div>
  );
};

export default Input;
