import { useWatch } from 'react-hook-form';
import { TextBox, Checkbox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import SelectState from 'features/components/SelectState';
import SelectDistrict from 'features/components/SelectDistrict';
import SelectDivision from 'features/components/SelectDivision';
import SelectTehsil from 'features/components/SelectTehsil';
import SelectBlock from 'features/components/SelectBlock';
import { useEffect, useState } from 'react';

interface AddressInfoStepProps {
  register: any;
  control: any;
  setValue: any;
}

export default function AddressInfoStep({
  register,
  control,
  setValue,
}: AddressInfoStepProps) {
  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const permanentAddress = useWatch({
    control,
    name: 'addresses.0',
  });

  useEffect(() => {
    if (sameAsPermanent && permanentAddress) {
      setValue('addresses.1.addressLine1', permanentAddress.addressLine1);
      setValue('addresses.1.addressLine2', permanentAddress.addressLine2);
      setValue('addresses.1.city', permanentAddress.city);
      setValue('addresses.1.stateId', permanentAddress.stateId);
      setValue('addresses.1.districtId', permanentAddress.districtId);
      setValue('addresses.1.divisionId', permanentAddress.divisionId);
      setValue('addresses.1.tehsilId', permanentAddress.tehsilId);
      setValue('addresses.1.blockId', permanentAddress.blockId);
      setValue('addresses.1.pinCode', permanentAddress.pinCode);
    }
  }, [sameAsPermanent, permanentAddress, setValue]);

  const renderAddressFields = (
    index: number,
    type: string,
    disabled: boolean = false
  ) => (
    <div className="mb-6">
      <h4 className="text-md font-semibold mb-4">{type} Address</h4>
      <FormGrid columns={3}>
        <TextBox
          label="Address Line 1"
          placeholder="House No, Street, etc."
          {...register(`addresses.${index}.addressLine1`)}
          maxLength={250}
          required
          disabled={disabled}
        />
        <TextBox
          label="Address Line 2"
          placeholder="Locality, Area"
          {...register(`addresses.${index}.addressLine2`)}
          maxLength={250}
          disabled={disabled}
        />
        <TextBox
          label="City"
          placeholder="Enter City"
          {...register(`addresses.${index}.city`)}
          maxLength={100}
          required
          disabled={disabled}
        />
        <SelectState
          {...register(`addresses.${index}.stateId`)}
          disabled={disabled}
        />
        <SelectDivision
          {...register(`addresses.${index}.divisionId`)}
          disabled={disabled}
        />
        <SelectDistrict
          {...register(`addresses.${index}.districtId`)}
          disabled={disabled}
        />
        <SelectTehsil
          {...register(`addresses.${index}.tehsilId`)}
          disabled={disabled}
        />
        <SelectBlock
          {...register(`addresses.${index}.blockId`)}
          disabled={disabled}
        />
        <TextBox
          label="PIN Code"
          placeholder="6-digit PIN"
          {...register(`addresses.${index}.pinCode`)}
          maxLength={6}
          disabled={disabled}
        />
      </FormGrid>
    </div>
  );

  return (
    <FormCard title="Address & Emergency Contact" icon="map-pin">
      <div className="flex flex-col gap-6">
        {/* Permanent Address */}
        {renderAddressFields(0, 'Permanent')}

        {/* Checkbox for Same as Permanent */}
        <div className="flex items-center gap-2 px-1">
          <Checkbox
            checked={sameAsPermanent}
            onChange={checked => setSameAsPermanent(checked)}
            label="Current Address is same as Permanent Address"
          />
        </div>

        {/* Current Address */}
        {renderAddressFields(1, 'Current', sameAsPermanent)}

        <hr className="my-4 border-gray-200" />

        <h4 className="text-md font-semibold mb-4">Emergency Contact</h4>
        <FormGrid columns={3}>
          <TextBox
            label="Emergency Contact Number"
            placeholder="Enter 10-digit Number"
            {...register('emergencyPhoneNumber')}
            maxLength={10}
            required
          />
        </FormGrid>
      </div>
    </FormCard>
  );
}
