import { useForm } from 'react-hook-form';
import FileSVG from './FileSVG';
import { caesarEncrypt, caesarDecrypt } from './ciphers/caesar';
import {
  substitutionEncrypt,
  substitutionDecrypt,
} from './ciphers/substitution';
import {
  hillEncrypt,
  hillDecrypt,
  calculateHillDeterminant,
} from './ciphers/hill';
import { vigenereEncrypt, vigenereDecrypt } from './ciphers/vigenere';
import { affineEncrypt, affineDecrypt } from './ciphers/affine';

const ciphers = ['caesar', 'substitution', 'affine', 'vigenere', 'hill'];

const functions = {
  encrypt: {
    caesar: caesarEncrypt,
    substitution: substitutionEncrypt,
    hill: hillEncrypt,
    vigenere: vigenereEncrypt,
    affine: affineEncrypt,
  },
  decrypt: {
    caesar: caesarDecrypt,
    substitution: substitutionDecrypt,
    hill: hillDecrypt,
    vigenere: vigenereDecrypt,
    affine: affineDecrypt,
  },
};

function App() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      cipher: 'caesar',
    },
  });

  const cipher = watch('cipher');

  function solve(outputType, data) {
    let key = data.key;
    let a = data.a;
    let b = data.b;

    // Validate and clean input data
    if (cipher === 'caesar') {
      if (isNaN(+key)) {
        alert('Khóa phải là số');
        return;
      }

      key = +key;
    } else if (cipher === 'affine') {
      if (isNaN(+a)) {
        alert('a phải là số');
        return;
      }

      a = +a;

      if (isNaN(+b)) {
        alert('b phải là số');
        return;
      }

      b = +b;
    } else if (cipher === 'hill') {
      if (key.length !== 9) {
        alert('Khóa phải có độ dài là 9');
        return;
      }

      const determinant = calculateHillDeterminant(key);

      if (
        determinant === 0 ||
        determinant % 2 === 0 ||
        determinant % 13 === 0
      ) {
        alert('Khóa không hợp lệ');
        return;
      }
    } else if (cipher === 'substitution') {
      if (key.length !== 26) {
        alert('Khóa phải có độ dài là 26');
        return;
      }
    }

    // Solve
    let result;
    const inputType = outputType === 'encrypt' ? 'decrypted' : 'encrypted';
    const inputData = data[inputType];

    if (cipher === 'affine') {
      result = functions[outputType][cipher](inputData, a, b, 26);
    } else {
      result = functions[outputType][cipher](inputData, key);
    }

    setValue(outputType + 'ed', result);
  }

  const encryptSubmit = handleSubmit(data => {
    solve('encrypt', data);
  });

  const decryptSubmit = handleSubmit(data => {
    solve('decrypt', data);
  });

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
    <div className="flex flex-col gap-4 p-10">
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

          <div className="flex items-center gap-4">
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
