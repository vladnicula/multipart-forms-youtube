import { Control, Controller } from "react-hook-form"
import { DatePicker } from "antd"
import dayjs from "dayjs"

interface RHFDatePickerFieldProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
}

export const RHFDatePickerField = (props: RHFDatePickerFieldProps) => {
    return (
        <Controller
            control={props.control}
            name={props.name}
            render={({ field, fieldState }) => {
                return (
                    <>
                        <DatePicker
                            placeholder={props.placeholder}
                            status={fieldState.error ? "error" : undefined}
                            ref={field.ref}
                            name={field.name}
                            onBlur={field.onBlur}
                            value={field.value && field.value > 0 ? dayjs(field.value) : null}
                            onChange={(date) => {
                                field.onChange(date ? date.valueOf() : -1)
                            }}
                        />
                        <br />
                        {fieldState.error ? (
                            <span style={{ color: "red" }}>{fieldState.error?.message}</span>
                        ) : null}
                    </>
                )
            }}
        />
    )
}
