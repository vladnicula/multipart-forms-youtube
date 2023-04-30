import { Checkbox } from "antd"
import { Control, Controller } from "react-hook-form"

interface RHFCheckboxProps {
    control: Control<any>;
    name: string;
    label?: string   
}

export const RHFCheckbox = (props: RHFCheckboxProps) => {
    return (
        <Controller
            control={props.control}
            name={props.name}
            render={({ field, fieldState }) => {
                return (
                    <>
                        <Checkbox 
                            ref={field.ref}
                            name={field.name}
                            checked={field.value}
                            onChange={(ev) => {
                                field.onChange(ev.target.checked)
                            }}>{
                                props.label ?? null
                            }</Checkbox>
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
