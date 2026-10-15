export interface TimelineEvent {
  year: string;
  title: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  category: 'student' | 'municipal' | 'trade' | 'party' | 'observer';
  badge?: string;
  isCurrent?: boolean;
}

export interface FoundationActivity {
  id: string;
  pillar: 'education' | 'elderly' | 'welfare';
  title: string;
  scope: string;
  location: string;
  description: string;
  impactHighlight: string;
  verifiedOutcome: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  alt: string;
  category: string;
  caption: string;
  badge: string;
}

export interface PriorityItem {
  id: string;
  title: string;
  desc: string;
  status: string;
  statusType: 'info' | 'review' | 'complaints';
  iconType: 'water' | 'drainage' | 'roads' | 'lights' | 'garbage';
}

export interface InvolveCard {
  title: string;
  desc: string;
  linkText: string;
  linkHref: string;
}

export interface TranslationData {
  brand: {
    partyName: string;
    partySub: string;
    candidateShort: string;
  };
  splash: {
    tagline: string;
    subtagline: string;
    voteBanner: string;
    voteSlogan: string;
    candidateName: string;
    candidateTitle: string;
    enterButton: string;
    autoEnterHint: string;
  };
  topBanner: {
    voteCall: string;
    subText: string;
    actionLabel: string;
  };
  nav: {
    about: string;
    priorities: string;
    career: string;
    foundation: string;
    instagram: string;
    gallery: string;
    voteInfo: string;
    listenCta: string;
    replaySplash: string;
    langSwitch: string;
    menuToggle: string;
  };
  hero: {
    candidatePill: string;
    name: string;
    englishSub: string;
    mottoHeading: string;
    mottoHighlight: string;
    lead: string;
    ctaGrievance: string;
    ctaWhatsAppChannel: string;
    callHelp: string;
  };
  twoVotes: {
    title: string;
    enTitle: string;
    vote1Number: string;
    vote1Title: string;
    vote1Desc: string;
    vote2Number: string;
    vote2Title: string;
    vote2Desc: string;
  };
  metrics: {
    stat1: { value: string; label: string; desc: string };
    stat2: { value: string; label: string; desc: string };
    stat3: { value: string; label: string; desc: string };
    stat4: { value: string; label: string; desc: string };
  };
  about: {
    tag: string;
    tagEn: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    quickFactsTitle: string;
    residenceLabel: string;
    residenceValue: string;
    eduLabel: string;
    eduValue: string;
    designationLabel: string;
    designationValue: string;
    foundationLabel: string;
    foundationValue: string;
  };
  career: {
    super: string;
    heading: string;
    timeline: TimelineEvent[];
    odarpuTitle: string;
    odarpuSubtitle: string;
  };
  priorities: {
    tag: string;
    tagEn: string;
    title: string;
    subtitle: string;
    items: PriorityItem[];
  };
  listen: {
    tag: string;
    tagEn: string;
    title: string;
    desc: string;
    waText: string;
    waNumber: string;
    formName: string;
    formNamePlaceholder: string;
    formPhone: string;
    formPhonePlaceholder: string;
    formWard: string;
    formWardPlaceholder: string;
    formType: string;
    formTypePlaceholder: string;
    typeOptions: string[];
    formMsg: string;
    formMsgPlaceholder: string;
    consentText: string;
    consentLink: string;
    btnSubmit: string;
    errName: string;
    errPhone: string;
    errWard: string;
    errType: string;
    errMsg: string;
    errConsent: string;
    successRedirect: string;
  };
  involve: {
    tag: string;
    tagEn: string;
    title: string;
    cards: InvolveCard[];
  };
  voteSection: {
    title: string;
    pollingInfo: string;
    rule1: string;
    rule2: string;
    btnPollingCenter: string;
    btnPollingUrl: string;
  };
  foundation: {
    tag: string;
    tagEn: string;
    title: string;
    lead: string;
    founderNotice: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    activities: FoundationActivity[];
  };
  gallery: {
    tag: string;
    tagEn: string;
    title: string;
    subtitle: string;
    allFilter: string;
    portraitFilter: string;
    leadershipFilter: string;
    foundationFilter: string;
    openImage: string;
    closeLightbox: string;
    items: GalleryItem[];
  };
  footer: {
    campaignInfoTitle: string;
    publisherText: string;
    privacyNote: string;
    socialFacebook: string;
    socialInstagram: string;
    socialYoutube: string;
    socialWhatsapp: string;
    allRightsReserved: string;
  };
}

export const contentTE: TranslationData = {
  brand: {
    partyName: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ – ప్రొద్దుటూరు',
    partySub: 'YSR CONGRESS PARTY · PRODDATUR',
    candidateShort: 'పోరెడ్డి నరసింహారెడ్డి',
  },
  splash: {
    tagline: 'ప్రొద్దుటూరు మున్సిపల్ ఎన్నికలు',
    subtagline: 'నాలుగు దశాబ్దాల ప్రజాసేవ • నిబద్ధతతో కూడిన నాయకత్వం',
    voteBanner: 'మార్పు కోసం ఓటు — ప్రొద్దుటూరు ప్రగతి కోసం ఓటు',
    voteSlogan: 'ఓటు వేయండి — శ్రీ పోరెడ్డి నరసింహారెడ్డి గారికి',
    candidateName: 'శ్రీ పోరెడ్డి నరసింహారెడ్డి',
    candidateTitle: 'వైఎస్సార్‌సీపీ ప్రొద్దుటూరు మున్సిపల్ చైర్పర్సన్ అభ్యర్థి',
    enterButton: 'వెబ్‌సైట్‌లోకి ప్రవేశించండి',
    autoEnterHint: 'కొద్ది క్షణాల్లో సైట్ తెరవబడుతుంది...',
  },
  topBanner: {
    voteCall: 'మన ప్రొద్దుటూరు — మన బాధ్యత • చైర్పర్సన్ అభ్యర్థి: పోరెడ్డి నరసింహారెడ్డి',
    subText: 'ఈసారి చైర్పర్సన్‌ను మీరే నేరుగా ఎన్నుకుంటారు. మీ వార్డు సమస్య నేరుగా చెప్పండి.',
    actionLabel: 'సమస్య చెప్పండి',
  },
  nav: {
    about: 'పరిచయం',
    priorities: 'ప్రాధాన్యాలు',
    career: 'రాజకీయ ప్రస్థానం',
    foundation: 'ఫౌండేషన్',
    instagram: 'లైవ్ అప్‌డేట్స్',
    gallery: 'గ్యాలరీ',
    voteInfo: 'ఓటు సమాచారం',
    listenCta: 'సమస్య చెప్పండి',
    replaySplash: 'ఓపెనింగ్ యానిమేషన్',
    langSwitch: 'English',
    menuToggle: 'మెనూ',
  },
  hero: {
    candidatePill: 'ప్రొద్దుటూరు మున్సిపల్ చైర్పర్సన్ అభ్యర్థి',
    name: 'శ్రీ పోరెడ్డి నరసింహారెడ్డి',
    englishSub: 'Poreddy Narasimha Reddy · YSRCP candidate for Proddatur Municipal Chairperson',
    mottoHeading: 'మన ప్రొద్దుటూరు — ',
    mottoHighlight: 'మన బాధ్యత',
    lead: 'ఈసారి చైర్పర్సన్‌ను మీరే నేరుగా ఎన్నుకుంటారు. మీ వార్డు సమస్య నేరుగా చెప్పండి – ముందు వింటాం, తర్వాత చేస్తాం.',
    ctaGrievance: 'మీ వార్డు సమస్య చెప్పండి',
    ctaWhatsAppChannel: 'WhatsApp ఛానల్‌లో చేరండి',
    callHelp: 'హెల్ప్‌లైన్: 77 94 96 96 00',
  },
  twoVotes: {
    title: 'ఈసారి మీకు రెండు ఓట్లు',
    enTitle: 'This time, you have two votes',
    vote1Number: '1',
    vote1Title: 'వార్డు సభ్యుడు',
    vote1Desc: 'మీ వార్డు ప్రతినిధి',
    vote2Number: '2',
    vote2Title: 'చైర్పర్సన్',
    vote2Desc: 'మొత్తం పట్టణానికి',
  },
  metrics: {
    stat1: { value: '40+', label: 'సంవత్సరాల ప్రజాసేవ', desc: '1983 నుంచి ప్రొద్దుటూరు ప్రజల వెంటే నిరంతర పోరాటం' },
    stat2: { value: '2 పర్యాయాలు', label: 'మున్సిపల్ కౌన్సిలర్', desc: '1985 & 1991లలో ప్రొద్దుటూరు మున్సిపాలిటీకి ఎన్నిక' },
    stat3: { value: '1987', label: 'టెక్స్‌టైల్ అసోసియేషన్ అధ్యక్షుడు', desc: 'చేనేత కార్మికులు, వస్త్ర వ్యాపారుల హక్కుల పరిరక్షణ' },
    stat4: { value: '2025', label: 'వైఎస్సార్ జిల్లా ఉపాధ్యక్షులు', desc: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ వైఎస్సార్ కడప జిల్లా సమన్వయం' },
  },
  about: {
    tag: 'పరిచయం',
    tagEn: 'ABOUT',
    title: 'ప్రొద్దుటూరు నా ఊరు — నాలుగు దశాబ్దాల ప్రజాసేవ',
    p1: 'వై.ఎం.ఆర్. కాలనీ, ప్రొద్దుటూరు నివాసి. మురళీకృష్ణ కాలేజీలో బి.కాం పూర్తి చేసి, 1983లో విద్యార్థి ఛైర్మన్‌గా ప్రజాసేవ ప్రారంభించారు. నాలుగు దశాబ్దాలకు పైగా నిరంతరం ప్రజల మధ్యే ఉంటూ ప్రజా సమస్యలపై పోరాడుతున్నారు.',
    p2: '1985లో అతి పిన్న వయస్సులోనే ప్రొద్దుటూరు మున్సిపల్ కౌన్సిలర్‌గా ఎన్నికై ప్రజా మన్ననలు పొందారు. 1987లో ప్రొద్దుటూరు టెక్స్‌టైల్ అసోసియేషన్ అధ్యక్షుడిగా ఎన్నికై వస్త్ర వ్యాపారులు, చేనేత వర్గాల సంక్షేమానికి విశేష కృషి చేశారు. 1991లో రెండవసారి మున్సిపల్ కౌన్సిలర్‌గా ప్రజల మద్దతుతో తిరిగి ఎన్నికయ్యారు.',
    p3: 'దివంగత మహానేత డాక్టర్ వై.ఎస్. రాజశేఖరరెడ్డి గారి అభిమానిగా, శ్రీ వై.ఎస్. జగన్ మోహన్ రెడ్డి గారి వెన్నంటే నడిచారు. చారిత్రాత్మక ఓదార్పు యాత్ర కోర్ కమిటీ సభ్యుడిగా, వైఎస్సార్‌సీపీ రాష్ట్ర కార్యదర్శిగా, ఎన్నికల పరిశీలకుడిగా, వైఎస్సార్ జిల్లా ఉపాధ్యక్షుడిగా బాధ్యతలు నిర్వర్తించారు. పోరెడ్డి సుజాత ఫౌండేషన్ ద్వారా విద్యార్థులకు విద్యా సహాయం, వృద్ధుల సంరక్షణ, నిరంతర సామాజిక సంక్షేమ కార్యక్రమాలు అందిస్తున్నారు.',
    quickFactsTitle: 'ప్రాథమిక వివరాలు',
    residenceLabel: 'నివాసం',
    residenceValue: 'సాయి కుటీర్ రోడ్డు, వై.ఎం.ఆర్. కాలనీ, ప్రొద్దుటూరు',
    eduLabel: 'విద్యార్హత',
    eduValue: 'బి.కాం (B.Com) – మురళీకృష్ణ కాలేజీ, ప్రొద్దుటూరు',
    designationLabel: 'ప్రస్తుత బాధ్యత',
    designationValue: 'జిల్లా ఉపాధ్యక్షులు, వైఎస్సార్ కడప జిల్లా & మున్సిపల్ చైర్పర్సన్ అభ్యర్థి',
    foundationLabel: 'సేవా సంస్థ',
    foundationValue: 'పోరెడ్డి సుజాత ఫౌండేషన్ (వ్యవస్థాపక సారథి)',
  },
  career: {
    super: 'YSR CONGRESS PARTY — ANDHRA PRADESH',
    heading: 'POLITICAL CAREER',
    timeline: [
      {
        year: '1983',
        title: 'STUDENT CHAIRMAN',
        role: 'స్టూడెంట్ ఛైర్మన్',
        organization: 'మురళీకృష్ణ కాలేజ్',
        location: 'ప్రొద్దుటూరు',
        description: 'విద్యార్థి నాయకుడిగా ఎన్నికై విద్యార్థుల హక్కులు, సౌకర్యాల కోసం కృషి ప్రారంభించారు.',
        category: 'student',
      },
      {
        year: '1985',
        title: 'MUNICIPAL COUNCILLOR',
        role: 'మున్సిపల్ కౌన్సిలర్ (1వ పర్యాయం)',
        organization: 'ప్రొద్దుటూరు మున్సిపాలిటీ',
        location: 'ప్రొద్దుటూరు',
        description: 'కాంగ్రెస్ పార్టీ తరఫున మున్సిపల్ కౌన్సిలర్‌గా ఎన్నికై వార్డు సమస్యల పరిష్కారానికి నిరంతరం శ్రమించారు.',
        category: 'municipal',
      },
      {
        year: '1987',
        title: 'TEXTILE PRESIDENT',
        role: 'టెక్స్‌టైల్ అసోసియేషన్ ప్రెసిడెంట్',
        organization: 'టెక్స్‌టైల్ అసోసియేషన్',
        location: 'ప్రొద్దుటూరు',
        description: 'ప్రొద్దుటూరు వస్త్ర వ్యాపార సంఘం అధ్యక్షుడిగా ఏకగ్రీవంగా ఎన్నికై వ్యాపారులు, కార్మికుల ప్రయోజనాలను కాపాడారు.',
        category: 'trade',
      },
      {
        year: '1991',
        title: 'MUNICIPAL COUNCILLOR',
        role: 'మున్సిపల్ కౌన్సిలర్ (2వ పర్యాయం)',
        organization: 'ప్రొద్దుటూరు మున్సిపాలిటీ',
        location: 'ప్రొద్దుటూరు',
        description: 'ప్రజల పూర్తి విశ్వాసంతో రెండవ పర్యాయం మున్సిపల్ కౌన్సిలర్‌గా ఘన విజయం సాధించారు.',
        category: 'municipal',
      },
      {
        year: '2009',
        title: 'JOINED JAGAN MOHAN REDDY',
        role: 'శ్రీ వైఎస్ జగన్ గారికి సన్నిహిత సహచరుడు',
        organization: 'కడప ఎంపీ ప్రచార సారథ్యం',
        location: 'వైఎస్సార్ కడప జిల్లా',
        description: 'శ్రీ వైఎస్ జగన్ మోహన్ రెడ్డి గారి కడప పార్లమెంట్ ఎన్నికల్లో కీలక బాధ్యతలు నిర్వహించారు.',
        category: 'party',
      },
      {
        year: '2011',
        title: 'JOINED YSRCP',
        role: 'వైఎస్సార్ కాంగ్రెస్ పార్టీలో చేరిక',
        organization: 'వైఎస్సార్‌సీపీ',
        location: 'ఆంధ్రప్రదేశ్',
        description: 'పార్టీ ఆవిర్భావం నుంచి శ్రీ వైఎస్ జగన్ గారి నాయకత్వంలో వైఎస్సార్ కాంగ్రెస్ పార్టీలో క్రియాశీలక సభ్యుడిగా చేరారు.',
        category: 'party',
      },
      {
        year: '2014-24',
        title: 'STATE PARTY COMMITTEE',
        role: 'రాష్ట్ర పార్టీ కమిటీ సభ్యులు',
        organization: 'వైఎస్సార్‌సీపీ ఆంధ్రప్రదేశ్',
        location: 'ఆంధ్రప్రదేశ్',
        description: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ రాష్ట్ర కమిటీ సభ్యుడిగా దశాబ్ద కాలం పాటు పార్టీ బలోపేతానికి విశేష సేవలు.',
        category: 'party',
      },
      {
        year: '2016',
        title: 'AP STATE SECRETARY',
        role: 'ఆంధ్రప్రదేశ్ రాష్ట్ర కార్యదర్శి',
        organization: 'వైఎస్సార్‌సీపీ రాష్ట్ర విభాగం',
        location: 'ఆంధ్రప్రదేశ్',
        description: 'పార్టీ సంస్థాగత నిర్మాణంలో క్రియాశీల పాత్ర పోషిస్తూ రాష్ట్ర కార్యదర్శిగా నియమితులయ్యారు.',
        category: 'party',
      },
      {
        year: '2021',
        title: 'ELECTION OBSERVER',
        role: 'పంచాయతీ ఎన్నికల పరిశీలకులు',
        organization: 'జమ్మలమడుగు నియోజకవర్గం',
        location: 'వైఎస్సార్ కడప జిల్లా',
        description: 'జమ్మలమడుగు నియోజకవర్గ పంచాయతీ ఎన్నికల పార్టీ పరిశీలకులుగా సమర్థవంతమైన నిర్వహణ.',
        category: 'observer',
      },
      {
        year: '2024',
        title: 'ELECTION OBSERVER',
        role: 'సార్వత్రిక ఎన్నికల పరిశీలకులు',
        organization: 'ఆళ్లగడ్డ నియోజకవర్గం',
        location: 'నంద్యాల జిల్లా',
        description: '2024 సార్వత్రిక ఎన్నికల్లో ఆళ్లగడ్డ అసెంబ్లీ నియోజకవర్గ సమన్వయ పరిశీలకులుగా బాధ్యతలు.',
        category: 'observer',
      },
      {
        year: '2025',
        title: 'VICE PRESIDENT',
        role: 'వైఎస్సార్ జిల్లా ఉపాధ్యక్షులు',
        organization: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ, వైఎస్సార్ కడప జిల్లా',
        location: 'కడప & ప్రొద్దుటూరు',
        description: 'వైఎస్సార్ కడప జిల్లా వైఎస్సార్‌సీపీ ఉపాధ్యక్షులుగా నియమితులై ప్రొద్దుటూరు అభివృద్ధి కోసం అంకితభావంతో పనిచేస్తున్నారు.',
        category: 'party',
        isCurrent: true,
      },
    ],
    odarpuTitle: 'CORE COMMITTEE MEMBER FOR THE ODARPU YATRA',
    odarpuSubtitle: 'వైఎస్సార్‌సీపీ చారిత్రాత్మక ఓదార్పు యాత్ర కోర్ కమిటీ సభ్యులు',
  },
  priorities: {
    tag: 'ప్రాధాన్యాలు',
    tagEn: 'PRIORITIES',
    title: 'ప్రతి ఇంటి రోజువారీ సమస్యలే మా మొదటి పని',
    subtitle: 'ప్రతి అంశం పక్కన ప్రస్తుత స్థితి – ఆధారాలతోనే చెబుతాం.',
    items: [
      {
        id: 'water',
        title: 'తాగునీరు',
        desc: 'AMRUT కింద 43 MLD శుద్ధి కేంద్రం. ప్రస్తుత సరఫరా వివరాలు అధికారుల నుంచి కోరుతున్నాం.',
        status: 'సమాచారం కోరాం',
        statusType: 'info',
        iconType: 'water',
      },
      {
        id: 'drainage',
        title: 'డ్రైనేజీ',
        desc: 'వర్షాకాలం నీటి నిల్వ, మురుగు కాలువలు – వార్డుల వారీగా పరిశీలన.',
        status: 'పరిశీలనలో',
        statusType: 'review',
        iconType: 'drainage',
      },
      {
        id: 'roads',
        title: 'రోడ్లు',
        desc: 'అంతర్గత రోడ్ల పనులు – టెండర్ నుంచి వీధి దాకా స్థితి.',
        status: 'పరిశీలనలో',
        statusType: 'review',
        iconType: 'roads',
      },
      {
        id: 'lights',
        title: 'వీధి దీపాలు',
        desc: 'వెలగని దీపాల ఫిర్యాదులు సేకరించి మున్సిపాలిటీకి వినతి.',
        status: 'ఫిర్యాదులు స్వీకరిస్తున్నాం',
        statusType: 'complaints',
        iconType: 'lights',
      },
      {
        id: 'garbage',
        title: 'చెత్త సేకరణ',
        desc: 'సేకరణ సమయాలు, పారిశుధ్యం – ప్రజల అనుభవం ఆధారంగా.',
        status: 'పరిశీలనలో',
        statusType: 'review',
        iconType: 'garbage',
      },
    ],
  },
  listen: {
    tag: 'ముందు వింటాం',
    tagEn: 'WE LISTEN FIRST',
    title: 'మీ వార్డు సమస్య – నేరుగా నాకు',
    desc: 'మీ సమస్య, సూచన పంపండి. ప్రతి వార్డు నుంచి వచ్చినవాటిని కలిపి ప్రజల ముందు ఉంచుతాం.',
    waText: 'లేదా WhatsApp ద్వారా నేరుగా సంప్రదించండి:',
    waNumber: '77 94 96 96 00',
    formName: 'పేరు',
    formNamePlaceholder: 'మీ పూర్తి పేరు',
    formPhone: 'ఫోన్ నంబర్',
    formPhonePlaceholder: '10 అంకెల మొబైల్ నంబర్',
    formWard: 'వార్డు నంబర్',
    formWardPlaceholder: 'వార్డు ఎంచుకోండి',
    formType: 'సమస్య రకం',
    formTypePlaceholder: 'ఎంచుకోండి',
    typeOptions: ['తాగునీరు', 'డ్రైనేజీ', 'రోడ్లు', 'వీధి దీపాలు', 'చెత్త సేకరణ', 'ఇతర'],
    formMsg: 'వివరాలు',
    formMsgPlaceholder: 'సమస్య ఎక్కడ, ఎప్పటి నుంచి – క్లుప్తంగా రాయండి',
    consentText: 'ఈ వివరాలను ప్రచార బృందం నాతో సంప్రదించడానికి మాత్రమే వాడటానికి అంగీకరిస్తున్నాను. ఎప్పుడైనా "ఆపండి" అని పంపి ఉపసంహరించుకోవచ్చు.',
    consentLink: 'గోప్యతా విధానం',
    btnSubmit: 'వాట్సాప్‌లో సమస్య పంపండి →',
    errName: 'దయచేసి మీ పేరు నమోదు చేయండి.',
    errPhone: 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.',
    errWard: 'దయచేసి వార్డు నంబర్ ఎంచుకోండి.',
    errType: 'దయచేసి సమస్య రకం ఎంచుకోండి.',
    errMsg: 'దయచేసి సమస్య వివరాలు రాయండి.',
    errConsent: 'కొనసాగడానికి అంగీకార పెట్టెను టిక్ చేయండి.',
    successRedirect: 'వాట్సాప్ ఓపెన్ అవుతోంది... వివరాలు పంపడానికి వాట్సాప్‌లో Send నొక్కండి.',
  },
  involve: {
    tag: 'కలిసి పనిచేద్దాం',
    tagEn: 'GET INVOLVED',
    title: 'మీరూ భాగస్వాములు కండి',
    cards: [
      {
        title: 'వార్డు పర్యటనలు',
        desc: 'ప్రొద్దుటూరు ప్రతి వార్డులో పాదయాత్ర, వీధి పర్యటనలు. మీ కాలనీకి వస్తున్నాం.',
        linkText: 'షెడ్యూల్ చూడండి →',
        linkHref: '#listen',
      },
      {
        title: 'బహిరంగ సభ',
        desc: 'ప్రొద్దుటూరు ప్రజా చైతన్య సభ – ప్రొద్దుటూరు పట్టణ ప్రజలందరికీ సాదర ఆహ్వానం.',
        linkText: 'వివరాలు →',
        linkHref: '#listen',
      },
      {
        title: 'వాలంటీర్‌గా చేరండి',
        desc: 'మీ వార్డులో ప్రచారం, సమాచారం పంచడంలో భాగస్వామ్యం అవ్వండి.',
        linkText: 'చేరండి →',
        linkHref: 'https://wa.me/917794969600?text=%E0%B0%B5%E0%B0%BE%E0%B0%B2%E0%B0%82%E0%B0%9F%E0%B1%80%E0%B0%B0%E0%B1%8D%E2%80%8C%E0%B0%97%E0%B0%BE%20%E0%B0%9A%E0%B1%87%E0%B0%B0%E0%B0%BE%E0%B0%B2%E0%B0%A8%E0%B0%BF%20%E0%B0%85%E0%B0%A8%E0%B1%81%E0%B0%95%E0%B1%81%E0%B0%82%E0%B0%9F%E0%B1%8D%E0%B0%A8%E0%B0%BE%E0%B0%A8%E0%B1%81',
      },
    ],
  },
  voteSection: {
    title: 'ఓటు వేయడం — మన బాధ్యత',
    pollingInfo: 'మున్సిపల్ ఎన్నికల పోలింగ్ సమయం',
    rule1: 'ఓటర్ ఐడీ లేదా గుర్తింపు కార్డు వెంట తీసుకెళ్లండి',
    rule2: 'రెండు బ్యాలెట్లూ వేయండి (1. వార్డు సభ్యుడు, 2. చైర్పర్సన్)',
    btnPollingCenter: 'మీ పోలింగ్ కేంద్రం తెలుసుకోండి',
    btnPollingUrl: 'https://electoralsearch.eci.gov.in/',
  },
  foundation: {
    tag: 'సేవా సంస్థ',
    tagEn: 'POREDDY SUJATHA FOUNDATION',
    title: 'పోరెడ్డి సుజాత ఫౌండేషన్ — సమాజ సేవలో ముందుపీఠ',
    lead: 'దివంగత శ్రీమతి పోరెడ్డి సుజాత గారి జ్ఞాపకార్థం స్థాపించబడిన ఈ సంస్థ ద్వారా నిరుపేద విద్యార్థులకు ఫీజులు, పుస్తకాలు, వృద్ధులకు ఆసరా, ఆపదలో ఉన్న కుటుంబాలకు అండగా నిలుస్తున్నాం.',
    founderNotice: 'వ్యవస్థాపక సారథి: శ్రీ పోరెడ్డి నరసింహారెడ్డి',
    pillar1Title: 'విద్యా సహాయం (Education)',
    pillar1Desc: 'ప్రతిభావంతులైన పేద విద్యార్థులకు కళాశాల ఫీజులు, పాఠ్యపుస్తకాలు, పరీక్షా రుసుములు అందజేత.',
    pillar2Title: 'వృద్ధుల సంరక్షణ (Elderly Care)',
    pillar2Desc: 'నిరాశ్రయులైన వృద్ధులకు మందులు, పౌష్టికాహారం, నిత్యావసర వస్తువులు క్రమం తప్పకుండా పంపిణీ.',
    pillar3Title: 'సామాజిక సంక్షేమం (Community Welfare)',
    pillar3Desc: 'ప్రకృతి విపత్తుల సమయాల్లో, అత్యవసర వైద్య ఖర్చులకు పేద కుటుంబాలకు ప్రత్యక్ష ఆర్థిక సహాయం.',
    activities: [
      {
        id: 'act1',
        pillar: 'education',
        title: 'ప్రతిభావంతులైన విద్యార్థులకు విద్యా పురస్కారాలు',
        scope: 'ప్రొద్దుటూరు మరియు పరిసర మండలాలు',
        location: 'ప్రొద్దుటూరు',
        description: 'ఆర్ధిక ఇబ్బందుల వల్ల చదువు ఆగిపోయే స్థితిలో ఉన్న 100+ విద్యార్థులకు ఉన్నత విద్యా ఫీజులు చెల్లించి ప్రోత్సహించారు.',
        impactHighlight: 'ఉన్నత విద్యకు భరోసా',
        verifiedOutcome: 'విద్యార్థులు ఇంజనీరింగ్, డిగ్రీ కోర్సులు విజయవంతంగా పూర్తి చేయడం జరిగింది.',
      },
      {
        id: 'act2',
        pillar: 'elderly',
        title: 'వృద్ధులకు ఉచిత వైద్య తనిఖీలు & మందుల పంపిణీ',
        scope: 'వై.ఎం.ఆర్. కాలనీ & సమీప వార్డులు',
        location: 'ప్రొద్దుటూరు',
        description: 'నిరుపేద వృద్ధులకు బిపి, షుగర్ తనిఖీలు మరియు నెలకు సరిపడా ఉచిత మందులు అందించే కార్యక్రమాలు.',
        impactHighlight: 'ఆరోగ్య రక్షణ',
        verifiedOutcome: 'వందలాది మంది వృద్ధులకు నిరంతర ఆరోగ్య పర్యవేక్షణ లభిస్తోంది.',
      },
      {
        id: 'act3',
        pillar: 'welfare',
        title: 'కరోనా కష్టకాలంలో నిత్యావసరాల పంపిణీ',
        scope: 'ప్రొద్దుటూరు పట్టణ వ్యాప్తంగా',
        location: 'ప్రొద్దుటూరు',
        description: 'లాక్‌డౌన్ సమయాల్లో ఉపాధి కోల్పోయిన పేద చేనేత కుటుంబాలు, దినసరి కూలీలకు బియ్యం, పప్పులు, కూరగాయల కిట్లు అందజేశారు.',
        impactHighlight: 'ఆపత్కాల ఆసరా',
        verifiedOutcome: 'తీవ్ర ఇబ్బందుల్లో ఉన్న వేలాది కుటుంబాలకు ఆకలి తీర్చిన మానవీయ సేవ.',
      },
    ],
  },
  gallery: {
    tag: 'గ్యాలరీ',
    tagEn: 'GALLERY',
    title: 'ప్రజా జీవితం — చిత్ర రూపంలో',
    subtitle: 'నాయకులతో, ప్రజలతో, సేవా కార్యక్రమాల్లో శ్రీ పోరెడ్డి నరసింహారెడ్డి గారి ప్రామాణిక చిత్రాలు.',
    allFilter: 'అన్నీ',
    portraitFilter: 'పోర్ట్రెయిట్స్',
    leadershipFilter: 'వైఎస్సార్‌సీపీ నాయకత్వం',
    foundationFilter: 'ఫౌండేషన్ సేవలు',
    openImage: 'చిత్రాన్ని పెద్దదిగా చూడండి',
    closeLightbox: 'మూసివేయి',
    items: [
      {
        id: 'img1',
        src: '/images/poreddy-narasimha-reddy-namaste.jpg',
        title: 'శ్రీ పోరెడ్డి నరసింహారెడ్డి – నమస్కారం',
        alt: 'శ్రీ పోరెడ్డి నరసింహారెడ్డి నమస్కారం చేస్తూ',
        category: 'portrait',
        caption: 'ప్రొద్దుటూరు ప్రజలకు వినమ్ర నమస్కారాలతో శ్రీ పోరెడ్డి నరసింహారెడ్డి.',
        badge: 'అధికారిక చిత్రం',
      },
      {
        id: 'img2',
        src: '/images/poreddy-with-ys-jagan-portrait.png',
        title: 'వైఎస్ జగన్ గారి నాయకత్వంలో',
        alt: 'శ్రీ వైఎస్ జగన్ మోహన్ రెడ్డి గారితో పోరెడ్డి నరసింహారెడ్డి',
        category: 'leadership',
        caption: 'పార్టీ అధినేత శ్రీ వైఎస్ జగన్ మోహన్ రెడ్డి గారి వెన్నంటే పోరెడ్డి నరసింహారెడ్డి.',
        badge: 'వైఎస్సార్‌సీపీ',
      },
      {
        id: 'img3',
        src: '/images/poreddy-meeting-ys-jagan.jpg',
        title: 'శ్రీ వైఎస్ జగన్ మోహన్ రెడ్డి గారితో సమావేశం',
        alt: 'వైఎస్ జగన్ గారితో ప్రజా సమస్యలపై చర్చిస్తూ',
        category: 'leadership',
        caption: 'ప్రొద్దుటూరు పట్టణ అభివృద్ధి, స్థానిక ప్రజా సమస్యలను వైఎస్ జగన్ గారి దృష్టికి తీసుకెళ్తూ.',
        badge: 'ప్రజా చర్చలు',
      },
      {
        id: 'img4',
        src: '/images/poreddy-sujatha-foundation-logo.jpg',
        title: 'పోరెడ్డి సుజాత ఫౌండేషన్ అధికారిక చిహ్నం',
        alt: 'పోరెడ్డి సుజాత ఫౌండేషన్ లోగో',
        category: 'foundation',
        caption: 'విద్యా దానం, పేదల సేవ, వృద్ధుల ఆసరా కోసం స్థాపించబడిన స్వచ్ఛంద సంస్థ.',
        badge: 'ఫౌండేషన్ చిహ్నం',
      },
      {
        id: 'img5',
        src: '/images/leadership-campaign-record.png',
        title: 'ఓదార్పు యాత్ర & ఎన్నికల ప్రచార రికార్డు',
        alt: 'ఓదార్పు యాత్ర కోర్ కమిటీలో నాయకత్వ పాత్ర',
        category: 'leadership',
        caption: 'కడప ఎంపీ ప్రచారం మరియు ఓదార్పు యాత్ర కోర్ కమిటీలో చురుకైన భాగస్వామ్యం.',
        badge: 'ఓదార్పు యాత్ర',
      },
      {
        id: 'img6',
        src: '/images/ysrcp-fan-symbol.png',
        title: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ ఎన్నికల గుర్తు – ఫ్యాన్',
        alt: 'వైఎస్సార్‌సీపీ ఎన్నికల గుర్తు ఫ్యాన్',
        category: 'leadership',
        caption: 'మన ప్రొద్దుటూరు అభివృద్ధికి ఫ్యాన్ గుర్తుకే మీ అమూల్యమైన ఓటు వేయండి.',
        badge: 'ఎన్నికల గుర్తు',
      },
    ],
  },
  footer: {
    campaignInfoTitle: 'ఎన్నికల ప్రచార సమాచారం',
    publisherText: 'Published by: YSR Congress Party Campaign Office, Y.M.R. Colony, Proddatur.',
    privacyNote: 'గోప్యత: మీరు ఇచ్చిన వివరాలను ఈ ప్రచారం కోసం మాత్రమే వాడతాం; ఎవరికీ అమ్మము, పంచము. ఎన్నికల తర్వాత [30] రోజుల్లో తొలగిస్తాం.',
    socialFacebook: 'Facebook',
    socialInstagram: 'Instagram',
    socialYoutube: 'YouTube',
    socialWhatsapp: 'WhatsApp Channel',
    allRightsReserved: 'సర్వహక్కులూ పోరెడ్డి నరసింహారెడ్డి గారి ప్రచార బృందానికి ప్రత్యేకించబడ్డాయి.',
  },
};

export const contentEN: TranslationData = {
  brand: {
    partyName: 'YSR CONGRESS PARTY — PRODDATUR',
    partySub: 'వైఎస్సార్ కాంగ్రెస్ పార్టీ · ప్రొద్దుటూరు',
    candidateShort: 'Poreddy Narasimha Reddy',
  },
  splash: {
    tagline: 'PRODDATUR MUNICIPAL ELECTIONS',
    subtagline: 'Four Decades of People’s Service • Dedicated Grassroots Leadership',
    voteBanner: 'VOTE FOR CHANGE — VOTE FOR PRODDATUR’S PROGRESS',
    voteSlogan: 'VOTE FOR SRI POREDDY NARASIMHA REDDY',
    candidateName: 'Sri Poreddy Narasimha Reddy',
    candidateTitle: 'YSRCP Candidate for Proddatur Municipal Chairperson',
    enterButton: 'Enter Official Website',
    autoEnterHint: 'Entering automatically in a moment...',
  },
  topBanner: {
    voteCall: 'Our Proddatur — Our Responsibility • Chairperson Candidate: Poreddy Narasimha Reddy',
    subText: 'This time, you directly elect the Municipal Chairperson. Share your ward grievances directly.',
    actionLabel: 'Report Issue',
  },
  nav: {
    about: 'About',
    priorities: 'Priorities',
    career: 'Career',
    foundation: 'Foundation',
    instagram: 'Live Updates',
    gallery: 'Gallery',
    voteInfo: 'Voting Info',
    listenCta: 'Report Issue',
    replaySplash: 'Intro Animation',
    langSwitch: 'తెలుగు',
    menuToggle: 'Menu',
  },
  hero: {
    candidatePill: 'YSRCP Candidate for Proddatur Municipal Chairperson',
    name: 'Sri Poreddy Narasimha Reddy',
    englishSub: 'Poreddy Narasimha Reddy · YSRCP candidate for Proddatur Municipal Chairperson',
    mottoHeading: 'Our Proddatur — ',
    mottoHighlight: 'Our Responsibility',
    lead: 'This time, you directly elect the Chairperson. Share your ward issue directly – We Listen First, Then We Act.',
    ctaGrievance: 'Share Your Ward Issue',
    ctaWhatsAppChannel: 'Join WhatsApp Channel',
    callHelp: 'Helpline: +91 77 94 96 96 00',
  },
  twoVotes: {
    title: 'This Time, You Have Two Votes',
    enTitle: 'ఈసారి మీకు రెండు ఓట్లు',
    vote1Number: '1',
    vote1Title: 'Ward Member',
    vote1Desc: 'Your Ward Representative',
    vote2Number: '2',
    vote2Title: 'Chairperson',
    vote2Desc: 'For the Entire Town',
  },
  metrics: {
    stat1: { value: '40+', label: 'Years of Public Service', desc: 'Unbroken grassroots dedication in Proddatur since 1983' },
    stat2: { value: '2 Terms', label: 'Municipal Councillor', desc: 'Elected in 1985 & 1991 for Proddatur Municipal Council' },
    stat3: { value: '1987', label: 'Textile Association President', desc: 'Safeguarded weavers and merchants in the textile hub' },
    stat4: { value: '2025', label: 'District Vice President', desc: 'Appointed Vice President, YSRCP Kadapa District' },
  },
  about: {
    tag: 'Overview',
    tagEn: 'ABOUT',
    title: 'Proddatur Is My Hometown — Four Decades of Public Service',
    p1: 'Resident of Y.M.R. Colony, Proddatur. Completed Bachelor of Commerce (B.Com) at Muralikrishna College and entered public life in 1983 as Student Chairman. For over four decades, he has remained directly amidst the people, championing civic causes.',
    p2: 'Elected as Municipal Councillor for Proddatur Municipality in 1985 at a young age, earning deep affection for his accessibility. In 1987, he was elected President of the Textile Association of Proddatur, advancing trade and weaver welfare. Re-elected as Municipal Councillor for a second term in 1991.',
    p3: 'An ardent follower of Late Chief Minister Dr. Y.S. Rajasekhar Reddy and a loyal associate of Sri Y.S. Jagan Mohan Reddy. Served as a Core Committee Member for the historic Odarpu Yatra, AP State Secretary of YSRCP, Election Observer for Jammalamadugu and Allagadda, and currently as Vice President of YSR Kadapa District. Through Poreddy Sujatha Foundation, he delivers ongoing educational support, elder care, and community welfare.',
    quickFactsTitle: 'Civic & Biographical Facts',
    residenceLabel: 'Residence',
    residenceValue: 'Sai Kuteer Road, Y.M.R. Colony, Proddatur, AP',
    eduLabel: 'Education',
    eduValue: 'Bachelor of Commerce (B.Com), Muralikrishna College, Proddatur',
    designationLabel: 'Designation',
    designationValue: 'District Vice President, YSRCP Kadapa & Municipal Chairperson Candidate',
    foundationLabel: 'Philanthropy',
    foundationValue: 'Poreddy Sujatha Foundation (Founder & Chief Patron)',
  },
  career: {
    super: 'YSR CONGRESS PARTY — ANDHRA PRADESH',
    heading: 'POLITICAL CAREER',
    timeline: [
      {
        year: '1983',
        title: 'STUDENT CHAIRMAN',
        role: 'Student Chairman',
        organization: 'Muralikrishna College',
        location: 'Proddatur',
        description: 'Elected Student Chairman, spearheading student rights, library resources, and campus welfare.',
        category: 'student',
      },
      {
        year: '1985',
        title: 'MUNICIPAL COUNCILLOR',
        role: 'Municipal Councillor (1st Term)',
        organization: 'Proddatur Municipality',
        location: 'Proddatur',
        description: 'Elected for first term under Congress Party, championing round-the-clock ward amenities.',
        category: 'municipal',
      },
      {
        year: '1987',
        title: 'TEXTILE PRESIDENT',
        role: 'Textile Association President',
        organization: 'Textile Association',
        location: 'Proddatur',
        description: 'Elected President of the historic Textile Association, protecting merchants and weaver communities.',
        category: 'trade',
      },
      {
        year: '1991',
        title: 'MUNICIPAL COUNCILLOR',
        role: 'Municipal Councillor (2nd Term)',
        organization: 'Proddatur Municipality',
        location: 'Proddatur',
        description: 'Re-elected for second term with decisive public endorsement for municipal responsiveness.',
        category: 'municipal',
      },
      {
        year: '2009',
        title: 'JOINED JAGAN MOHAN REDDY',
        role: 'Close Associate of Sri Y.S. Jagan',
        organization: 'Kadapa MP Campaign',
        location: 'YSR Kadapa District',
        description: 'Close associate of Sri Y.S. Jagan Mohan Reddy during the historic Kadapa MP campaign.',
        category: 'party',
      },
      {
        year: '2011',
        title: 'JOINED YSRCP',
        role: 'Formally Joined YSRCP',
        organization: 'YSR Congress Party',
        location: 'Andhra Pradesh',
        description: 'Formally joined YSR Congress Party at its inception under the visionary leadership of Sri Y.S. Jagan.',
        category: 'party',
      },
      {
        year: '2014-24',
        title: 'STATE PARTY COMMITTEE',
        role: 'State Party Committee Member',
        organization: 'YSRCP State Committee',
        location: 'Andhra Pradesh',
        description: 'Dedicated decade-long tenure on the YSRCP State Party Committee strengthening grassroots coordination.',
        category: 'party',
      },
      {
        year: '2016',
        title: 'AP STATE SECRETARY',
        role: 'AP State Secretary',
        organization: 'YSRCP Andhra Pradesh',
        location: 'Andhra Pradesh',
        description: 'Appointed AP State Secretary of YSRCP, overseeing key regional constituencies and party outreach.',
        category: 'party',
      },
      {
        year: '2021',
        title: 'ELECTION OBSERVER',
        role: 'Panchayat Election Observer',
        organization: 'Jammalamadugu Constituency',
        location: 'YSR Kadapa District',
        description: 'Deputed as Party Election Observer for the Jammalamadugu Panchayat Elections.',
        category: 'observer',
      },
      {
        year: '2024',
        title: 'ELECTION OBSERVER',
        role: 'General Election Observer',
        organization: 'Allagadda Constituency',
        location: 'Nandyal District',
        description: 'Appointed Election Observer for Allagadda Constituency during the 2024 General Elections.',
        category: 'observer',
      },
      {
        year: '2025',
        title: 'VICE PRESIDENT',
        role: 'District Vice President',
        organization: 'YSR Congress Party, YSR Kadapa District',
        location: 'Kadapa & Proddatur',
        description: 'Appointed Vice President of YSRCP Kadapa District, leading Proddatur municipal governance vision.',
        category: 'party',
        isCurrent: true,
      },
    ],
    odarpuTitle: 'CORE COMMITTEE MEMBER FOR THE ODARPU YATRA',
    odarpuSubtitle: 'Member of the Historic Core Committee for Sri Y.S. Jagan Mohan Reddy’s Odarpu Yatra',
  },
  priorities: {
    tag: 'Action Plan',
    tagEn: 'PRIORITIES',
    title: 'Every Household’s Daily Issues Are Our First Priority',
    subtitle: 'Transparent status tracking for each civic priority — backed by ground data.',
    items: [
      {
        id: 'water',
        title: 'Drinking Water',
        desc: '43 MLD purification plant under AMRUT. Official data requested on current daily distribution.',
        status: 'Information Requested',
        statusType: 'info',
        iconType: 'water',
      },
      {
        id: 'drainage',
        title: 'Drainage & Sewage',
        desc: 'Monsoon water stagnation and drain clearance – ward-by-ward field inspection in progress.',
        status: 'Under Review',
        statusType: 'review',
        iconType: 'drainage',
      },
      {
        id: 'roads',
        title: 'Internal Roads',
        desc: 'Internal road repair and laying works – track status from tender stage to street completion.',
        status: 'Under Review',
        statusType: 'review',
        iconType: 'roads',
      },
      {
        id: 'lights',
        title: 'Street Lighting',
        desc: 'Collecting non-functional light locations to submit comprehensive grievance to Municipality.',
        status: 'Receiving Grievances',
        statusType: 'complaints',
        iconType: 'lights',
      },
      {
        id: 'garbage',
        title: 'Waste Collection',
        desc: 'Daily collection timings, sanitation frequency – verified directly through citizen feedback.',
        status: 'Under Review',
        statusType: 'review',
        iconType: 'garbage',
      },
    ],
  },
  listen: {
    tag: 'Public Grievances',
    tagEn: 'WE LISTEN FIRST',
    title: 'Your Ward Issue — Directly to Me',
    desc: 'Submit your civic problem or suggestion. Issues collected from every ward will be publicly compiled for prompt resolution.',
    waText: 'Or reach out directly via WhatsApp:',
    waNumber: '+91 77 94 96 96 00',
    formName: 'Name',
    formNamePlaceholder: 'Your full name',
    formPhone: 'Phone Number',
    formPhonePlaceholder: '10-digit mobile number',
    formWard: 'Ward Number',
    formWardPlaceholder: 'Select your ward',
    formType: 'Issue Category',
    formTypePlaceholder: 'Select category',
    typeOptions: ['Drinking Water', 'Drainage', 'Roads', 'Street Lights', 'Waste Collection', 'Other'],
    formMsg: 'Issue Details',
    formMsgPlaceholder: 'Where is the problem located and since when? Describe briefly',
    consentText: 'I consent to the campaign team using these details solely to contact me regarding this civic issue. I may withdraw anytime by replying "STOP".',
    consentLink: 'Privacy Policy',
    btnSubmit: 'Send Grievance on WhatsApp →',
    errName: 'Please enter your name.',
    errPhone: 'Please enter a valid 10-digit mobile number.',
    errWard: 'Please select your ward number.',
    errType: 'Please select an issue category.',
    errMsg: 'Please enter the issue details.',
    errConsent: 'Please check the consent box to proceed.',
    successRedirect: 'Opening WhatsApp... Please tap Send in WhatsApp to deliver your grievance.',
  },
  involve: {
    tag: 'Join Hands',
    tagEn: 'GET INVOLVED',
    title: 'Be an Active Partner in Progress',
    cards: [
      {
        title: 'Ward Visits & Outreach',
        desc: 'Padayatra and street-corner discussions across every ward in Proddatur. Coming to your neighborhood.',
        linkText: 'View Schedule →',
        linkHref: '#listen',
      },
      {
        title: 'Public Town Hall',
        desc: 'Proddatur Civic Awareness Assembly – warm invitation to all citizens and families of Proddatur.',
        linkText: 'Details →',
        linkHref: '#listen',
      },
      {
        title: 'Volunteer with Us',
        desc: 'Help coordinate door-to-door awareness and distribute information in your ward.',
        linkText: 'Join Campaign →',
        linkHref: 'https://wa.me/917794969600?text=I%20want%20to%20volunteer%20for%20Poreddy%20Narasimha%20Reddy%20Campaign',
      },
    ],
  },
  voteSection: {
    title: 'Voting is Our Sacred Responsibility',
    pollingInfo: 'Proddatur Municipal Elections Polling Day',
    rule1: 'Carry your official Voter ID or recognized government photo identity card',
    rule2: 'Cast both ballot papers (1. Ward Member, 2. Municipal Chairperson)',
    btnPollingCenter: 'Find Your Polling Station',
    btnPollingUrl: 'https://electoralsearch.eci.gov.in/',
  },
  foundation: {
    tag: 'Philanthropy',
    tagEn: 'POREDDY SUJATHA FOUNDATION',
    title: 'Poreddy Sujatha Foundation — At the Forefront of Social Welfare',
    lead: 'Established in loving memory of Late Smt. Poreddy Sujatha, the Foundation actively provides college scholarships for underprivileged students, care for the elderly, and emergency assistance to families in distress.',
    founderNotice: 'Founder & Patron: Sri Poreddy Narasimha Reddy',
    pillar1Title: 'Educational Support',
    pillar1Desc: 'Merit-cum-means college scholarships, textbooks, and exam fees for economically disadvantaged students.',
    pillar2Title: 'Senior Citizen Care',
    pillar2Desc: 'Free health screenings, chronic medication supplies, and essential rations for destitute seniors.',
    pillar3Title: 'Community Social Welfare',
    pillar3Desc: 'Direct humanitarian relief during emergencies, health crises, and natural distress for local families.',
    activities: [
      {
        id: 'act1',
        pillar: 'education',
        title: 'Merit Scholarships & College Fee Assistance',
        scope: 'Proddatur and surrounding mandals',
        location: 'Proddatur',
        description: 'Financed tuition fees and books for over 100 students at risk of dropping out due to economic hardship.',
        impactHighlight: 'Higher Education Access',
        verifiedOutcome: 'Students successfully completed professional and degree courses.',
      },
      {
        id: 'act2',
        pillar: 'elderly',
        title: 'Elderly Health Checks & Free Medicine Camps',
        scope: 'Y.M.R. Colony & adjoining wards',
        location: 'Proddatur',
        description: 'Comprehensive blood pressure, glucose monitoring, and monthly medicine distribution for elderly residents.',
        impactHighlight: 'Preventive Healthcare',
        verifiedOutcome: 'Hundreds of elderly citizens receive steady geriatric healthcare assistance.',
      },
      {
        id: 'act3',
        pillar: 'welfare',
        title: 'Humanitarian Relief Rations for Weavers & Daily Earners',
        scope: 'Town-wide across Proddatur',
        location: 'Proddatur',
        description: 'Essential ration kits (rice, pulses, oils) delivered directly to daily-wage and weaver households during crisis periods.',
        impactHighlight: 'Crisis Livelihood Support',
        verifiedOutcome: 'Sustained vulnerable families through difficult lockdown and economic disruptions.',
      },
    ],
  },
  gallery: {
    tag: 'Visual Journey',
    tagEn: 'GALLERY',
    title: 'Four Decades of Public Service in Frames',
    subtitle: 'Authentic archival photographs documenting grassroots engagement, state leadership, and community welfare.',
    allFilter: 'All',
    portraitFilter: 'Portraits',
    leadershipFilter: 'YSRCP Leadership',
    foundationFilter: 'Foundation Welfare',
    openImage: 'View full image',
    closeLightbox: 'Close',
    items: [
      {
        id: 'img1',
        src: '/images/poreddy-narasimha-reddy-namaste.jpg',
        title: 'Sri Poreddy Narasimha Reddy – Namaste',
        alt: 'Sri Poreddy Narasimha Reddy offering namaste with YSRCP scarf',
        category: 'portrait',
        caption: 'Sri Poreddy Narasimha Reddy greeting the citizens of Proddatur with humility and warmth.',
        badge: 'Official Portrait',
      },
      {
        id: 'img2',
        src: '/images/poreddy-with-ys-jagan-portrait.png',
        title: 'Steadfast with Sri Y.S. Jagan Mohan Reddy',
        alt: 'Poreddy Narasimha Reddy alongside Sri Y.S. Jagan Mohan Reddy',
        category: 'leadership',
        caption: 'Standing steadfast with Party President Sri Y.S. Jagan Mohan Reddy for the welfare of Andhra Pradesh.',
        badge: 'YSRCP Leadership',
      },
      {
        id: 'img3',
        src: '/images/poreddy-meeting-ys-jagan.jpg',
        title: 'Meeting with Sri Y.S. Jagan Mohan Reddy',
        alt: 'Discussing Proddatur civic issues with Sri Y.S. Jagan Mohan Reddy',
        category: 'leadership',
        caption: 'Deliberating on Proddatur urban infrastructure and municipal priorities directly with the leadership.',
        badge: 'Civic Deliberation',
      },
      {
        id: 'img4',
        src: '/images/poreddy-sujatha-foundation-logo.jpg',
        title: 'Poreddy Sujatha Foundation Emblem',
        alt: 'Poreddy Sujatha Foundation Logo',
        category: 'foundation',
        caption: 'Official emblem of Poreddy Sujatha Foundation, dedicated to education, elderly care, and community aid.',
        badge: 'Foundation Emblem',
      },
      {
        id: 'img5',
        src: '/images/leadership-campaign-record.png',
        title: 'Odarpu Yatra & Campaign Leadership Record',
        alt: 'Historical record of Odarpu Yatra and party coordination',
        category: 'leadership',
        caption: 'Documented record of leadership in the Kadapa MP campaign and Odarpu Yatra Core Committee.',
        badge: 'Odarpu Yatra Record',
      },
      {
        id: 'img6',
        src: '/images/ysrcp-fan-symbol.png',
        title: 'YSR Congress Party Symbol – Fan',
        alt: 'YSRCP Election Symbol - Fan',
        category: 'leadership',
        caption: 'Vote for the Fan symbol for progressive, accountable municipal leadership in Proddatur.',
        badge: 'Election Symbol',
      },
    ],
  },
  footer: {
    campaignInfoTitle: 'Election Campaign Information',
    publisherText: 'Published by: YSR Congress Party Campaign Office, Y.M.R. Colony, Proddatur.',
    privacyNote: 'Privacy: Details shared through this website are used strictly for this civic campaign and never shared or sold. Data will be purged 30 days post-election.',
    socialFacebook: 'Facebook',
    socialInstagram: 'Instagram',
    socialYoutube: 'YouTube',
    socialWhatsapp: 'WhatsApp Channel',
    allRightsReserved: 'All rights reserved. Poreddy Narasimha Reddy Municipal Campaign.',
  },
};
