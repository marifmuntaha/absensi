const headMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/",
    },
    {
        icon: "user-fill",
        text: "Data Guru",
        link: "/kepala/data-guru",
    },
    {
        icon: "check",
        text: "Ajuan",
        active: false,
        subMenu: [
            {
                text: "Ajuan Ijin",
                link: "/kepala/ajuan/ijin",
            },
            {
                text: "Ajuan TTD",
                link: "/kepala/absensi/rekapitulasi",
            },
        ],
    },
    {
        icon: "calendar",
        text: "Absensi",
        active: false,
        subMenu: [
            {
                text: "Kelola Absensi",
                link: "/kepala/absensi/kelola",
            },
            {
                text: "Rekapitulasi",
                link: "/kepala/absensi/rekapitulasi",
            },
        ],
    },
    {
        icon: "setting-alt",
        text: "Pengaturan",
        link: "/kepala/pengaturan",
    },
];
export default headMenu;
