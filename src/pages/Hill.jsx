import { useForm } from 'react-hook-form';
import { calculateHillDeterminant, decrypt, encrypt } from '../ciphers/Hill';
import CipherLayout from '../components/CipherLayout';

export default function HillPage() {
  const form = useForm();

  function solve(type) {
    const { key, encrypted, decrypted } = form.getValues();

    if (key.length !== 9) {
      alert('Khóa phải có độ dài là 9');
      return;
    }

    const determinant = calculateHillDeterminant(key);

    if (determinant === 0 || determinant % 2 === 0 || determinant % 13 === 0) {
      alert('Khóa không hợp lệ');
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
