export interface InstagramPost {
  id: string;
  type: 'reel' | 'post';
  title: string;
  caption: string;
  captionTE: string;
  imageUrl: string;
  videoBadge?: string;
  views?: string;
  likes: string;
  comments: string;
  date: string;
  dateTE: string;
  category: 'reels' | 'field' | 'welfare' | 'speeches';
  instagramUrl: string;
}

export const INSTAGRAM_PROFILE = {
  handle: 'poreddy_narasimha_reddy_',
  displayName: 'Poreddy Narasimha Reddy',
  displayNameTE: 'శ్రీ పోరెడ్డి నరసింహా రెడ్డి',
  profileUrl: 'https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D',
  avatarUrl: '/images/poreddy-narasimha-reddy-namaste.jpg',
  followers: '3,850+',
  following: '12',
  postsCount: '381',
  bio: 'Vice President, YSRCP Kadapa District | Former 2-Term Municipal Councillor | Founder, Poreddy Sujatha Foundation | Proddatur, AP',
  bioTE: 'వైఎస్సార్సీపీ వైస్ ప్రెసిడెంట్, వైఎస్సార్ కడప జిల్లా | మాజీ మునిసిపల్ కౌన్సిలర్ | ప్రొద్దుటూరు, ఆంధ్రప్రదేశ్',
  // Configuration: If the client sets a live widget token (e.g. from Behold.so, Elfsight, or Curator.io),
  // the component will automatically mount the live iframe/script.
  liveWidgetId: '', // Paste Behold feed ID or Elfsight widget ID here for automatic auto-syncing
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'reel-1',
    type: 'reel',
    title: 'Historic Proddatur People’s Assembly Address',
    caption: '“Proddatur is our pride. Our commitment to civic welfare, clean drinking water, and working-class empowerment is absolute.” — Sri Poreddy Narasimha Reddy addressing the mammoth public meeting.',
    captionTE: '“ప్రొద్దుటూరు పట్టణ ప్రగతి, తాగునీరు, చేనేత-వస్త్ర వర్తకుల హక్కుల పరిరక్షణే మన జీవిత ధ్యేయం!” — భారీ ప్రజాసభలో గర్జిస్తున్న శ్రీ పోరెడ్డి నరసింహా రెడ్డి గారు.',
    imageUrl: '/images/poreddy-with-ys-jagan-portrait.png',
    videoBadge: 'Trending Reel',
    views: '48.2K',
    likes: '4,280',
    comments: '342',
    date: 'Recent',
    dateTE: 'ఇటీవల',
    category: 'reels',
    instagramUrl: 'https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D',
  },
  {
    id: 'post-2',
    type: 'post',
    title: 'With YSRCP President Sri Y.S. Jagan Mohan Reddy',
    caption: 'High-level consultations on Kadapa district development and Proddatur constituency organizational strengthening with YSRCP President Sri Y.S. Jagan Mohan Reddy.',
    captionTE: 'వైఎస్సార్సీపీ అధ్యక్షులు శ్రీ వై.ఎస్. జగన్ మోహన్ రెడ్డి గారితో కడప జిల్లా పార్టీ బలోపేతం, నియోజకవర్గ ప్రజా సమస్యలపై కీలక సమాలోచనలు.',
    imageUrl: '/images/poreddy-meeting-ys-jagan.jpg',
    views: '32.6K',
    likes: '3,890',
    comments: '215',
    date: 'Updated',
    dateTE: 'తాజా పోస్ట్',
    category: 'speeches',
    instagramUrl: 'https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D',
  },
  {
    id: 'reel-3',
    type: 'reel',
    title: 'Poreddy Sujatha Foundation: Empowering Deserving Students',
    caption: 'Providing educational aid and textbooks to children from low-income families across Proddatur. Education is the greatest weapon against poverty.',
    captionTE: 'పోరెడ్డి సుజాత ఫౌండేషన్ ద్వారా పేద విద్యార్థులకు విద్యా సహాయం మరియు పుస్తకాల పంపిణీ. చదువే ప్రతి కుటుంబానికి నిజమైన సంపద.',
    imageUrl: '/images/poreddy-sujatha-foundation-logo.jpg',
    videoBadge: 'Welfare Reel',
    views: '29.4K',
    likes: '2,740',
    comments: '188',
    date: 'Weekly',
    dateTE: 'సేవా కార్యక్రమం',
    category: 'welfare',
    instagramUrl: 'https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D',
  },
  {
    id: 'reel-4',
    type: 'reel',
    title: 'Door-to-Door Ward Padayatra in Proddatur',
    caption: 'Interacting directly with mothers, weavers, and small business owners in local wards. Listening to civic grievances and pledging immediate municipal solutions.',
    captionTE: 'ప్రొద్దుటూరు వార్డులలో గడప గడపకూ పర్యటన.. చేనేత కార్మికులు, అక్కాచెల్లెమ్మలతో ఆత్మీయ సంభాషణ. సమస్యల పరిష్కారానికి హామీ.',
    imageUrl: '/images/poreddy-narasimha-reddy-namaste.jpg',
    videoBadge: 'Field Reel',
    views: '54.1K',
    likes: '5,120',
    comments: '460',
    date: 'Live Field',
    dateTE: 'క్షేత్ర పర్యటన',
    category: 'field',
    instagramUrl: 'https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D',
  },
  {
    id: 'post-5',
    type: 'post',
    title: 'Constituency Observer Duties & Cadre Meet',
    caption: 'Addressing party workers and election booth convenors. Emphasizing disciplined booth management and door-to-door welfare dissemination.',
    captionTE: 'నియోజకవర్గ పరిశీలకులుగా పార్టీ కార్యకర్తలు, బూత్ కన్వీనర్లతో సమావేశం. క్రమశిక్షణతో ప్రజా సంక్షేమ పథకాలను ప్రతి ఇంటికీ చేర్చాలని పిలుపు.',
    imageUrl: '/images/leadership-campaign-record.png',
    views: '21.5K',
    likes: '2,310',
    comments: '144',
    date: 'Cadre Review',
    dateTE: 'సమన్వయ సమావేశం',
    category: 'speeches',
    instagramUrl: 'https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D',
  },
  {
    id: 'reel-6',
    type: 'reel',
    title: 'Elderly Care Outreach: Proddatur Old Age Homes',
    caption: 'Monthly nutrition and essential medicine distribution at old-age care centers by Poreddy Sujatha Foundation. Protecting the dignity of our elders.',
    captionTE: 'ప్రొద్దుటూరు వృద్ధాశ్రమాలలో పెద్దలకు పౌష్టికాహారం, నిత్యావసరాలు మరియు మందుల పంపిణీ. పెద్దల ఆశీస్సులే మన బలం.',
    imageUrl: '/images/ysrcp-fan-symbol.png',
    videoBadge: 'Seva Reel',
    views: '38.7K',
    likes: '3,450',
    comments: '298',
    date: 'Seva Day',
    dateTE: 'సేవా దినోత్సవం',
    category: 'welfare',
    instagramUrl: 'https://instagram.com/poreddy_narasimha_reddy_?mdxt=MThia2ZzN2Zzb2w3bw%3D%3D',
  }
];
