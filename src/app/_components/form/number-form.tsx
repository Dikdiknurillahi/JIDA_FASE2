interface NumberFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string; 
  value?: number | ''; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberForm: React.FC<NumberFormProps> = ({
  name,
  value,
  onChange,
  id, // Ambil id jika diberikan, atau gunakan name sebagai fallback
  ...rest // Sisa props HTML standar seperti 'required', 'placeholder', 'step', dll.
}) => {
  const inputId = id || `number-input-${name.toLowerCase().replace(/\s/g, '-')}`; // Buat ID unik

  return (
    <div className="mb-4"> {/* Container untuk label dan input number */}
      <label htmlFor={inputId} className="block text-gray-700 text-sm font-bold mb-2">
        {name}
      </label>
      <input
        type="number" // Tipe input adalah 'number'
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...rest} // Meneruskan sisa props ke elemen input
      />
    </div>
  );
};

export default NumberForm;