/* =====================================================================
   GLOBAL CONFLICT MONITOR v2 — DATA COMPILED 27 SEPTEMBER 2026
   40 tracked zones. Compiled from public news reporting: AP, Reuters,
   BBC, Al Jazeera, UN News, ACLED, CFR Global Conflict Tracker, Crisis
   Group, HRW World Report 2026, Wikipedia timelines, Ukrinform, Sudan
   Tribune, Asia Times, NDTV, Euronews, Daily Post Nigeria & others.
   Figures are best available estimates and evolve daily.
   ===================================================================== */

const COMPILED = "27 September 2026";

const CAT = {
  war:        { label: "Major war / interstate",          color: 0xff4d5a, css: "#ff4d5a" },
  civil:      { label: "Civil war / insurgency",          color: 0xff9838, css: "#ff9838" },
  terror:     { label: "Jihadist / terrorist violence",   color: 0xffd147, css: "#ffd147" },
  flashpoint: { label: "Flashpoint / interstate tension", color: 0xc084fc, css: "#c084fc" },
  criminal:   { label: "Cartel / criminal war",           color: 0x2dd4bf, css: "#2dd4bf" }
};

const CONFLICTS = [
  /* ================= EUROPE ================= */
  { id:"ukraine", name:"Russia–Ukraine War", region:"Eastern Europe", lat:49.0, lon:31.5, cat:"war", intensity:5, status:"Worsening",
    since:"Feb 2022", casualties:"Hundreds of thousands of soldiers killed or wounded; 200+ civilians killed in Sept 2026 alone",
    displaced:"Millions displaced at home and abroad", parties:["Russia","Ukraine"],
    summary:"Europe's largest conventional war since WWII grinds into its fourth year. September brought a 'new intensity' in Russian missile, glide-bomb and jet-Shahed strikes on Ukrainian cities — while Ukraine answered with its biggest-ever drone campaign deep inside Russia, including Moscow.",
    news:[
      {date:"2026-09-26",src:"Ukrinform",text:"Russian strikes kill and wound civilians across Kyiv, Sumy and Kharkiv; Kyiv hit on 16 of September's first 24 days — the highest monthly frequency since the full-scale invasion began."},
      {date:"2026-09-24",src:"UN News",text:"UN monitors record at least 200 civilians killed and 1,234 injured between 1–24 September; 7 farm workers die in a strike on a vegetable warehouse in Kharkiv region."},
      {date:"2026-09-21",src:"ISW",text:"Russia has launched 7,700+ jet-powered Shahed-type drones at Ukraine, including 1,900 in September; Ukraine keeps striking drone ports and airfields deep inside Russia."},
      {date:"2026-09-20",src:"Media",text:"Ukraine launches ~1,000 drones at Russia in its biggest-ever strike package, reaching Moscow."}]},

  /* ================= MIDDLE EAST / IRAN WAR THEATER ================= */
  { id:"gaza", name:"Israel–Hamas War / Gaza", region:"Middle East", lat:31.42, lon:34.35, cat:"war", intensity:4, status:"Fragile ceasefire",
    since:"Oct 2023", casualties:"74,016 Palestinians killed since Oct 2023; 1,145 since the ceasefire",
    displaced:"Most of Gaza's ~2M population remains displaced", parties:["Israel","Hamas"],
    summary:"A US-brokered ceasefire has held since 10 October 2025, but it has not ended the violence. Israeli forces control over half the strip behind the 'Yellow Line', Hamas refuses to disarm, and daily strikes, shelling and demolitions continue. Israeli media report preparations to resume full-scale operations.",
    news:[
      {date:"2026-09-27",src:"AP / TimesLive",text:"Gaza health ministry puts the death toll at 74,016, with 1,145 Palestinians killed since the ceasefire; seven Israeli soldiers killed in the same period. Disarmament, governance and reconstruction remain stalled."},
      {date:"2026-09-25",src:"PIC / Palinfo",text:"Ceasefire violations continue into day 351: drone strikes on tents in central Gaza, artillery fire south of Khan Yunis and demolitions across the strip."},
      {date:"2026-05-07",src:"BBC",text:"Fears of renewed Gaza war as disarmament talks stall; Israel weighs expanding the Yellow Line marking ~60% of Gaza under military control."}]},

  { id:"iran", name:"2026 Iran War", region:"Middle East · Gulf", lat:27.15, lon:56.2, cat:"war", intensity:5, status:"Escalating",
    since:"Feb 2026", casualties:"Thousands killed since late February; strikes on both sides ongoing",
    displaced:"—", parties:["United States","Israel","Iran / IRGC"],
    summary:"The 2026 Iran war erupted on 28 February when large-scale US-Israeli strikes killed senior Iranian leaders, including Supreme Leader Ali Khamenei. September saw renewed waves of US strikes on IRGC targets across southern Iran and Iranian missile attacks on US bases in Bahrain, Jordan and Iraq and on US warships. Oil has blown past $90 as the Strait of Hormuz becomes the world's most dangerous chokepoint.",
    news:[
      {date:"2026-09-25",src:"Wikipedia / media",text:"September US strikes hit Sirik, Konarak, Bandar Abbas, Jask, Asaluyeh, Ahvaz and Qeshm Island; Iran calls a strike that killed five at a wedding near Kuhestak a 'war crime'."},
      {date:"2026-09-09",src:"CENTCOM",text:"CENTCOM strikes five IRGC-linked crude oil carriers after the Revolutionary Guard twice fires ballistic missiles at a US Navy warship; Iran claims hits on a US carrier and destroyer."},
      {date:"2026-09-01",src:"Washington Post",text:"US strikes IRGC targets after a month of quiet; Iran retaliates with missiles and drones. Crude oil breaks $90 per barrel on escalation fears."}]},

  { id:"iraq", name:"Iraq — Militia Front", region:"Middle East", lat:33.3, lon:43.8, cat:"war", intensity:3, status:"Active",
    since:"Feb 2026 (Iran war front)", casualties:"Dozens killed in strikes and reprisals in 2026",
    displaced:"—", parties:["Islamic Resistance in Iraq","United States","Israel","PMF"],
    summary:"Iraq has become a key front of the Iran war. The 'Islamic Resistance in Iraq' claims 23 drone operations in a single day against US bases in Erbil, Baghdad and the wider region; US-Israeli airstrikes hit Kataib Hezbollah sites at Jurf al-Nasr and along the Iran–Iraq border as Washington weighs arming Iranian-Kurdish opposition.",
    news:[
      {date:"2026-03-25",src:"Middle East Monitor",text:"Islamic Resistance in Iraq claims 23 military operations in one day against US bases inside Iraq and the region, using drones and rockets."},
      {date:"2026-03-17",src:"Anadolu",text:"Suicide drone attack lands near the US embassy compound in Baghdad as the militia front intensifies."},
      {date:"2026-03-06",src:"The Guardian",text:"Iraq emerges as a key front in the clandestine confrontation; US and Israeli special forces operations reported against pro-Iran militias."}]},

  { id:"lebanon", name:"Lebanon — Renewed Israel War", region:"Middle East", lat:33.9, lon:35.85, cat:"war", intensity:4, status:"Escalating",
    since:"Mar 2026", casualties:"4,362+ killed in Israeli attacks since 2 March 2026",
    displaced:"New displacement waves in south Lebanon and the Bekaa", parties:["Israel","Hezbollah"],
    summary:"The Lebanon front has reopened. Israeli attacks since 2 March 2026 have killed more than 4,360 people according to Lebanon's health ministry, with strikes continuing daily and diplomacy stuck inside the wider Iran war.",
    news:[
      {date:"2026-09-07",src:"Lebanese Health Ministry",text:"At least 4,362 people killed in Israeli attacks since 2 March 2026, including 11 in the past 24 hours."},
      {date:"2026-09-20",src:"Reuters",text:"UN General Assembly hears warnings that the Lebanon front risks further escalation as the Iran war widens."}]},

  { id:"yemen", name:"Yemen — Houthi War & Red Sea", region:"Arabian Peninsula", lat:15.35, lon:44.2, cat:"civil", intensity:3, status:"Active",
    since:"2014 (Red Sea phase since 2023)", casualties:"150,000+ killed over the war's lifetime",
    displaced:"4.5+ million displaced", parties:["Houthis","Recognized government","Saudi-led coalition","US/UK"],
    summary:"Yemen's war has fused with the Iran confrontation. Government forces declared a 'kill zone' around the Red Sea port of Mokha, Houthi projectiles now reach Saudi Arabia's Jazan region, and Bab el-Mandeb shipping remains under threat.",
    news:[
      {date:"2026-09-13",src:"Yemeni Armed Forces",text:"Government air force says it is destroying Houthi equipment and fighters inside a declared kill zone around Mokha and Dhubab."},
      {date:"2026-09-12",src:"Saudi Civil Defense",text:"A Houthi projectile strikes Al-Tuwal in Saudi Arabia's Jazan region, wounding two and damaging a mosque — a rare hit on Saudi soil."}]},

  { id:"redsea", name:"Red Sea Shipping War", region:"Bab el-Mandeb · maritime", lat:14.2, lon:40.2, cat:"flashpoint", intensity:3, status:"Active",
    since:"Nov 2023", casualties:"Seafarers killed; dozens of vessels hit",
    displaced:"—", parties:["Houthis / Iran-linked actors","US-led coalition","Merchant shipping"],
    summary:"The world's most attacked trade artery. Houthi missiles, drones and boat-borne attacks keep forcing rerouting around the Cape of Good Hope; insurers and navies treat the Bab el-Mandeb corridor as a live combat zone.",
    news:[
      {date:"2026-09-20",src:"Reuters",text:"Houthi activity continues to disrupt Red Sea shipping, oil flows and regional stability, the UN General Assembly hears."},
      {date:"2026-08-17",src:"Maritime reporting",text:"Cargo vessel boarded and 'controlled' off the Horn of Africa, showing the widening threat envelope near the corridor."}]},

  { id:"hormuz", name:"Strait of Hormuz Standoff", region:"Gulf · maritime", lat:26.6, lon:57.0, cat:"flashpoint", intensity:4, status:"Critical",
    since:"2026", casualties:"—", displaced:"—",
    parties:["United States","Iran / IRGC","Tanker operators"],
    summary:"The 'tanker for tanker' war. After IRGC mining attempts and missile shots at US warships, CENTCOM began sinking IRGC-linked crude carriers; Iran retaliates against US bases in Bahrain, Jordan and Iraq. A fifth of the world's oil transits this 33-km strait — and the market is pricing the risk above $90 a barrel.",
    news:[
      {date:"2026-09-09",src:"CENTCOM",text:"Five IRGC oil carriers struck after ballistic missiles are fired at a US Navy warship; the 'tanker for tanker' policy is declared."},
      {date:"2026-09-01",src:"Wikipedia timeline",text:"Crude tops $90 a barrel as reciprocal strikes around Hormuz escalate; Kuwait's air defences intercept Iranian drones and missiles."}]},

  { id:"westbank", name:"West Bank Crisis", region:"Middle East", lat:32.0, lon:35.2, cat:"war", intensity:2, status:"Worsening",
    since:"Oct 2023 escalation", casualties:"Thousands killed since Oct 2023",
    displaced:"Tens of thousands displaced by camp operations", parties:["Israel","PA","Armed factions","Settlers"],
    summary:"Military raids, camp demolitions and settler violence keep the West Bank at a rolling boil while Gaza's ceasefire holds only partially. UN rights monitors document killings and displacement across the territory through 2026.",
    news:[
      {date:"2026-09-01",src:"UN OHCHR",text:"UN human rights office reports continued civilian deaths and demolitions in West Bank operations, stressing international law obligations."}]},

  { id:"syria", name:"Syria — Counter-ISIS Campaign", region:"Middle East", lat:35.0, lon:38.5, cat:"terror", intensity:2, status:"Active",
    since:"2011 war; ISIS phase ongoing", casualties:"Low-intensity but persistent attacks",
    displaced:"Millions still displaced after 15 years of war", parties:["US / partner forces","ISIS remnants","Transitional authorities"],
    summary:"ISIS remnants keep ambushing patrols and infrastructure in the Syrian desert. CENTCOM's Operation Hawkeye Strike, launched 19 December 2025 after an attack on US and partner forces, continues into September 2026.",
    news:[
      {date:"2026-09-01",src:"CENTCOM / trackers",text:"US and partner forces continue counter-ISIS strikes under Operation Hawkeye Strike."}]},

  /* ================= AFRICA ================= */
  { id:"sudan", name:"Sudan Civil War", region:"East Africa", lat:14.5, lon:29.5, cat:"civil", intensity:5, status:"Worsening",
    since:"Apr 2023", casualties:"~150,000 civilians estimated killed",
    displaced:"~12 million displaced — world's largest displacement crisis", parties:["SAF","RSF"],
    summary:"The world's worst humanitarian catastrophe. The SAF and RSF have redoubled combat and drone strikes across Kordofan, Blue Nile and Darfur even as Washington declares both generals 'ineligible to govern'. Defections hint at cracks inside the RSF.",
    news:[
      {date:"2026-09-27",src:"Sudan Tribune",text:"RSF splinter commander Al-Tayeb al-Wahidu defects to the army in Omdurman with 50 fighters — the latest in a wave of cross-line defections."},
      {date:"2026-09-25",src:"Sudan Tribune",text:"SAF drone strike on al-Mazrub kills nine civilians; RSF strike on a displacement centre in El Obeid kills two and injures 20."},
      {date:"2026-09-22",src:"The National",text:"US declares SAF and RSF leaders ineligible to govern and vows more pressure; Burhan denied a US visa for the UN General Assembly."}]},

  { id:"southsudan", name:"South Sudan — Renewed Civil War", region:"East Africa", lat:8.3, lon:32.0, cat:"civil", intensity:4, status:"Escalating",
    since:"Dec 2024 collapse of peace deal", casualties:"Scores killed in intercommunal attacks; toll rising",
    displaced:"280,000+ displaced in Jonglei alone", parties:["SPLM-IG / SSPDF","SPLA-IO","Armed youth militias"],
    summary:"South Sudan is sliding back into full war. Opposition SPLA-IO forces captured Pulchuol and pushed toward Yuai and Pathai in Jonglei; government aerial bombardments and armed-youth mobilization spread fear of a repeat of 2013–16. Riek Machar is on trial, and President Kiir is pushing elections for 22 December regardless.",
    news:[
      {date:"2026-08-10",src:"Crisis Group",text:"SPLA-IO captures Pulchuol in Jonglei and advances toward strategic towns; a government counteroffensive is repelled. 'Halting South Sudan's slide into war'."},
      {date:"2026-02-10",src:"UN Security Council",text:"UN peacekeeping chief warns political deadlock is driving armed confrontations 'in many parts of the country'; 280,000+ displaced in Jonglei."},
      {date:"2026-01-18",src:"UN Commission on Human Rights",text:"Repeated aerial bombardments by the SSPDF, clashes with SPLA-IO and mobilisation of civilian militias reported across Jonglei."}]},

  { id:"ethiopia", name:"Ethiopia — Renewed Tigray War", region:"Horn of Africa", lat:14.1, lon:38.3, cat:"civil", intensity:4, status:"Rapidly escalating",
    since:"Aug 2026 (Pretoria deal collapsing)", casualties:"Rising; hard to verify under communications blackout",
    displaced:"New displacement waves in Amhara and Tigray", parties:["Federal government (ENDF)","TPLF","7 allied armed groups"],
    summary:"War has returned four years after the Pretoria agreement. Fighting between federal forces and the TPLF began near the Sudanese border on 1 August and is spreading — with federal drone strikes, a blackout across Tigray and seven armed groups forming an anti-government alliance.",
    news:[
      {date:"2026-09-25",src:"ACLED",text:"ACLED dates the renewed TPLF–federal fighting to 1 August near the Sudan border and warns it could spread across the Horn of Africa."},
      {date:"2026-09-24",src:"Reuters",text:"Seven Ethiopian armed groups announce a joint anti-government alliance as the federal military carries out drone strikes against Tigrayan forces."}]},

  { id:"ethamhara", name:"Ethiopia — Amhara / Fano War", region:"Horn of Africa", lat:12.03, lon:39.04, cat:"civil", intensity:3, status:"Escalating",
    since:"Aug 2023", casualties:"Thousands killed since 2023",
    displaced:"Hundreds of thousands displaced in Amhara", parties:["ENDF","Fano militias"],
    summary:"The Amhara insurgency has fused with the renewed Tigray front. Active fighting is now reported near the historic town of Lalibela, flights are suspended, and the US embassy warns travelers away from Amhara, Tigray and Afar.",
    news:[
      {date:"2026-09-25",src:"US Embassy Addis Ababa",text:"US embassy reports active fighting near Lalibela; Ethiopian Airlines halts flights there; internet and phone services shut down across Tigray."}]},

  { id:"somalia", name:"Somalia — al-Shabaab Insurgency", region:"Horn of Africa", lat:2.05, lon:45.3, cat:"terror", intensity:3, status:"Sustained",
    since:"2006", casualties:"Thousands killed per year",
    displaced:"3.8+ million displaced", parties:["Federal Government","al-Shabaab","US AFRICOM / AUSSOM"],
    summary:"Al-Shabaab keeps striking Somali and African Union forces while US AFRICOM airstrikes roll on. The militants also press toward the coast and the Horn's shipping lanes.",
    news:[
      {date:"2026-09-11",src:"AFRICOM",text:"US AFRICOM strikes al-Shabaab fighters near Quumbi, northwest of Kismayo."},
      {date:"2026-08-17",src:"Maritime reporting",text:"Cargo vessel boarded 4 NM south of Mareeyo — a reminder of al-Shabaab's reach toward coastal shipping."}]},

  { id:"mali", name:"Mali — Jihadist Siege", region:"West Africa · Sahel", lat:16.3, lon:-0.6, cat:"terror", intensity:4, status:"Worsening",
    since:"2012", casualties:"Thousands killed in 2026; violence sharply up (ACLED)",
    displaced:"Hundreds of thousands displaced", parties:["JNIM (al-Qaeda)","IS-Sahara","Malian junta + Russian Africa Corps"],
    summary:"JNIM blockades and attacks tighten around towns as the junta and Russian Africa Corps ramp up operations. ACLED data show violence rising sharply in 2026, with reports of massacres of ethnic Fulani civilians during counter-insurgency sweeps.",
    news:[
      {date:"2026-09-15",src:"ACLED-based reporting",text:"Violence linked to al-Qaida and IS affiliates rises sharply across the Sahel in 2026, with Mali among the hardest hit."},
      {date:"2026-08-20",src:"Media analysis",text:"Reports say Russian-backed Africa Corps mercenaries executed ethnic Fulani civilians during operations in central Mali."}]},

  { id:"burkina", name:"Burkina Faso — Jihadist Insurgency", region:"West Africa · Sahel", lat:13.0, lon:-1.7, cat:"terror", intensity:4, status:"Worsening",
    since:"2015", casualties:"Thousands of civilians killed since 2022",
    displaced:"2+ million internally displaced", parties:["JNIM","IS-Sahara","Burkinabè junta + Volunteers for the Defense of the Homeland"],
    summary:"Burkina Faso has become one of the world's deadliest conflict zones. Jihadist groups control or contest large rural areas; the junta's mass mobilisation of civilian auxiliaries has fuelled cycles of attacks and reprisals.",
    news:[
      {date:"2026-09-15",src:"ACLED-based reporting",text:"ACLED-linked data show a sharp 2026 rise in attacks attributed to al-Qaida and IS affiliates across Burkina Faso's north and east."}]},

  { id:"niger", name:"Niger — Borderland Insurgency", region:"West Africa · Sahel", lat:14.2, lon:1.45, cat:"terror", intensity:3, status:"Active",
    since:"2015", casualties:"Hundreds of soldiers and civilians killed in 2026",
    displaced:"Hundreds of thousands displaced", parties:["IS-Sahara","JNIM","Nigerien junta"],
    summary:"The tri-border 'Liptako-Gourma' region remains a jihadist heartland. IS-Sahara raids outposts around Tillabéri while the junta, having expelled Western forces, leans on Russia-linked partners.",
    news:[
      {date:"2026-09-15",src:"ACLED-based reporting",text:"Violence attributed to IS and al-Qaida affiliates rises sharply in western Niger in 2026, per ACLED-derived analysis."}]},

  { id:"nigeria", name:"Nigeria — Banditry & ISWAP", region:"West Africa", lat:11.8, lon:13.2, cat:"terror", intensity:4, status:"Worsening",
    since:"2009 (Boko Haram); banditry surge post-2019", casualties:"Thousands killed and kidnapped annually",
    displaced:"3.5+ million displaced in the northeast and northwest", parties:["ISWAP / Boko Haram JAS","Armed bandit gangs","Nigerian military"],
    summary:"A multi-front crisis: ISWAP and resurgent Boko Haram raid Borno, while mass-kidnapping banditry terrorises Zamfara, Kaduna and Katsina. CFR's security tracker logs attacks, abductions and killings almost daily across the north.",
    news:[
      {date:"2026-09-29",src:"CFR Nigeria Security Tracker",text:"Bandits kill a customs officer in Katsina; troops kill 'many' Boko Haram militants in Bama; vigilantes kill 31 bandits in Zamfara — a typical week."},
      {date:"2026-09-24",src:"Daily Post Nigeria",text:"Boko Haram/ISWAP attack on Wumbi in Borno kills a vigilante commander and four others; a booby-trapped device kills four more during recovery."},
      {date:"2026-02-04",src:"Human Rights Watch",text:"HRW: insurgents killed at least 60 people in an attack on Darul Jamal in Bama; 2,938 people kidnapped in the Northwest between July 2024 and June 2025."}]},

  { id:"cameroon", name:"Cameroon — Anglophone Crisis", region:"Central Africa", lat:5.95, lon:10.1, cat:"civil", intensity:2, status:"Simmering",
    since:"2017", casualties:"6,000+ killed since 2017",
    displaced:"700,000+ displaced", parties:["Separatist fighters","Cameroonian military"],
    summary:"The 'Anglophone crisis' in the Northwest and Southwest regions simmers on: separatist ambushes, 'ghost town' enforcement, kidnappings and military raids continue with little international attention.",
    news:[
      {date:"2026-02-04",src:"HRW World Report 2026",text:"HRW documents continued attacks on civilians by separatist fighters and security forces in the Northwest and Southwest regions."}]},

  { id:"drc", name:"DR Congo — M23 War", region:"Central Africa", lat:-1.68, lon:29.22, cat:"civil", intensity:4, status:"Worsening",
    since:"2022 offensive; 100+ armed groups", casualties:"Thousands killed in 2025–26 offensives",
    displaced:"7+ million internally displaced", parties:["DRC government (FARDC)","M23 / AFC","100+ local armed groups"],
    summary:"M23, which captured Goma earlier this year, keeps significant territory in North and South Kivu despite US-brokered and Qatar-mediated diplomacy. Fighting persists as Congolese and Rwandan officials meet in Geneva; competition over critical minerals keeps the war economy humming.",
    news:[
      {date:"2026-09-22",src:"CFR Global Conflict Tracker",text:"CFR classifies the DRC conflict as worsening; M23 holds significant territory and 7+ million people are displaced."},
      {date:"2026-09-15",src:"Media",text:"Congolese and Rwandan officials schedule Geneva security talks even as combat continues in the Kivus."}]},

  { id:"drcadf", name:"DR Congo — ADF & Ituri Violence", region:"Central Africa", lat:0.5, lon:29.5, cat:"terror", intensity:3, status:"Active",
    since:"1990s (ADF resurgent since 2019)", casualties:"Hundreds of civilians killed in 2026",
    displaced:"1.5+ million displaced in Ituri & North Kivu", parties:["ADF (IS-linked)","FARDC","UPDF (Uganda)","Local militias"],
    summary:"While cameras focus on M23, the Allied Democratic Forces keep slaughtering villagers around Beni and Irumu, and Ituri's communal militias have never disarmed. Ugandan UPDF units operate inside Congo under Operation Shujaa.",
    news:[
      {date:"2026-09-10",src:"ACLED / trackers",text:"ADF raids and reprisals continue around Beni and Irumu; Ituri militia attacks keep displacement above a million."}]},

  { id:"mozambique", name:"Mozambique — Cabo Delgado Insurgency", region:"Southern Africa", lat:-12.97, lon:40.5, cat:"terror", intensity:3, status:"Spreading",
    since:"2017", casualties:"6,418+ killed since 2017 (ACLED)",
    displaced:"300,000 displaced since July 2026 alone", parties:["Islamic State Mozambique (ISM)","FRELIMO government","Rwandan forces"],
    summary:"Islamic State Mozambique has surged again — 300,000 displaced since July — and is spreading beyond Cabo Delgado into Niassa province, hitting police posts and even tourist concessions. Rwanda warns its forces may withdraw without renewed EU funding.",
    news:[
      {date:"2026-09-20",src:"IS timeline / media",text:"ISM claims attacks on a police station and a tourist concession in Niassa, killing at least one, abducting 11 and displacing ~2,700 people."},
      {date:"2026-03-18",src:"The New Humanitarian",text:"At least 300,000 displaced by jihadist violence since July; ACLED toll reaches 6,418 since 2017 as Rwanda floats withdrawal."}]},

  { id:"libya", name:"Libya — Militia Standoff", region:"North Africa", lat:32.9, lon:13.2, cat:"flashpoint", intensity:2, status:"Volatile",
    since:"2011 (2020 ceasefire holding thinly)", casualties:"Dozens killed in militia clashes since 2025",
    displaced:"—", parties:["GNU (Tripoli)","LNA / eastern administration","Armed militias"],
    summary:"A frozen conflict that keeps thawing: rival militia coalitions fight over Tripoli's turf (mass graves were found after the May 2025 clashes), while LNA-linked fighters and the Sudanese RSF clashed at the Libya–Sudan–Egypt tri-border in June.",
    news:[
      {date:"2026-06-24",src:"Middle East Council",text:"UN Panel of Experts documents unprecedented armed-group control over state institutions; analysts warn Tripoli could see a repeat of the May 2025 militia war."},
      {date:"2026-02-04",src:"HRW World Report 2026",text:"Mass graves discovered after Tripoli's May clashes: 10 charred bodies at SSA headquarters, 67 more in hospital refrigerators, a burial site at the Tripoli Zoo."}]},

  /* ================= ASIA ================= */
  { id:"pakafg", name:"Pakistan–Afghanistan Confrontation", region:"South / Central Asia", lat:33.9, lon:70.5, cat:"war", intensity:3, status:"Escalating",
    since:"Feb 2026 flare-up", casualties:"Dozens of fighters and civilians killed in September strikes",
    displaced:"Border communities displaced on both sides", parties:["Pakistan","Taliban government / TTP"],
    summary:"The worst fighting in years between Pakistan and Taliban-ruled Afghanistan. After a bombing on Pakistani soil, Islamabad launched massive midnight airstrikes on Afghan targets including near Kabul; the Taliban warns of a 'crushing response'. China, Turkey, Qatar and Saudi Arabia scramble to mediate.",
    news:[
      {date:"2026-09-24",src:"Al Jazeera / AP",text:"Pakistan strikes 10 sites in Afghanistan it says store and launch drones; Afghan officials say at least four killed and vow an 'appropriate response'."},
      {date:"2026-09-21",src:"AP",text:"Pakistani jets hit eastern Afghanistan after Islamabad accuses Kabul of drone attacks; Taliban government denies involvement."},
      {date:"2026-09-19",src:"Media",text:"Pakistan launches massive midnight airstrikes on Afghanistan after a mosque bombing kills 31; Taliban warns of 'crushing response'."}]},

  { id:"afghanistan", name:"Afghanistan — ISKP & Resistance", region:"South / Central Asia", lat:34.4, lon:67.0, cat:"terror", intensity:2, status:"Active",
    since:"2021 (ISKP ongoing)", casualties:"Hundreds killed in ISKP attacks in 2026",
    displaced:"3+ million Afghans displaced or refugees pushed home", parties:["ISKP","Taliban authorities","Armed resistance remnants"],
    summary:"Beneath the Taliban's rule, ISKP keeps bombing mosques, banks and Taliban targets, while Afghan refugees are pushed home across newly closed borders and sporadic resistance activity simmers in the northeast.",
    news:[
      {date:"2026-09-19",src:"Media",text:"A mosque bombing kills 31 people, igniting the Pakistan–Afghanistan flare-up; ISKP-linked networks remain the country's chief terror threat."}]},

  { id:"balochistan", name:"Balochistan Insurgency", region:"South Asia", lat:28.5, lon:66.0, cat:"civil", intensity:2, status:"Active",
    since:"2004 (modern phase)", casualties:"Hundreds killed per year",
    displaced:"—", parties:["BLA / BLF separatists","Pakistan security forces"],
    summary:"Separatist groups — chiefly the Balochistan Liberation Army — attack security forces, railways and Chinese-linked projects, and Pakistan's operations against them keep the province on edge as Islamabad fights on two borders at once.",
    news:[
      {date:"2026-09-10",src:"Trackers",text:"Baloch insurgent attacks on security forces and infrastructure continue through 2026 as Pakistan's attention is pulled to the Afghan border."}]},

  { id:"indpak", name:"India–Pakistan Standoff", region:"South Asia · LoC", lat:33.0, lon:73.8, cat:"flashpoint", intensity:3, status:"Volatile",
    since:"Apr–May 2026 (Operation Sindoor)", casualties:"16+ civilians killed in LoC shelling; 100+ militants claimed killed",
    displaced:"Thousands evacuated from Kashmir border districts", parties:["India","Pakistan"],
    summary:"A year on from Operation Sindoor — India's strikes beyond the Line of Control after the Pahalgam attack — the equation has hardened. Firing, infiltration attempts and drone attacks recur along the LoC, while NATO analysts cite Indian doctrine on 'society as battlefield' cognitive warfare.",
    news:[
      {date:"2026-09-25",src:"NDTV",text:"Pakistan opens fire across the LoC in Kupwara and Uri hours after India foils a wave of missile and drone attacks; blackouts enforced in Jammu, Srinagar and Punjab."},
      {date:"2026-04-27",src:"ORF",text:"Analysis: a year after Operation Sindoor, strikes beyond the LoC signal a new deterrence logic; 'the nuclear threshold is not as rigid as once assumed'."}]},

  { id:"kashmir", name:"Kashmir Militancy", region:"South Asia", lat:34.0, lon:75.6, cat:"flashpoint", intensity:2, status:"Active",
    since:"1989", casualties:"Dozens killed in 2026 attacks and operations",
    displaced:"—", parties:["India","Militant groups","Pakistan-linked actors"],
    summary:"Militant attacks on security forces and civilians — including the Pahalgam massacre that triggered Operation Sindoor — keep the valley under a heavy security grid, with infiltration attempts recurring along the Line of Control.",
    news:[
      {date:"2026-09-25",src:"NDTV",text:"India foils missile and drone attacks on military stations; infiltration attempts continue along the LoC."}]},

  { id:"myanmar", name:"Myanmar Civil War", region:"Southeast Asia", lat:21.5, lon:95.5, cat:"civil", intensity:4, status:"Active",
    since:"2021 coup", casualties:"Tens of thousands killed since 2021",
    displaced:"3.5+ million displaced", parties:["Military junta","NUG / PDFs","Ethnic armed organizations"],
    summary:"Year five of the post-coup war. The resistance finally took the fight to the junta's airpower — FPV drones hit Tada-U airbase near Mandalay in September — while the junta holds the cities and bombs the countryside.",
    news:[
      {date:"2026-09-16",src:"Asia Times",text:"Six FPV drones target Tada-U Airbase near Mandalay, forcing the civilian airport to close — the resistance's boldest challenge yet to the junta's airpower."},
      {date:"2026-09-10",src:"armedconflicts.org",text:"Tracker records a +200% week-on-week spike in fighting; junta on the defensive in several regions but retains air superiority."}]},

  { id:"thaicam", name:"Thailand–Cambodia Border Conflict", region:"Southeast Asia", lat:14.35, lon:103.8, cat:"flashpoint", intensity:2, status:"Fragile ceasefire",
    since:"Jul 2025", casualties:"Dozens killed in 2025 fighting",
    displaced:"Border villagers displaced during clashes", parties:["Thailand","Cambodia"],
    summary:"Southeast Asia's surprise war: five days of artillery and rocket fighting in July 2025, renewed clashes in December, and a third ceasefire in January 2026 now monitored by ASEAN observers. Sporadic incidents — including a January mortar round into Ubon Ratchathani — keep mutual mistrust high.",
    news:[
      {date:"2026-05-20",src:"Wikipedia / media",text:"Ceasefire remains in effect but sporadic incidents and general mistrust persist; heavy weapons withdrawal and demining proceed under ASEAN observation."},
      {date:"2026-01-06",src:"Thai army",text:"Thai army accuses Cambodian forces of firing mortar rounds into Ubon Ratchathani, wounding a soldier; Phnom Penh calls it an 'operational error'."}]},

  { id:"scs", name:"South China Sea Confrontations", region:"Asia-Pacific · maritime", lat:10.5, lon:113.5, cat:"flashpoint", intensity:2, status:"Rising",
    since:"2012 escalation", casualties:"Injuries in boarding clashes; no fatalities",
    displaced:"—", parties:["China","Philippines","Vietnam","US patrol forces"],
    summary:"The most dangerous maritime flashpoint in the Pacific. Chinese coast guard rammings, water-cannon attacks and boarding clashes with Philippine vessels continue — on 18 September a fisheries boat was rammed closer to the Philippine mainland than ever before.",
    news:[
      {date:"2026-09-18",src:"Bloomberg",text:"Philippines says China Coast Guard rammed a government fisheries boat delivering fuel to fishermen — one of the closest confrontations to the Philippine mainland."},
      {date:"2026-07-24",src:"Al Jazeera",text:"China Coast Guard fires water cannons at Philippine boats near Scarborough Shoal after a physical boarding clash at Second Thomas Shoal."}]},

  { id:"taiwan", name:"Taiwan Strait Standoff", region:"Asia-Pacific", lat:24.0, lon:121.0, cat:"flashpoint", intensity:2, status:"Chronic",
    since:"1949", casualties:"—", displaced:"—",
    parties:["China (PLA)","Taiwan","United States"],
    summary:"PLA air and naval patrols around Taiwan remain at record tempo, with blockade-style drills and grey-zone pressure normalised. Every transit of the strait by US and allied warships triggers live-fire exercises.",
    news:[
      {date:"2026-09-10",src:"Trackers",text:"PLA continues near-daily air incursions into Taiwan's ADIZ; grey-zone pressure persists alongside US arms sales."}]},

  { id:"turkeypkk", name:"Turkey–Kurdish Conflict", region:"Middle East / Anatolia", lat:37.0, lon:43.5, cat:"flashpoint", intensity:2, status:"Stalled peace",
    since:"1984", casualties:"40,000+ killed since 1984",
    displaced:"—", parties:["Turkey","PKK remnants","Northern Syria/Iraq affiliates"],
    summary:"The PKK announced dissolution in May 2025 and burned weapons in northern Iraq, but the peace process has stalled over sequencing — and complicated by the Iran war. Turkish strikes on PKK-linked targets in northern Iraq and Syria have not stopped.",
    news:[
      {date:"2026-05-13",src:"Reuters",text:"Turkey's bid to end the 40-year conflict stalls: Ankara demands full disarmament first; the PKK demands legal guarantees as the region burns."}]},

  /* ================= AMERICAS ================= */
  { id:"haiti", name:"Haiti — Gang War", region:"Caribbean", lat:18.55, lon:-72.34, cat:"criminal", intensity:3, status:"Worsening",
    since:"2021 state collapse", casualties:"613 killed in the latest UN reporting period",
    displaced:"1.4+ million displaced", parties:["Gang coalitions","Haitian state + UN-backed Gang Suppression Force"],
    summary:"Gangs control an estimated 90% of Port-au-Prince and three of Haiti's ten provinces. A UN-backed Gang Suppression Force began operations in June 2026, but attacks on Kenscoff and Arcahaie are escalating ahead of elections planned for 13 December.",
    news:[
      {date:"2026-09-24",src:"CFR Global Conflict Tracker",text:"CFR rates Haiti's crisis as worsening: gangs hold three provinces and threaten to derail elections despite the new Gang Suppression Force."},
      {date:"2026-09-01",src:"UN Security Council Report",text:"At least 613 killed and 375 injured in the latest period; 176+ women and girls raped; 18,000+ forced to flee."}]},

  { id:"colombia", name:"Colombia — Armed Group War", region:"South America", lat:6.6, lon:-75.6, cat:"criminal", intensity:3, status:"Intensifying",
    since:"1964 (new phase)", casualties:"Hundreds killed in 2026 clashes",
    displaced:"Fresh displacement in Antioquia and Catatumbo", parties:["ELN","FARC dissidents","Clan del Golfo","Colombian state"],
    summary:"Colombia's 'total peace' strategy is buckling. In northern Antioquia, illegal gold mining and cocaine trafficking drive intensifying battles between armed groups — and dissident columns spill over Ecuador's border.",
    news:[
      {date:"2026-09-24",src:"ACLED",text:"ACLED warns violence between armed groups in northern Antioquia is likely to intensify, driven by illicit mining and drug economies."}]},

  { id:"mexico", name:"Mexico — Sinaloa Cartel War", region:"North America", lat:24.8, lon:-107.4, cat:"criminal", intensity:4, status:"Worsening",
    since:"Sep 2024 (faction war)", casualties:"2,600+ homicides in Sinaloa since Sept 2024; ~1,657 killed in 2025",
    displaced:"Tens of thousands displaced in Culiacán region", parties:["Sinaloa Cartel factions","CJNG","Mexican military","US (reported CIA ops)"],
    summary:"The Sinaloa Cartel's war of the splinters has turned Culiacán into a war zone — roadblocks, school closures, forced recruitment of children and 5,800 disappearances. The death of CJNG's 'El Mencho' triggered reprisals across 20 states, and reports say the CIA is running lethal operations inside Mexico.",
    news:[
      {date:"2026-07-07",src:"Crisis Group",text:"Official data record 2,600 homicide victims in Sinaloa between Sept 2024 and March 2026 — an undercount, with armed groups storming hospitals and kidnapping mine employees."},
      {date:"2026-05-12",src:"CNN (cited by Crisis Group)",text:"Reports say the CIA escalated a secret war on cartels with deadly operations inside Mexico; two alleged CIA officers die in a Chihuahua car crash. Officials deny the account."},
      {date:"2026-04-23",src:"Al Jazeera",text:"The death of 'El Mencho' sparks retaliatory violence: 70 killed in the initial outburst, 250+ roadblocks across ~20 states."}]},

  { id:"ecuador", name:"Ecuador — Gang Emergency", region:"South America", lat:-1.8, lon:-79.5, cat:"criminal", intensity:3, status:"State of emergency",
    since:"Jan 2024 'internal armed conflict'", casualties:"~900 killings in emergency provinces in early 2026",
    displaced:"—", parties:["Choneros / Lobos / gangs","Noboa government","Colombian dissident groups"],
    summary:"Once Latin America's safest country, Ecuador is now a battlefield over cocaine routes. President Noboa has declared repeated 60-day states of emergency — the latest across ten provinces — suspending home protections as gangs linked to Mexican and Colombian cartels fight for the ports.",
    news:[
      {date:"2026-06-17",src:"Rio Times",text:"Ecuador declares a 60-day state of emergency across 10 provinces after nearly 900 killings this year, warning of heavily armed Colombian dissident groups on the Amazon frontier."},
      {date:"2026-04-03",src:"teleSUR",text:"New emergency covers nine provinces including Quito and Guayaquil; rights to domicile and correspondence suspended."}]},

  { id:"venezuela", name:"Venezuela — Post-Maduro Crisis", region:"South America", lat:10.5, lon:-66.9, cat:"flashpoint", intensity:3, status:"Unstable transition",
    since:"Jan 2026 (Maduro captured)", casualties:"5,500+ killed by the June 2026 twin earthquakes",
    displaced:"~8 million Venezuelans abroad", parties:["Interim govt (Delcy Rodríguez)","Opposition","Tren de Aragua","United States"],
    summary:"Nine months after US forces captured Nicolás Maduro on 3 January 2026, acting president Delcy Rodríguez governs under Washington's thumb. Opposition leader María Corina Machado was denied re-entry this week; twin earthquakes near Caracas killed over 5,500 people, and clashes between security forces and armed colectivos remain a live risk.",
    news:[
      {date:"2026-09-23",src:"CBS/AFP via CFR",text:"Opposition leader María Corina Machado denied entry to Venezuela three times in 24 hours; she is considered a fugitive by the government."},
      {date:"2026-09-22",src:"Reuters",text:"Trump meets interim president Rodríguez at the UN General Assembly — their first meeting since the January raid that removed Maduro."},
      {date:"2026-06-24",src:"CFR",text:"Twin earthquakes strike near Caracas, killing over 5,500 people and deepening a humanitarian crisis the government is ill-equipped to manage."}]},

  { id:"caribbean", name:"US 'Southern Spear' Anti-Cartel Campaign", region:"Caribbean / E. Pacific", lat:12.5, lon:-64.0, cat:"criminal", intensity:2, status:"Active",
    since:"Sep 2025", casualties:"227+ killed in 69 boat strikes (HRW)",
    displaced:"—", parties:["United States (SOUTHCOM)","Venezuela-linked cartels"],
    summary:"Operation Southern Spear continues lethal strikes on alleged drug boats — 69 strikes and 227+ killed since September 2025 per Human Rights Watch. A UN rapporteur calls them unlawful; Washington insists on self-defence. The campaign followed the January capture of Nicolás Maduro.",
    news:[
      {date:"2026-09-26",src:"Rio Times / AP",text:"Boat-strike campaign passes 220 deaths; strikes continue despite no US carrier in the Caribbean since June."},
      {date:"2026-09-20",src:"Euronews / SOUTHCOM",text:"Joint Task Force Western Hemisphere kills four in a 'lethal kinetic strike' on a go-fast vessel on narco-trafficking routes."}]}
];

/* -------- animated strike / flow arcs -------- */
const ARCS = [
  { from:[50.6,36.6],  to:[50.45,30.55], color:0xff5a4d, label:"Russia → Kyiv missile & drone strikes" },
  { from:[50.45,30.55],to:[55.75,37.6],  color:0x57c7ff, label:"Ukrainian deep strikes → Moscow region" },
  { from:[33.7,73.06], to:[34.53,69.17], color:0xffa63d, label:"Pakistani airstrikes → Kabul" },
  { from:[27.18,56.27],to:[26.22,50.58], color:0xff5a4d, label:"Iranian missiles → US bases (Bahrain)" },
  { from:[25.0,59.5],  to:[27.0,56.3],   color:0x57c7ff, label:"US strikes → IRGC targets, southern Iran" },
  { from:[15.35,44.2], to:[16.88,42.56], color:0xffa63d, label:"Houthi projectiles → Jazan, Saudi Arabia" },
  { from:[31.9,34.9],  to:[33.89,35.5],  color:0xff5a4d, label:"Israeli strikes → Lebanon" },
  { from:[33.3,44.36], to:[36.19,44.01], color:0xffd147, label:"Militia drones → Erbil (US base)" },
  { from:[9.03,38.74], to:[13.49,39.47], color:0xffa63d, label:"ENDF drone strikes → Tigray" }
];
const FLOWS = [
  { from:[13.63,25.31],to:[13.47,22.2],  color:0x2dd4bf, label:"Sudanese refugees → Chad" },
  { from:[49.84,24.03],to:[50.1,22.0],   color:0x2dd4bf, label:"Ukrainians → Poland" },
  { from:[20.15,92.9], to:[21.44,91.97], color:0x2dd4bf, label:"Rohingya → Bangladesh" },
  { from:[8.3,32.0],   to:[9.5,34.5],    color:0x2dd4bf, label:"South Sudanese → Sudan (fleeing Jonglei)" }
];

/* -------- cinematic tour stops -------- */
const TOUR = ["ukraine","gaza","iran","sudan","ethiopia","myanmar","pakafg","mexico","haiti","scs"];

/* -------- aggregates -------- */
const GLOBAL_STATS = {
  zones:      { v: "AUTO", sub: "conflict zones tracked live" },
  conflicts:  { v: "56", sub: "armed conflicts active worldwide (UCDP)" },
  displaced:  { v: "120M+", sub: "forcibly displaced worldwide (UNHCR)" },
  deaths:     { v: "230K+", sub: "est. battle & civilian deaths, 12 months" }
};

/* -------- news wire, newest first -------- */
const TICKER = [
  "27 SEP — GAZA: health ministry says 1,145 Palestinians killed since ceasefire; total toll 74,016 (AP)",
  "27 SEP — SUDAN: RSF commander defects to army in Omdurman with 50 fighters (Sudan Tribune)",
  "27 SEP — NIGERIA: vigilantes kill 31 bandits in Zamfara; ISWAP abductions continue in Borno (CFR tracker)",
  "26 SEP — UKRAINE: Russian strikes kill and wound civilians across Kyiv, Sumy and Kharkiv (Ukrinform)",
  "26 SEP — CARIBBEAN: US boat-strike campaign passes 220 deaths as strikes continue (HRW / AP)",
  "25 SEP — ETHIOPIA: US embassy reports fighting near Lalibela; Tigray internet shut down",
  "25 SEP — INDIA–PAKISTAN: firing at LoC after India foils missile & drone attacks (NDTV)",
  "25 SEP — SUDAN: drone strikes kill civilians in North Kordofan and El Obeid",
  "24 SEP — UN: 'new intensity' in Russian attacks; 200 civilians killed in Ukraine since Sept 1",
  "24 SEP — PAKISTAN: airstrikes hit 10 sites in Afghanistan; Kabul vows response (Al Jazeera)",
  "24 SEP — COLOMBIA: ACLED warns of intensifying armed-group war over mining & cocaine",
  "23 SEP — VENEZUELA: Machado denied entry three times in 24 hours; transition talks stall (CBS/AFP)",
  "20 SEP — IRAN: oil tops $90 as US–Iran strikes escalate around Strait of Hormuz",
  "20 SEP — YEMEN: Houthi projectile hits Saudi Arabia's Jazan region",
  "18 SEP — SOUTH CHINA SEA: China Coast Guard rams Philippine fisheries boat near mainland (Bloomberg)",
  "16 SEP — MYANMAR: resistance drone swarm hits Tada-U airbase near Mandalay (Asia Times)",
  "12 SEP — MOZAMBIQUE: IS-linked insurgents strike police post and tourist camp in Niassa",
  "10 SEP — SOUTH SUDAN: SPLA-IO advances in Jonglei; UN warns of slide back to full war",
  "08 SEP — MEXICO: Crisis Group logs 2,600 homicides in Sinaloa since the faction war began"
];

/* -------- layer chips -------- */
const LAYERS = [
  { id:"war",        label:"Major wars",           on:true },
  { id:"civil",      label:"Civil wars",           on:true },
  { id:"terror",     label:"Terrorist / jihadist", on:true },
  { id:"flashpoint", label:"Flashpoints",          on:true },
  { id:"criminal",   label:"Cartel / criminal",    on:true },
  { id:"arcs",       label:"Strike arcs",          on:true },
  { id:"flows",      label:"Refugee flows",        on:true },
  { id:"news",       label:"News wire",            on:true }
];
