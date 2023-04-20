interface FormErrorMessageProps {
  message: string;
}

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return <p className="text-error mt-1">{message}</p>;
};
