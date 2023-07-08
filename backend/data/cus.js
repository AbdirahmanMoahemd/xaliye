const customers = [
  {
    custID: 1,
    name: "Anisa Hussein",
    phone: 617612801,
  },
  {
    custID: 2,
    name: "Nuur maxamed nuur",
    phone: 615379760,
  },
  {
    custID: 3,
    name: "Abshir Ibraahim",
    phone: 619908800,
  },
  {
    custID: 4,
    name: "Xafso Abdirahman",
    phone: 616258664,
  },
  {
    custID: 5,
    name: "maxamed Abdullahi",
    phone: 615331142,
  },
  {
    custID: 6,
    name: "Mahad xassan Adow",
    phone: 616162821,
  },
  {
    custID: 7,
    name: "Abdiqaadir Abdullahi",
    phone: 615575435,
  },
  {
    custID: 8,
    name: "Abdullahi maxamed",
    phone: 618706685,
  },
  {
    custID: 9,
    name: "Guleed osman",
    phone: 616206756,
  },
  {
    custID: 10,
    name: "Ismail Mudey",
    phone: 616408070,
  },
  {
    custID: 11,
    name: "Abdiqaadir ismaaciil",
    phone: 619600613,
  },
  {
    custID: 12,
    name: "Aadam Hassan Adam",
    phone: 618719080,
  },
  {
    custID: 13,
    name: "Sudeys yaxye",
    phone: 618888782,
  },
  {
    custID: 14,
    name: "omar nuur cadaawe",
    phone: 615474096,
  },
  {
    custID: 15,
    name: "muqtar hassan",
    phone: 617290282,
  },
  {
    custID: 16,
    name: "ismail Abdiqaadir",
    phone: 613951588,
  },
  {
    custID: 17,
    name: "Abdinasir omar Abdullahi",
    phone: 614222555,
  },
  {
    custID: 18,
    name: "Abdirahman Ali",
    phone: 612279997,
  },
  {
    custID: 19,
    name: "Shiro aadan abdulahi",
    phone: 615641647,
  },
  {
    custID: 20,
    name: "Abdirisaq maxamed",
    phone: 615485408,
  },
  {
    custID: 21,
    name: "Saadaq salaad",
    phone: 618087516,
  },
  {
    custID: 22,
    name: "Abdullahi macalin maxamed",
    phone: 617424588,
  },
  {
    custID: 23,
    name: "Abdiqaadir Abdullahi",
    phone: 615058971,
  },
  {
    custID: 24,
    name: "Shafici Isxaaq warsame",
    phone: 614353583,
  },
  {
    custID: 25,
    name: "Liibaan maxamed",
    phone: 615363880,
  },
  {
    custID: 26,
    name: "salaax maxamed",
    phone: 615038932,
  },
  {
    custID: 27,
    name: "Abdiqaadir maxamed",
    phone: 616590032,
  },
  {
    custID: 29,
    name: "Axmed Abdiraxmaan",
    phone: 614397013,
  },
  {
    custID: 30,
    name: "Abdullahi shariif",
    phone: 615521241,
  },
  {
    custID: 31,
    name: "Abdiqaadir maxamed",
    phone: 618900531,
  },
  {
    custID: 32,
    name: "Yousuf muuse cali",
    phone: 618808075,
  },
  {
    custID: 33,
    name: "muscab muxudiin",
    phone: 615711723,
  },
  {
    custID: 34,
    name: "Bashiir maxamed",
    phone: 618330222,
  },
  {
    custID: 35,
    name: "shafici omar",
    phone: 615220068,
  },

  {
    custID: 36,
    name: "Hamdi maxamed",
    phone: 615715793,
  },
  {
    custID: 37,
    name: "maxamed Qadar",
    phone: 616616606,
  },
  {
    custID: 38,
    name: "Muno Abdi dahir",
    phone: 613736414,
  },
  {
    custID: 39,
    name: "amina maxamed",
    phone: 617850372,
  },
  
  {
    custID: 41,
    name: "Karaama Resturant",
    phone: 615584895,
  },
  {
    custID: 42,
    name: "Abdullahi Axmed",
    phone: 618005467,
  },
  {
    custID: 43,
    name: "Mowliid Ahmed",
    phone: 617927451,
  },
  {
    custID: 44,
    name: "Abdullahi balaaq",
    phone: 9,
  },
  {
    custID: 45,
    name: "Zamzam Maxamed",
    phone: 612881599,
  },
  {
    custID: 46,
    name: "shukri aadan daahit",
    phone: 611650392,
  },
  {
    custID: 47,
    name: "Maxamed Warsame",
    phone: 615445944,
  },
  {
    custID: 48,
    name: "saabir aadan",
    phone: 612096333,
  },
  {
    custID: 49,
    name: "wadani production",
    phone: 616797606,
  },
  {
    custID: 50,
    name: "Amiin Abdulahi",
    phone: 617850721,
  },
  {
    custID: 51,
    name: "Abdishakuur Abdullahi",
    phone: 613962572,
  },
  {
    custID: 52,
    name: "Shafici Abdulle",
    phone: 614684040,
  },
  {
    custID: 53,
    name: "Abdiwali Farah",
    phone: 619851341,
  },
  {
    custID: 54,
    name: "zakariye abdulkadir",
    phone: 617877658,
  },

  {
    custID: 55,
    name: "maxamed ibrahim",
    phone: 618137285,
  },
  {
    custID: 56,
    name: "maxamed Husein dahir",
    phone: 617622975,
  },
  {
    custID: 57,
    name: "Abdirahman abdullahi",
    phone: 612521111,
  },
  {
    custID: 58,
    name: "Maslax Hussein moha",
    phone: 610554058,
  },
  {
    custID: 59,
    name: "Umu sharaf",
    phone: 612499033,
  },
  {
    custID: 60,
    name: "Abdullahi Yousuf",
    phone: 612730164,
  },
  {
    custID: 61,
    name: "Alfurat dental",
    phone: 615616141,
  },
  {
    custID: 62,
    name: "Munasar Abdi omar",
    phone: 613292926,
  },
  {
    custID: 63,
    name: "da'uud Abdullahi",
    phone: 617001269,
  },
  {
    custID: 64,
    name: "Amal nuur",
    phone: 616956670,
  },
  {
    custID: 65,
    name: "Idiris Axmed Hassan",
    phone: 617887112,
  },
  {
    custID: 66,
    name: "Hussein Hassan Ali",
    phone: 615149278,
  },
  {
    custID: 67,
    name: "Axmed maxamed Cabdi",
    phone: 616106149,
  },
  {
    custID: 68,
    name: "Libaan Abdiraxman",
    phone: 612044300,
  },
  {
    custID: 69,
    name: "Bin production",
    phone: 618006887,
  },
  {
    custID: 70,
    name: "Jaziira sing",
    phone: 616008295,
  },

  {
    custID: 71,
    name: "Libaan hassan Aadan",
    phone: 616755029,
  },
  {
    custID: 72,
    name: "Xaaji Burre",
    phone: 615008338,
  },
  {
    custID: 73,
    name: "Abdiqaadir Abdirashiid",
    phone: 616854048,
  },
  {
    custID: 74,
    name: "xaniifo ibrahim osman",
    phone: 618408670,
  },
  {
    custID: 75,
    name: "Abdinour Abdiqaadir",
    phone: 613030786,
  },
  {
    custID: 76,
    name: "Omar maxamed Abdi",
    phone: 618664774,
  },
  {
    custID: 77,
    name: "Cali Hassan  ibrahim",
    phone: 615726848,
  },
  {
    custID: 78,
    name: "anfac Abdullahi",
    phone: 614796266,
  },
  {
    custID: 79,
    name: "Maxamed Hussein",
    phone: 619954441,
  },
  {
    custID: 80,
    name: "Abdullahi Abdi",
    phone: 615778965,
  },
  {
    custID: 81,
    name: "Yasiin Yousuf",
    phone: 618846468,
  },
  {
    custID: 82,
    name: "Abdirahman Aadan",
    phone: 618189471,
  },
  {
    custID: 83,
    name: "Zakariye Guleed",
    phone: 612699808,
  },
  {
    custID: 84,
    name: "maxamed Abdirashiid",
    phone: 615289846,
  },
  {
    custID: 85,
    name: "Abdicaziiz maxamed",
    phone: 615568988,
  },
  {
    custID: 86,
    name: "wadani production",
    phone: 616649665,
  },
  {
    custID: 87,
    name: "maxamed ali botaan",
    phone: 617930780,
  },
  {
    custID: 88,
    name: "Daahir Abdikariin",
    phone: 615890303,
  },
  {
    custID: 89,
    name: "Abdullahi Abdikariin",
    phone: 616916315,
  },
  {
    custID: 90,
    name: "Omar maxamed",
    phone: 615551441,
  },
  {
    custID: 91,
    name: "Abdisalaan Tooxow",
    phone: 615840543,
  },
  {
    custID: 92,
    name: "Maslax  maxamed",
    phone: 614445066,
  },
  {
    custID: 93,
    name: "Yousuf saciid ahmed",
    phone: 619893993,
  },
  {
    custID: 94,
    name: "Abdiwahaab maxamed",
    phone: 618785462,
  },
  {
    custID: 95,
    name: "Abdisalaam xasan",
    phone: 615087777,
  },
  {
    custID: 96,
    name: "Hamdi aadan maxamed",
    phone: 617812957,
  },
  {
    custID: 97,
    name: "Axmed Aadan",
    phone: 611117399,
  },
  {
    custID: 98,
    name: "ismail abdiqaadir",
    phone: 610508644,
  },
  {
    custID: 99,
    name: "nado maxamed",
    phone: 617205521,
  },
  {
    custID: 100,
    name: "Abdirisaq faarax",
    phone: 618771084,
  },
  {
    custID: 101,
    name: "osman Muuse",
    phone: 618050994,
  },
  {
    custID: 102,
    name: "Nootaayo osman",
    phone: 618653282,
  },
  {
    custID: 103,
    name: "Abdixakiin Abdirahman",
    phone: 615189315,
  },
  {
    custID: 104,
    name: "Abdirahman axmed",
    phone: 615944049,
  },
  {
    custID: 105,
    name: "Abdixafiid maxamed maxamuud",
    phone: 615735383,
  },
  {
    custID: 106,
    name: "Axmed Abdi Ali",
    phone: 612850160,
  },
  {
    custID: 107,
    name: "Abdirahman jaamac",
    phone: 617518073,
  },
  {
    custID: 108,
    name: "Mahad cali",
    phone: 615327812,
  },
  {
    custID: 109,
    name: "Tayo fix",
    phone: 610943838,
  },
  {
    custID: 110,
    name: "Abdirahman Muse",
    phone: 617483585,
  },
  {
    custID: 111,
    name: "osmail maxamed",
    phone: 615230361,
  },
  {
    custID: 112,
    name: "sundus",
    phone: 612511915,
  },
  {
    custID: 113,
    name: "Abdiwali maxamed",
    phone: 615124281,
  },
  {
    custID: 114,
    name: "Maryan cali hassan",
    phone: 612909930,
  },
  {
    custID: 115,
    name: "Axmed ismail",
    phone: 616784350,
  },
  {
    custID: 116,
    name: "Dr Baashi",
    phone: 615270144,
  },
  {
    custID: 117,
    name: "mascuud   abdiraxmaan",
    phone: 617346981,
  },
  {
    custID: 118,
    name: "Salman Abdirisaaq",
    phone: 615799898,
  },
  {
    custID: 119,
    name: "Abdirahman Abdicaziiz",
    phone: 615543186,
  },
  {
    custID: 120,
    name: "Siyaad Abdi",
    phone: 615316928,
  },
  {
    custID: 121,
    name: "gallad hassan",
    phone: 615697581,
  },
  {
    custID: 122,
    name: "Bile hussein ali",
    phone: 617121756,
  },
  {
    custID: 123,
    name: "Omar mahamed omar",
    phone: 615146766,
  },
  {
    custID: 124,
    name: "magac  malh",
    phone: 618313870,
  },
  {
    custID: 125,
    name: "Moha",
    phone: 618613020,
  },

  {
    custID: 126,
    name: "Nuurdiin ahmed",
    phone: 617664366,
  },
  {
    custID: 127,
    name: "Abdiaziiz",
    phone: 616763175,
  },
  {
    custID: 128,
    name: "Qaasim Aadan",
    phone: 618202401,
  },
  {
    custID: 129,
    name: "Ibrahim Abdi axmed",
    phone: 615289042,
  },
  {
    custID: 130,
    name: "Omar jimcale",
    phone: 616116211,
  },
  {
    custID: 131,
    name: "salmaan Nuur",
    phone: 612711457,
  },

  {
    custID: 132,
    name: "Abwaano",
    phone: 615882144,
  },
  {
    custID: 133,
    name: "maxamed daahir",
    phone: 615456151,
  },
  {
    custID: 134,
    name: "Abdirahman Bashiir",
    phone: 617418709,
  },
  {
    custID: 135,
    name: "Abukar Osman",
    phone: 613387315,
  },

  {
    custID: 136,
    name: "Abdishakuur xuseen",
    phone: 616999199,
  },
  {
    custID: 137,
    name: "Said Ibrahim",
    phone: 618574150,
  },
  {
    custID: 138,
    name: "cali surca school",
    phone: 616276620,
  },
  {
    custID: 139,
    name: "Salmaan maxamed",
    phone: 618110891,
  },
  {
    custID: 140,
    name: "Omar buule",
    phone: 615489233,
  },
  {
    custID: 141,
    name: "Hassan Abdi maxamed",
    phone: 616569686,
  },
  {
    custID: 142,
    name: "Abdullahi Abdisalaan",
    phone: 615742277,
  },
  {
    custID: 143,
    name: "Macuuf Qaasim",
    phone: 613248885,
  },
  {
    custID: 144,
    name: "Sucaad dahir Ahmed",
    phone: 617716016,
  },
  {
    custID: 145,
    name: "Abdullahi maxamuud",
    phone: 615637722,
  },
  {
    custID: 146,
    name: "Abdullahi Abdirahmaan",
    phone: 618818833,
  },
  {
    custID: 147,
    name: "cali muse ciise",
    phone: 614483525,
  },
  {
    custID: 148,
    name: "food cade",
    phone: 615294988,
  },
  {
    custID: 149,
    name: "HassAN abdullahi omar",
    phone: 617898806,
  },
  {
    custID: 150,
    name: "saadaq abdirahmaan",
    phone: 616166175,
  },
  {
    custID: 151,
    name: "Abdirisaaq Abdullahi",
    phone: 616648848,
  },
  {
    custID: 152,
    name: "Abdirahman Aadan",
    phone: 618354676,
  },
  {
    custID: 153,
    name: "Najaad abdi kariin",
    phone: 613487898,
  },
  {
    custID: 154,
    name: "ibraahim",
    phone: 619874990,
  },
  {
    custID: 155,
    name: "Nuurdiin Abdiqaadir",
    phone: 614694124,
  },
  {
    custID: 156,
    name: "Asiil production",
    phone: 618979690,
  },
  {
    custID: 157,
    name: "Ismahan Cadow gure",
    phone: 617523845,
  },
  {
    custID: 158,
    name: "cismaan  nuur",
    phone: 615273523,
  },

  {
    custID: 159,
    name: "Maxamed barakaad",
    phone: 1,
  },
  {
    custID: 160,
    name: "Maxamed Abukar",
    phone: 618134646,
  },
  {
    custID: 161,
    name: "Muno nuur maxamed",
    phone: 615221910,
  },
  {
    custID: 162,
    name: "abdiqaadir ibrahim",
    phone: 618039891,
  },
  {
    custID: 163,
    name: "Abduqaadir wehliye",
    phone: 612015146,
  },
  {
    custID: 164,
    name: "Ali Yacquub",
    phone: 612616678,
  },
  {
    custID: 165,
    name: "Axmed Cali Abdi",
    phone: 614404096,
  },
  {
    custID: 166,
    name: "maxamed Qadar hassan",
    phone: 616367940,
  },
  {
    custID: 167,
    name: "mohamed idiris",
    phone: 615710074,
  },

  {
    custID: 168,
    name: "mohamed muqtaar",
    phone: 615527592,
  },
  {
    custID: 169,
    name: "mohamed ilyaas",
    phone: 619135474,
  },

  {
    custID: 170,
    name: "ali abshir",
    phone: 615884449,
  },
  {
    custID: 171,
    name: "maxamed abdulahi",
    phone: 619645373,
  },
  {
    custID: 172,
    name: "abshir ali ahmed",
    phone: 612373931,
  },
  {
    custID: 173,
    name: "Mako maxamed",
    phone: 612136525,
  },
  {
    custID: 174,
    name: "Nuuro hassan mohamed",
    phone: 616320380,
  },
  {
    custID: 175,
    name: "Wiilka lenovaha",
    phone: 617239032,
  },
  {
    custID: 176,
    name: "Shukri mohamed Ali",
    phone: 619319860,
  },
  {
    custID: 177,
    name: "Hanad hassan",
    phone: 617512193,
  },
  {
    custID: 178,
    name: "Jamaal",
    phone: 611169216,
  },
  {
    custID: 179,
    name: "Abdifatah daahir",
    phone: 615400840,
  },
  {
    custID: 180,
    name: "Omar daa'ud duqow",
    phone: 612014908,
  },
  {
    custID: 181,
    name: "Zakariye Mohamed nuur",
    phone: 618692380,
  },
  {
    custID: 182,
    name: "Abshir Mohamed",
    phone: 612518253,
  },
  {
    custID: 183,
    name: "Hassan daahir ali",
    phone: 619151506,
  },
  {
    custID: 184,
    name: "axmad maxamad adan",
    phone: 611515111,
  },
  {
    custID: 185,
    name: "maxamad mumin",
    phone: 618461110,
  },
  {
    custID: 186,
    name: "abdi samad ibrahim",
    phone: 615595121,
  },
  {
    custID: 187,
    name: "khadar siciid",
    phone: 615664886,
  },
  {
    custID: 188,
    name: "abdi raxman hasan",
    phone: 615746597,
  },
  {
    custID: 189,
    name: "maxamad ilyas",
    phone: 619133474,
  },
  {
    custID: 190,
    name: "ahmad mustaf jeylani",
    phone: 615275357,
  },
  {
    custID: 191,
    name: "sakariye abdullahi",
    phone: 619500012,
  },
  {
    custID: 192,
    name: "Abdikaqadir maxamed",
    phone: 616029001,
  },
  {
    custID: 193,
    name: "Yasiin Yuusuf",
    phone: 618846068,
  },
  {
    custID: 194,
    name: "Farxaan Said",
    phone: 615627897,
  },

  {
    custID: 195,
    name: "Abdullahi kamaal",
    phone: 617634186,
  },

  {
    custID: 196,
    name: "Abdikafi maxamed",
    phone: 615549181,
  },
  {
    custID: 197,
    name: "Axmed Abdirahma",
    phone: 613780815,
  },
  {
    custID: 198,
    name: "Maxamed Axmed",
    phone: 613870960,
  },
  {
    custID: 199,
    name: "Yaxye Muuse",
    phone: 615938324,
  },
  {
    custID: 200,
    name: "Usaame salaad",
    phone: 613181619,
  },
  {
    custID: 201,
    name: "Maxamed",
    phone: 612929597,
  },
  {
    custID: 202,
    name: "Nasteexo Abdullahi",
    phone: 610911291,
  },
  {
    custID: 203,
    name: "Abdiraxman Axmed",
    phone: 619622934,
  },
  {
    custID: 204,
    name: "Abdikariin Ashkar",
    phone: 11,
  },
  {
    custID: 205,
    name: "Muno Abdicaziiz",
    phone: 617723260,
  },
  {
    custID: 206,
    name: "Abdinasir omar",
    phone: 615005776,
  },
  {
    custID: 207,
    name: "Maxamed Abdi ahmed",
    phone: 615894950,
  },
  {
    custID: 208,
    name: "Bashiir baddal maxamed",
    phone: 619065190,
  },
  {
    custID: 209,
    name: "Nasro Abukar axmed",
    phone: 613072395,
  },
  {
    custID: 210,
    name: "Anas ali maxamed",
    phone: 617468242,
  },
  {
    custID: 211,
    name: "maxamed ali omar",
    phone: 616666796,
  },
  {
    custID: 212,
    name: "Feysal maxamed ali",
    phone: 617671258,
  },
  {
    custID: 213,
    name: "said qaliif",
    phone: 615877079,
  },
  {
    custID: 214,
    name: "Cadnaan iise Abdulle",
    phone: 613747269,
  },
  {
    custID: 215,
    name: "Maxamed macalin Axmed",
    phone: 615456766,
  },
  {
    custID: 216,
    name: "Hassan shiikh",
    phone: 615515631,
  },
  {
    custID: 217,
    name: "Jeap Computers",
    phone: 619494457,
  },
  {
    custID: 218,
    name: "Subeer cali mire",
    phone: 617632105,
  },

  {
    custID: 219,
    name: "Siyaad maxamed xuseen",
    phone: 618252211,
  },
  {
    custID: 220,
    name: "Maxamed Abdullahi cali",
    phone: 615700121,
  },
  {
    custID: 221,
    name: "Axmed Abdullahi moha",
    phone: 616203570,
  },
  {
    custID: 222,
    name: "maxamuud shiikh cali",
    phone: 615808158,
  },
  {
    custID: 223,
    name: "Abdirahman maxamed",
    phone: 611112021,
  },
  {
    custID: 224,
    name: "Axmed Raas",
    phone: 616111152,
  },
  {
    custID: 225,
    name: "Ridwan Abdi abdullahi",
    phone: 615008292,
  },
  {
    custID: 226,
    name: "Ali abdi roble",
    phone: 615073433,
  },
  {
    custID: 227,
    name: "Abdirisaaq ibrahim",
    phone: 617413169,
  },
  {
    custID: 228,
    name: "Sharmake da'uud",
    phone: 615667885,
  },
  {
    custID: 229,
    name: "Abdifitax hussein",
    phone: 616567373,
  },
  {
    custID: 230,
    name: "Maxamed Muxudiin",
    phone: 616100220,
  },
  {
    custID: 231,
    name: "Axmed samatar",
    phone: 615153347,
  },
  {
    custID: 232,
    name: "Ismail Jibriil Yuusuf",
    phone: 615523633,
  },
  {
    custID: 233,
    name: "Maxamed Culusow",
    phone: 618079447,
  },
  {
    custID: 234,
    name: "Said Abdishakuur",
    phone: 619962753,
  },
  {
    custID: 235,
    name: "Abdifitax maxamed",
    phone: 618489064,
  },
  {
    custID: 236,
    name: "Maxamed omar axmed",
    phone: 615917274,
  },
  {
    custID: 237,
    name: "Abdiqaadir omar",
    phone: 614840135,
  },
  {
    custID: 238,
    name: "axmed Abukar",
    phone: 615753470,
  },
  {
    custID: 239,
    name: "maxamed mahad",
    phone: 613075574,
  },
  {
    custID: 240,
    name: "Abdiraxmaan Ali",
    phone: 613501157,
  },
  {
    custID: 241,
    name: "Bare hassan Hussein",
    phone: 615858694,
  },
  {
    custID: 242,
    name: "Abdiqaadir naxar",
    phone: 615113713,
  },

  {
    custID: 243,
    name: "Abdikariin abdullahi",
    phone: 612747690,
  },
  {
    custID: 244,
    name: "maxamed hassan",
    phone: 617304994,
  },
  {
    custID: 245,
    name: "abdi wali hassan maxamed",
    phone: 618575672,
  },

  {
    custID: 246,
    name: "ibrahim maxamed Nuur",
    phone: 616785510,
  },
  {
    custID: 248,
    name: "cumar maxamad",
    phone: 617412005,
  },
  {
    custID: 249,
    name: "cumar afrax siyad",
    phone: 612733375,
  },
  {
    custID: 250,
    name: "Abdiqani Abdullahi",
    phone: 618624442,
  },
  {
    custID: 251,
    name: "Abdirahman shiikh",
    phone: 615869023,
  },
  {
    custID: 252,
    name: "axmed cadaan",
    phone: 618570746,
  },
  {
    custID: 253,
    name: "ifrah garane",
    phone: 615295172,
  },
  {
    custID: 254,
    name: "Abdi waxid maxamed",
    phone: 617604910,
  },
  {
    custID: 255,
    name: "Abukar Yuusuf",
    phone: 619006091,
  },
  {
    custID: 256,
    name: "ibrahim Hussein Omar",
    phone: 615986533,
  },

  {
    custID: 257,
    name: "sharmake cali maxamed",
    phone: 612995181,
  },
  {
    custID: 258,
    name: "Hasan Ali maxamed",
    phone: 618827251,
  },
  {
    custID: 259,
    name: "Maxamed maxamuud",
    phone: 615302620,
  },
  {
    custID: 260,
    name: "Xaniifo ibrahim osman",
    phone: 618408676,
  },
  {
    custID: 261,
    name: "maxamed muxudiin",
    phone: 612658440,
  },

  {
    custID: 262,
    name: "Hassan Ahmed",
    phone: 610910183,
  },
  {
    custID: 263,
    name: "Abdullahi ibrahim maxamed",
    phone: 617588780,
  },
  {
    custID: 264,
    name: "mansuur axmed",
    phone: 615589152,
  },
  {
    custID: 265,
    name: "Muuse kadle",
    phone: 615500700,
  },
  {
    custID: 266,
    name: "Saalax maxamed",
    phone: 619449998,
  },
  {
    custID: 267,
    name: "Abdifitah osman",
    phone: 617372955,
  },
  {
    custID: 268,
    name: "Maxamed Abdi",
    phone: 616999523,
  },
  {
    custID: 269,
    name: "axmed maxamuud",
    phone: 615681060,
  },
  {
    custID: 270,
    name: "Maxamed Abdiqaadir",
    phone: 615931292,
  },
  {
    custID: 271,
    name: "Aadan Idiris roble",
    phone: 617415862,
  },
  {
    custID: 272,
    name: "Nuur Hassan osman",
    phone: 615729410,
  },
  {
    custID: 273,
    name: "Maxamed Abshir",
    phone: 615742384,
  },
  {
    custID: 274,
    name: "Sadaam some",
    phone: 616323379,
  },
  {
    custID: 275,
    name: "Jamaal cawaale",
    phone: 618715591,
  },
  {
    custID: 276,
    name: "Farxaan maxamed",
    phone: 615829897,
  },
  {
    custID: 277,
    name: "aisha faarax",
    phone: 616958048,
  },
  {
    custID: 278,
    name: "Bashiir Abdicaziiz",
    phone: 616113312,
  },
  {
    custID: 279,
    name: "Cali osman",
    phone: 612449428,
  },
  {
    custID: 280,
    name: "saafi cali abukar",
    phone: 619606082,
  },
  {
    custID: 281,
    name: "Abdiraxiin maxamed",
    phone: 615219342,
  },
  {
    custID: 282,
    name: "Abdiwahaab maxamed",
    phone: 616991266,
  },
  {
    custID: 283,
    name: "Rowdo maxamed",
    phone: 617863565,
  },
  {
    custID: 284,
    name: "Abdullahi Abdinaasir",
    phone: 614732075,
  },
  {
    custID: 285,
    name: "Abdixafiid axmed",
    phone: 616660914,
  },
  {
    custID: 286,
    name: "Abukar ilyas maxamed",
    phone: 612108340,
  },
  {
    custID: 287,
    name: "Mubarik maxamed",
    phone: 615742138,
  },
  {
    custID: 288,
    name: "Abshir maxamed",
    phone: 616518253,
  },
  {
    custID: 289,
    name: "Yasiin maxamed",
    phone: 615940360,
  },
  {
    custID: 290,
    name: "Faisa Abdiraxman",
    phone: 618020120,
  },
  {
    custID: 291,
    name: "axmed cali cabdi",
    phone: 613831119,
  },
  {
    custID: 292,
    name: "ayuub cabdi maxamed",
    phone: 615947618,
  },
  {
    custID: 293,
    name: "axmed canshuur",
    phone: 618483102,
  },
  {
    custID: 294,
    name: "maxamed",
    phone: 615667586,
  },
  {
    custID: 295,
    name: "muxudiin maxamed",
    phone: 617272108,
  },
  {
    custID: 296,
    name: "c/raxmaan cadaay jamac",
    phone: 616970352,
  },

  {
    custID: 297,
    name: "cumar ahmed c/llahi",
    phone: 619619540,
  },
  {
    custID: 298,
    name: "cali xasan",
    phone: 618441527,
  },
  {
    custID: 299,
    name: "idiris c/allahi siyad",
    phone: 617210768,
  },
  {
    custID: 300,
    name: "maxamed c/raxman",
    phone: 617208634,
  },
  {
    custID: 301,
    name: "xuseen cabdi yaasiin",
    phone: 617601216,
  },
  {
    custID: 302,
    name: "maxamed cabdi dhaqane",
    phone: 613883444,
  },
  {
    custID: 303,
    name: "c/ladiif maxamuud",
    phone: 618333193,
  },
  {
    custID: 304,
    name: "muscab ahmed",
    phone: 613832171,
  },
  {
    custID: 305,
    name: "c/raxmaan xaashi",
    phone: 615340483,
  },
  {
    custID: 306,
    name: "Abdixakiin Abdiqaadir",
    phone: 612587009,
  },
  {
    custID: 307,
    name: "Abdirisaaq feysal",
    phone: 610742387,
  },
  {
    custID: 308,
    name: "shuceyb abdirashiid",
    phone: 615110510,
  },

  {
    custID: 309,
    name: "Abdinasir Cadow",
    phone: 612330288,
  },
  {
    custID: 310,
    name: "Isxaaq Abdinuur maxamed",
    phone: 618919185,
  },

  {
    custID: 311,
    name: "Abdishakuur Axmed",
    phone: 616658272,
  },
  {
    custID: 312,
    name: "Wadani",
    phone: 611008386,
  },
  {
    custID: 313,
    name: "Abdiqafaar Abdiraxmaan",
    phone: 612890929,
  },
  {
    custID: 314,
    name: "Abdu rabbi abdi yuusuf",
    phone: 616587797,
  },
  {
    custID: 315,
    name: "Abdirahman Abdullahi",
    phone: 615921117,
  },
  {
    custID: 316,
    name: "Axmed maxamed",
    phone: 617809526,
  },
  {
    custID: 317,
    name: "Malyuun Abdiqaadir",
    phone: 615313051,
  },
  {
    custID: 318,
    name: "Bashiir Abdiqaadir",
    phone: 616989691,
  },

  {
    custID: 319,
    name: "Hussein Abdiqaadir Hassan",
    phone: 619727199,
  },
  {
    custID: 320,
    name: "Maxamed Hassan",
    phone: 617982244,
  },
  {
    custID: 321,
    name: "Abdullahi Abdiqaadir",
    phone: 615995908,
  },
  {
    custID: 322,
    name: "Bile maxamuud hussein",
    phone: 614423789,
  },
  {
    custID: 323,
    name: "Najax aadan faarax",
    phone: 616523040,
  },
  {
    custID: 324,
    name: "Abdimalik Nuur",
    phone: 617980891,
  },
  {
    custID: 325,
    name: "Sadam cali axmed",
    phone: 616562894,
  },

  {
    custID: 326,
    name: "Sowdo Abdullahi",
    phone: 616774763,
  },
  {
    custID: 327,
    name: "Maxamed Husseim",
    phone: 612104863,
  },
  {
    custID: 328,
    name: "Alio Abdirahmaan",
    phone: 615357499,
  },
  {
    custID: 329,
    name: "abdiraxman aweys",
    phone: 613037231,
  },
  {
    custID: 330,
    name: "Sakariye Maxamed",
    phone: 618995583,
  },

  {
    custID: 331,
    name: "Maxamede siidow",
    phone: 617783687,
  },
  {
    custID: 332,
    name: "Maxamed Qadar",
    phone: 615802422,
  },
  {
    custID: 333,
    name: "Maxamed Aadan dahir",
    phone: 615298057,
  },
  {
    custID: 334,
    name: "Abdiqani hassan",
    phone: 618003671,
  },
  {
    custID: 335,
    name: "Suleymaan Abdullahi",
    phone: 618882166,
  },
  {
    custID: 336,
    name: "da'uud abdullahi",
    phone: 619625870,
  },
  {
    custID: 337,
    name: "Maxamed axmed",
    phone: 618141718,
  },
  {
    custID: 338,
    name: "Wadani",
    phone: 610222111,
  },
  {
    custID: 339,
    name: "Hussein Abdullahi cali",
    phone: 614243055,
  },

  {
    custID: 340,
    name: "Adan hassan",
    phone: 616339959,
  },
  {
    custID: 341,
    name: "osman aweys",
    phone: 618938121,
  },
  {
    custID: 342,
    name: "Yaraane maxamuud",
    phone: 617545880,
  },
  {
    custID: 343,
    name: "Abdirahmaan maxamed",
    phone: 619534965,
  },
  {
    custID: 344,
    name: "Mowliid Hussein",
    phone: 616245714,
  },
  {
    custID: 345,
    name: "dalxa maxamuud",
    phone: 616560800,
  },
  {
    custID: 346,
    name: "abdul khadir abdi",
    phone: 619874512,
  },
  {
    custID: 347,
    name: "libaan habiib axmad",
    phone: 615367881,
  },
  {
    custID: 348,
    name: "maxamad amiin",
    phone: 617534140,
  },
  {
    custID: 349,
    name: "abdi rashiid dauuud",
    phone: 615789506,
  },
  {
    custID: 350,
    name: "yasiin maxamad",
    phone: 613322729,
  },
  {
    custID: 351,
    name: "najmo abdi maxamad",
    phone: 610556607,
  },

  {
    custID: 352,
    name: "maxamad asad",
    phone: 616617733,
  },
  {
    custID: 353,
    name: "maxamad  xusen",
    phone: 617660180,
  },
  {
    custID: 354,
    name: "XASAN MAXAMED XUSEEN",
    phone: 616579755,
  },
  {
    custID: 355,
    name: "tacquub maxamed",
    phone: 616789263,
  },
  {
    custID: 356,
    name: "axmed abdiraxman",
    phone: 618302195,
  },
  {
    custID: 357,
    name: "yuusuf abdiqadir",
    phone: 616174977,
  },
  {
    custID: 358,
    name: "isxaaq maxamed",
    phone: 618637374,
  },
  {
    custID: 359,
    name: "maxamed xasan",
    phone: 618103830,
  },
  {
    custID: 360,
    name: "abdiaziz",
    phone: 615886026,
  },

  {
    custID: 361,
    name: "salmaan nuur",
    phone: 612701936,
  },
  {
    custID: 362,
    name: "adbdinajiib xasan",
    phone: 617305680,
  },
  {
    custID: 363,
    name: "abdifitax shariif",
    phone: 615270880,
  },
  {
    custID: 364,
    name: "abdirahman maxamed",
    phone: 617076144,
  },
  {
    custID: 365,
    name: "nimco cabdukke",
    phone: 618007897,
  },
  {
    custID: 366,
    name: "abdirisaq cali",
    phone: 618191975,
  },

  {
    custID: 367,
    name: "abdullahi daahir",
    phone: 612465821,
  },
  {
    custID: 368,
    name: "abdiwaaxid ibraahim",
    phone: 617112007,
  },
  {
    custID: 369,
    name: "abdiwahaab maxamed cali",
    phone: 619255704,
  },
  {
    custID: 370,
    name: "maxamed abdirisaq",
    phone: 614484745,
  },
  {
    custID: 371,
    name: "khadijo maxamed",
    phone: 615622582,
  },
  {
    custID: 372,
    name: "abdullahi abdirahman",
    phone: 615671964,
  },
  {
    custID: 373,
    name: "idil axmed maxamuud",
    phone: 619965090,
  },
  {
    custID: 374,
    name: "jacfar maxamed yuusuf",
    phone: 619037739,
  },

  {
    custID: 375,
    name: "maxamed abdikariim",
    phone: 617301807,
  },
  {
    custID: 376,
    name: "cali xabiib sayid",
    phone: 615628805,
  },
  {
    custID: 377,
    name: "ibraahim daauud abdiqaadir",
    phone: 615781144,
  },
  {
    custID: 378,
    name: "abdullahi ahmed",
    phone: 618468260,
  },
  {
    custID: 379,
    name: "maxamed gacal yuusuf",
    phone: 612222833,
  },
  {
    custID: 380,
    name: "cabdi nasir xasan",
    phone: 615496343,
  },
  {
    custID: 381,
    name: "ibrahim xuseen",
    phone: 615686252,
  },

  {
    custID: 382,
    name: "abdikariin abdi",
    phone: 615325735,
  },
  {
    custID: 383,
    name: "abdinasir shire",
    phone: 615989233,
  },
  {
    custID: 384,
    name: "abdisalam maxamuud",
    phone: 615593050,
  },
  {
    custID: 385,
    name: "abdullahi osman",
    phone: 615711093,
  },
  {
    custID: 386,
    name: "macquul electronic",
    phone: 615402675,
  },
  {
    custID: 387,
    name: "abdullahi yasin",
    phone: 613353556,
  },
  {
    custID: 388,
    name: "abdimalik",
    phone: 615666697,
  },
  {
    custID: 389,
    name: "khaalid bootaan",
    phone: 610881250,
  },
  {
    custID: 390,
    name: "maxamed ahmed",
    phone: 618932366,
  },
  {
    custID: 391,
    name: "maxamed ahmed",
    phone: 617019524,
  },

  {
    custID: 392,
    name: "maxamed qasim",
    phone: 613772083,
  },
  {
    custID: 393,
    name: "abdixakin xuseen",
    phone: 615876716,
  },
  {
    custID: 394,
    name: "ilyaz maxamed",
    phone: 618042123,
  },
  {
    custID: 395,
    name: "abdifitah osman",
    phone: 617939907,
  },
  {
    custID: 396,
    name: "hanad abdi maxamed",
    phone: 615742750,
  },
  {
    custID: 397,
    name: "ahmed ibrahim osman",
    phone: 615526526,
  },
  {
    custID: 398,
    name: "xasan maxamed",
    phone: 616301475,
  },
  {
    custID: 399,
    name: "maxamed idris",
    phone: 611339709,
  },
  {
    custID: 400,
    name: "cumar yuusuf",
    phone: 615788775,
  },

  {
    custID: 401,
    name: "abdikariin maxamed",
    phone: 615144225,
  },

  {
    custID: 402,
    name: "Wadani",
    phone: 616797806,
  },
  {
    custID: 403,
    name: "abdinuur kadiye",
    phone: 615456551,
  },

  {
    custID: 404,
    name: "aisha maxamed",
    phone: 614949492,
  },
  {
    custID: 405,
    name: "alsurca",
    phone: 615920249,
  },
  {
    custID: 406,
    name: "cumar yuusuf",
    phone: 615798775,
  },
  {
    custID: 407,
    name: "MAXAMED HAARAA",
    phone: 618945925,
  },
  {
    custID: 408,
    name: "hanaan maxamed",
    phone: 615308085,
  },
  {
    custID: 409,
    name: "aways sheakh cusmaan",
    phone: 618543220,
  },
  {
    custID: 410,
    name: "abdirahman sayid",
    phone: 617775726,
  },
  {
    custID: 411,
    name: "nuur yuusuf mahad",
    phone: 619310032,
  },
  {
    custID: 412,
    name: "axmed maxamed nuur",
    phone: 615999956,
  },
  {
    custID: 413,
    name: "salaad daahir",
    phone: 613290505,
  },
  {
    custID: 414,
    name: "sayid cali maxamed",
    phone: 612520417,
  },
  {
    custID: 415,
    name: "abdiraxman cali",
    phone: 619613336,
  },
  {
    custID: 416,
    name: "naciima xasan",
    phone: 617220855,
  },
  {
    custID: 417,
    name: "nasiima maxamed xasan",
    phone: 619863865,
  },
  {
    custID: 418,
    name: "cabdullaahi axmed",
    phone: 617858314,
  },
  {
    custID: 419,
    name: "abdimajid muxudiin",
    phone: 617893129,
  },
  {
    custID: 420,
    name: "caadil aways jeylaani",
    phone: 615046358,
  },
  {
    custID: 421,
    name: "jaamac abdinasir",
    phone: 617237816,
  },
  {
    custID: 422,
    name: "faadumo maxamed",
    phone: 617890963,
  },
  {
    custID: 423,
    name: "maxamed cumar",
    phone: 618512329,
  },
  {
    custID: 424,
    name: "maxamed jeylaani shiine",
    phone: 615939324,
  },
  {
    custID: 425,
    name: "daruur cali nuur",
    phone: 615614979,
  },
  {
    custID: 426,
    name: "xasan maxamed",
    phone: 614411981,
  },
  {
    custID: 427,
    name: "daa uud cabdullaahi",
    phone: 619628570,
  },
  {
    custID: 428,
    name: "maxamed ibraahim",
    phone: 619130729,
  },
  {
    custID: 429,
    name: "daadir daahir",
    phone: 611899999,
  },
  {
    custID: 430,
    name: "maxamed fuad",
    phone: 615793051,
  },
  {
    custID: 431,
    name: "xambali abdullaahi",
    phone: 619701648,
  },
  {
    custID: 432,
    name: "abdirizaq ciise ibraahim",
    phone: 615882129,
  },
  {
    custID: 433,
    name: "DEEQO CALI MACALIN",
    phone: 615816957,
  },
  {
    custID: 434,
    name: "muscab abdirahman",
    phone: 616606063,
  },
  {
    custID: 435,
    name: "abdikariin maxamed",
    phone: 615866814,
  },
  {
    custID: 436,
    name: "abdullahi mahdi ciise",
    phone: 615220271,
  },

  {
    custID: 437,
    name: "mukhtaar maxamed",
    phone: 615877392,
  },
  {
    custID: 438,
    name: "munasar xasan",
    phone: 618479523,
  },

  {
    custID: 439,
    name: "anas abdisalaam",
    phone: 615701151,
  },
  {
    custID: 440,
    name: "abdiraxiin daahir",
    phone: 612911527,
  },
  {
    custID: 441,
    name: "mahad maxamed",
    phone: 618844063,
  },
  {
    custID: 442,
    name: "anas maxamed cabdi",
    phone: 617630978,
  },
  {
    custID: 443,
    name: "anas abdinasir cali",
    phone: 612023649,
  },
  {
    custID: 444,
    name: "abdirahman siciid",
    phone: 615966884,
  },
  {
    custID: 445,
    name: "abdirisaq cusmaan",
    phone: 617959892,
  },
  {
    custID: 446,
    name: "muniir cabdi",
    phone: 613125942,
  },
  {
    custID: 447,
    name: "maxamed macalin",
    phone: 618925577,
  },
  {
    custID: 448,
    name: "yaxye yuusuf",
    phone: 616554292,
  },
  {
    custID: 449,
    name: "eng abdullahi",
    phone: 618032732,
  },
  {
    custID: 450,
    name: "karaama abdiqadir",
    phone: 616060602,
  },
  {
    custID: 451,
    name: "feysal nuur",
    phone: 615161816,
  },
  {
    custID: 452,
    name: "fardowsp xusein",
    phone: 616299226,
  },
  {
    custID: 453,
    name: "abdikariin axmed",
    phone: 615198290,
  },
  {
    custID: 454,
    name: "marwaan cusmaan",
    phone: 617298462,
  },
  {
    custID: 455,
    name: "aamina siciid",
    phone: 619046504,
  },
  
  {
    custID: 457,
    name: "sptv",
    phone: 616781306,
  },
  {
    custID: 458,
    name: "maxamed abdikariin",
    phone: 618596069,
  },
  {
    custID: 459,
    name: "balqiis cabdulle",
    phone: 612804773,
  },

  {
    custID: 460,
    name: "ikraan cabdi",
    phone: 615455149,
  },
  {
    custID: 461,
    name: "abdiwahaab cali",
    phone: 620009014,
  },
  {
    custID: 462,
    name: "abdirahman abduinasir",
    phone: 619588146,
  },
  {
    custID: 463,
    name: "abshir maxamuud",
    phone: 617231868,
  },

  {
    custID: 464,
    name: "abshir susan maxamed",
    phone: 618590771,
  },
  {
    custID: 465,
    name: "maxamed salaad",
    phone: 617246800,
  },
  {
    custID: 466,
    name: "zaki sharaf",
    phone: 617015031,
  },

  {
    custID: 467,
    name: "maxamed daahir ciise",
    phone: 612838930,
  },
  {
    custID: 468,
    name: "abdinasir xasan",
    phone: 617365710,
  },
  {
    custID: 469,
    name: "maxamed cibaar cabdi",
    phone: 616415263,
  },
  {
    custID: 470,
    name: "axmed nuur",
    phone: 615812195,
  },
  {
    custID: 471,
    name: "cabdalla abshir",
    phone: 613549693,
  },
  {
    custID: 472,
    name: "axmed maxamed shire",
    phone: 616584777,
  },

  {
    custID: 473,
    name: "orey internet",
    phone: 615770152,
  },
  {
    custID: 474,
    name: "abdisalaam saciid warsame",
    phone: 615247421,
  },
  {
    custID: 475,
    name: "muxsin cabdirisaaq",
    phone: 615209449,
  },
  {
    custID: 476,
    name: "cali bile cabdi",
    phone: 618450412,
  },
  {
    custID: 477,
    name: "abdullaahi ibraahim",
    phone: 618804980,
  },
  {
    custID: 478,
    name: "abdullahi aadan",
    phone: 619049695,
  },
  {
    custID: 479,
    name: "abdirahman mahdi",
    phone: 619563607,
  },
  {
    custID: 480,
    name: "abdullahi nuur yaasiin",
    phone: 619798964,
  },
  {
    custID: 481,
    name: "abdikariin a/raxmaan",
    phone: 616770666,
  },
  {
    custID: 482,
    name: "cali maxamuud",
    phone: 618303039,
  },
  {
    custID: 483,
    name: "maxamed bashiir",
    phone: 615744010,
  },
  {
    custID: 484,
    name: "maxamed axmed",
    phone: 770610311,
  },
  {
    custID: 485,
    name: "jaamac faarax",
    phone: 615317433,
  },
  {
    custID: 486,
    name: "axmed cabdullaahi",
    phone: 617873608,
  },
  {
    custID: 487,
    name: "maxamed muxudiin",
    phone: 619014500,
  },
  {
    custID: 488,
    name: "maxamed ibraahim",
    phone: 2,
  },
  {
    custID: 489,
    name: "maxamed shiine",
    phone: 616020609,
  },
  {
    custID: 490,
    name: "abdimajid maxamed",
    phone: 610374049,
  },
  {
    custID: 491,
    name: "xuseen maxamuud",
    phone: 618403394,
  },

  {
    custID: 492,
    name: "maxamed abdirahman",
    phone: 617015402,
  },
  {
    custID: 493,
    name: "zakariye maxamed",
    phone: 612706296,
  },
  {
    custID: 494,
    name: "cali maxamed cali",
    phone: 615224771,
  },
  {
    custID: 495,
    name: "ismail ibrahim macalin",
    phone: 615432071,
  },
  {
    custID: 496,
    name: "cabaas cumar cabdi",
    phone: 612277348,
  },
  {
    custID: 497,
    name: "cali muuse ibraahim",
    phone: 615943194,
  },
  {
    custID: 498,
    name: "cabdullahi ahmed",
    phone: 61188496,
  },

  {
    custID: 499,
    name: "maxamed hagardiid",
    phone: 611609042,
  },
  {
    custID: 500,
    name: "sumaya cali",
    phone: 618871707,
  },
  {
    custID: 501,
    name: "abdirisaaq",
    phone: 615537346,
  },
  {
    custID: 502,
    name: "kheyrudiin hikam",
    phone: 619431991,
  },
  {
    custID: 503,
    name: "abdiwaaxid maxamed",
    phone: 612812001,
  },
  {
    custID: 504,
    name: "xamdi maxamed",
    phone: 616311999,
  },
  {
    custID: 505,
    name: "liibaan abdirashiid",
    phone: 619152182,
  },
  {
    custID: 506,
    name: "mahad aways nuur",
    phone: 615722291,
  },
  {
    custID: 507,
    name: "xasan kaafi",
    phone: 616475653,
  },
  {
    custID: 508,
    name: "cali suleyman",
    phone: 610442686,
  },
  {
    custID: 509,
    name: "maxamed carta",
    phone: 619161133,
  },
  {
    custID: 510,
    name: "cali maxamed",
    phone: 615624459,
  },
  {
    custID: 511,
    name: "maxamed saalax",
    phone: 615071652,
  },
  {
    custID: 512,
    name: "axmed maxamed",
    phone: 615958839,
  },
  {
    custID: 513,
    name: "abdirahman ahmed",
    phone: 618552829,
  },
  {
    custID: 514,
    name: "abdirahman abdiqadir",
    phone: 770607408,
  },
  {
    custID: 515,
    name: "abdikariin maxamed",
    phone: 615490677,
  },
  {
    custID: 516,
    name: "zakariye cabdalla",
    phone: 615097555,
  },
  {
    custID: 517,
    name: "abdiaziz hussein",
    phone: 617100251,
  },

  {
    custID: 518,
    name: "liibaan abdullahi",
    phone: 615349467,
  },
  {
    custID: 519,
    name: "abdiaziz maxamed",
    phone: 611251125,
  },
  {
    custID: 520,
    name: "cali maxamed",
    phone: 615074805,
  },
  {
    custID: 521,
    name: "cumar xusen cali",
    phone: 615127174,
  },
  {
    custID: 522,
    name: "xuseen daahir",
    phone: 619342274,
  },
  {
    custID: 523,
    name: "abuukar yuusuf ibrahim",
    phone: 610993341,
  },
  {
    custID: 524,
    name: "abdixakiim abdullahi",
    phone: 616246934,
  },
  {
    custID: 525,
    name: "kalsoon feysal abdullahi",
    phone: 618774477,
  },
  {
    custID: 526,
    name: "AbdiAziiz Ali Hassan",
    phone: 615866628,
  },
  {
    custID: 527,
    name: "AbdiRashid Abdulahi",
    phone: 616254064,
  },
  {
    custID: 528,
    name: "Cabaas Abdulahi",
    phone: 619487739,
  },
  {
    custID: 529,
    name: "Ahmed AbdulQadir",
    phone: 615423422,
  },
  {
    custID: 530,
    name: "Cabad Abdulahi",
    phone: 612680564,
  },
  {
    custID: 531,
    name: "xasan maxamed",
    phone: 613695258,
  },
  {
    custID: 532,
    name: "abdirisaaq xasan",
    phone: 770500904,
  },
  {
    custID: 533,
    name: "farxaan daahir",
    phone: 617609393,
  },
  {
    custID: 534,
    name: "axmed abdirahman",
    phone: 616962961,
  },

  {
    custID: 535,
    name: "mukhtaar shire maxamed",
    phone: 613849529,
  },
  {
    custID: 536,
    name: "maxamuud abshir",
    phone: 617528198,
  },
  {
    custID: 537,
    name: "cadnaan garad cusman",
    phone: 616785710,
  },
  {
    custID: 538,
    name: "cusmaan cabdi aadan",
    phone: 612333136,
  },

  {
    custID: 539,
    name: "abdirisaq nuur",
    phone: 617611425,
  },
  {
    custID: 540,
    name: "ismail  muxudiin",
    phone: 612002189,
  },

  {
    custID: 541,
    name: "faysal abdi raxman",
    phone: 618764974,
  },

  {
    custID: 542,
    name: "sakariye yoonis",
    phone: 619037110,
  },
  {
    custID: 543,
    name: "qadar maxamuud",
    phone: 613797366,
  },
  {
    custID: 544,
    name: "maxamad ibrahin",
    phone: 617955260,
  },
  {
    custID: 545,
    name: "ayuub ciise",
    phone: 616782491,
  },
  {
    custID: 546,
    name: "YACQUUB KHAALID FAARAX",
    phone: 612666698,
  },

  {
    custID: 547,
    name: "xareed maxamuud",
    phone: 618223850,
  },
  {
    custID: 548,
    name: "maxamed xaashi",
    phone: 615033429,
  },
  {
    custID: 549,
    name: "bukaan bile",
    phone: 4,
  },
  {
    custID: 550,
    name: "c/qaadir jeylaani",
    phone: 615560617,
  },
  {
    custID: 551,
    name: "maxamed xasan",
    phone: 615332335,
  },
  {
    custID: 552,
    name: "zaki xasan xaashi",
    phone: 615980818,
  },
  {
    custID: 553,
    name: "madiino",
    phone: 615557012,
  },
  {
    custID: 554,
    name: "mustaf muxudiin",
    phone: 616594027,
  },

  {
    custID: 555,
    name: "wacays xuseen",
    phone: 616798802,
  },
  {
    custID: 556,
    name: "shaafici maxamuud",
    phone: 618634156,
  },
  {
    custID: 557,
    name: "axmed abdullahi",
    phone: 617685994,
  },

  {
    custID: 558,
    name: "mansuur muxudiin",
    phone: 616227674,
  },
  {
    custID: 560,
    name: "maxamad caa",
    phone: 613911461,
  },
  {
    custID: 561,
    name: "najmo maxamad",
    phone: 612715602,
  },
  {
    custID: 562,
    name: "shekh mustafa",
    phone: 610776528,
  },

  {
    custID: 563,
    name: "mascuud maslax huseen",
    phone: 614255985,
  },
  {
    custID: 564,
    name: "aways axmed sabriye",
    phone: 617335024,
  },
  {
    custID: 565,
    name: "maxamed cumar abdiqadir",
    phone: 615788685,
  },
  
  {
    custID: 567,
    name: "xasan cabdi xasan",
    phone: 610753962,
  },
  {
    custID: 568,
    name: "zakariye khadar",
    phone: 617023842,
  },
  {
    custID: 569,
    name: "abdinasir maxamed",
    phone: 616589270,
  },
  {
    custID: 570,
    name: "maxamed cusmaan",
    phone: 617795297,
  },
  {
    custID: 571,
    name: "axmed cusmaan jaamac",
    phone: 615629818,
  },
  {
    custID: 572,
    name: "caamir caaqil",
    phone: 618706103,
  },
  {
    custID: 573,
    name: "maxamed xuseen yalaxow",
    phone: 618030542,
  },
  {
    custID: 574,
    name: "abshir cumar ibraahim",
    phone: 618357569,
  },
  {
    custID: 575,
    name: "abdiqadir ali",
    phone: 617486429,
  },
  {
    custID: 576,
    name: "maxamed cumar xasan",
    phone: 618366501,
  },
  {
    custID: 577,
    name: "mahad dahir",
    phone: 619233746,
  },
  {
    custID: 578,
    name: "cali maxamed cabdullahi",
    phone: 617740240,
  },
  {
    custID: 579,
    name: "saahir xasan",
    phone: 616045611,
  },
  {
    custID: 580,
    name: "saciid cabdi cali",
    phone: 615733402,
  },
  {
    custID: 581,
    name: "MAXAMED XASAN",
    phone: 617098838,
  },
  {
    custID: 582,
    name: "yaasiin amustaf xasan",
    phone: 615646103,
  },
  {
    custID: 583,
    name: "ayuub xasan nuur",
    phone: 618730078,
  },
  {
    custID: 584,
    name: "xasan abdirahman",
    phone: 615351835,
  },
  {
    custID: 585,
    name: "xakiimo xuseen",
    phone: 616798800,
  },
  {
    custID: 586,
    name: "maxamed qasim",
    phone: 615702167,
  },
  {
    custID: 587,
    name: "yaasiin maxamed",
    phone: 619450088,
  },
  {
    custID: 588,
    name: "abdirahman yuusuf",
    phone: 615520915,
  },
  {
    custID: 589,
    name: "fast sign",
    phone: 615569998,
  },
  {
    custID: 590,
    name: "zakariye",
    phone: 616061112,
  },
  {
    custID: 591,
    name: "abdullahi ibrahim",
    phone: 612777558,
  },
  {
    custID: 592,
    name: "abdulle yuusuf",
    phone: 617628122,
  },
  {
    custID: 593,
    name: "muuse aadan",
    phone: 614961890,
  },
  {
    custID: 594,
    name: "aways osman",
    phone: 615859439,
  },
  {
    custID: 595,
    name: "abdiqadir cali",
    phone: 617486423,
  },
  {
    custID: 596,
    name: "maxamed cumar",
    phone: 618366502,
  },
  {
    custID: 597,
    name: "abdi raqiib aadan",
    phone: 618757551,
  },
  {
    custID: 598,
    name: "xasan cabdi maxamed",
    phone: 614924885,
  },
  {
    custID: 599,
    name: "abdirahman nuur xasan",
    phone: 612353367,
  },
  {
    custID: 600,
    name: "aways maxamuud",
    phone: 616987033,
  },
  {
    custID: 601,
    name: "maxamed xirsi maxamed",
    phone: 618646416,
  },
  {
    custID: 602,
    name: "ilhaan maxamed",
    phone: 619863728,
  },
  
  {
    custID: 604,
    name: "farxaan nuur",
    phone: 617862341,
  },
  {
    custID: 605,
    name: "maxamed abdixaliim",
    phone: 616140777,
  },
  {
    custID: 606,
    name: "maryan jaamac",
    phone: 615308979,
  },
  {
    custID: 607,
    name: "abdi risaq",
    phone: 619575511,
  },
  {
    custID: 608,
    name: "abdi raxiin maxamad",
    phone: 617978086,
  },
  {
    custID: 609,
    name: "abdul qadir maxamad",
    phone: 615858991,
  },
  {
    custID: 610,
    name: "ilyaas ibrahim mxamad",
    phone: 615050568,
  },
  {
    custID: 611,
    name: "caamir muqta",
    phone: 615591407,
  },
  {
    custID: 612,
    name: "maxamad mohad",
    phone: 611541366,
  },
  {
    custID: 613,
    name: "nimcaale balcad",
    phone: 615740411,
  },
  {
    custID: 614,
    name: "yoonis yacquub",
    phone: 618938230,
  },
  {
    custID: 615,
    name: "cabdi kaafi cali",
    phone: 613710529,
  },
  {
    custID: 616,
    name: "nadiir cabdi sataar",
    phone: 615470441,
  },
  {
    custID: 617,
    name: "cabdi rizaq maxamad",
    phone: 619512909,
  },
  {
    custID: 618,
    name: "abdi fitaax cali",
    phone: 617465959,
  },

  {
    custID: 619,
    name: "Ibrahim abulle afrah",
    phone: 615596210,
  },
  {
    custID: 620,
    name: "Abdifitah maxamed",
    phone: 610555950,
  },
 
  {
    custID: 622,
    name: "Feysal ahmed",
    phone: 617585307,
  },
  {
    custID: 623,
    name: "Ahmed maxamed",
    phone: 616421880,
  },
  {
    custID: 624,
    name: "ahmed muqtaar hassan",
    phone: 617675540,
  },
  {
    custID: 625,
    name: "Abdirahman ahmed",
    phone: 617892189,
  },
  {
    custID: 626,
    name: "yoonis ahmed mohamed",
    phone: 619871316,
  },
  {
    custID: 627,
    name: "abdikariim mohamed ahmed",
    phone: 617003451,
  },
  {
    custID: 628,
    name: "maxamed yaasiin shariif",
    phone: 616560383,
  },
  
  {
    custID: 631,
    name: "badirahman abdullahi hassan",
    phone: 619856933,
  },
  {
    custID: 632,
    name: "farxaan abdi adan",
    phone: 613420009,
  },
  {
    custID: 633,
    name: "mahdi maxamed adan",
    phone: 615273351,
  },
  {
    custID: 634,
    name: "caaliya abdi xaaji",
    phone: 610911161,
  },
  {
    custID: 635,
    name: "abuukar ali keynaan",
    phone: 618313333,
  },
  {
    custID: 636,
    name: "cumar cusman cumar",
    phone: 613720207,
  },
  {
    custID: 637,
    name: "jaziira suuq",
    phone: 614465606,
  },
  {
    custID: 638,
    name: "abdirazaaq ahmed",
    phone: 616388464,
  },
  {
    custID: 639,
    name: "abdullahi daahir",
    phone: 612472154,
  },
  {
    custID: 640,
    name: "iqra maxamuud kulmiye",
    phone: 615058162,
  },
  {
    custID: 641,
    name: "ibraahim jibriil adam",
    phone: 618632276,
  },
  {
    custID: 642,
    name: "cilmi ahmed mohamed",
    phone: 616715220,
  },
  {
    custID: 643,
    name: "liibaan qooje",
    phone: 5,
  },
  {
    custID: 644,
    name: "maxamed abdi daahir",
    phone: 612731010,
  },
  {
    custID: 645,
    name: "jaabir fast sign",
    phone: 617373759,
  },
  {
    custID: 646,
    name: "Abdikariin maxamed",
    phone: 618657333,
  },
  {
    custID: 647,
    name: "Maryama ahmed",
    phone: 617794737,
  },
  {
    custID: 648,
    name: "ikraan ahmed",
    phone: 618888008,
  },

  {
    custID: 649,
    name: "mahad cali faarax",
    phone: 618153141,
  },
  {
    custID: 650,
    name: "salmaan yuusuf",
    phone: 614498494,
  },
  {
    custID: 651,
    name: "hussein nuur omar",
    phone: 618595191,
  },
  {
    custID: 652,
    name: "sahal liibaan",
    phone: 617447364,
  },
  {
    custID: 653,
    name: "hilaal",
    phone: 612041858,
  },
  {
    custID: 654,
    name: "ahmed maxamed",
    phone: 61367296,
  },
  {
    custID: 655,
    name: "isxaaq ibraahim",
    phone: 618999329,
  },
  {
    custID: 656,
    name: "Abdiwali Maxamed",
    phone: 618787128,
  },
  {
    custID: 657,
    name: "Abdirahmaan elmi",
    phone: 615250467,
  },
  {
    custID: 658,
    name: "Ashraf ahmed",
    phone: 613231015,
  },
  {
    custID: 659,
    name: "Abdiaziiz maxamed",
    phone: 618152131,
  },
  {
    custID: 660,
    name: "khaalid abdullahi",
    phone: 618776332,
  },
  {
    custID: 661,
    name: "Abdishakur Aadan",
    phone: 618993391,
  },
  {
    custID: 662,
    name: "Ruqiyo Abdi maxamed",
    phone: 617345176,
  },

  {
    custID: 663,
    name: "huud  sheekh cadawe",
    phone: 615557137,
  },
  {
    custID: 664,
    name: "mohamed mohamud",
    phone: 612004232,
  },
  {
    custID: 665,
    name: "ahmed nuur",
    phone: 618168955,
  },
  {
    custID: 666,
    name: "farhan dahir",
    phone: 619959243,
  },
  {
    custID: 667,
    name: "yuusuf moha",
    phone: 612659775,
  },
  {
    custID: 668,
    name: "abdiqaasim maxamed",
    phone: 617722028,
  },
  {
    custID: 669,
    name: "Abdifitah abdullahi",
    phone: 618174047,
  },
  {
    custID: 670,
    name: "sakariye abdifitah",
    phone: 615791214,
  },
  {
    custID: 671,
    name: "a/xakiin c/salaan",
    phone: 615231859,
  },
  {
    custID: 672,
    name: "Abdiwali Abdulkadir",
    phone: 619581388,
  },
  {
    custID: 673,
    name: "ciraaq daahir",
    phone: 615546044,
  },
  {
    custID: 674,
    name: "yaxye muuse ahmed",
    phone: 615417111,
  },
  {
    custID: 675,
    name: "anas Abdinaasir maxa",
    phone: 613243521,
  },
  {
    custID: 676,
    name: "shukri maxamed cali",
    phone: 617080472,
  },
  {
    custID: 677,
    name: "ibraahim hassan maxamed",
    phone: 613312824,
  },
  {
    custID: 678,
    name: "Hassan Abdullaahi",
    phone: 615268213,
  },
  {
    custID: 679,
    name: "maxamed haashi",
    phone: 618000392,
  },
  {
    custID: 680,
    name: "maxamed muuse abid",
    phone: 618976860,
  },
  {
    custID: 681,
    name: "Ali ahmed macalin",
    phone: 616879999,
  },
  {
    custID: 682,
    name: "hassan ali nuur",
    phone: 617017188,
  },
  {
    custID: 683,
    name: "shuceyb yuusuf",
    phone: 615745507,
  },
  {
    custID: 684,
    name: "banadir coffee",
    phone: 612227075,
  },
  {
    custID: 685,
    name: "abdiwahaab cumar",
    phone: 616141452,
  },
  {
    custID: 686,
    name: "ifraax adnan",
    phone: 610866551,
  },
  {
    custID: 688,
    name: "ahmed mohamed",
    phone: 618066946,
  },
  {
    custID: 689,
    name: "maxamed abdullahi",
    phone: 614503017,
  },
  {
    custID: 690,
    name: "fatxi abdullahi abdi",
    phone: 617081615,
  },
  {
    custID: 691,
    name: "akram feysal abukar",
    phone: 612904058,
  },
  {
    custID: 692,
    name: "Abdiqadar abulqaadir",
    phone: 618951111,
  },
  {
    custID: 693,
    name: "yuusuf ali",
    phone: 615838968,
  },
  {
    custID: 694,
    name: "mahad ali jamac",
    phone: 616005689,
  },

  {
    custID: 695,
    name: "sumaya daahir",
    phone: 617981072,
  },
  {
    custID: 696,
    name: "salmaan maxamed",
    phone: 619782533,
  },
  {
    custID: 697,
    name: "abdirisaaq xuseen",
    phone: 612544685,
  },
  {
    custID: 698,
    name: "saadam faarax maxamed",
    phone: 617303000,
  },
  {
    custID: 699,
    name: "suldaan abdi",
    phone: 613952144,
  },
  {
    custID: 700,
    name: "hassan mohamed hussien",
    phone: 616577955,
  },
  {
    custID: 701,
    name: "mustaf Cabdulahi",
    phone: 616937031,
  },
  {
    custID: 702,
    name: "Hassan osman",
    phone: 615513317,
  },
  {
    custID: 703,
    name: "mahamed hassan elmi",
    phone: 615880660,
  },
  {
    custID: 704,
    name: "Hassan maxamed",
    phone: 616519755,
  },
  {
    custID: 705,
    name: "Naciimo Abdi",
    phone: 615834318,
  },
  {
    custID: 706,
    name: "Aadan abdiwahaab axmed",
    phone: 619024984,
  },
  {
    custID: 707,
    name: "Ahmed Tahliil",
    phone: 618335303,
  },
  {
    custID: 708,
    name: "hassan hersi",
    phone: 613257784,
  },
  {
    custID: 709,
    name: "Abdishakur maxamed",
    phone: 617500510,
  },
  {
    custID: 710,
    name: "Shukri maxamed jaamac",
    phone: 613681315,
  },
  {
    custID: 711,
    name: "Abdiqaadir abdi maxamed",
    phone: 612674247,
  },
  {
    custID: 712,
    name: "Abdirahmaan maxamed",
    phone: 619990420,
  },
  {
    custID: 713,
    name: "Maxamed bashiir",
    phone: 618252298,
  },
  {
    custID: 714,
    name: "ismail maxamed abdi",
    phone: 615701216,
  },
  {
    custID: 715,
    name: "Maxamed Abdi axmed",
    phone: 614287859,
  },
  {
    custID: 716,
    name: "Abdulqadir maxamed",
    phone: 615303818,
  },
  {
    custID: 717,
    name: "Abdiraxmaan Abdulahi",
    phone: 617220755,
  },
  {
    custID: 718,
    name: "abdullahi sahal",
    phone: 6,
  },
  {
    custID: 719,
    name: "Abdiraxmaan Axmed",
    phone: 615944449,
  },
  {
    custID: 720,
    name: "Maxamed Ali",
    phone: 617487761,
  },
  {
    custID: 721,
    name: "Maxamed Abdullaahi",
    phone: 619163711,
  },
  {
    custID: 722,
    name: "Ikraan muuse xasan",
    phone: 612136942,
  },
  {
    custID: 723,
    name: "Axmed Cali xasan",
    phone: 615903802,
  },
  {
    custID: 724,
    name: "Cabdicaziiz axmed",
    phone: 615776010,
  },
  {
    custID: 725,
    name: "Maxamed Abdulkadir",
    phone: 616663823,
  },
  {
    custID: 726,
    name: "axmed ismail Abshir",
    phone: 618468949,
  },

  {
    custID: 727,
    name: "Abdulkadir ismail ABDI",
    phone: 616345737,
  },
  {
    custID: 728,
    name: "Maxamed Hassan",
    phone: 616704008,
  },
  {
    custID: 729,
    name: "Yousuf axmed mahamed",
    phone: 619087430,
  },
  {
    custID: 730,
    name: "Ahmed mahamed ali",
    phone: 615755205,
  },
  {
    custID: 731,
    name: "Hassan Ali",
    phone: 615824611,
  },
  {
    custID: 732,
    name: "Ayuub maxamed",
    phone: 619111817,
  },

  {
    custID: 733,
    name: "maxamed Abdirahman",
    phone: 617730000,
  },
  {
    custID: 734,
    name: "Abdirahman mumin",
    phone: 616590080,
  },
  {
    custID: 735,
    name: "Abdullahi badal Abdi",
    phone: 618705239,
  },

  {
    custID: 736,
    name: "Abdirashid ali nuur",
    phone: 619999178,
  },
  {
    custID: 737,
    name: "Abdinafac osman ahmed",
    phone: 610803888,
  },
  {
    custID: 738,
    name: "Mustaf Abdikariin",
    phone: 616279975,
  },
  {
    custID: 739,
    name: "maxmed Ali muumin",
    phone: 616097162,
  },
  {
    custID: 740,
    name: "abyan Osman Mahamed",
    phone: 615091599,
  },
  {
    custID: 741,
    name: "Faadumo Omar",
    phone: 616956468,
  },
  {
    custID: 742,
    name: "zakariye maxamed nur",
    phone: 615279048,
  },
  {
    custID: 743,
    name: "Abdulahi maxamed husien",
    phone: 615979762,
  },
  {
    custID: 744,
    name: "Farhiyo Muqtaar cali",
    phone: 613174123,
  },
  {
    custID: 745,
    name: "Abdicaziiz osman farah",
    phone: 617882553,
  },
  {
    custID: 746,
    name: "Sadaam",
    phone: 615837114,
  },
  {
    custID: 747,
    name: "Abdifitah omar adan",
    phone: 611138403,
  },
  {
    custID: 748,
    name: "boqol",
    phone: 613060059,
  },
  {
    custID: 749,
    name: "maxamed hassan maxamed",
    phone: 615200198,
  },
  {
    custID: 750,
    name: "Abdul sheik ibraahim",
    phone: 615317928,
  },
  {
    custID: 751,
    name: "safiyo Dahir maxamed",
    phone: 615669781,
  },
  {
    custID: 752,
    name: "zakariye ibraahim",
    phone: 615098948,
  },

  {
    custID: 753,
    name: "aniso salad",
    phone: 615078659,
  },
  {
    custID: 754,
    name: "Maajid maxamed",
    phone: 612880684,
  },
  {
    custID: 755,
    name: "maxamed Bashi moha",
    phone: 617850712,
  },
  {
    custID: 756,
    name: "galad haaji muuse",
    phone: 615701127,
  },
  {
    custID: 757,
    name: "maxamed adan abdi",
    phone: 615620949,
  },
  
  {
    custID: 759,
    name: "ilyaas Yousuf isaaq",
    phone: 615687479,
  },
  {
    custID: 760,
    name: "Tocky wacth",
    phone: 612467041,
  },
  {
    custID: 761,
    name: "Abdulqaadir shariif",
    phone: 615403127,
  },

  {
    custID: 762,
    name: "Abdiraxiin xaashi maxame d",
    phone: 615717742,
  },
  {
    custID: 763,
    name: "Mustaf maxamed",
    phone: 618686015,
  },
  {
    custID: 764,
    name: "muniiro Abdi",
    phone: 614912016,
  },
  {
    custID: 765,
    name: "Abdiraxmaan Abdulahi",
    phone: 615667043,
  },
  {
    custID: 766,
    name: "Abdullahi Ali Adow",
    phone: 616136922,
  },
  {
    custID: 767,
    name: "Abdimalik Bahiir",
    phone: 618575882,
  },
  {
    custID: 768,
    name: "Hassan Mohamed",
    phone: 615600600,
  },
  {
    custID: 769,
    name: "Ali Hassan Nuur",
    phone: 617453505,
  },
  
  {
    custID: 771,
    name: "Abdullahi Ali Adan",
    phone: 616616598,
  },
  {
    custID: 772,
    name: "Abdirahman maxamed",
    phone: 616271739,
  },

  {
    custID: 773,
    name: "ALI isa Hassan",
    phone: 613208374,
  },
  {
    custID: 774,
    name: "Asad maxamed ali",
    phone: 617761935,
  },
  {
    custID: 775,
    name: "YAXYE MAXAMED CALI",
    phone: 615115441,
  },
  {
    custID: 776,
    name: "Daahir hussein",
    phone: 618657875,
  },
  {
    custID: 777,
    name: "Qadar maxamud",
    phone: 619054406,
  },
  {
    custID: 778,
    name: "Maxamed Abdirashiid",
    phone: 619167418,
  },

  {
    custID: 779,
    name: "Abdimalik maxamed",
    phone: 613185203,
  },
  {
    custID: 780,
    name: "Abdiqaafar  isxaaq",
    phone: 615302670,
  },
  {
    custID: 781,
    name: "Mudalib maxamed",
    phone: 616580904,
  },

  {
    custID: 782,
    name: "Abdirisaaq guure",
    phone: 616341282,
  },
  {
    custID: 783,
    name: "Cabaas xassan",
    phone: 617004449,
  },
  {
    custID: 784,
    name: "Maxamed Faarax",
    phone: 616223070,
  },
  {
    custID: 785,
    name: "Sharmake maxamed",
    phone: 613490349,
  },
  {
    custID: 786,
    name: "Abdirisaaq muxidiin",
    phone: 614442592,
  },
  {
    custID: 787,
    name: "saacid Abdi cali",
    phone: 615105040,
  },
  {
    custID: 789,
    name: "ikraan abdulle xaashi",
    phone: 612451966,
  },

  {
    custID: 790,
    name: "maxamed isack",
    phone: 618318365,
  },

  {
    custID: 791,
    name: "ikraan abdicaziiz",
    phone: 618868731,
  },
  {
    custID: 792,
    name: "maxamed Ali",
    phone: 615757363,
  },
  {
    custID: 793,
    name: "Abdiwahaab  Abdi ciyaaye",
    phone: 618834753,
  },
  {
    custID: 794,
    name: "Abdullahi shariif moha",
    phone: 617856348,
  },
  {
    custID: 795,
    name: "Abdicaziiz adan isaq",
    phone: 615894971,
  },
  {
    custID: 796,
    name: "Maxamed jibriil Yousuf",
    phone: 617735544,
  },
  {
    custID: 797,
    name: "Aadam maxamed cali",
    phone: 617142629,
  },
  {
    custID: 798,
    name: "Abukar Maxamed",
    phone: 614373401,
  },
  {
    custID: 799,
    name: "Xassan Muuse Xassan",
    phone: 615174164,
  },
  {
    custID: 800,
    name: "khaalid faarax warsame",
    phone: 612366663,
  },
  {
    custID: 801,
    name: "Abdulahi ismail ilyaas",
    phone: 615086651,
  },
  {
    custID: 802,
    name: "Abdifitah ali Abdiqaadir",
    phone: 613363636,
  },
  {
    custID: 803,
    name: "Abukar aadan",
    phone: 615358568,
  },
  {
    custID: 804,
    name: "Caamir Abdi",
    phone: 619806253,
  },
  {
    custID: 805,
    name: "Axmed cali",
    phone: 615974730,
  },
  {
    custID: 806,
    name: "maxamed  Abdikariin",
    phone: 616810498,
  },
  {
    custID: 807,
    name: "Abukar Qaliif Abdulle",
    phone: 617506672,
  },
  {
    custID: 808,
    name: "Cali hassan",
    phone: 618866395,
  },
  {
    custID: 809,
    name: "Abdirisaaq shakir",
    phone: 615313335,
  },

  {
    custID: 810,
    name: "Abdi muxidiin",
    phone: 615525209,
  },
  {
    custID: 811,
    name: "ismail hassan Abdulle",
    phone: 617915637,
  },
  {
    custID: 812,
    name: "maxamed maxamuud Faarax",
    phone: 618042147,
  },
  {
    custID: 813,
    name: "Daadir maxamed",
    phone: 618519096,
  },

  {
    custID: 814,
    name: "Maxamed Ali",
    phone: 618969169,
  },
  {
    custID: 815,
    name: "Abdifitax Abdiwaxid",
    phone: 615688143,
  },
  {
    custID: 816,
    name: "Abdixakiin Tahliil",
    phone: 615714497,
  },
  {
    custID: 817,
    name: "xareed axmed",
    phone: 615647375,
  },
  {
    custID: 818,
    name: "amiin abdiqaadir",
    phone: 619531808,
  },

  {
    custID: 819,
    name: "hibo xussein",
    phone: 618067756,
  },

  {
    custID: 820,
    name: "jamiilo abdiqaadir",
    phone: 618049737,
  },
  {
    custID: 821,
    name: "abdi nuur ahmed",
    phone: 618382367,
  },
  {
    custID: 822,
    name: "cabdalla daahior",
    phone: 7,
  },
  {
    custID: 823,
    name: "nimco ciise",
    phone: 615715254,
  },
  {
    custID: 824,
    name: "maxamed axmed",
    phone: 618480986,
  },
  {
    custID: 825,
    name: "abshir maxamed",
    phone: 615455884,
  },
  {
    custID: 826,
    name: "c/raxmaan ibraahim",
    phone: 617851252,
  },
  {
    custID: 827,
    name: "maxamed cusmaan",
    phone: 618987495,
  },
  {
    custID: 828,
    name: "abdisalaan haadi",
    phone: 615523690,
  },

  {
    custID: 829,
    name: "abdi wahaab a/qaadir",
    phone: 619588138,
  },
  {
    custID: 830,
    name: "Abdiqani aahmed",
    phone: 616532432,
  },
  {
    custID: 831,
    name: "Husein Abdirahmaan",
    phone: 615601739,
  },
  {
    custID: 832,
    name: "Abdirixiin idiris",
    phone: 616955213,
  },
  {
    custID: 833,
    name: "Abdiqaadir maxamed",
    phone: 619541933,
  },
  {
    custID: 834,
    name: "Mustaf Abdirahman",
    phone: 615263072,
  },
  {
    custID: 835,
    name: "muxudiin osman",
    phone: 615512354,
  },
  {
    custID: 836,
    name: "Abdullahi husein",
    phone: 615397971,
  },

  {
    custID: 837,
    name: "Abdullahi Jamac",
    phone: 618447021,
  },
  {
    custID: 838,
    name: "Ruman xasan",
    phone: 617485893,
  },
  {
    custID: 839,
    name: "Nuur maxamed",
    phone: 618386689,
  },
  {
    custID: 840,
    name: "Abdullahi husieen",
    phone: 615835577,
  },
  {
    custID: 841,
    name: "Maxamed maxmuud",
    phone: 618042174,
  },
  {
    custID: 842,
    name: "maxamed Abukar gaab",
    phone: 610426199,
  },

  {
    custID: 843,
    name: "sacdiyo maxamed",
    phone: 615097930,
  },
  {
    custID: 844,
    name: "Yousuf Abdi salaad",
    phone: 615153983,
  },
  {
    custID: 845,
    name: "Diiriye Axmed",
    phone: 615552069,
  },

  {
    custID: 846,
    name: "Abdiqaadir maxamed cali",
    phone: 615998013,
  },
  {
    custID: 847,
    name: "Abdishakuur Abdullahi",
    phone: 615159267,
  },
  {
    custID: 848,
    name: "Anfac maxamed xassan",
    phone: 614804316,
  },
  {
    custID: 849,
    name: "Shukri Maxamed Shariif",
    phone: 612007371,
  },
  {
    custID: 850,
    name: "Shuceyb",
    phone: 617923374,
  },
  {
    custID: 851,
    name: "Maxamed Abdullahi",
    phone: 615990244,
  },

  {
    custID: 852,
    name: "Shariif maxamed younis",
    phone: 616251124,
  },
  {
    custID: 853,
    name: "Abdiqaadir omar",
    phone: 615284796,
  },
  {
    custID: 854,
    name: "Husein maxamed Abdi",
    phone: 615672981,
  },
  {
    custID: 855,
    name: "zakariyen Moha Qasim",
    phone: 617999339,
  },
  {
    custID: 856,
    name: "Abdiqaadir Abdi Hassan",
    phone: 616450089,
  },
  {
    custID: 857,
    name: "Abdirahman Abdifitah",
    phone: 619273203,
  },
  {
    custID: 858,
    name: "Abdi wali maxamed",
    phone: 8,
  },
  {
    custID: 859,
    name: "somali dental care",
    phone: 619238888,
  },
  {
    custID: 860,
    name: "saciid omar cali",
    phone: 617632929,
  },

  {
    custID: 861,
    name: "Dariska",
    phone: 615588060,
  },
  {
    custID: 862,
    name: "Abdirisaaq Abdullahi",
    phone: 615978896,
  },
  {
    custID: 863,
    name: "Xaashi xersi axmed",
    phone: 616913838,
  },
  {
    custID: 864,
    name: "Maxamed Abdi",
    phone: 615408758,
  },

  {
    custID: 865,
    name: "Mahad Abdi ahmed",
    phone: 618998756,
  },
  {
    custID: 866,
    name: "Fahad maxamed",
    phone: 617663802,
  },
  {
    custID: 867,
    name: "Abdirahman Yousuf",
    phone: 618349785,
  },
  {
    custID: 868,
    name: "Xabiibo  macalin",
    phone: 613267857,
  },
  {
    custID: 869,
    name: "Shuceyb Husiien",
    phone: 612365354,
  },
  {
    custID: 870,
    name: "Maslax Ciise",
    phone: 615413295,
  },
  {
    custID: 871,
    name: "Qadar axmed nuur",
    phone: 617862801,
  },
  {
    custID: 872,
    name: "Salman Liban",
    phone: 616076053,
  },
  {
    custID: 873,
    name: "Ibrahim maxamed abdi",
    phone: 616816002,
  },
  {
    custID: 874,
    name: "Maxamed Hilowle Ali",
    phone: 616617312,
  },
  {
    custID: 875,
    name: "Osman Abdi Abukar",
    phone: 616903840,
  },
  {
    custID: 876,
    name: "Sumayo muxudiin Cilmi",
    phone: 611114642,
  },
  {
    custID: 877,
    name: "axmed osman omar",
    phone: 615497775,
  },
  {
    custID: 878,
    name: "Maxamed Musee xersi",
    phone: 619633729,
  },
  {
    custID: 879,
    name: "Xasan Muqtar Ciise",
    phone: 613518117,
  },
  {
    custID: 880,
    name: "Abdikariin abdullahi",
    phone: 615202268,
  },
  {
    custID: 881,
    name: "Abdisamad axmed",
    phone: 616885533,
  },
  {
    custID: 882,
    name: "Aweys shekih bashiir",
    phone: 615579977,
  },
  {
    custID: 883,
    name: "Abdirisaaq maxamed",
    phone: 615484754,
  },
  {
    custID: 884,
    name: "Hani axmed",
    phone: 615463025,
  },
  {
    custID: 885,
    name: "Kheyre xassan ali",
    phone: 618723076,
  },
  {
    custID: 886,
    name: "Maxamed Xassan",
    phone: 616328292,
  },
  {
    custID: 887,
    name: "ibrahim Abdulle afrax",
    phone: 615596201,
  },
  {
    custID: 888,
    name: "Maxamed Abdirashiid",
    phone: 615363165,
  },
  {
    custID: 889,
    name: "Maxamed Abdiqaadir",
    phone: 617435297,
  },
  {
    custID: 890,
    name: "Abshir aweys",
    phone: 615303918,
  },
  {
    custID: 891,
    name: "Abdifitah mahad",
    phone: 617046481,
  },
  {
    custID: 892,
    name: "Maxamed Abdiraxiin",
    phone: 612379017,
  },
  {
    custID: 893,
    name: "maxamed Abdiqaadir",
    phone: 615048312,
  },
  {
    custID: 894,
    name: "Abdiqani mahad",
    phone: 617214701,
  },
  {
    custID: 895,
    name: "Ismail abdirahman",
    phone: 615260076,
  },
  {
    custID: 896,
    name: "Yahye Ciise",
    phone: 618337279,
  },
  {
    custID: 897,
    name: "maxamed axmed",
    phone: 619940923,
  },
  {
    custID: 898,
    name: "Deeq xasan maxamed",
    phone: 614137056,
  },
  {
    custID: 899,
    name: "maxamed farah maxamed",
    phone: 613322976,
  },
  {
    custID: 900,
    name: "Abdulla abshir Yahye",
    phone: 613549699,
  },
  {
    custID: 901,
    name: "Ayaan Abdi dood",
    phone: 615663339,
  },
  {
    custID: 902,
    name: "Maxamed osmaan",
    phone: 618508774,
  },
  {
    custID: 903,
    name: "Rashka",
    phone: 615642643,
  },
  {
    custID: 904,
    name: "Abdulkadir Abdalla",
    phone: 615264727,
  },

  {
    custID: 905,
    name: "omar",
    phone: 618705891,
  },
  {
    custID: 906,
    name: "30",
    phone: 614487737,
  },
  {
    custID: 907,
    name: "Abdisalaan Hassan Nur",
    phone: 619016036,
  },
  {
    custID: 908,
    name: "Sadaq abshir",
    phone: 61566175,
  },
];

export default customers;
