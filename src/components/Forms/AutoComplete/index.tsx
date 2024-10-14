import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa6";
import { ErrorMessage } from "../ErrorMessage";
import {
  AutoCompleteContainer,
  EmptyOption,
  Icon,
  InputBox,
  InputCheck,
  InputFilter,
  LabelFilter,
  Option,
  OptionsBox,
  AreaInput,
  Content,
} from "./styles";

export interface OptionData {
  value: string | number | boolean;
  label: string;
}

interface SelectProps {
  options: OptionData[];
  name: string;
  label: string;
  placeholder: string;
  emptyOption?: JSX.Element;
  positionOptionBox?: "top" | "bottom";
  disabled?: boolean;
  onChange?: (value: string | number | boolean) => void;
  keyboardDisabled?: boolean;
}

export function AutoComplete({
  name,
  label,
  options,
  emptyOption,
  placeholder,
  positionOptionBox,
  disabled = false,
  keyboardDisabled = true,
  onChange,
  ...props
}: SelectProps) {
  const { control, formState, watch } = useFormContext() || {};
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>(
    () =>
      options.find(({ value }) => value === formState.defaultValues?.[name])
        ?.label || "",
  );
  const [selectedOption, setSelectedOption] = useState<OptionData | null>(
    () =>
      options.find(({ value }) => value === formState.defaultValues?.[name]) ||
      null,
  );

  const filteredOptions = options.filter((option) =>
    option.label.toUpperCase().includes(filter.toUpperCase()),
  );

  useEffect(() => {
    if (!showOptions) {
      setFilter(selectedOption?.label || "");
    }
  }, [showOptions, selectedOption]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (values[name] === undefined) {
        setFilter("");
        setSelectedOption(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [name, watch]);

  function handleInputFilterBlur() {
    setTimeout(() => {
      if (
        !document.activeElement?.id.startsWith(`autocompleteoption-${name}`)
      ) {
        setShowOptions(false);
      }
    }, 300);
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field, fieldState }) => (
        <Content>
          <AutoCompleteContainer
            data-invalid={fieldState.invalid}
            data-position-option-box={positionOptionBox}
            data-disabled={disabled}
          >
            <InputBox>
              <LabelFilter htmlFor={`autocomplete-${name}-input-filter`}>
                {label}
              </LabelFilter>

              <AreaInput>
                <InputFilter
                  type="text"
                  id={`autocomplete-${name}-input-filter`}
                  value={filter}
                  onChange={({ target }) => setFilter(target.value)}
                  onFocus={() => {
                    if (!disabled) {
                      setFilter("");
                      setShowOptions(true);
                    }
                  }}
                  onBlur={handleInputFilterBlur}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={keyboardDisabled}
                />

                <Icon as={FaChevronDown} />
              </AreaInput>
            </InputBox>

            {!disabled && showOptions && (
              <OptionsBox>
                {filteredOptions.length === 0 && emptyOption !== null ? (
                  <EmptyOption htmlFor="empty-option" className="option">
                    {emptyOption}
                  </EmptyOption>
                ) : (
                  filteredOptions.map((option, index) => (
                    <Option
                      key={index}
                      id={`autocompleteoption-${name}-${option.value}`}
                      htmlFor={`${name}-option-${option.value}`}
                      onClick={() => {
                        setSelectedOption(option);
                        setFilter(option.label);
                        setShowOptions(false);
                        field.onChange(option.value);
                        onChange && onChange(option.value);
                      }}
                    >
                      <InputCheck
                        {...props}
                        id={`${name}-option-${option.value}`}
                        type="radio"
                        value={String(option.value)}
                        defaultChecked={
                          formState.defaultValues?.[name] === option.value
                        }
                      />
                      {option.label}
                    </Option>
                  ))
                )}
              </OptionsBox>
            )}
          </AutoCompleteContainer>

          <ErrorMessage field={name} />
        </Content>
      )}
    />
  );
}
