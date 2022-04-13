import { useForm } from 'react-hook-form';
import FileSVG from './FileSVG';

const ciphers = ['caesar', 'substitution', 'affine', 'vigenere', 'hill'];

function App() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      cipher: 'caesar',
    },
  });

  const cipher = watch('cipher');

  const encryptSubmit = handleSubmit(
    data => {
      const { decrypted, key, a, b } = data;

      if (cipher === 'caesar') {
        if (isNaN(+key)) {
          alert('Khóa phải là số');
          return;
        }
      }

      if (cipher === 'affine') {
        if (isNaN(+a)) {
          alert('a phải là số');
          return;
        }

        if (isNaN(+b)) {
          alert('b phải là số');
          return;
        }
      }

      if (cipher === 'hill') {
        if (key.length !== 9) {
          alert('Khóa phải có độ dài là 9');
          return;
        }
      }

      if (cipher === 'substitution') {
      }

      if (cipher === 'vigenere') {
      }
    },
    error => {
      console.log(error);
    }
  );

  const decryptSubmit = handleSubmit(
    data => {
      console.log('decrypt', data);
    },
    error => {
      console.log(error);
    }
  );

  function handleKeyFileChange(e) {
    const file = e.target.files[0];

    e.target.value = '';

    const extension = file.name.split('.').pop();

    if (extension !== 'txt') {
      alert('Chỉ chấp nhận file .txt');
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      setValue('key', reader.result);
    };

    reader.readAsText(file);
  }

  return (
    <div className="p-10 flex flex-col gap-4">
      <div>
        <label>Thuật toán</label>
        <select {...register('cipher')} className="capitalize">
          {ciphers.map(x => (
            <option value={x} key={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      {cipher === 'affine' ? (
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
      ) : (
        <div>
          <label>Khóa</label>

          <div className="flex gap-4 items-center">
            <input {...register('key')} />

            <label htmlFor="key-file" className="cursor-pointer">
              <FileSVG className="w-4" />
            </label>

            <input
              id="key-file"
              type="file"
              hidden
              onChange={handleKeyFileChange}
            />
          </div>
        </div>
      )}

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
        <button onClick={encryptSubmit}>Mã hóa</button>

        <button onClick={decryptSubmit}>Giải mã</button>
      </div>
    </div>
  );
}

export default App;
