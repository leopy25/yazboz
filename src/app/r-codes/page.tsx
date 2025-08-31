'use client';

import { useState, useEffect } from 'react';
import React from 'react';

// C-kodları ve disiplinleri içeren liste
const C_CODE_DISCIPLINES = [
    { code: 'C1000000', discipline: 'Humanities' },
    { code: 'C1100000', discipline: 'Performing arts' },
    { code: 'C1200000', discipline: 'Visual arts' },
    { code: 'C1300000', discipline: 'History' },
    { code: 'C1301000', discipline: 'African history' },
    { code: 'C1302000', discipline: 'American history' },
    { code: 'C1303000', discipline: 'Ancient history' },
    { code: 'C1303001', discipline: 'Ancient Egypt' },
    { code: 'C1303002', discipline: 'Carthage' },
    { code: 'C1303003', discipline: 'Ancient Greek history' },
    { code: 'C1303004', discipline: 'Ancient Roman history' },
    { code: 'C1303005', discipline: 'Assyrian Civilization' },
    { code: 'C1303006', discipline: 'Bronze Age Civilizations' },
    { code: 'C1303007', discipline: 'Biblical history' },
    { code: 'C1303008', discipline: 'History of the Indus Valley Civilization' },
    { code: 'C1303009', discipline: 'Preclassic Maya' },
    { code: 'C1303010', discipline: 'History of Mesopotamia' },
    { code: 'C1303011', discipline: 'The Stone Age' },
    { code: 'C1303012', discipline: 'History of the Yangtze civilization' },
    { code: 'C1303013', discipline: 'History of the Yellow River civilization' },
    { code: 'C1304000', discipline: 'Asian history' },
    { code: 'C1304001', discipline: 'Chinese history' },
    { code: 'C1304002', discipline: 'Indian history' },
    { code: 'C1304003', discipline: 'Indonesian history' },
    { code: 'C1304004', discipline: 'Iranian history' },
    { code: 'C1305000', discipline: 'Australian history' },
    { code: 'C1306000', discipline: 'Cultural history' },
    { code: 'C1307000', discipline: 'Ecclesiastical history of the Catholic Church' },
    { code: 'C1308000', discipline: 'Economic history' },
    { code: 'C1309000', discipline: 'Environmental history' },
    { code: 'C1310000', discipline: 'European history' },
    { code: 'C1311000', discipline: 'Intellectual history' },
    { code: 'C1312000', discipline: 'Jewish history' },
    { code: 'C1313000', discipline: 'Latin American history' },
    { code: 'C1314000', discipline: 'Modern history' },
    { code: 'C1315000', discipline: 'Philosophical history' },
    { code: 'C1315001', discipline: 'Ancient philosophy' },
    { code: 'C1315002', discipline: 'Contemporary philosophy' },
    { code: 'C1315003', discipline: 'Medieval philosophy' },
    { code: 'C1315004', discipline: 'Modern philosophy' },
    { code: 'C1316000', discipline: 'Political history' },
    { code: 'C1316001', discipline: 'History of political thought' },
    { code: 'C1317000', discipline: 'Pre-Columbian era history' },
    { code: 'C1318000', discipline: 'Prehistory' },
    { code: 'C1319000', discipline: 'Public history' },
    { code: 'C1320000', discipline: 'Russian history' },
    { code: 'C1321000', discipline: 'Scientific history' },
    { code: 'C1322000', discipline: 'Technological history' },
    { code: 'C1323000', discipline: 'World history' },
    { code: 'C1400000', discipline: 'Languages and literature' },
    { code: 'C1401000', discipline: 'Comics studies' },
    { code: 'C1402000', discipline: 'Comparative literature' },
    { code: 'C1403000', discipline: 'Creative writing' },
    { code: 'C1404000', discipline: 'English literature' },
    { code: 'C1405000', discipline: 'History of literature' },
    { code: 'C1405001', discipline: 'Ancient literature' },
    { code: 'C1405002', discipline: 'Medieval literature' },
    { code: 'C1405003', discipline: 'Post-colonial literature' },
    { code: 'C1405004', discipline: 'Post-modern literature' },
    { code: 'C1406000', discipline: 'Literary theory' },
    { code: 'C1406001', discipline: 'Critical theory' },
    { code: 'C1406002', discipline: 'Literary criticism' },
    { code: 'C1406003', discipline: 'Poetics' },
    { code: 'C1407000', discipline: 'Poetry' },
    { code: 'C1408000', discipline: 'Prose' },
    { code: 'C1408001', discipline: 'Fiction' },
    { code: 'C1408002', discipline: 'Non-fiction' },
    { code: 'C1409000', discipline: 'World literature' },
    { code: 'C1409001', discipline: 'African-American literature' },
    { code: 'C1409002', discipline: 'American literature' },
    { code: 'C1409003', discipline: 'British literature' },
    { code: 'C1500000', discipline: 'Law' },
    { code: 'C1501000', discipline: 'Administrative law' },
    { code: 'C1502000', discipline: 'Canon law' },
    { code: 'C1503000', discipline: 'Civil law' },
    { code: 'C1504000', discipline: 'Comparative law' },
    { code: 'C1505000', discipline: 'Competition law' },
    { code: 'C1506000', discipline: 'Constitutional law' },
    { code: 'C1507000', discipline: 'Criminal law' },
    { code: 'C1508000', discipline: 'Islamic law' },
    { code: 'C1509000', discipline: 'Jewish law' },
    { code: 'C1510000', discipline: 'Jurisprudence' },
    { code: 'C1511000', discipline: 'Legal management (academic discipline)' },
    { code: 'C1512000', discipline: 'Procedural law' },
    { code: 'C1513000', discipline: 'Substantive law' },
    { code: 'C1600000', discipline: 'Philosophy' },
    { code: 'C1601000', discipline: 'Aesthetics' },
    { code: 'C1602000', discipline: 'Applied philosophy' },
    { code: 'C1602001', discipline: 'Philosophy of economics ' },
    { code: 'C1602002', discipline: 'Philosophy of education' },
    { code: 'C1602003', discipline: 'Philosophy of engineering ' },
    { code: 'C1602004', discipline: 'Philosophy of history' },
    { code: 'C1602005', discipline: 'Philosophy of language' },
    { code: 'C1602006', discipline: 'Philosophy of law' },
    { code: 'C1602007', discipline: 'Philosophy of mathematics' },
    { code: 'C1602008', discipline: 'Philosophy of music' },
    { code: 'C1602009', discipline: 'Philosophy of psychology' },
    { code: 'C1602010', discipline: 'Philosophy of religion' },
    { code: 'C1602011', discipline: 'Philosophy of physical sciences' },
    { code: 'C1602012', discipline: 'Philosophy of social science' },
    { code: 'C1602013', discipline: 'Philosophy of technology' },
    { code: 'C1602014', discipline: 'Systems philosophy' },
    { code: 'C1603000', discipline: 'Epistemology' },
    { code: 'C1603001', discipline: 'Justification' },
    { code: 'C1603002', discipline: 'Reasoning errors' },
    { code: 'C1604000', discipline: 'Ethics' },
    { code: 'C1604001', discipline: 'Applied ethics' },
    { code: 'C1604002', discipline: 'Meta-ethics' },
    { code: 'C1604003', discipline: 'Moral psychology, Descriptive ethics, Value theory' },
    { code: 'C1604004', discipline: 'Normative ethics' },
    { code: 'C1605000', discipline: 'Logic' },
    { code: 'C1605001', discipline: 'Mathematical logic' },
    { code: 'C1605002', discipline: 'Philosophical logic' },
    { code: 'C1606000', discipline: 'Meta-philosophy' },
    { code: 'C1607000', discipline: 'Metaphysics' },
    { code: 'C1607001', discipline: 'Philosophy of Action' },
    { code: 'C1607002', discipline: 'Determinism and Free will' },
    { code: 'C1607003', discipline: 'Ontology' },
    { code: 'C1607004', discipline: 'Philosophy of mind' },
    { code: 'C1607005', discipline: 'Philosophy of space and time' },
    { code: 'C1607006', discipline: 'Teleology' },
    { code: 'C1607007', discipline: 'Theism and Atheism' },
    { code: 'C1608000', discipline: 'Philosophical traditions and schools' },
    { code: 'C1608001', discipline: 'African philosophy' },
    { code: 'C1608002', discipline: 'Analytic philosophy' },
    { code: 'C1608003', discipline: 'Aristotelianism' },
    { code: 'C1608004', discipline: 'Continental philosophy' },
    { code: 'C1608005', discipline: 'Eastern philosophy' },
    { code: 'C1608006', discipline: 'Feminist philosophy' },
    { code: 'C1608007', discipline: 'Platonism' },
    { code: 'C1609000', discipline: 'Social philosophy and political philosophy' },
    { code: 'C1609001', discipline: 'Anarchism' },
    { code: 'C1609002', discipline: 'Feminist philosophy' },
    { code: 'C1609003', discipline: 'Libertarianism' },
    { code: 'C1609004', discipline: 'Marxism' },
    { code: 'C1700000', discipline: 'Religious Studies' },
    { code: 'C1701000', discipline: 'History of Religion' },
    { code: 'C1702000', discipline: 'Anthropology of Religion' },
    { code: 'C1703000', discipline: 'Sociology of Religion' },
    { code: 'C1704000', discipline: 'Psychology of Religion' },
    { code: 'C1705000', discipline: 'Phenomenology of Religion' },
    { code: 'C1800000', discipline: 'Divinity' },
    { code: 'C1801000', discipline: 'Canon law' },
    { code: 'C1802000', discipline: 'Church history' },
    { code: 'C1803000', discipline: 'Field ministry' },
    { code: 'C1803001', discipline: 'Pastoral counseling' },
    { code: 'C1803002', discipline: 'Pastoral theology' },
    { code: 'C1803003', discipline: 'Religious education techniques' },
    { code: 'C1803004', discipline: 'Homiletics' },
    { code: 'C1803005', discipline: 'Liturgy' },
    { code: 'C1803006', discipline: 'Sacred music' },
    { code: 'C1803007', discipline: 'Missiology' },
    { code: 'C1804000', discipline: 'Hermeneutics' },
    { code: 'C1805000', discipline: 'Scriptural study and languages' },
    { code: 'C1805001', discipline: 'Biblical Hebrew' },
    { code: 'C1805002', discipline: 'Biblical studies/Sacred scripture' },
    { code: 'C1805003', discipline: 'Vedic Study' },
    { code: 'C1805004', discipline: 'New Testament Greek' },
    { code: 'C1805005', discipline: 'Latin' },
    { code: 'C1805006', discipline: 'Old Church Slavonic' },
    { code: 'C1806000', discipline: 'Theology' },
    { code: 'C1806001', discipline: 'Dogmatic theology' },
    { code: 'C1806002', discipline: 'Ecclesiology' },
    { code: 'C1806003', discipline: 'Sacramental theology' },
    { code: 'C1806004', discipline: 'Systematic theology' },
    { code: 'C1806005', discipline: 'Christian ethics' },
    { code: 'C1806006', discipline: 'Hindu ethics' },
    { code: 'C1806007', discipline: 'Moral theology' },
    { code: 'C1806008', discipline: 'Historical theology' },
    { code: 'C1900000', discipline: 'Theology' },
    { code: 'C1901000', discipline: 'Biblical studies' },
    { code: 'C1901001', discipline: 'Biblical Hebrew, Koine Greek, Aramaic' },
    { code: 'C1902000', discipline: 'Buddhist theology' },
    { code: 'C1902001', discipline: 'Pali Studies' },
    { code: 'C1903000', discipline: 'Christian theology' },
    { code: 'C1903001', discipline: 'Anglican theology' },
    { code: 'C1903002', discipline: 'Baptist theology' },
    { code: 'C1903003', discipline: 'Catholic theology' },
    { code: 'C1903004', discipline: 'Eastern Orthodox theology' },
    { code: 'C1903005', discipline: 'Protestant theology' },
    { code: 'C1904000', discipline: 'Hindu theology' },
    { code: 'C1904001', discipline: 'Sanskrit Studies' },
    { code: 'C1904002', discipline: 'Dravidian Studies' },
    { code: 'C1905000', discipline: 'Jewish theology' },
    { code: 'C1906000', discipline: 'Muslim theology ' },
    { code: 'C1906001', discipline: 'Arabic Studies' },
    { code: 'C2000000', discipline: ' Social science' },
    { code: 'C2100000', discipline: 'Anthropology' },
    { code: 'C2101000', discipline: 'Biological anthropology' },
    { code: 'C2102000', discipline: 'Linguistic anthropology' },
    { code: 'C2103000', discipline: 'Cultural anthropology' },
    { code: 'C2104000', discipline: 'Social anthropology' },
    { code: 'C2105000', discipline: 'Palaeoanthropology' },
    { code: 'C2200000', discipline: 'Archaeology' },
    { code: 'C2201000', discipline: 'Biocultural anthropology' },
    { code: 'C2202000', discipline: 'Evolutionary anthropology' },
    { code: 'C2203000', discipline: 'Feminist archaeology' },
    { code: 'C2204000', discipline: 'Forensic anthropology' },
    { code: 'C2205000', discipline: 'Maritime archaeology' },
    { code: 'C2300000', discipline: 'Economics' },
    { code: 'C2301000', discipline: 'Agricultural economics' },
    { code: 'C2302000', discipline: 'Anarchist economics' },
    { code: 'C2303000', discipline: 'Applied economics' },
    { code: 'C2304000', discipline: 'Behavioural economics' },
    { code: 'C2305000', discipline: 'Bioeconomics' },
    { code: 'C2306000', discipline: 'Complexity economics' },
    { code: 'C2307000', discipline: 'Computational economics' },
    { code: 'C2308000', discipline: 'Consumer economics' },
    { code: 'C2309000', discipline: 'Development economics' },
    { code: 'C2310000', discipline: 'Ecological economics' },
    { code: 'C2311000', discipline: 'Econometrics' },
    { code: 'C2312000', discipline: 'Economic geography' },
    { code: 'C2313000', discipline: 'Economic sociology' },
    { code: 'C2314000', discipline: 'Economic systems' },
    { code: 'C2315000', discipline: 'Education economics' },
    { code: 'C2316000', discipline: 'Energy economics' },
    { code: 'C2317000', discipline: 'Entrepreneurial economics' },
    { code: 'C2318000', discipline: 'Environmental economics' },
    { code: 'C2319000', discipline: 'Evolutionary economics' },
    { code: 'C2320000', discipline: 'Experimental economics' },
    { code: 'C2321000', discipline: 'Feminist economics' },
    { code: 'C2322000', discipline: 'Financial econometrics' },
    { code: 'C2323000', discipline: 'Financial economics' },
    { code: 'C2324000', discipline: 'Green economics' },
    { code: 'C2325000', discipline: 'Growth economics' },
    { code: 'C2326000', discipline: 'Human development theory' },
    { code: 'C2327000', discipline: 'Industrial organization' },
    { code: 'C2328000', discipline: 'Information economics' },
    { code: 'C2329000', discipline: 'Institutional economics' },
    { code: 'C2330000', discipline: 'International economics' },
    { code: 'C2331000', discipline: 'Islamic economics' },
    { code: 'C2332000', discipline: 'Labor economics' },
    { code: 'C2333000', discipline: 'Health economics' },
    { code: 'C2334000', discipline: 'Law and economics' },
    { code: 'C2335000', discipline: 'Macroeconomics' },
    { code: 'C2336000', discipline: 'Managerial economics' },
    { code: 'C2337000', discipline: 'Marxian economics' },
    { code: 'C2338000', discipline: 'Mathematical economics' },
    { code: 'C2339000', discipline: 'Microeconomics' },
    { code: 'C2340000', discipline: 'Monetary economics' },
    { code: 'C2341000', discipline: 'Neuroeconomics' },
    { code: 'C2342000', discipline: 'Participatory economics' },
    { code: 'C2343000', discipline: 'Political economy' },
    { code: 'C2344000', discipline: 'Public economics' },
    { code: 'C2345000', discipline: 'Public finance' },
    { code: 'C2346000', discipline: 'Real estate economics' },
    { code: 'C2347000', discipline: 'Resource economics' },
    { code: 'C2348000', discipline: 'Social choice theory' },
    { code: 'C2349000', discipline: 'Socialist economics' },
    { code: 'C2350000', discipline: 'Socioeconomics' },
    { code: 'C2351000', discipline: 'Transport economics' },
    { code: 'C2352000', discipline: 'Welfare economics' },
    { code: 'C2400000', discipline: 'Geography' },
    { code: 'C2401000', discipline: 'Physical geography' },
    { code: 'C2401001', discipline: 'Atmology' },
    { code: 'C2401002', discipline: 'Biogeography' },
    { code: 'C2401003', discipline: 'Climatology' },
    { code: 'C2401004', discipline: 'Coastal geography' },
    { code: 'C2401005', discipline: 'Emergency management' },
    { code: 'C2401006', discipline: 'Environmental geography' },
    { code: 'C2401007', discipline: 'Geobiology' },
    { code: 'C2401008', discipline: 'Geochemistry' },
    { code: 'C2401009', discipline: 'Geology' },
    { code: 'C2401010', discipline: 'Geomatics' },
    { code: 'C2401011', discipline: 'Geomorphology' },
    { code: 'C2401012', discipline: 'Geophysics' },
    { code: 'C2401013', discipline: 'Glaciology' },
    { code: 'C2401014', discipline: 'Hydrology' },
    { code: 'C2401015', discipline: 'Landscape ecology' },
    { code: 'C2401016', discipline: 'Lithology' },
    { code: 'C2401017', discipline: 'Meteorology' },
    { code: 'C2401018', discipline: 'Mineralogy' },
    { code: 'C2401019', discipline: 'Oceanography' },
    { code: 'C2401020', discipline: 'Palaeogeography' },
    { code: 'C2401021', discipline: 'Palaeontology' },
    { code: 'C2401022', discipline: 'Petrology' },
    { code: 'C2401023', discipline: 'Quaternary science' },
    { code: 'C2401024', discipline: 'Soil geography' },
    { code: 'C2402000', discipline: 'Human geography' },
    { code: 'C2402001', discipline: 'Behavioural geography' },
    { code: 'C2402002', discipline: 'Cognitive geography' },
    { code: 'C2402003', discipline: 'Cultural geography' },
    { code: 'C2402004', discipline: 'Development geography' },
    { code: 'C2402005', discipline: 'Economic geography' },
    { code: 'C2402006', discipline: 'Health geography' },
    { code: 'C2402007', discipline: 'Historical geography' },
    { code: 'C2402008', discipline: 'Language geography' },
    { code: 'C2402009', discipline: 'Mathematical geography' },
    { code: 'C2402010', discipline: 'Marketing geography' },
    { code: 'C2402011', discipline: 'Military geography' },
    { code: 'C2402012', discipline: 'Political geography' },
    { code: 'C2402013', discipline: 'Population geography' },
    { code: 'C2402014', discipline: 'Religion geography' },
    { code: 'C2402015', discipline: 'Social geography' },
    { code: 'C2402016', discipline: 'Strategic geography' },
    { code: 'C2402017', discipline: 'Time geography' },
    { code: 'C2402018', discipline: 'Tourism geography' },
    { code: 'C2402019', discipline: 'Transport geography' },
    { code: 'C2402020', discipline: 'Urban geography' },
    { code: 'C2403000', discipline: 'Integrated geography' },
    { code: 'C2404000', discipline: 'Cartography' },
    { code: 'C2404001', discipline: 'Celestial cartography' },
    { code: 'C2404002', discipline: 'Planetary cartography' },
    { code: 'C2404003', discipline: 'Topography' },
    { code: 'C2500000', discipline: 'Linguistics' },
    { code: 'C2501000', discipline: 'Applied linguistics' },
    { code: 'C2502000', discipline: 'Composition studies' },
    { code: 'C2503000', discipline: 'Computational linguistics' },
    { code: 'C2504000', discipline: 'Discourse analysis' },
    { code: 'C2505000', discipline: 'English studies' },
    { code: 'C2506000', discipline: 'Etymology' },
    { code: 'C2507000', discipline: 'Grammar' },
    { code: 'C2508000', discipline: 'Grammatology' },
    { code: 'C2509000', discipline: 'Historical linguistics' },
    { code: 'C2510000', discipline: 'History of linguistics' },
    { code: 'C2511000', discipline: 'Interlinguistics' },
    { code: 'C2512000', discipline: 'Lexicology' },
    { code: 'C2513000', discipline: 'Linguistic typology' },
    { code: 'C2514000', discipline: 'Morphology (linguistics)' },
    { code: 'C2515000', discipline: 'Natural language processing' },
    { code: 'C2516000', discipline: 'Philology' },
    { code: 'C2517000', discipline: 'Phonetics' },
    { code: 'C2518000', discipline: 'Phonology' },
    { code: 'C2519000', discipline: 'Pragmatics' },
    { code: 'C2520000', discipline: 'Psycholinguistics' },
    { code: 'C2521000', discipline: 'Rhetoric' },
    { code: 'C2522000', discipline: 'Semantics' },
    { code: 'C2523000', discipline: 'Semiotics' },
    { code: 'C2524000', discipline: 'Sociolinguistics' },
    { code: 'C2525000', discipline: 'Syntax' },
    { code: 'C2526000', discipline: 'Usage' },
    { code: 'C2527000', discipline: 'Word usage' },
    { code: 'C2600000', discipline: 'Political science' },
    { code: 'C2601000', discipline: 'American politics' },
    { code: 'C2602000', discipline: 'Canadian politics' },
    { code: 'C2603000', discipline: 'Civics' },
    { code: 'C2604000', discipline: 'Comparative politics' },
    { code: 'C2605000', discipline: 'European studies' },
    { code: 'C2606000', discipline: 'Geopolitics (Political geography)' },
    { code: 'C2607000', discipline: 'International relations' },
    { code: 'C2608000', discipline: 'International organizations' },
    { code: 'C2609000', discipline: 'Nationalism studies' },
    { code: 'C2610000', discipline: 'Peace and conflict studies' },
    { code: 'C2611000', discipline: 'Policy studies' },
    { code: 'C2612000', discipline: 'Political behavior' },
    { code: 'C2613000', discipline: 'Political culture' },
    { code: 'C2614000', discipline: 'Political economy' },
    { code: 'C2615000', discipline: 'Political history' },
    { code: 'C2616000', discipline: 'Political philosophy' },
    { code: 'C2617000', discipline: 'Public administration' },
    { code: 'C2618000', discipline: 'Public law' },
    { code: 'C2619000', discipline: 'Psephology' },
    { code: 'C2620000', discipline: 'Social choice theory' },
    { code: 'C2621000', discipline: 'Singapore politics' },
    { code: 'C2700000', discipline: 'Psychology' },
    { code: 'C2800000', discipline: 'Sociology' },
    { code: 'C2900000', discipline: 'Social work' },
    { code: 'C3000000', discipline: 'Natural science' },
    { code: 'C3100000', discipline: 'Biology' },
    { code: 'C3200000', discipline: 'Chemistry' },
    { code: 'C3300000', discipline: 'Earth science' },
    { code: 'C3400000', discipline: 'Astronomy' },
    { code: 'C3500000', discipline: 'Physics' },
    { code: 'C4000000', discipline: 'Formal science' },
    { code: 'C4100000', discipline: 'Computer science' },
    { code: 'C4200000', discipline: 'Mathematics' },
    { code: 'C5000000', discipline: 'Applied science' }
];

type Note = {
  id: string;
  type: string;
  rKod: string;
  cKod: string;
  fKod: string;
  kaynakAdı?: string;
  yazar?: string;
  metin: string;
  sayfa?: string;
  anahtarKelimeler: string[];
};

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sourceType, setSourceType] = useState('Kitap');
  const [newNote, setNewNote] = useState({
    rKod: '', cKod: '', fKod: '', metin: '', sayfa: '', anahtarKelimeler: '',
    kitap: { eserAdı: '', yazar: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '' },
    kitapBölümü: { eserAdı: '', editör: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '', bölümAdı: '', bölümYazarı: '', sayfaAralığı: '' },
    makale: { makaleAdı: '', yazar: '', yayınlandığıDergi: '', yayınYılı: '', sayfaAralığı: '', doi: '' }
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    if (res.ok) {
      setNotes(data);
    } else {
      console.error('Notlar yüklenirken bir hata oluştu');
    }
  };

  const handleDelete = async (noteId: string) => {
    const res = await fetch('/api/notes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: noteId }),
    });

    if (res.ok) {
      alert('Not başarıyla silindi!');
      fetchNotes();
    } else {
      alert('Silme hatası!');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let specificSourceData = {};
    if (sourceType === 'Kitap') {
        specificSourceData = newNote.kitap;
    } else if (sourceType === 'KitapBölümü') {
        specificSourceData = newNote.kitapBölümü;
    } else if (sourceType === 'Makale') {
        specificSourceData = newNote.makale;
    }

    const noteData = {
        type: sourceType,
        rKod: newNote.rKod,
        cKod: newNote.cKod,
        fKod: newNote.fKod,
        metin: newNote.metin,
        anahtarKelimeler: newNote.anahtarKelimeler.split(',').map(kw => kw.trim()),
        ...specificSourceData
    };

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    if (res.ok) {
      alert('Not başarıyla kaydedildi!');
      setNewNote({
        rKod: '', cKod: '', fKod: '', metin: '', sayfa: '', anahtarKelimeler: '',
        kitap: { eserAdı: '', yazar: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '' },
        kitapBölümü: { eserAdı: '', editör: '', basımYılı: '', yayınevi: '', basıldığıYer: '', isbn: '', bölümAdı: '', bölümYazarı: '', sayfaAralığı: '' },
        makale: { makaleAdı: '', yazar: '', yayınlandığıDergi: '', yayınYılı: '', sayfaAralığı: '', doi: '' }
      });
      fetchNotes();
    } else {
      alert('Kaydetme hatası!');
    }
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceType(e.target.value);
  };

  const handleFieldChange = (source: string, field: string, value: string) => {
    if (source === 'genel') {
      setNewNote(prev => ({ ...prev, [field]: value }));
    } else {
      setNewNote(prev => ({
        ...prev,
        [source]: {
          ...prev[source as keyof typeof prev],
          [field]: value
        }
      }));
    }
  };

  return (
    <div className="container">
      <h1>Zettelkasten Dashboard</h1>

      {/* Kaynak Tipi Seçimi */}
      <div>
        <label>Kaynak Tipi:</label>
        <select value={sourceType} onChange={handleSourceChange}>
          <option value="Kitap">Kitap</option>
          <option value="KitapBölümü">Kitap Bölümü</option>
          <option value="Makale">Bilimsel Makale</option>
        </select>
      </div>

      {/* Not Ekleme Formu */}
      <form onSubmit={handleSubmit}>
        
        {/* Ortak Alanlar */}
        <h2>Genel Bilgiler</h2>
        <input type="text" placeholder="R-kod (Boş bırakırsanız otomatik atanır)" value={newNote.rKod} onChange={e => handleFieldChange('genel', 'rKod', e.target.value)} />
        
        <div>
          <label>C-kod:</label>
          <select value={newNote.cKod} onChange={e => handleFieldChange('genel', 'cKod', e.target.value)}>
            <option value="">C-kod Seçin...</option>
            {C_CODE_DISCIPLINES.map(item => (
              <option key={item.code} value={item.code}>
                {item.code} - {item.discipline}
              </option>
            ))}
          </select>
        </div>

        <input type="text" placeholder="F-kod" value={newNote.fKod} onChange={e => handleFieldChange('genel', 'fKod', e.target.value)} />
        <textarea placeholder="Alıntı Metni" value={newNote.metin} onChange={e => handleFieldChange('genel', 'metin', e.target.value)} />
        <input type="text" placeholder="Sayfa Aralığı" value={newNote.sayfa} onChange={e => handleFieldChange('genel', 'sayfa', e.target.value)} />
        <input type="text" placeholder="Anahtar Kelimeler (virgülle ayırın)" value={newNote.anahtarKelimeler} onChange={e => handleFieldChange('genel', 'anahtarKelimeler', e.target.value)} />
        
        {/* Kaynak Tipine Göre Alanlar */}
        {sourceType === 'Kitap' && (
          <div>
            <h2>Kitap Bilgileri</h2>
            <input type="text" placeholder="Eser Adı" value={newNote.kitap.eserAdı} onChange={e => handleFieldChange('kitap', 'eserAdı', e.target.value)} />
            <input type="text" placeholder="Yazar Ad-Soyad" value={newNote.kitap.yazar} onChange={e => handleFieldChange('kitap', 'yazar', e.target.value)} />
            <input type="text" placeholder="Basım Yılı" value={newNote.kitap.basımYılı} onChange={e => handleFieldChange('kitap', 'basımYılı', e.target.value)} />
            <input type="text" placeholder="Yayınevi" value={newNote.kitap.yayınevi} onChange={e => handleFieldChange('kitap', 'yayınevi', e.target.value)} />
            <input type="text" placeholder="Basıldığı Yer" value={newNote.kitap.basıldığıYer} onChange={e => handleFieldChange('kitap', 'basıldığıYer', e.target.value)} />
            <input type="text" placeholder="ISBN" value={newNote.kitap.isbn} onChange={e => handleFieldChange('kitap', 'isbn', e.target.value)} />
          </div>
        )}

        {sourceType === 'KitapBölümü' && (
          <div>
            <h2>Kitap Bölümü Bilgileri</h2>
            <input type="text" placeholder="Eser Adı" value={newNote.kitapBölümü.eserAdı} onChange={e => handleFieldChange('kitapBölümü', 'eserAdı', e.target.value)} />
            <input type="text" placeholder="Editör(ler) Ad Soyad" value={newNote.kitapBölümü.editör} onChange={e => handleFieldChange('kitapBölümü', 'editör', e.target.value)} />
            <input type="text" placeholder="Basım Yılı" value={newNote.kitapBölümü.basımYılı} onChange={e => handleFieldChange('kitapBölümü', 'basımYılı', e.target.value)} />
            <input type="text" placeholder="Yayınevi" value={newNote.kitapBölümü.yayınevi} onChange={e => handleFieldChange('kitapBölümü', 'yayınevi', e.target.value)} />
            <input type="text" placeholder="Basıldığı Yer" value={newNote.kitapBölümü.basıldığıYer} onChange={e => handleFieldChange('kitapBölümü', 'basıldığıYer', e.target.value)} />
            <input type="text" placeholder="ISBN" value={newNote.kitapBölümü.isbn} onChange={e => handleFieldChange('kitapBölümü', 'isbn', e.target.value)} />
            <input type="text" placeholder="Bölüm Adı" value={newNote.kitapBölümü.bölümAdı} onChange={e => handleFieldChange('kitapBölümü', 'bölümAdı', e.target.value)} />
            <input type="text" placeholder="Bölüm Yazarı Ad- Soyad" value={newNote.kitapBölümü.bölümYazarı} onChange={e => handleFieldChange('kitapBölümü', 'bölümYazarı', e.target.value)} />
            <input type="text" placeholder="Sayfa Aralığı" value={newNote.kitapBölümü.sayfaAralığı} onChange={e => handleFieldChange('kitapBölümü', 'sayfaAralığı', e.target.value)} />
          </div>
        )}

        {sourceType === 'Makale' && (
          <div>
            <h2>Bilimsel Makale Bilgileri</h2>
            <input type="text" placeholder="Makale Adı" value={newNote.makale.makaleAdı} onChange={e => handleFieldChange('makale', 'makaleAdı', e.target.value)} />
            <input type="text" placeholder="Yazar Ad-Soyad" value={newNote.makale.yazar} onChange={e => handleFieldChange('makale', 'yazar', e.target.value)} />
            <input type="text" placeholder="Yayınlandığı Dergi" value={newNote.makale.yayınlandığıDergi} onChange={e => handleFieldChange('makale', 'yayınlandığıDergi', e.target.value)} />
            <input type="text" placeholder="Yayın Yılı" value={newNote.makale.yayınYılı} onChange={e => handleFieldChange('makale', 'yayınYılı', e.target.value)} />
            <input type="text" placeholder="Sayfa Aralığı" value={newNote.makale.sayfaAralığı} onChange={e => handleFieldChange('makale', 'sayfaAralığı', e.target.value)} />
            <input type="text" placeholder="DOI" value={newNote.makale.doi} onChange={e => handleFieldChange('makale', 'doi', e.target.value)} />
          </div>
        )}

        <button type="submit">Notu Kaydet</button>
      </form>

      <hr />

      {/* Kayıtlı Notları Gösteren Bölüm */}
      <div>
        <h2>Kayıtlı Notlar</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <button className="delete-button" onClick={() => handleDelete(note.id)}>Sil</button>
              <strong>Kaynak Tipi:</strong> {note.type} <br />
              <strong>R-Kod:</strong> {note.rKod} <br />
              <strong>C-Kod:</strong> {note.cKod} <br />
              <strong>F-Kod:</strong> {note.fKod} <br />
              <strong>Alıntı:</strong> {note.metin} <br />
              <strong>Anahtar Kelimeler:</strong> {note.anahtarKelimeler.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}