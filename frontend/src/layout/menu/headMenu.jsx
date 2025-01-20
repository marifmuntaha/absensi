const headMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/",
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
        icon: "setting-alt",
        text: "Pengaturan",
        link: "/pengaturan",
    },
];
export default headMenu;
