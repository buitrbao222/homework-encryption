import { useForm } from 'react-hook-form';
import { decrypt, encrypt, generateKeys } from '../ciphers/RSA';
import CipherLayout from '../components/CipherLayout';

export default function RSAPage() {
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
    const { keysize } = form.getValues();

    if (isNaN(+keysize)) {
      alert('Keysize phải là một số');
      return;
    }

    if (+keysize % 2 !== 0) {
      alert('Keysize phải là một số chẵn');
      return;
    }

    const { publicKey, privateKey } = generateKeys(+keysize);

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
          <input {...form.register('keysize')} placeholder="Nhập độ dài khóa" />

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
