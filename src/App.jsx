import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import AffinePage from './pages/Affine';
import CaesarPage from './pages/Caesar.jsx';
import SubstitutionPage from './pages/Substitution';
import VigenerePage from './pages/Vigenere';
import HillPage from './pages/Hill';
import ElGamalPage from './pages/ElGamal';
import RSAPage from './pages/RSA';

const CIPHERS = [
  'Caesar',
  'Substitution',
  'Affine',
  'Vigenere',
  'Hill',
  'RSA',
  'ElGamal',
];

export default function App() {
  const navigate = useNavigate();

  const location = useLocation();

  function handleCipherSelect(event) {
    navigate(event.target.value);
  }

  return (
    <div className="flex flex-col gap-4 p-10">
      <div>
        <label>Thuật toán</label>

        <select
          onChange={handleCipherSelect}
          defaultValue={location.pathname.slice(1)}
        >
          {CIPHERS.map(x => (
            <option value={x} key={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/caesar" />} />
        <Route path="/Caesar" element={<CaesarPage />} />
        <Route path="/Substitution" element={<SubstitutionPage />} />
        <Route path="/Affine" element={<AffinePage />} />
        <Route path="/Vigenere" element={<VigenerePage />} />
        <Route path="/Hill" element={<HillPage />} />
        <Route path="/RSA" element={<RSAPage />} />
        <Route path="/ElGamal" element={<ElGamalPage />} />
      </Routes>
    </div>
  );
}
