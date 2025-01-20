const menu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/",
    },
    {
        icon: "archived",
        text: "Master Data",
        active: false,
        subMenu: [
            {
                text: "Data Sekolah",
                link: "/master/data-sekolah",
            },
            {
                text: "Data Tapel",
                link: "/master/data-tapel",
            },
            {
                text: "Data Semester",
                link: "/master/data-semester",
            },
            {
                text: "Data Hari Libur",
                link: "/master/data-hari-libur",
            },
            {
                text: "Data Jam Kerja",
                link: "/master/data-jam-kerja",
            },
        ],
    },
    {
        icon: "user-fill",
        text: "Data Guru",
        link: "/data-guru",
    },
    {
        icon: "calendar",
        text: "Absensi",
        active: false,
        subMenu: [
            {
                text: "Kelola Absensi",
                link: "/absensi/kelola",
            },
            {
                text: "Rekapitulasi",
                link: "/absensi/rekapitulasi",
            },
        ],
    },
    {
        icon: "user-check",
        text: "Scan Absensi",
        link: "/scan/absensi",
    },
    {
        icon: "users",
        text: "Pengguna",
        link: "/pengguna",
    },
    {
        icon: "setting-alt",
        text: "Pengaturan",
        link: "/pengaturan",
    },
];
export default menu;
