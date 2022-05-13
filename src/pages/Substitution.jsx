import { useForm } from 'react-hook-form';
import { decrypt, encrypt } from '../ciphers/Substitution';
import CipherLayout from '../components/CipherLayout';

export default function SubstitutionPage() {
  const form = useForm();

  function solve(type) {
    const { key, encrypted, decrypted } = form.getValues();

    if (key.length !== 26) {
      alert('Khóa phải có độ dài là 26');
      return;
    }

    form.setValue(
      type,
      type === 'encrypted' ? encrypt(decrypted, key) : decrypt(encrypted, key)
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
