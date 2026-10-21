import React, { useState } from 'react';
import { getCountries, getCountryCallingCode, CountryCode } from 'libphonenumber-js';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

const countryOptions = getCountries()
  .map((code) => ({
    code,
    name: countryNames.of(code) || code,
    callingCode: getCountryCallingCode(code),
    flag: String.fromCodePoint(...Array.from(code, (letter) => letter.charCodeAt(0) + 127397))
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('NG');
  const selectedCountry = countryOptions.find((country) => country.code === countryCode);
  const callingCode = selectedCountry?.callingCode ?? getCountryCallingCode('NG');
  const prefix = `+${callingCode}`;
  const nationalNumber = value.startsWith(prefix)
    ? value.slice(prefix.length).trimStart()
    : value.replace(/^\+\d+\s*/, '');

  const handleCountryChange = (code: CountryCode) => {
    const country = countryOptions.find((option) => option.code === code);
    if (!country) return;

    setCountryCode(code);
    const existingNumber = value.replace(/^\+\d+\s*/, '');
    onChange(existingNumber ? `+${country.callingCode} ${existingNumber}` : '');
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <select
        aria-label="Country and calling code"
        value={countryCode}
        onChange={(event) => {
          const country = countryOptions.find((option) => option.code === event.target.value);
          if (country) handleCountryChange(country.code);
        }}
        className="w-40 shrink-0 px-2.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff5722]"
      >
        {countryOptions.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name} (+{country.callingCode})
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={nationalNumber}
        onChange={(event) => {
          const number = event.target.value;
          onChange(number ? `${prefix} ${number}` : '');
        }}
        placeholder="Enter phone number"
        aria-label="Phone number"
        className="min-w-0 flex-1 px-3.5 py-2.5 bg-[#181c25] border border-white/10 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#ff5722] transition-colors"
      />
    </div>
  );
};
