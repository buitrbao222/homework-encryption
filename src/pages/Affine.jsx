import { useForm } from 'react-hook-form';
import CipherLayout from '../components/CipherLayout';
import { encrypt, decrypt } from '../ciphers/Affine';

export default function AffinePage() {
  const form = useForm();

  const { getValues, setValue, register } = form;

  function solve(type) {
    const { a, b, encrypted, decrypted } = getValues();

    if (isNaN(+a)) {
      alert('a phải là số');
      return;
    }

    if (isNaN(+b)) {
      alert('b phải là số');
      return;
    }

    setValue(
      type,
      type === 'encrypted' ? encrypt(decrypted, a, b) : decrypt(encrypted, a, b)
    );
  }

  return (
    <CipherLayout
      form={form}
      encrypt={() => solve('encrypted')}
      decrypt={() => solve('decrypted')}
    >
      <div className="flex gap-4">
        <div>
          <label>a</label>
          <input {...register('a')} />
        </div>

        <div>
          <label>b</label>
          <input {...register('b')} />
        </div>
      </div>
    </CipherLayout>
  );
}
