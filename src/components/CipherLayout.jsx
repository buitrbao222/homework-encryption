import SymmetricKeyInput from './SymmetricKeyInput';

// Cipher layout
// Children will be custom key input layout
// If children is not available, basic symmetric key layout will be used
export default function CipherLayout(props) {
  const { form, encrypt, decrypt, children } = props;

  const { register } = form;

  return (
    <div className="flex flex-col gap-4">
      {children || <SymmetricKeyInput form={form} />}

      <div className="flex gap-6">
        <div className="flex-1">
          <label>Bản rõ </label>
          <textarea {...register('decrypted')} />
        </div>

        <div className="flex-1">
          <label>Bản mã </label>
          <textarea {...register('encrypted')} />
        </div>
      </div>

      <div className="flex gap-6 mt-4">
        <button onClick={encrypt}>Mã hóa</button>

        <button onClick={decrypt}>Giải mã</button>
      </div>
    </div>
  );
}
