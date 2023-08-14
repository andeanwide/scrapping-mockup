import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { ParagraphText } from '../..';
import { statusOrder, statusOrderArray } from '@/types';
import { FormikErrors } from 'formik';

interface radioGroupProps {
  options: statusOrderArray;
  // eslint-disable-next-line no-unused-vars
  onChange: (status: statusOrder) => Promise<void> | Promise<FormikErrors<{ orderStatus: string }>>;
  name: string;
  errors: string | undefined;
  text: string;
}

export const RadioGroupComponent = ({ options, onChange, name, errors, text }: radioGroupProps) => {
  const [selected, setSelected] = useState<statusOrder | object | undefined>({});

  const handleChangeOption = (option: statusOrder) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <div className={`w-full px-4 py-4 ${errors && 'rounded-lg border border-cyan-600'}`}>
      <div className='mx-auto w-full max-w-md'>
        <RadioGroup value={selected} onChange={handleChangeOption} name={name}>
          <RadioGroup.Label>
            <ParagraphText text={text} extraClass='pb-2' />
          </RadioGroup.Label>
          <div className='space-y-2'>
            {options?.map((option: statusOrder) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) => {
                  return `${active ? 'ring-white dark:ring-gray-600' : ''}
                    ${checked ? 'bg-color-primary text-white' : 'bg-white dark:bg-transparent'}
                      relative flex cursor-pointer rounded-lg border px-5 py-4 focus:outline-none dark:border-color-primary`;
                }}
              >
                {({ /* active, */ checked }) => (
                  <>
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='text-sm'>
                          <RadioGroup.Label
                            as='p'
                            className={`font-medium  ${
                              checked
                                ? 'font-extrabold text-white'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                          {/* <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {option.ram}/{option.cpus}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{option.disk}</span>
                          </RadioGroup.Description> */}
                        </div>
                      </div>
                      {checked && (
                        <div className='shrink-0 text-white'>
                          <CheckIcon className='h-6 w-6' />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {errors && <span className='text-sm text-red-400'>{errors}</span>}
      </div>
    </div>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
      <path
        d='M7 13l3 3 7-7'
        stroke='#fff'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
