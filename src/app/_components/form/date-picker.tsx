// Definisikan props untuk komponen DatePicker
interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string; // Teks yang akan ditampilkan sebagai label (opsional, karena tanggal kadang tidak butuh label eksplisit)
  value?: string; // Nilai tanggal saat ini dalam format YYYY-MM-DD
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Event handler saat nilai berubah
}

const DatePicker: React.FC<DatePickerProps> = ({
  name = "Pilih Tanggal", // Default label jika tidak diberikan
  value,
  onChange,
  id, // Ambil id jika diberikan, atau gunakan name sebagai fallback
  ...rest // Sisa props HTML standar seperti 'required', 'min', 'max', dll.
}) => {
  const inputId = id || `date-picker-${name.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className="mb-4"> {/* Container untuk label dan input date */}
      {name && ( // Hanya render label jika 'name' ada
        <label htmlFor={inputId} className="block text-gray-700 text-sm font-bold mb-2">
          {name}
        </label>
      )}
      <input
        type="date" // Tipe input adalah 'date'
        id={inputId}
        name={name}
        value={value} // Nilai dalam format YYYY-MM-DD
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...rest} // Meneruskan sisa props ke elemen input
      />
    </div>
  );
};

export default DatePicker;