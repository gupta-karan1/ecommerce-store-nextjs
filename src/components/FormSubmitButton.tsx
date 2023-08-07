"use client"; // tells NextJS this function should run on the client
import React, { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom"; // this is a custom hook that we created to get the status of the form. It will return true if the form is pending and false otherwise.

// generally we use interface instead of type for the props but here we need to extend the props of the button so we use type which we cannot achieve with interface.

type FormSubmitButtonProps = {
  children: React.ReactNode; // this will allow whatever we pass as children to be rendered inside the button with the same props as the button

  className?: string; // this will allow us to pass a className prop to the button from outside the component
} & ComponentProps<"button">;
// ComponentProps is a utility type that extracts the props of a component. In this case, we are extracting the props of the button component. It only works with types and not interfaces.

export default function FormSubmitButton(
  {
    children,
    className,
    ...props // this will allow us to pass any other props to the button from outside the component
  }: FormSubmitButtonProps // we are destructuring the props and passing them to the button
) {
  const { pending } = useFormStatus(); // this will give us the status of the form. If the form is pending, it will return true otherwise false.

  return (
    <button
      {...props} // this will pass all the props to the button
      type="submit"
      disabled={pending}
      className={`btn btn-primary ${className}`}
    >
      {children}
      {pending && <span className="loading loading-dots" />}
    </button>
  );
}
