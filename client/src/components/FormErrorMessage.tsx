import React from 'react';
import {FieldError} from "react-hook-form";
import {MdError} from "react-icons/md";


interface Props {
    error?: FieldError;
}

const FormErrorMessage = ({error}: Props) =>
    (
        error?.message && <div className="flex items-center gap-1 text-red-500 text-sm"><MdError/>{error.message}</div>
    )

export default FormErrorMessage;