import FileSVG from './FileSVG';

export default function SymmetricKeyInput(props) {
  const { form } = props;

  const { register, setValue } = form;

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
  );
}
