/**
 * КОДЫ ЯНДЕКС.КАРТ — перенесены со старого сайта teremdomstroi.ru.
 * Каждая карта объекта — это iframe Яндекс.Конструктора с сохранённым id (um).
 * Большая карта всех объектов: content/works-map.ts + components/WorksMap.tsx
 */

export interface YandexMapCode {
  /** um-идентификатор конструктора (constructor:<id>) или пустая строка */
  code: string;
}

const EMPTY: YandexMapCode = { code: "" };

/** Карты страницы /contacts — три точки: офис в Москве, офис в СПб, производство в Пестово.
 *  Формат "text=<адрес>&z=<zoom>" — виджет сам находит объект по адресу и ставит метку. */
export const contactMaps = {
  moscow: {
    code: `text=${encodeURIComponent("Москва, 8-я Текстильщиков, 11")}&z=16`,
  },
  spb: {
    code: `text=${encodeURIComponent("Санкт-Петербург, Московский проспект, 97А")}&z=16`,
  },
  pestovo: {
    code: `text=${encodeURIComponent("Пестово, Новгородская область")}&z=12`,
  },
} as const;

/** Карты отдельных объектов: ключ = slug объекта из content/works.ts */
export const workMaps: Record<string, YandexMapCode> = {
  "kondor-1-1": { code: "um:7d17d8425143c2dfcab35db6780c8736dc78384a2aef8806f8c6caf81d2a87d8" },
  "kondor-2-nurma": { code: "um:be6063b05acb04075fed93f2119d14578066368be65372a232ca61e95ee5d07d" },
  "uspeh-1-lomonosov": { code: "um:64a953505a021bf15c6b3eb6a12ef58fa112c9062cbf05459b1ded80e0764d78" },
  "podolsk-shchelkovo": { code: "um:868f6663df0ce4094aff077efc5ef4e6bf4dac9b895d522f7a442ad88d553df8" },
  "lider-2-priozersk-1": { code: "um:f31ed3abe3d457748b9fcb5a8b7cbfbe2b9907e0e876e87589013a027680b80f" },
  "dom-s-balkonom-noginsk": { code: "um:8d46ebdb33fab95409b652e6406fd3a36a3df7f4d8fea0ca8402d22e7dcdcfb1" },
  "solnechnogorsk-d-yadroshino": { code: "um:261a7db611539500cd3a7f28489b8176b0eefae6c63cbbf4afb6ef84c11b445b" },
  "garmoniya-ostrecovo": { code: "um:ffb7060205d377d387d94a527039d88fc5a38c2bc314910d1e1c278df96ca58e" },
  "podolsk-8-8-p-sinyavino": { code: "um:8d11279218f1c36806d378cabcfa7e9331e0fe03faae091b431b73067a2c1018" },
  "dunaj-vsevolozhsk": { code: "um:37ad587b96c0825403ddad0f23768489c8bdb6589ba0c1ef6af1a184051af3ed" },
  "terem-1-larionovo": { code: "um:419f03783f44dc2a4d474acb3ff3cc45bac4fe749561dfb23ed9b97c104f4876" },
  "milan-zlobino": { code: "um:b14360a82eee37ca1ed18a027ebcdec9c25388c72265762ea679d4a8cb6bb889" },
  "lider-5-podolsk": { code: "um:cd5358a04805eb78f7f981e6dc627825c660e4735187e367778076d4b249ca25" },
  "kondor-1derdybininskoe": { code: "um:1d63784739587b8db3360a6032b8fa7cd00094e0057c54ccc0a51b52d969c985" },
  "istra-gruzino": { code: "um:f0071686ef38e95df69750bb30c8e55f086677305a6298dafeb3f6a5481e02a2" },
  "viking-belozerki": { code: "um:f0071686ef38e95df69750bb30c8e55f086677305a6298dafeb3f6a5481e02a2" },
  "podolsk-g-himki": { code: "um:041049624c7a19b83385662fe8d3173f36719197074349aa5344dff85c1fc59b" },
  "terem-1-abramovka": { code: "um:4d3501dd2d8d0c2ecda7eea23e48f391381a8f568a4dbafbbc86359d40df3539" },
  "karkasnyj-dom-vena": { code: "um:23dcbe401688a97a8ff155a90cdc8dcfbbfd372c8588b9f25cce0e18b8098d90" },
  "lider-2-p-bogorodskoe": { code: "um:fc8c84a3571056c3cefb12719601ae1d9984f2f59676cd09dc51f6839519b232" },
  "istra-goro": { code: "um:b8c706d17f71f49de26b81c7b47df7e72ae44abc2c6a20531222402e91216549" },
  "kondor-2-ulyanino": { code: "um:d2bce0c5984e19dd7a2632c25d41f5c553df4be67290c4fa59d8e3bf63899d2c" },
  "dom-6h8": { code: "um:1cbd98279bfa9fa60cc4ebb1d5ba22b76f0a463df9598adfe06d565d88365e3d" },
  "odnoetazhnyj-dom-dmitrov-8h11-5": { code: "um:1520b0113806f24b4def1472ca1ff022b82a3995645570dfeaa8257de36daa65" },
  "uspeh-2-yamok": { code: "um:af05a136be9d3b2e4fd5ac2842ecf8d8030d82de69e7a0826c82be2c4af627df" },
  "garmoniya-6h6-dvornikovo-1": { code: "um:b2bd131cf8dfb7bec9d2dd00a54d3eb12b4794f80e317521111db505a039e1e3" },
  "kondor-1-mga": { code: "um:22e6e001252a20c4b1d2e975280431b1e5016f6f936f8eabf182e14e15c51f91" },
  "bogatyr-hilovo": { code: "um:565a7537a18383a7e4dd924849aa6a7842ffb1cdd0bdde68e99f8af6f83e6cfc" },
  "garmoniya-6h9-privetninskoe": { code: "um:8d02ede53132dccd9ac7835ce3db59797dbddc0a356522b8e833da9ba83c70b5" },
  "uspeh-2-kutino": { code: "um:c370402388f7d9d16c71a8f8bdbc5623e412721d31c97a36f9cc19994e39eec5" },
  "kondor-1-snt-kalinka": { code: "um:4f64847be5c5382b5243a97569570a0071b1c63ff96cfa1d2d91e2e06473c157" },
  "banya-valma-chaplygino": { code: "um:64b263b023b423722a4e0c3ae5eb39c8830499794a263355c2a4fa0f5528fb0d" },
  "terem-2-vyrica": { code: "um:a4084722dcc391a0e2e185cd4dbfe424ea150c4b668d357d90d91b4dc4d4394f" },
  "terem-4-verhnie-oselki": { code: "um:e844ece2413b1bc3077bc4dffe44b0d548cf41706206caa28e6194afb5f44f1e" },
  "riga-toksovo": { code: "um:cc04956b301b204bdd5acc5f92c469ae40b1ba5b5d3aaf1a1f595c07a11291d5" },
  "lider-3-p-dunaj": { code: "um:c5d6d3c6b1bdc13fd73f95f0097d9d4c7a3adba0a10c7b34d8eaebf5cd6dc781" },
  "kondor-1-g-yahroma-dmitrovskij-r-n": { code: "um:4f401a984ec03d401ee9a6d525944fdbe2d435f9ee47d3ab371c3a96ea614376" },
  "garmoniya-6h6-kolomna": { code: "um:ed11644ffdcb08dac402cbbc7d1c0e4465ff4fc494d5034398acb85f0829489b" },
  "terem-1-shapkino": { code: "um:558e90885e3bb274e55719e12644f2a3a3eead203de3416567ab2584be273737" },
  "dachnyj-4-d-kuznecovo-ramenskij-rajon": { code: "um:ed42245fa2d3fd60a70fead20fc57d3c434ba0d6ea312c6bf247dd27f3060818" },
  "kondor-1-yamuga": { code: "um:974d83e879ecec3d79d59ac1197f4e254b51fbc1883d7751a34e5634a4af2f7b" },
  "dom-iz-brusa-100kh150mm": { code: "um:18096fc4ccafadec961c1fec410ceeb6400b3149fa827477c6081a024fbf5f15" },
  "terem-1-ropsha": { code: "um:c79dc9a9abf5d470a555ceec0d0ec187e6a1cd23b741a4e91ac7582850a11a95" },
  "lider-5-2": { code: "um:f144be1752d7156fb49edea200a8c9de5c1f3e45cf03b85643f433d658e9240f" },
  "kondor-1-luhovicy": { code: "um:ff3bd2d84a94c97c48b4505f79686b4cadccbc8552bbf7237e3171a4095055be" },
  "6h9-m-s-verandoj-i-terrasoj-borisovka-1": { code: "um:ec0bf1bfb41d898f79bd41cda7bc543cc6bd85a0046e6b58511990890a1a92ba" },
  "lider-1-taldom": { code: "um:3fbe58a99502d9c945258109ba5836d86e6fa081b4b956c662d440a9fe172249" },
  "uspeh-2-zhupeevo": { code: "um:90e5fc80cf5ff4f2b24e18f73d31aad5eacf526c82944fad342541c06a716255" },
  "zimnij-dom-d-stulovo-noginskij-rajon": { code: "um:9af0cc8a0dadc28ebefe9207992f126b561350f9d25639c19c19d89980fa9ade" },
  "banya-6h6-kuznecy": { code: "um:2ac5d3089e5b22b9ae2d26ac2a890c235a63785aa012c1c0dbe21e7f718fee22" },
  "terem-3-nizino": { code: "um:8dcb51435ffbf30aeea5bba6776fedccd30157c8d432b852d85cb560c1527a51" },
  "riga-tulskaya-obl-d-vasilevo": { code: "um:892e0101c852ad24ba9a15b623449e94caa296f13484b8ec4a91cd8388f857fe" },
  "prestizh-3-1": { code: "um:1034c17f4667b56816f88d3e4838fb8fa9432465fd52990c566da812ea9a5c78" },
  "lider-5-d-lisavino": { code: "um:b6cd4d387d8f59aab9e9892bddf028cc44db55816eed1ae6b371ee4d63b917bd" },
  "kondor-1-d-maloe-konovalovo": { code: "um:3e5c27c4d717a93fb8460f2246c0be1884fcba3029efd7a29aab9d1dd80ac26b" },
  "udachnyj-2-d-kuznecy": { code: "um:c6219058aa9a4c27e0285d0e25e79988632a0a1285d731816014e7b3ad88f02f" },
  "uspeh-1-d-novozhilovo-vladimirskaya-obl": { code: "um:be6a21d9c6bd9359e1165a0d507208eb21a3f1a2397c56b5ec0e7e168de79684" },
  "karkasnaya-banya-snt-dubrovka-stupinskij-r-n": { code: "um:21f9acbd521fe65801861e76c4cd80a4de1d96648662eb0467f8e6bbe4ba7335" },
  "kondor-1-snt-montazhnik-podolskij-r-n": { code: "um:84de1d712ed86c1b0a56ab67e0ee42129f84b622a0513d1cb8c186ed1643d9bc" },
  "mechta-1-g-serebryanye-prudy-moskovskaya-obl": { code: "um:bd13ee5da5389d33b0f472ca99135c90b030b0160e788c7160cb44f066d9fcf2" },
  "terem-4-p-lebyazhe-l-o": { code: "um:0837e3e75fc1d269257216b7e4c0409e70a3eab3e59ebdf9a780ca9feebd48e9" },
  "grinvich-p-kurilovo-solnechnogorsk": { code: "um:c6014b2b97548a9d2aff760686e77abec144f4a3706b5c44b6da5394a9fa761d" },
  "kondor-1-g-lipeck": { code: "um:d396d044c3a339c653eccc17de6da0cb222097cc80868ae7849511d616cac124" },
  "zimnij-dom-p-masha-moskovskaya-obl": { code: "um:cdd06c77300ae30beafa35b03edf8b212eb528a8cfe428e26bf6e337f7f8d534" },
  "vityaz-1-1": { code: "um:3fd813bc211ddf05f512bac8dce3b81e2117910e61d95b150afe907f282aaed6" },
  "lider-5-1": { code: "um:0b304ad96bcd7455da87794ee614d58362046dd2d61f170e426934b94a977a9a" },
  "uspeh-2-d-konakovo-tverskaya-obl": { code: "um:ecfe461a7f8496e787771cedc78802deb99786af41592cda8d67a58721268840" },
  "lider-2-d-kokorevo-vyazemskiy-rayon": { code: "um:cd37f1f8d0aa4872b3f801c7add2d34cfbe485125ea07a4fd86052d1a7bfee5b" },
  "mechta-2-d-gorelovo-mozhayskiy-rayon": { code: "um:5ea1ac81c98ed0112330ac38a7e5ddc729dfeeee7824584632c7f7539c52deca" },
  "milan-d-mironcevo-solnechnogorskij-rajon": { code: "um:1f5cce0bda85488dbb429a11addf1c134439dc1e475c039d7acd3c0b9359e8c0" },
  "mechta-3-d-ermolovo-moskovskaya-oblast": { code: "um:b83ab8e1a633c00e4d6dad0653a75445536ae8c8429ecd1bf9e8c8bddb76cb63" },
  "terem-2-g-zvenigorod": { code: "um:4db1bf1058c89fb6bf13301c30175dd8852ca587b0ed3b6d173eb4ec8d808a03" },
  "dom-lider-1-voronovo-mozhayskiy-rayon": { code: "um:9b6564c3499fe57db01d93989e643fc55af61ca161844974d175e1f790f0704a" },
  "dom-6kh6-g-kamennogorsk-vyborgskiy-rayon": { code: "um:5d3bbdacd1a0718593733e5e3fa4a5c4314a82b547ae9f190498b43d54f7f797" },
  "banya-valma-d-sokolovka-volosovskiy-rayon-leningradskaya-obl": { code: "um:dd1dbba616d44145611c64b7d5feb9a98a5d5f23a12e48b5295b3984a3e58aa9" },
  "dom-milan-p-rybezhno-volkhovskiy-rayon": { code: "um:2b897a2c68bc94ffb3a7b5961563a30c9409b1e23279786d6aabf87e94c7f19b" },
  "udachnyy-1-d-dubrovki-solnechnogorskiy-rayon": { code: "um:0bb412afb8c7ca1d752f0f9282379b6f7794fb762f4d1cb083736ec21096c307" },
  "uspekh-4-p-lunevo-solnechnogorskiy-rayon": { code: "um:2fb6d7c8f442456512c4e754fcd638e3c40ee9eb1b8287c98cff23d2d9ab8d84" },
  "uspekh-2-d-volpi-volosovskiy-rayon": { code: "um:531820842b4a252f416185f8e4e4426168bd7ccf8d315916fdf87e6e26e57d0e" },
  "odnoetazhnyy-dom-iz-brusa": { code: "um:eca770b1317f6888eaf4dcebace5e066eb4a47d918ac816c1d2d346533e12f5d" },
  "lider-5-d-rubtsovo-istrinskiy-rayon": { code: "um:cd6f9faf9878686dcf5c74188a7285c44c7df7b8f685dbf2e0de14b6a1610c4a" },
  "dom-kondor-1-iz-brusa": { code: "um:3cd67d5ff5be129cc16bbd3949e0b5f4d3c8dd7c865c2eedcc2610483553eef1" },
  "dom-komfort-2-iz-brusa": { code: "um:4a363a020f7071ec0ef4921e7d4f40e457903d15fcb4576899328ea362379365" },
  "dom-iz-brusa-lider-5-yegoryevsk": { code: "um:ed59e3a0f563cd48c8651f4e0d96caf0df47866b31ae08f38defd30ca0796150" },
  "dom-pod-usadku-v-solnechnogorske": { code: "um:1529c6a7f206128e5f8f03a70cee9c5e91af281522a8aed76c204a96cf9c992a" },
  "dom-kondor-1-pod-klyuch": { code: "um:05d38f891853e15ca646fef80f1d4c26a6eb119074dff21419a16de863726272" },
  "karkasnyy-dom-madrid": { code: "um:445d64b6e5442edd8a60bf62bd3435e471daaea69c07323fd3784a9cdc761289" },
  "karkasnyy-dom-kingisepp": { code: "um:80c78c99bb59cb059cc39c4eb4398d519322ac952a645b1339ebcc21f516579d" },
  "madrid-d-gubino-klinskiy-rayon": { code: "um:4c9acc2ffa7bd82b3f4153a3023e7aa0faab398e7a712fde318cf81d5c5ad8e4" },
  "kondor-1-sykmanixa": { code: "um:b442ca9e45bb11f96a9d53036222911195c47508eab5c901fc3a343ba827334b" },
  "vityaz-1-d-shalikovo": { code: "um:b442ca9e45bb11f96a9d53036222911195c47508eab5c901fc3a343ba827334b" },
  "garmoniya-d-shiryaevo": { code: "um:bb5cd9c03d7eee7a2e25e746553a401223c5bd34d8471b4c42411fdb4bcaddda" },
};

export function getWorkMap(slug: string): YandexMapCode {
  return workMaps[slug] ?? EMPTY;
}
