import { useForm } from 'react-hook-form';
import { decrypt, encrypt, generateKeys } from '../ciphers/ElGamal';
import CipherLayout from '../components/CipherLayout';

export default function ElGamalPage() {
  const form = useForm();

  function solve(type) {
    const { publicKey, privateKey, encrypted, decrypted } = form.getValues();

    if (!publicKey || !privateKey) {
      alert('Hãy khởi tạo key');
      return;
    }

    form.setValue(
      type,
      type === 'encrypted'
        ? encrypt(decrypted, publicKey)
        : decrypt(encrypted, privateKey)
    );
  }

  function handleGenerateKeys() {
    const { publicKey, privateKey } = generateKeys();

    form.setValue('publicKey', publicKey);
    form.setValue('privateKey', privateKey);
  }

  return (
    <CipherLayout
      form={form}
      encrypt={() => solve('encrypted')}
      decrypt={() => solve('decrypted')}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <button onClick={handleGenerateKeys}>Khởi tạo cặp khóa</button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label>Khóa công khai</label>
            <textarea {...form.register('publicKey')} disabled />
          </div>

          <div className="flex-1">
            <label>Khóa bí mật</label>
            <textarea {...form.register('privateKey')} disabled />
          </div>
        </div>
      </div>
    </CipherLayout>
  );
}
