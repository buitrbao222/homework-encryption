import { useForm } from 'react-hook-form';
import { decrypt, encrypt } from '../ciphers/Caesar';
import CipherLayout from '../components/CipherLayout';

export default function CaesarPage() {
  const form = useForm();

  function solve(type) {
    const { key, encrypted, decrypted } = form.getValues();

    if (isNaN(+key)) {
      alert('Khóa phải là số');
      return;
    }

    form.setValue(
      type,
      type === 'encrypted' ? encrypt(decrypted, +key) : decrypt(encrypted, +key)
    );
  }

  return (
    <CipherLayout
      form={form}
      encrypt={() => solve('encrypted')}
      decrypt={() => solve('decrypted')}
    />
  );
}
