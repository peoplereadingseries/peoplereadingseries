'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('English');

    const translations = {
        English: {
            hero: {
                title1: "Understand",
                title2: "what they really mean.",
                subtitle: "Decode the hidden signals of human connection with Siya, your personalized AI Heart Reader.",
                cta: "Try Siya Now",
            },
            siya: {
                title: "Siya",
                subtitle: "Your personal Heart Reader.",
                liveAnalysis: "Live Analysis",
                greeting: "Hi, I am Siya",
                question: "Where should we start?",
                options: {
                    crush: "Crush Unreveal",
                    expert: "Expert Panel",
                    lust: "Lust (Venting)",
                },
                form: {
                    dressing: "Dressing/Makeup",
                    energy: "Energy",
                    vibe: "Vibe",
                    demeanor: "Demeanor",
                    submit: "Analyze",
                    dressingPlaceholder: "e.g., Casual, Formal, Trendy",
                    energyPlaceholder: "e.g., High, Low, Nervous",
                    vibePlaceholder: "e.g., Friendly, Flirty, Distant",
                    demeanorPlaceholder: "e.g., Open, Closed, Shy",
                },
                inputPlaceholder: "Type what they said or did...",
                preview: "Free Preview • Pro version includes deep analysis",
                connectionError: "Sorry, I'm having a bit of trouble connecting to my intuition (and the server) right now. Try again?",
            },
            philosophy: {
                title1: "The Anti-Gravity",
                title2: "Philosophy",
                description: "Relationships feel heavy when you're pulling too hard. The \"Anti-Gravity\" approach is about letting go of the weight of expectation.",
                gravityTitle: "Gravity (The Problem)",
                gravityDesc: "Over-thinking, chasing, seeking validation, and feeling \"heavy\" in your interactions.",
                antiGravityTitle: "Anti-Gravity (The Solution)",
                antiGravityDesc: "Lightness, abundance mindset, reading signals accurately, and attracting naturally.",
                gravityPage: {
                    title: "Gravity: The Weight of Expectation",
                    content: [
                        "Imagine relationships as a physical force. When you want something too badly—when you need validation, when you're afraid of losing someone, when you're constantly analyzing every text—you create 'Gravity'.",
                        "Gravity is heavy. It pulls people down. It makes interactions feel labored and exhausting. When you are in a state of Gravity, you are essentially saying: 'I need you to complete me.'",
                        "This creates resistance. The more you pull, the more they pull away. It's the physics of human connection. Gravity manifests as anxiety, double-texting, over-explaining, and the constant fear of doing something wrong.",
                        "The solution isn't to stop caring. It's to stop gripping."
                    ],
                    imageAlt: "A visual representation of emotional gravity - a heavy, dark sphere pulling strings attached to a person"
                },
                antiGravityPage: {
                    title: "Anti-Gravity: The Art of Letting Go",
                    content: [
                        "Anti-Gravity is the state of emotional weightlessness. It is the realization that you are complete on your own. When you let go of the need for a specific outcome, you become lighter.",
                        "In this state, you are not pulling. You are simply existing in your own orbit, shining your own light. And just like a star, your gravity becomes natural—people are drawn to you not because you are forcing them, but because it feels good to be around you.",
                        "Anti-Gravity is about 'Bids' without attachment. You send out a signal (a bid for connection), and if it's not returned, you drift on. You don't crash. You don't spiral.",
                        "This lightness is magnetic. It signals high value, confidence, and safety. It allows love to happen, rather than trying to make it happen."
                    ],
                    imageAlt: "A visual representation of anti-gravity - a person floating freely, surrounded by light and stardust"
                }
            },
            course: {
                title1: "The Social Intelligence",
                title2: "Masterclass.",
                modules: {
                    mod1: { title: "The Science of Bids", desc: "Recognize the tiny invitations for connection." },
                    mod2: { title: "Mastering Baselines", desc: "Know when something is actually wrong." },
                    mod3: { title: "The Anti-Gravity Mindset", desc: "Stop chasing, start attracting." },
                    mod4: { title: "High-Value Scripting", desc: "What to say when you're stuck." }
                },
                bundle: {
                    title: "Masterclass + Book Bundle",
                    desc: "Lifetime access + 1-on-1 AI Consultation",
                    cta: "Join Now - ₹2499"
                }
            },
            book: {
                title1: "From Chaos",
                title2: "to Clarity.",
                description: "Siya gives you the answers; this book gives you the foundation. Learn the 5 Gaps of the Crush Phase and never feel \"creepy\" or \"ignored\" again.",
                points: {
                    p1: "Overcome the fear of rejection",
                    p2: "Master the art of 'Bids'",
                    p3: "Understand the 'Creep' factor"
                },
                cta: "Buy eBook - ₹499",
                cover: {
                    title: "The Manual",
                    subtitle: "To The Human Heart"
                }
            },
            footer: {
                tagline: "Bridging the gap between what is said and what is felt.",
                rights: "Siya AI. All rights reserved."
            }
        },
        Tamil: {
            hero: {
                title1: "புரிந்து கொள்ளுங்கள்",
                title2: "அவர்கள் உண்மையாக என்ன நினைக்கிறார்கள் என்பதை.",
                subtitle: "மனித இணைப்பின் மறைமுக சமிக்ஞைகளை உங்கள் தனிப்பட்ட AI ஆன்ம வாசிப்பாளரான சியாவுடன் கண்டறியுங்கள்.",
                cta: "சியாவை இப்போது முயற்சிக்கவும்",
            },
            siya: {
                title: "சியா",
                subtitle: "உங்கள் தனிப்பட்ட ஆன்ம வாசிப்பாளர்.",
                liveAnalysis: "நேரடி பகுப்பாய்வு",
                greeting: "வணக்கம், நான் சியா",
                question: "நாம் எங்கு தொடங்க வேண்டும்?",
                options: {
                    crush: "ஈர்ப்பு வெளிப்பாடு",
                    expert: "நிபுணர் குழு",
                    lust: "காமம் (வெளிப்படுத்துதல்)",
                },
                form: {
                    dressing: "உடை/ஒப்பனை",
                    energy: "ஆற்றல்",
                    vibe: "அதிர்வுகள்",
                    demeanor: "நடத்தை",
                    submit: "பகுப்பாய்வு செய்",
                    dressingPlaceholder: "எ.கா., சாதாரண, முறையான",
                    energyPlaceholder: "எ.கா., அதிகம், குறைவு",
                    vibePlaceholder: "எ.கா., நட்பு, ஊர்சுற்றல்",
                    demeanorPlaceholder: "எ.கா., திறந்த, மூடிய",
                },
                inputPlaceholder: "அவர்கள் என்ன சொன்னார்கள் அல்லது செய்தார்கள் என்பதை உள்ளிடவும்...",
                preview: "இலவச முன்னோட்டம் • ப்ரோ பதிப்பில் ஆழ்ந்த பகுப்பாய்வு உள்ளது",
                connectionError: "மன்னிக்கவும், இப்போது என் உள்ளுணர்வுடன் (மற்றும் சேவையகத்துடன்) இணைப்பதில் சிறிது சிக்கல் உள்ளது. மீண்டும் முயற்சிக்கவும்?",
            },
            philosophy: {
                title1: "ஈர்ப்பு விசை எதிர்ப்பு",
                title2: "தத்துவம்",
                description: "நீங்கள் மிகவும் கடினமாக இழுக்கும்போது உறவுகள் கனமாக இருக்கும். \"ஈர்ப்பு விசை எதிர்ப்பு\" அணுகுமுறை என்பது எதிர்பார்ப்பின் எடையை கைவிடுவதாகும்.",
                gravityTitle: "ஈர்ப்பு விசை (பிரச்சனை)",
                gravityDesc: "அதிகமாக சிந்திப்பது, துரத்துவது, அங்கீகாரத்தைத் தேடுவது மற்றும் உங்கள் தொடர்புகளில் \"கனமாக\" உணர்வது.",
                antiGravityTitle: "ஈர்ப்பு விசை எதிர்ப்பு (தீர்வு)",
                antiGravityDesc: "லேசான தன்மை, அபரிமிதமான மனநிலையை, சமிக்ஞைகளை துல்லியமாகப் படிப்பது மற்றும் இயற்கையாக ஈர்ப்பது.",
                gravityPage: {
                    title: "ஈர்ப்பு விசை: எதிர்பார்ப்பின் சுமை",
                    content: [
                        "உறவுகளை ஒரு இயற்பியல் விசையாக கற்பனை செய்து பாருங்கள். நீங்கள் எதையாவது மிகவும் மோசமாக விரும்பும்போது—உங்களுக்கு அங்கீகாரம் தேவைப்படும்போது, ஒருவரை இழக்க பயப்படும்போது, ஒவ்வொரு குறுஞ்செய்தியையும் தொடர்ந்து பகுப்பாய்வு செய்யும்போது—நீங்கள் 'ஈர்ப்பு விசையை' உருவாக்குகிறீர்கள்.",
                        "ஈர்ப்பு விசை கனமானது. அது மக்களை கீழே இழுக்கிறது. இது தொடர்புகளை கடினமாகவும் சோர்வாகவும் உணர வைக்கிறது. நீங்கள் ஈர்ப்பு விசை நிலையில் இருக்கும்போது, நீங்கள் அடிப்படையில் சொல்கிறீர்கள்: 'என்னை முழுமையாக்க நீங்கள் எனக்கு தேவை.'",
                        "இது எதிர்ப்பை உருவாக்குகிறது. நீங்கள் எவ்வளவு அதிகமாக இழுக்கிறீர்களோ, அவ்வளவு அதிகமாக அவர்கள் விலகிச் செல்கிறார்கள். இது மனித இணைப்பின் இயற்பியல். ஈர்ப்பு விசை பதட்டம், மீண்டும் மீண்டும் குறுஞ்செய்தி அனுப்புதல், அதிகமாக விளக்குதல் மற்றும் எதையாவது தவறாக செய்துவிடுவோமோ என்ற தொடர்ச்சியான பயமாக வெளிப்படுகிறது.",
                        "தீர்வு அக்கறை காட்டுவதை நிறுத்துவது அல்ல. அது பிடித்துக் கொண்டிருப்பதை நிறுத்துவதாகும்."
                    ],
                    imageAlt: "உணர்ச்சி ஈர்ப்பு விசையின் காட்சி பிரதிநிதித்துவம் - ஒரு நபருடன் இணைக்கப்பட்ட சரங்களை இழுக்கும் ஒரு கனமான, இருண்ட கோளம்"
                },
                antiGravityPage: {
                    title: "ஈர்ப்பு விசை எதிர்ப்பு: விட்டுவிடும் கலை",
                    content: [
                        "ஈர்ப்பு விசை எதிர்ப்பு என்பது உணர்ச்சி ரீதியான எடையின்மை நிலை. நீங்கள் சொந்தமாக முழுமையானவர் என்ற உணர்தல் அது. ஒரு குறிப்பிட்ட விளைவுக்கான தேவையை நீங்கள் கைவிடும்போது, நீங்கள் லேசாகிறீர்கள்.",
                        "இந்த நிலையில், நீங்கள் இழுக்கவில்லை. நீங்கள் உங்கள் சொந்த சுற்றுப்பாதையில் இருக்கிறீர்கள், உங்கள் சொந்த ஒளியை வீசுகிறீர்கள். ஒரு நட்சத்திரத்தைப் போலவே, உங்கள் ஈர்ப்பு விசை இயற்கையானதாகிறது—மக்கள் கட்டாயப்படுத்துவதால் அல்ல, ஆனால் உங்களுடன் இருப்பது நன்றாக இருப்பதால் உங்களிடம் ஈர்க்கப்படுகிறார்கள்.",
                        "ஈர்ப்பு விசை எதிர்ப்பு என்பது பற்றுதல் இல்லாத 'ஏலங்கள்'. நீங்கள் ஒரு சமிக்ஞையை (இணைப்புக்கான ஏலம்) அனுப்புகிறீர்கள், அது திரும்பப் பெறப்படாவிட்டால், நீங்கள் நகர்கிறீர்கள். நீங்கள் நொறுங்குவதில்லை. நீங்கள் சுழல்வதில்லை.",
                        "இந்த லேசான தன்மை காந்த சக்தி வாய்ந்தது. இது உயர் மதிப்பு, நம்பிக்கை மற்றும் பாதுகாப்பை சமிக்ஞை செய்கிறது. இது காதலை நடக்க அனுமதிக்கிறது, அதை நடக்க வைக்க முயற்சிப்பதற்கு பதிலாக."
                    ],
                    imageAlt: "ஈர்ப்பு விசை எதிர்ப்பின் காட்சி பிரதிநிதித்துவம் - ஒளி மற்றும் நட்சத்திரத் துகள்களால் சூழப்பட்டு சுதந்திரமாக மிதக்கும் ஒரு நபர்"
                }
            },
            course: {
                title1: "சமூக நுண்ணறிவு",
                title2: "மாஸ்டர்கிளாஸ்.",
                modules: {
                    mod1: { title: "ஈர்ப்பின் அறிவியல்", desc: "இணைப்புக்கான சிறிய அழைப்புகளை அங்கீகரிக்கவும்." },
                    mod2: { title: "அடிப்படைகளை மாஸ்டரிங் செய்தல்", desc: "ஏதோ தவறு என்று எப்போது தெரியும்." },
                    mod3: { title: "ஈர்ப்பு விசை எதிர்ப்பு மனநிலை", desc: "துரத்துவதை நிறுத்துங்கள், ஈர்க்கத் தொடங்குங்கள்." },
                    mod4: { title: "உயர்தர ஸ்கிரிப்டிங்", desc: "நீங்கள் சிக்கிக்கொண்டால் என்ன சொல்ல வேண்டும்." }
                },
                bundle: {
                    title: "மாஸ்டர்கிளாஸ் + புத்தகத் தொகுப்பு",
                    desc: "வாழ்நாள் அணுகல் + 1-ஆன்-1 AI ஆலோசனை",
                    cta: "இப்போது சேரவும் - ₹2499"
                }
            },
            book: {
                title1: "குழப்பத்திலிருந்து",
                title2: "தெளிவுக்கு.",
                description: "சியா உங்களுக்கு பதில்களைத் தருகிறார்; இந்த புத்தகம் உங்களுக்கு அடித்தளத்தை அளிக்கிறது. க்ரஷ் கட்டத்தின் 5 இடைவெளிகளைக் கற்றுக்கொள்ளுங்கள், இனி ஒருபோதும் \"தவறாக\" அல்லது \"புறக்கணிக்கப்பட்டதாக\" உணர வேண்டாம்.",
                points: {
                    p1: "நிராகரிப்பு பயத்தை வெல்லுங்கள்",
                    p2: "ஏலங்களின் கலையில் தேர்ச்சி பெறுங்கள்",
                    p3: "தவறான காரணியைப் புரிந்து கொள்ளுங்கள்"
                },
                cta: "மின்புத்தகத்தை வாங்கவும் - ₹499",
                cover: {
                    title: "கையேடு",
                    subtitle: "மனித இதயத்திற்கு"
                }
            },
            footer: {
                tagline: "சொல்லப்பட்டதற்கும் உணரப்பட்டதற்கும் இடையிலான இடைவெளியைக் குறைத்தல்.",
                rights: "சியா AI. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
            }
        },
        Tanglish: {
            hero: {
                title1: "Purinjukonga",
                title2: "avanga unmaiya enna ninaikiranga nu.",
                subtitle: "Human connectionoda hidden signals-a decode panna, ungaloda personal AI Heart Reader, Siya kooda serndhu kandupidinga.",
                cta: "Siya-va ippo try pannunga",
            },
            siya: {
                title: "Siya",
                subtitle: "Ungaloda personal Heart Reader.",
                liveAnalysis: "Live Analysis",
                greeting: "Hi, I am Siya",
                question: "Enga start pannalam?",
                options: {
                    crush: "Crush Unreveal",
                    expert: "Expert Panel",
                    lust: "Lust (Venting)",
                },
                form: {
                    dressing: "Dressing/Makeup",
                    energy: "Energy",
                    vibe: "Vibe",
                    demeanor: "Demeanor",
                    submit: "Analyze Pannu",
                    dressingPlaceholder: "e.g., Casual, Gethu, Trendy",
                    energyPlaceholder: "e.g., High, Low, Scene",
                    vibePlaceholder: "e.g., Friendly, Flirty, Kadupu",
                    demeanorPlaceholder: "e.g., Open, Closed, Shy",
                },
                inputPlaceholder: "Avanga enna sonnanga illana enna senjanga nu type pannunga...",
                preview: "Free Preview • Pro version-la deep analysis iruku",
                connectionError: "Sorry, ippo server connect panna mudiyala. Konja neram kazhichu try pannungala?",
            },
            philosophy: {
                title1: "The Anti-Gravity",
                title2: "Philosophy",
                description: "Relationships romba heavy-a feel agum, neenga romba try pannum podhu. \"Anti-Gravity\" approach-na expectations-a vitudradhu.",
                gravityTitle: "Gravity (The Problem)",
                gravityDesc: "Over-thinking, pinnadiye surthardhu, validation thedradhu, aprom interactions-la \"heavy\"-a feel panradhu.",
                antiGravityTitle: "Anti-Gravity (The Solution)",
                antiGravityDesc: "Light-a irukradhu, abundance mindset, signals-a correct-a read panradhu, aprom natural-a attract panradhu.",
                gravityPage: {
                    title: "Gravity: Expectationoda Weight",
                    content: [
                        "Relationships-a oru physical force-a imagine pannikonga. Neenga edhavadhu romba venum nu ninaikum podhu—ungaluku validation thevai padum podhu, yarayachum lose panna bayapadum podhu, ovvoru text-ayum analyze pannitu irukum podhu—neenga 'Gravity'-a create panreenga.",
                        "Gravity romba heavy. Adhu aalungala keeza izhukkum. Idhu interactions-a romba kasta paduthum. Neenga Gravity state-la irukum podhu, neenga solreenga: 'Enna complete panna nee enakku thevai.'",
                        "Idhu resistance-a undu pannum. Neenga evlo izhukureengalo, avlo avanga vilagi povanga. Idhu human connectionoda physics. Gravity anxiety, double-texting, over-explaining, aprom edhavadhu thappa panniduvomo ngra bayama velipadum.",
                        "Solution care panradha niruthuradhu illa. Iruki pudikradha vidradhu."
                    ],
                    imageAlt: "Emotional gravityoda visual representation - oru aaloda katti iruka kayira izhukura oru heavy dark sphere"
                },
                antiGravityPage: {
                    title: "Anti-Gravity: Vitudrada Art",
                    content: [
                        "Anti-Gravity ngradhu emotional weightlessness state. Neenga thaniya irundhale complete ngra realization adhu. Oru vishiyam ipdi dhab nadakanum ngra thevaya vidum podhu, neenga light aagiduveenga.",
                        "Indha state-la, neenga izhukala. Neenga unga orbit-la irukeenga, unga light-a veesi eriyireenga. Oru star madhiriye, unga gravity natural aagudhu—neenga force panradhala illa, unga kooda iruka nalla iruku ngardhunala aalunga ungaluku attract aagranga.",
                        "Anti-Gravity ngradhu attachment illadha 'Bids'. Neenga oru signal (connectionkaga) anupureenga, adhu thirumba varlena, neenga poitue irukeenga. Neenga odanjidamatteenga. Neenga spiral aagamateenga.",
                        "Indha lightness magnetic ah iruku. Idhu high value, confidence, and safety-a signal pannudhu. Love-a nadaka veika try panradhu illa, adhuva nadaka allow panradhu."
                    ],
                    imageAlt: "Anti-gravityoda visual representation - light and stardust aala suzha pattu free-a midhakura oru person"
                }
            },
            course: {
                title1: "The Social Intelligence",
                title2: "Masterclass.",
                modules: {
                    mod1: { title: "The Science of Bids", desc: "Connection-kaga varra chinna invitations-a kandupidinga." },
                    mod2: { title: "Mastering Baselines", desc: "Edho thappa iruku nu eppo kandupikradhu." },
                    mod3: { title: "The Anti-Gravity Mindset", desc: "Chase panradha niruthunga, attract panna start pannunga." },
                    mod4: { title: "High-Value Scripting", desc: "Neenga stuck agum podhu enna sollanum." }
                },
                bundle: {
                    title: "Masterclass + Book Bundle",
                    desc: "Lifetime access + 1-on-1 AI Consultation",
                    cta: "Join Now - ₹2499"
                }
            },
            book: {
                title1: "From Chaos",
                title2: "to Clarity.",
                description: "Siya ungalukku answers tharum; indha book ungalukku foundation tharum. Crush Phase-oda 5 Gaps-a kathukonga, ini eppovum \"creepy\"-ah vo illana \"ignored\"-ah vo feel pannadhinga.",
                points: {
                    p1: "Rejection bayatha thooki podunga",
                    p2: "'Bids' art-a master pannunga",
                    p3: "'Creep' factor-a purinjukonga"
                },
                cta: "Buy eBook - ₹499",
                cover: {
                    title: "The Manual",
                    subtitle: "To The Human Heart"
                }
            },
            footer: {
                tagline: "Sonnadhukkum, unarndhadhukkum naduvala irukkura gap-a kuraikradhu.",
                rights: "Siya AI. All rights reserved."
            }
        },
        Hindi: {
            hero: {
                title1: "समझें",
                title2: "कि वे वास्तव में क्या मतलब रखते हैं।",
                subtitle: "सिया, आपके व्यक्तिगत एआई हार्ट रीडर के साथ मानवीय संबंधों के छिपे हुए संकेतों को डिकोड करें।",
                cta: "सिया को अभी आज़माएं",
            },
            siya: {
                title: "सिया",
                subtitle: "आपका व्यक्तिगत हार्ट रीडर।",
                liveAnalysis: "लाइव विश्लेषण",
                greeting: "नमस्ते, मैं सिया हूँ",
                question: "हमें कहाँ से शुरू करना चाहिए?",
                options: {
                    crush: "क्रश का खुलासा",
                    expert: "विशेषज्ञ पैनल",
                    lust: "लस्ट (वेंटिंग)",
                },
                form: {
                    dressing: "ड्रेसिंग/मेकअप",
                    energy: "ऊर्जा",
                    vibe: "वाइब",
                    demeanor: "व्यवहार",
                    submit: "विश्लेषण करें",
                    dressingPlaceholder: "जैसे, कैजुअल, फॉर्मल, ट्रेंडी",
                    energyPlaceholder: "जैसे, उच्च, निम्न, नर्वस",
                    vibePlaceholder: "जैसे, दोस्ताना, इश्कबाज, दूर",
                    demeanorPlaceholder: "जैसे, खुला, बंद, शर्मीला",
                },
                inputPlaceholder: "टाइप करें कि उन्होंने क्या कहा या किया...",
                preview: "निःशुल्क पूर्वावलोकन • प्रो संस्करण में गहरा विश्लेषण शामिल है",
                connectionError: "क्षमा करें, मुझे अभी अपने अंतर्ज्ञान (और सर्वर) से जुड़ने में थोड़ी परेशानी हो रही है। पुन: प्रयास करें?",
            },
            philosophy: {
                title1: "एंटी-ग्रेविटी",
                title2: "दर्शन",
                description: "रिश्ते तब भारी लगते हैं जब आप बहुत ज्यादा खींच रहे होते हैं। \"एंटी-ग्रेविटी\" दृष्टिकोण अपेक्षा के बोझ को छोड़ने के बारे में है।",
                gravityTitle: "ग्रेविटी (समस्या)",
                gravityDesc: "ज़रूरत से ज़्यादा सोचना, पीछा करना, मान्यता प्राप्त करना, और अपनी बातचीत में \"भारी\" महसूस करना।",
                antiGravityTitle: "एंटी-ग्रेविटी (समाधान)",
                antiGravityDesc: "हल्कापन, प्रचुरता की मानसिकता, संकेतों को सही ढंग से पढ़ना, और स्वाभाविक रूप से आकर्षित करना।",
                gravityPage: {
                    title: "ग्रेविटी: अपेक्षा का बोझ",
                    content: [
                        "रिश्तों को एक भौतिक शक्ति के रूप में कल्पना करें। जब आप किसी चीज़ को बहुत बुरी तरह चाहते हैं—जब आपको मान्यता की आवश्यकता होती है, जब आप किसी को खोने से डरते हैं, जब आप लगातार हर टेक्स्ट का विश्लेषण कर रहे होते हैं—तो आप 'ग्रेविटी' बनाते हैं।",
                        "ग्रेविटी भारी होती है। यह लोगों को नीचे खींचती है। यह बातचीत को कठिन और थकाऊ महसूस कराती है। जब आप ग्रेविटी की स्थिति में होते हैं, तो आप अनिवार्य रूप से कह रहे होते हैं: 'मुझे पूरा करने के लिए आपकी आवश्यकता है।'",
                        "यह प्रतिरोध पैदा करता है। आप जितना अधिक खींचते हैं, वे उतना ही दूर हटते हैं। यह मानवीय संबंधों का भौतिकी है। ग्रेविटी चिंता, डबल-टेक्स्टिंग, अधिक समझाने और कुछ गलत करने के निरंतर डर के रूप में प्रकट होती है।",
                        "समाधान परवाह करना बंद करना नहीं है। यह पकड़ना बंद करना है।"
                    ],
                    imageAlt: "भावनात्मक ग्रेविटी का एक दृश्य प्रतिनिधित्व - एक भारी, अंधेरा गोला जो किसी व्यक्ति से जुड़ी डोरियों को खींच रहा है"
                },
                antiGravityPage: {
                    title: "एंटी-ग्रेविटी: जाने देने की कला",
                    content: [
                        "एंटी-ग्रेविटी भावनात्मक भारहीनता की स्थिति है। यह अहसास है कि आप अपने आप में पूर्ण हैं। जब आप किसी विशिष्ट परिणाम की आवश्यकता को छोड़ देते हैं, तो आप हल्के हो जाते हैं।",
                        "इस स्थिति में, आप खींच नहीं रहे हैं। आप बस अपनी कक्षा में मौजूद हैं, अपनी खुद की रोशनी बिखेर रहे हैं। और एक तारे की तरह, आपकी ग्रेविटी स्वाभाविक हो जाती है—लोग आपकी ओर इसलिए नहीं खिंचे चले आते क्योंकि आप उन्हें मजबूर कर रहे हैं, बल्कि इसलिए कि आपके आसपास रहना अच्छा लगता है।",
                        "एंटी-ग्रेविटी लगाव के बिना 'बिड्स' के बारे में है। आप एक संकेत (कनेक्शन के लिए एक बिड) भेजते हैं, और अगर यह वापस नहीं मिलता है, तो आप आगे बढ़ जाते हैं। आप टूटते नहीं हैं। आप सर्पिल नहीं होते हैं।",
                        "यह हल्कापन चुंबकीय है। यह उच्च मूल्य, आत्मविश्वास और सुरक्षा का संकेत देता है। यह प्यार को होने देता है, बजाय इसे होने देने की कोशिश करने के।"
                    ],
                    imageAlt: "एंटी-ग्रेविटी का एक दृश्य प्रतिनिधित्व - प्रकाश और स्टारडस्ट से घिरा हुआ एक व्यक्ति स्वतंत्र रूप से तैर रहा है"
                }
            },
            course: {
                title1: "सोशल इंटेलिजेंस",
                title2: "मास्टरक्लास।",
                modules: {
                    mod1: { title: "बिड्स का विज्ञान", desc: "कनेक्शन के लिए छोटे निमंत्रणों को पहचानें।" },
                    mod2: { title: "बेसलाइन्स में महारत हासिल करना", desc: "जानें कि कब कुछ वास्तव में गलत है।" },
                    mod3: { title: "एंटी-ग्रेविटी मानसिकता", desc: "पीछा करना बंद करो, आकर्षित करना शुरू करो।" },
                    mod4: { title: "उच्च-मूल्य स्क्रिप्टिंग", desc: "जब आप फंस जाएं तो क्या कहें।" }
                },
                bundle: {
                    title: "मास्टरक्लास + बुक बंडल",
                    desc: "जीवन भर की पहुंच + 1-ऑन-1 एआई परामर्श",
                    cta: "अभी शामिल हों - ₹2499"
                }
            },
            book: {
                title1: "अराजकता से",
                title2: "स्पष्टता तक।",
                description: "सिया आपको उत्तर देती है; यह पुस्तक आपको आधार देती है। क्रश चरण के 5 अंतरालों को जानें और फिर कभी \"डरावना\" या \"अनदेखा\" महसूस न करें।",
                points: {
                    p1: "अस्वीकृति के डर को दूर करें",
                    p2: "'बिड्स' की कला में महारत हासिल करें",
                    p3: "'क्रीप' कारक को समझें"
                },
                cta: "ईबुक खरीदें - ₹499",
                cover: {
                    title: "मैनुअल",
                    subtitle: "मानव हृदय के लिए"
                }
            },
            footer: {
                tagline: "जो कहा गया और जो महसूस किया गया, उसके बीच की खाई को पाटना।",
                rights: "सिया एआई. सर्वाधिकार सुरक्षित।"
            }
        },
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key; // Return key if translation missing
    };

    const value = {
        language,
        setLanguage,
        t,
        translations // Exposing full object if needed
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
