import { NumberBox, TextBox } from 'shared/components/forms';
import SelectAddressType from 'features/components/SelectAddressType';
import SelectDistrict from 'features/components/SelectDistrict';
import SelectDivision from 'features/components/SelectDivision';
import SelectState from 'features/components/SelectState';
import SelectTehsil from 'features/components/SelectTehsil';
import { FormCard, FormGrid } from 'shared/new-components';
import type { ApplicationFormData } from '../types';

interface AddressInfoStepProps {
  register: (key: keyof ApplicationFormData) => any;
}

export default function AddressInfoStep({ register }: AddressInfoStepProps) {
  return (
    <FormCard title="Address Details" icon="map-marker">
      <FormGrid columns={3}>
        <SelectAddressType {...register('addressType')} required />
        <TextBox
          label="Country"
          placeholder="Enter Country"
          {...register('country')}
          maxLength={20}
          required
        />
        <SelectState {...register('state')} required />
        <SelectDivision {...register('division')} required />
        <SelectDistrict {...register('district')} required />
        <SelectTehsil {...register('tehsil')} required />
        <TextBox
          label="Block"
          placeholder="Enter Block"
          {...register('block')}
          maxLength={20}
          required
        />
        <TextBox
          label="Address Line 1"
          placeholder="Enter Address Line 1"
          {...register('addressLine1')}
          maxLength={150}
          required
        />
        <TextBox
          label="Address Line 2"
          placeholder="Enter Address Line 2"
          {...register('addressLine2')}
          maxLength={150}
          required
        />
        <TextBox
          label="Landmark"
          placeholder="Enter Landmark"
          {...register('landmark')}
          maxLength={40}
          required
        />
        <NumberBox
          label="Zipcode"
          placeholder="Enter Zipcode"
          {...register('zipcode')}
          useGrouping={false}
          required
        />
      </FormGrid>
    </FormCard>
  );
}
