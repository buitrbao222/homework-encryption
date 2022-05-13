import { useForm } from 'react-hook-form';
import { decrypt, encrypt } from '../ciphers/Vigenere';
import CipherLayout from '../components/CipherLayout';

export default function VigenerePage() {
  const form = useForm();

  function solve(type) {
    const { key, encrypted, decrypted } = form.getValues();

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
