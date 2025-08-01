// Definisikan interface untuk setiap opsi
interface SelectOption {
  id: number;
  name: string;
}

// Definisikan props untuk komponen SelectInput
interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string; // Teks yang akan ditampilkan di atas select box
  name: string; // Nama untuk atribut 'name' pada elemen select
  option: SelectOption[]; // Array opsi yang akan ditampilkan
  value?: string | number; // Nilai yang saat ini dipilih (string atau number)
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Event handler saat nilai berubah
  placeholder?: string; // Teks placeholder untuk opsi default
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  option,
  value,
  onChange,
  placeholder = "Pilih...", // Placeholder default
  ...rest // Sisa props HTML standar seperti 'required', 'disabled', dll.
}) => {
  return (
    <div className="mb-4"> {/* Container untuk label dan select box */}
      <label htmlFor={label} className="block text-gray-700 text-sm font-bold mb-2">
        {name} {/* Menampilkan 'name' sebagai label utama */}
      </label>
      <select
        id={label} // Gunakan 'label' sebagai id untuk htmlFor
        name={name}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...rest} // Meneruskan sisa props ke elemen select
      >
        {/* Opsi placeholder */}
        <option value="" disabled>{placeholder}</option>
        
        {/* Render setiap opsi dari array 'option' */}
        {option.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { SelectInput};