import React from "react";

function Alert(props) {
    const captalize = (word) => {
        if (word === "danger") {
          word = "error "
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      };
  return (
    <>
    <div className="h-16 sticky  top-16">
      {props.alert && (
        <div
          className={`mb-4 rounded-lg bg-${props.alert.type}-200 px-6 py-5 text-base text-${props.alert.type}-700`}
          role="alert"
        >
          <strong>
            {captalize(props.alert.type)}:{props.alert.msg}
          </strong>
        </div>
      )}
      </div>
    </>
  );
}

export default Alert;
